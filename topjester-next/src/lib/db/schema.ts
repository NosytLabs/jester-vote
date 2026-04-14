import { pgTable, serial, varchar, text, integer, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const nominees = pgTable('nominees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  platform: varchar('platform', { length: 100 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  bio: text('bio').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const votes = pgTable('votes', {
  id: serial('id').primaryKey(),
  nomineeId: integer('nominee_id').references(() => nominees.id).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  voteType: varchar('vote_type', { length: 10 }).notNull(), // 'up' or 'down'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 500 }),
  platform: varchar('platform', { length: 50 }), // kick, twitch, youtube
  platformId: varchar('platform_id', { length: 255 }),
  isAdmin: boolean('is_admin').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notableMoments = pgTable('notable_moments', {
  id: serial('id').primaryKey(),
  nomineeId: integer('nominee_id').references(() => nominees.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: varchar('date', { length: 50 }),
  type: varchar('type', { length: 50 }).notNull(), // 'clip', 'controversy', 'event'
});

export const controversies = pgTable('controversies', {
  id: serial('id').primaryKey(),
  nomineeId: integer('nominee_id').references(() => nominees.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: varchar('date', { length: 50 }),
  severity: varchar('severity', { length: 20 }).notNull(), // 'low', 'medium', 'high'
});
