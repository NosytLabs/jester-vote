import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export type Nominee = typeof schema.nominees.$inferSelect;
export type Vote = typeof schema.votes.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type NotableMoment = typeof schema.notableMoments.$inferSelect;
export type Controversy = typeof schema.controversies.$inferSelect;
