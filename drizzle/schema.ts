import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  // Kick-specific profile fields stored after OAuth
  kickUsername: varchar("kickUsername", { length: 128 }),
  kickAvatarUrl: text("kickAvatarUrl"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const nominees = mysqlTable(
  "nominees",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 128 }).notNull(),
    description: text("description"),
    imageUrl: text("imageUrl"),
    status: mysqlEnum("status", ["pending", "approved", "rejected"])
      .default("pending")
      .notNull(),
    submittedByUserId: int("submittedByUserId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (t) => [index("idx_nominees_status").on(t.status)]
);

export type Nominee = typeof nominees.$inferSelect;
export type InsertNominee = typeof nominees.$inferInsert;

export const votes = mysqlTable(
  "votes",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    userId: int("userId").notNull(),
    voteType: mysqlEnum("voteType", ["up", "down"]).notNull(),
    // ISO week key e.g. "2025-W15" for weekly rankings
    weekKey: varchar("weekKey", { length: 10 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [
    index("idx_votes_nominee").on(t.nomineeId),
    // Unique constraint enforces one vote per user per nominee at DB level
    uniqueIndex("uniq_votes_user_nominee").on(t.userId, t.nomineeId),
    index("idx_votes_weekkey").on(t.weekKey),
  ]
);

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;

export const comments = mysqlTable(
  "comments",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    userId: int("userId").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_comments_nominee").on(t.nomineeId)]
);

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
