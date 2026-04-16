import { mysqlTable, serial, varchar, text, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';

export const nominees = mysqlTable('nominees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  platform: varchar('platform', { length: 100 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  bio: text('bio').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  upvotes: int('upvotes').default(0).notNull(),
  downvotes: int('downvotes').default(0).notNull(),
  score: int('score').default(0).notNull(),
  status: varchar('status', { length: 20 }).default('approved').notNull(),
  submittedByUserId: int('submitted_by_user_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const votes = mysqlTable('votes', {
  id: serial('id').primaryKey(),
  nomineeId: int('nominee_id').notNull(),
  userId: int('user_id').notNull(),
  voteType: mysqlEnum('vote_type', ['up', 'down']).notNull(),
  weekKey: varchar('week_key', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  openId: varchar('open_id', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }),
  name: varchar('name', { length: 255 }),
  kickUsername: varchar('kick_username', { length: 255 }),
  kickAvatarUrl: varchar('kick_avatar_url', { length: 500 }),
  loginMethod: varchar('login_method', { length: 50 }),
  role: varchar('role', { length: 20 }).default('user').notNull(),
  lastSignedIn: timestamp('last_signed_in'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const comments = mysqlTable('comments', {
  id: serial('id').primaryKey(),
  nomineeId: int('nominee_id').notNull(),
  userId: int('user_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notableMoments = mysqlTable('notable_moments', {
  id: serial('id').primaryKey(),
  nomineeId: int('nominee_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: varchar('date', { length: 50 }),
  type: varchar('type', { length: 50 }).notNull(),
});

export const controversies = mysqlTable('controversies', {
  id: serial('id').primaryKey(),
  nomineeId: int('nominee_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: varchar('date', { length: 50 }),
  severity: varchar('severity', { length: 20 }).notNull(),
});

// Type exports
export type Nominee = typeof nominees.$inferSelect;
export type InsertNominee = typeof nominees.$inferInsert;
export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
export type NotableMoment = typeof notableMoments.$inferSelect;
export type InsertNotableMoment = typeof notableMoments.$inferInsert;
export type Controversy = typeof controversies.$inferSelect;
export type InsertControversy = typeof controversies.$inferInsert;
