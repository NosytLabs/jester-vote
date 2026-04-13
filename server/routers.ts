import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  listApprovedNominees,
  getNomineeById,
  insertNominee,
  updateNomineeStatus,
  listPendingNominees,
  getVoteTotals,
  getUserVoteForNominee,
  getUserVoteMap,
  castVote,
  getNomineeVoteHistory,
  listComments,
  insertComment,
  getCurrentWeekKey,
  seedNominees,
} from "./db";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  nominees: router({
    /** Public: list approved nominees with vote totals, sorted by score */
    list: publicProcedure
      .input(z.object({ mode: z.enum(["weekly", "alltime"]).default("alltime") }))
      .query(async ({ input }) => {
        await seedNominees();
        const weekKey = input.mode === "weekly" ? getCurrentWeekKey() : undefined;
        return getVoteTotals(weekKey);
      }),

    /** Public: get single nominee with vote history */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const nominee = await getNomineeById(input.id);
        if (!nominee || nominee.status !== "approved") {
          throw new TRPCError({ code: "NOT_FOUND", message: "Nominee not found" });
        }
        const voteHistory = await getNomineeVoteHistory(input.id);
        return { ...nominee, voteHistory };
      }),

    /** Protected: submit a new nominee for admin review */
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
        await castVote({
          nomineeId: input.nomineeId,
          userId: ctx.user.id,
          voteType: input.voteType,
          weekKey: getCurrentWeekKey(),
        });
        return { success: true };
      }),

    /** Protected: get the current user's vote map (nomineeId -> voteType) */
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
        const nominee = await getNomineeById(input.nomineeId);
        if (!nominee || nominee.status !== "approved") {
          throw new TRPCError({ code: "NOT_FOUND", message: "Nominee not found" });
        }
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
});

export type AppRouter = typeof appRouter;
