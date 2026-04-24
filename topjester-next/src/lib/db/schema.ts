import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const nominees = sqliteTable('nominees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  platform: text('platform').notNull(),
  category: text('category').notNull(),
  bio: text('bio').notNull(),
  imageUrl: text('image_url'),
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(),
  status: text('status').default('approved').notNull(),
  submittedByUserId: integer('submitted_by_user_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nomineeId: integer('nominee_id').notNull(),
  userId: integer('user_id').notNull(),
  voteType: text('vote_type').notNull(),
  weekKey: text('week_key').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  openId: text('open_id').notNull().unique(),
  email: text('email'),
  name: text('name'),
  kickUsername: text('kick_username'),
  kickAvatarUrl: text('kick_avatar_url'),
  loginMethod: text('login_method'),
  role: text('role').default('user').notNull(),
  lastSignedIn: integer('last_signed_in', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nomineeId: integer('nominee_id').notNull(),
  userId: integer('user_id').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const notableMoments = sqliteTable('notable_moments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nomineeId: integer('nominee_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: text('date'),
  type: text('type').notNull(),
});

export const controversies = sqliteTable('controversies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nomineeId: integer('nominee_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: text('date'),
  severity: text('severity').notNull(),
});

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