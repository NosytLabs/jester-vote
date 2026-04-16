import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Create connection pool
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  connectionLimit: 10,
});

export const db = drizzle(pool, { schema, mode: 'default' });

export type Nominee = typeof schema.nominees.$inferSelect;
export type Vote = typeof schema.votes.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type NotableMoment = typeof schema.notableMoments.$inferSelect;
export type Controversy = typeof schema.controversies.$inferSelect;
