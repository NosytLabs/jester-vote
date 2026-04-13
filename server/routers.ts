import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
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
} from "./db";

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

    /** Protected: submit a new nominee (pending approval) */
    submit: protectedProcedure
      .input(
        z.object({
          name: z.string().min(2).max(128),
          description: z.string().max(1000).optional(),
          imageUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await insertNominee({
          name: input.name,
          description: input.description ?? null,
          imageUrl: input.imageUrl ?? null,
          status: "pending",
          submittedByUserId: ctx.user.id,
        });
        return { success: true };
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
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await updateNomineeStatus(input.id, "approved");
        return { success: true };
      }),

    /** Admin: reject a nominee */
    reject: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await updateNomineeStatus(input.id, "rejected");
        return { success: true };
      }),
  }),

  profile: router({
    /** Public: get rich profile data (moments, controversies, news, links) */
    getRichData: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { listNotableMoments, listControversies, listNewsItems, listExternalLinks } = await import("./db-rich");
        const [moments, controversies, news, links] = await Promise.all([
          listNotableMoments(input.id),
          listControversies(input.id),
          listNewsItems(input.id),
          listExternalLinks(input.id),
        ]);
        return { moments, controversies, news, links };
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
