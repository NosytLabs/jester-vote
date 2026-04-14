import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { db } from '@/lib/db';

export const createTRPCContext = cache(async () => {
  return { db };
});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;