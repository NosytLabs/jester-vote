import initSqlJs, { Database } from 'sql.js';
import { drizzle } from 'drizzle-orm/sql-js';
import * as schema from './schema';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'topjester.db');
let sqlDb: Database | null = null;
let drizzleDb: any = null;

try {
  const SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    sqlDb = new SQL.Database(fileBuffer);
  } else {
    sqlDb = new SQL.Database();
  }
  
  drizzleDb = drizzle(sqlDb, { schema });
} catch (error) {
  console.warn('Database connection failed:', error);
}

export const database = sqlDb;
export const orm = drizzleDb;
// Keep 'db' alias for compatibility if needed elsewhere, but rename internal to avoid clash
export const db = drizzleDb;

export function saveDatabase() {
  if (sqlDb) {
    const data = sqlDb.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

export type Nominee = typeof schema.nominees.$inferSelect;
export type Vote = typeof schema.votes.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type NotableMoment = typeof schema.notableMoments.$inferSelect;
export type Controversy = typeof schema.controversies.$inferSelect;
