import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  index,
  uniqueIndex,
  boolean,
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

/* Notable moments/clips for a nominee */
export const notableMoments = mysqlTable(
  "notableMoments",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    videoUrl: text("videoUrl"), /* YouTube or Kick embed URL */
    timestamp: varchar("timestamp", { length: 20 }), /* e.g. "2023-06-15" */
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_moments_nominee").on(t.nomineeId)]
);

export type NotableMoment = typeof notableMoments.$inferSelect;
export type InsertNotableMoment = typeof notableMoments.$inferInsert;

/* Controversies and incidents */
export const controversies = mysqlTable(
  "controversies",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    date: varchar("date", { length: 20 }), /* e.g. "2023-06-15" */
    severity: mysqlEnum("severity", ["minor", "moderate", "major"]).default("moderate"),
    sourceUrl: text("sourceUrl"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_controversies_nominee").on(t.nomineeId)]
);

export type Controversy = typeof controversies.$inferSelect;
export type InsertControversy = typeof controversies.$inferInsert;

/* News and updates */
export const newsItems = mysqlTable(
  "newsItems",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    content: text("content").notNull(),
    sourceUrl: text("sourceUrl"),
    date: varchar("date", { length: 20 }), /* e.g. "2025-04-13" */
    submittedByUserId: int("submittedByUserId"),
    approved: boolean("approved").default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_news_nominee").on(t.nomineeId)]
);

export type NewsItem = typeof newsItems.$inferSelect;
export type InsertNewsItem = typeof newsItems.$inferInsert;

/* External links (Know Your Meme, Wikipedia, etc) */
export const externalLinks = mysqlTable(
  "externalLinks",
  {
    id: int("id").autoincrement().primaryKey(),
    nomineeId: int("nomineeId").notNull(),
    label: varchar("label", { length: 128 }).notNull(), /* e.g. "Know Your Meme", "Wikipedia" */
    url: text("url").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_links_nominee").on(t.nomineeId)]
);

export type ExternalLink = typeof externalLinks.$inferSelect;
export type InsertExternalLink = typeof externalLinks.$inferInsert;
