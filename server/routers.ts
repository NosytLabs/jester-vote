import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sql, eq } from "drizzle-orm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import {
  getNomineeById,
  getVoteTotals,
  insertNominee,
  listPendingNominees,
  updateNomineeStatus,
  castVote,
  getUserVoteMap,
  listComments,
  insertComment,
  getNomineeVoteHistory,
  findNomineeByName,
  getUserNominations,
  getDb,
} from "./db";
import { nominees } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  nominees: router({
    /** Public: list nominees (weekly or all-time) */
    list: publicProcedure
      .input(
        z.object({
          period: z.enum(["week", "alltime"]).default("alltime"),
        })
      )
      .query(async ({ input }) => {
        const weekKey = input.period === "week" ? getISOWeek(new Date()) : undefined;
        return getVoteTotals(weekKey);
      }),

    /** Public: get nominee by ID with vote history */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const nominee = await getNomineeById(input.id);
        if (!nominee) return null;
        const voteHistory = await getNomineeVoteHistory(input.id);
        return { ...nominee, voteHistory };
      }),

    /** Protected: submit a new nominee (pending approval) with duplicate detection */
    submit: protectedProcedure
      .input(
        z.object({
          name: z.string().min(2).max(128),
          description: z.string().max(1000).optional(),
          imageUrl: z.string().url().optional(),
          streamerUrl: z.string().url().optional(),
          category: z.enum(["lolcow", "jester", "controversial", "other"]).default("lolcow"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check for duplicates
        const existing = await findNomineeByName(input.name);
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: existing.status === "approved" 
              ? `\"${input.name}\" is already in the rankings!`
              : `\"${input.name}\" is already pending approval.`,
          });
        }

        await insertNominee({
          name: input.name,
          description: input.description ?? null,
          imageUrl: input.imageUrl ?? null,
          status: "pending",
          submittedByUserId: ctx.user.id,
        });

        // Send email notification to admins (if configured)
        try {
          const { sendNominationNotification } = await import("./email");
          await sendNominationNotification({
            nomineeName: input.name,
            submittedBy: ctx.user.name || ctx.user.kickUsername || "Unknown",
            description: input.description,
          });
        } catch (e) {
          // Don't fail the submission if email fails
        }

        return { success: true, message: "Nomination submitted for review!" };
      }),

    /** Protected: check if a nominee name already exists */
    checkDuplicate: protectedProcedure
      .input(z.object({ name: z.string().min(2).max(128) }))
      .query(async ({ input }) => {
        const existing = await findNomineeByName(input.name);
        return {
          exists: !!existing,
          status: existing?.status || null,
          name: existing?.name || null,
        };
      }),

    /** Protected: get current user's nominations */
    myNominations: protectedProcedure.query(async ({ ctx }) => {
      return getUserNominations(ctx.user.id);
    }),
  }),

  votes: router({
    /** Protected: cast or update a vote (up/down) for a nominee */
    cast: protectedProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          voteType: z.enum(["up", "down"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const nominee = await getNomineeById(input.nomineeId);
        if (!nominee || nominee.status !== "approved") {
          throw new TRPCError({ code: "NOT_FOUND", message: "Nominee not found" });
        }
        const weekKey = getISOWeek(new Date());
        await castVote({
          nomineeId: input.nomineeId,
          userId: ctx.user.id,
          voteType: input.voteType,
          weekKey,
        });
        return { success: true };
      }),

    /** Protected: get current user's votes */
    myVotes: protectedProcedure.query(async ({ ctx }) => {
      return getUserVoteMap(ctx.user.id);
    }),
  }),

  comments: router({
    /** Public: list comments for a nominee */
    list: publicProcedure
      .input(z.object({ nomineeId: z.number() }))
      .query(async ({ input }) => {
        return listComments(input.nomineeId);
      }),

    /** Protected: add a comment */
    add: protectedProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          content: z.string().min(1).max(500),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await insertComment({
          nomineeId: input.nomineeId,
          userId: ctx.user.id,
          content: input.content,
        });
        return { success: true };
      }),
  }),

  admin: router({
    /** Admin: list pending nominees */
    pendingNominees: adminProcedure.query(async () => {
      return listPendingNominees();
    }),

    /** Admin: approve a nominee */
    approve: adminProcedure
      .input(z.object({ id: z.number(), reason: z.string().optional() }))
      .mutation(async ({ input }) => {
        const nominee = await getNomineeById(input.id);
        if (!nominee) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Nominee not found" });
        }
        
        await updateNomineeStatus(input.id, "approved");

        // Send approval notification email
        try {
          if (nominee.submittedByUserId) {
            const { getDb } = await import("./db");
            const db = await getDb();
            if (db) {
              const { users } = await import("../drizzle/schema");
              const { eq } = await import("drizzle-orm");
              const submitter = await db.select().from(users).where(eq(users.id, nominee.submittedByUserId)).limit(1);
              if (submitter[0]?.email) {
                const { sendApprovalNotification } = await import("./email");
                await sendApprovalNotification({
                  toEmail: submitter[0].email,
                  nomineeName: nominee.name,
                  approved: true,
                  reason: input.reason,
                });
              }
            }
          }
        } catch {
          // Email notification failed - continue silently
        }

        return { success: true, message: `\"${nominee.name}\" has been approved!` };
      }),

    /** Admin: reject a nominee */
    reject: adminProcedure
      .input(z.object({ id: z.number(), reason: z.string().min(1).max(500) }))
      .mutation(async ({ input }) => {
        const nominee = await getNomineeById(input.id);
        if (!nominee) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Nominee not found" });
        }
        
        await updateNomineeStatus(input.id, "rejected");

        // Send rejection notification email
        try {
          if (nominee.submittedByUserId) {
            const { getDb } = await import("./db");
            const db = await getDb();
            if (db) {
              const { users } = await import("../drizzle/schema");
              const { eq } = await import("drizzle-orm");
              const submitter = await db.select().from(users).where(eq(users.id, nominee.submittedByUserId)).limit(1);
              if (submitter[0]?.email) {
                const { sendApprovalNotification } = await import("./email");
                await sendApprovalNotification({
                  toEmail: submitter[0].email,
                  nomineeName: nominee.name,
                  approved: false,
                  reason: input.reason,
                });
              }
            }
          }
        } catch {
          // Email notification failed - continue silently
        }

        return { success: true, message: `\"${nominee.name}\" has been rejected.` };
      }),

    /** Admin: get nominee statistics */
    stats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      }
      
      const { sql } = await import("drizzle-orm");
      
      const [pendingCount, approvedCount, rejectedCount, totalCount] = await Promise.all([
        db.select({ count: sql<number>`COUNT(*)` }).from(nominees).where(eq(nominees.status, "pending")),
        db.select({ count: sql<number>`COUNT(*)` }).from(nominees).where(eq(nominees.status, "approved")),
        db.select({ count: sql<number>`COUNT(*)` }).from(nominees).where(eq(nominees.status, "rejected")),
        db.select({ count: sql<number>`COUNT(*)` }).from(nominees),
      ]);

      return {
        pending: Number(pendingCount[0]?.count) || 0,
        approved: Number(approvedCount[0]?.count) || 0,
        rejected: Number(rejectedCount[0]?.count) || 0,
        total: Number(totalCount[0]?.count) || 0,
      };
    }),
  }),

  profile: router({
    /** Public: get rich profile data (moments, controversies, news, links, tweets, reddit, kick clips) */
    getRichData: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { 
          listNotableMoments, 
          listControversies, 
          listNewsItems, 
          listExternalLinks,
          listNomineeTweets,
          listNomineeRedditPosts,
          listNomineeKickClips,
        } = await import("./db-rich");
        const [
          moments, 
          controversies, 
          news, 
          links,
          tweets,
          redditPosts,
          kickClips,
        ] = await Promise.all([
          listNotableMoments(input.id),
          listControversies(input.id),
          listNewsItems(input.id),
          listExternalLinks(input.id),
          listNomineeTweets(input.id),
          listNomineeRedditPosts(input.id),
          listNomineeKickClips(input.id),
        ]);
        
        // Extract URLs for frontend consumption
        const tweetUrls = tweets.map(t => t.tweetUrl);
        const redditUrls = redditPosts.map(r => r.postUrl);
        const kickClipUrls = kickClips.map(k => k.clipUrl);
        
        // Get channel name from first kick clip or nominees table
        const kickChannelName = kickClips[0]?.channelName || 
          links.find(l => l.label.toLowerCase().includes('kick'))?.url.split('/').pop();
        
        return { 
          moments, 
          controversies, 
          news, 
          links,
          tweetUrls,
          redditUrls,
          kickClipUrls,
          kickChannelName,
          // Also return full data for potential detailed views
          tweets,
          redditPosts,
          kickClips,
        };
      }),

    /** Protected: add a notable moment (clip) */
    addNotableMoment: protectedProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          title: z.string().min(1).max(256),
          description: z.string().max(1000).optional(),
          videoUrl: z.string().url().optional(),
          timestamp: z.string().max(20).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { insertNotableMoment } = await import("./db-rich");
        await insertNotableMoment({
          nomineeId: input.nomineeId,
          title: input.title,
          description: input.description ?? null,
          videoUrl: input.videoUrl ?? null,
          timestamp: input.timestamp ?? null,
        });
        return { success: true };
      }),

    /** Admin: add a controversy/incident */
    addControversy: adminProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          title: z.string().min(1).max(256),
          description: z.string().min(1).max(2000),
          date: z.string().max(20).optional(),
          severity: z.enum(["minor", "moderate", "major"]).default("moderate"),
          sourceUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertControversy } = await import("./db-rich");
        await insertControversy({
          nomineeId: input.nomineeId,
          title: input.title,
          description: input.description,
          date: input.date ?? null,
          severity: input.severity,
          sourceUrl: input.sourceUrl ?? null,
        });
        return { success: true };
      }),

    /** Protected: add a news item (requires approval) */
    addNewsItem: protectedProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          title: z.string().min(1).max(256),
          content: z.string().min(1).max(5000),
          sourceUrl: z.string().url().optional(),
          date: z.string().max(20).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { insertNewsItem } = await import("./db-rich");
        await insertNewsItem({
          nomineeId: input.nomineeId,
          title: input.title,
          content: input.content,
          sourceUrl: input.sourceUrl ?? null,
          date: input.date ?? null,
          submittedByUserId: ctx.user.id,
          approved: false,
        });
        return { success: true, pendingApproval: true };
      }),

    /** Protected: add an external link */
    addExternalLink: protectedProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          label: z.string().min(1).max(128),
          url: z.string().url(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertExternalLink } = await import("./db-rich");
        await insertExternalLink({
          nomineeId: input.nomineeId,
          label: input.label,
          url: input.url,
        });
        return { success: true };
      }),

    /** Admin: approve a pending news item */
    approveNews: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const { newsItems } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
        await db.update(newsItems).set({ approved: true }).where(eq(newsItems.id, input.id));
        return { success: true };
      }),

    /** Admin: add a tweet URL */
    addTweet: adminProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          tweetUrl: z.string().url(),
          description: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertNomineeTweet } = await import("./db-rich");
        
        // Extract tweet ID from URL
        const tweetIdMatch = input.tweetUrl.match(/(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/i);
        const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;
        
        await insertNomineeTweet({
          nomineeId: input.nomineeId,
          tweetUrl: input.tweetUrl,
          tweetId: tweetId,
          description: input.description ?? null,
        });
        return { success: true };
      }),

    /** Admin: add a Reddit post URL */
    addRedditPost: adminProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          postUrl: z.string().url(),
          description: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertNomineeRedditPost } = await import("./db-rich");
        
        // Extract subreddit and post ID from URL
        const match = input.postUrl.match(/reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i);
        const subreddit = match ? match[1] : null;
        const postId = match ? match[2] : null;
        
        await insertNomineeRedditPost({
          nomineeId: input.nomineeId,
          postUrl: input.postUrl,
          subreddit: subreddit,
          postId: postId,
          description: input.description ?? null,
        });
        return { success: true };
      }),

    /** Admin: add a Kick clip URL */
    addKickClip: adminProcedure
      .input(
        z.object({
          nomineeId: z.number(),
          clipUrl: z.string().url(),
          description: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertNomineeKickClip } = await import("./db-rich");
        
        // Extract channel name and clip ID from URL
        const channelMatch = input.clipUrl.match(/kick\.com\/([a-zA-Z0-9_-]+)/i);
        const clipMatch = input.clipUrl.match(/clip=([a-zA-Z0-9_-]+)/i);
        const channelName = channelMatch ? channelMatch[1] : null;
        const clipId = clipMatch ? clipMatch[1] : null;
        
        await insertNomineeKickClip({
          nomineeId: input.nomineeId,
          clipUrl: input.clipUrl,
          clipId: clipId,
          channelName: channelName,
          description: input.description ?? null,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

// Helper: get ISO week key (e.g. "2025-W15")
function getISOWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}
