import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { db } from '@/lib/db';
import { nominees, votes } from '@/lib/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Helper to get current week key
function getCurrentWeekKey(): string {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

export const appRouter = router({
  // Get all nominees with their stats
  nominees: publicProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(async ({ input: _input }) => {
      const limit = _input?.limit ?? 50;
      
      const results = await db.query.nominees.findMany({
        limit,
        orderBy: desc(nominees.score),
      });
      
      return results;
    }),

  // Get a single nominee by ID
  nomineeById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db.query.nominees.findFirst({
        where: eq(nominees.id, input.id),
      });
      
      return result;
    }),

  // Get leaderboard rankings
  leaderboard: publicProcedure
    .input(z.object({ period: z.enum(['alltime', 'week']).default('alltime') }))
    .query(async ({ input }) => {
      const results = await db.query.nominees.findMany({
        orderBy: desc(nominees.score),
        limit: 100,
      });
      
      return results.map((nominee: any, index: number) => ({
        ...nominee,
        rank: index + 1,
      }));
    }),

  // Cast a vote
  castVote: publicProcedure
    .input(z.object({
      nomineeId: z.number(),
      userId: z.number(),
      voteType: z.enum(['up', 'down']),
    }))
    .mutation(async ({ input }) => {
      const { nomineeId, userId, voteType } = input;
      const weekKey = getCurrentWeekKey();
      
      // Insert or update vote
      await db.insert(votes)
        .values({
          nomineeId,
          userId,
          voteType,
          weekKey,
        })
        .onDuplicateKeyUpdate({
          set: { voteType, weekKey },
        });
      
      // Recalculate nominee stats
      const voteStats = await db.select({
        upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
        downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
      })
      .from(votes)
      .where(eq(votes.nomineeId, nomineeId));
      
      const upvotes = Number(voteStats[0]?.upvotes) || 0;
      const downvotes = Number(voteStats[0]?.downvotes) || 0;
      
      await db.update(nominees)
        .set({
          upvotes,
          downvotes,
          score: upvotes - downvotes,
        })
        .where(eq(nominees.id, nomineeId));
      
      return { success: true, upvotes, downvotes, score: upvotes - downvotes };
    }),

  // Get total stats
  stats: publicProcedure.query(async () => {
    const allNominees = await db.query.nominees.findMany();
    const totalVotes = allNominees.reduce((sum: number, n: any) => sum + n.upvotes + n.downvotes, 0);
    
    return {
      totalNominees: allNominees.length,
      totalVotes,
      totalUpvotes: allNominees.reduce((sum: number, n: any) => sum + n.upvotes, 0),
      totalDownvotes: allNominees.reduce((sum: number, n: any) => sum + n.downvotes, 0),
    };
  }),
});

export type AppRouter = typeof appRouter;
