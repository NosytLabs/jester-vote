import { db } from '@/lib/db';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
