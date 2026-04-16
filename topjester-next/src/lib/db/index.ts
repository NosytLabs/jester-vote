import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Create connection pool with fallback for build time
let pool: mysql.Pool | null = null;

try {
  if (process.env.DATABASE_URL) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      connectionLimit: 10,
    });
  }
} catch (error) {
  console.warn('Database connection failed:', error);
}

// Export db with fallback for build time
export const db = pool ? drizzle(pool, { schema, mode: 'default' }) : null as any;

export type Nominee = typeof schema.nominees.$inferSelect;
export type Vote = typeof schema.votes.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type NotableMoment = typeof schema.notableMoments.$inferSelect;
export type Controversy = typeof schema.controversies.$inferSelect;
