import { and, desc, eq, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, nominees, votes, comments } from "../drizzle/schema";
import type { InsertNominee, InsertVote, InsertComment } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod", "kickUsername", "kickAvatarUrl"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);

  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  
  // Check if this is the first user (auto-admin) or matches ownerOpenId
  const userCount = await db.select({ count: count() }).from(users);
  const isFirstUser = userCount[0]?.count === 0;
  
  if (user.role !== undefined) { 
    values.role = user.role; 
    updateSet.role = user.role; 
  }
  else if (isFirstUser || user.openId === ENV.ownerOpenId) { 
    values.role = "admin"; 
    updateSet.role = "admin"; 
  }
  
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, nominees, votes, comments } from "../drizzle/schema";
import type { InsertNominee, InsertVote, InsertComment } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod", "kickUsername", "kickAvatarUrl"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);

  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  
  // Check if this is the first user (auto-admin) or matches ownerOpenId
  const userCount = await db.select({ count: count() }).from(users);
  const isFirstUser = userCount[0]?.count === 0;
  
  if (user.role !== undefined) { 
    values.role = user.role; 
    updateSet.role = user.role; 
  }
  else if (isFirstUser || user.openId === ENV.ownerOpenId) { 
    values.role = "admin"; 
    updateSet.role = "admin"; 
  }
  
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Nominees ─────────────────────────────────────────────────────────────────

export async function listApprovedNominees() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(nominees).where(eq(nominees.status, "approved")).orderBy(desc(nominees.createdAt));
}

export async function getNomineeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(nominees).where(eq(nominees.id, id)).limit(1);
  return result[0] ?? undefined;
}

export async function insertNominee(data: InsertNominee) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(nominees).values(data);
  return result;
}

export async function updateNomineeStatus(id: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(nominees).set({ status }).where(eq(nominees.id, id));
}

export async function listPendingNominees() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(nominees).where(eq(nominees.status, "pending")).orderBy(desc(nominees.createdAt));
}

/** Check for duplicate nominees by name (case-insensitive) */
export async function findNomineeByName(name: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(nominees)
    .where(sql`LOWER(${nominees.name}) = LOWER(${name})`)
    .limit(1);
  return result[0] ?? undefined;
}

/** Get user's nomination submissions */
export async function getUserNominations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: nominees.id,
      name: nominees.name,
      description: nominees.description,
      imageUrl: nominees.imageUrl,
      status: nominees.status,
      createdAt: nominees.createdAt,
    })
    .from(nominees)
    .where(eq(nominees.submittedByUserId, userId))
    .orderBy(desc(nominees.createdAt));
}

// ─── Votes ────────────────────────────────────────────────────────────────────

/** Returns the current ISO week key, e.g. "2025-W15" */
export function getCurrentWeekKey(): string {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Get vote totals for all approved nominees, optionally filtered by weekKey */
export async function getVoteTotals(weekKey?: string) {
  const db = await getDb();
  if (!db) return [];

  const conditions = weekKey
    ? and(eq(nominees.status, "approved"), eq(votes.weekKey, weekKey))
    : eq(nominees.status, "approved");

  const rows = await db
    .select({
      nomineeId: nominees.id,
      name: nominees.name,
      description: nominees.description,
      imageUrl: nominees.imageUrl,
      upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
      downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
    })
    .from(nominees)
    .leftJoin(votes, eq(nominees.id, votes.nomineeId))
    .where(conditions)
    .groupBy(nominees.id, nominees.name, nominees.description, nominees.imageUrl)
    .orderBy(
      desc(sql`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END) - SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`)
    );

  return rows.map((r) => ({
    ...r,
    upvotes: Number(r.upvotes) || 0,
    downvotes: Number(r.downvotes) || 0,
    score: (Number(r.upvotes) || 0) - (Number(r.downvotes) || 0),
  }));
}

/** Get existing vote for a user on a nominee (any week) */
export async function getUserVoteForNominee(userId: number, nomineeId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(votes)
    .where(and(eq(votes.userId, userId), eq(votes.nomineeId, nomineeId)))
    .limit(1);
  return result[0] ?? undefined;
}

/** Get all votes cast by a user (map of nomineeId -> voteType) */
export async function getUserVoteMap(userId: number): Promise<Record<number, "up" | "down">> {
  const db = await getDb();
  if (!db) return {};
  const rows = await db.select().from(votes).where(eq(votes.userId, userId));
  const map: Record<number, "up" | "down"> = {};
  for (const row of rows) map[row.nomineeId] = row.voteType;
  return map;
}

/** Cast or update a vote — race-safe via ON DUPLICATE KEY UPDATE (unique constraint on userId+nomineeId) */
export async function castVote(data: InsertVote) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(votes)
    .values(data)
    .onDuplicateKeyUpdate({ set: { voteType: data.voteType, weekKey: data.weekKey } });

  // Broadcast real-time update
  try {
    const { broadcastVoteUpdate } = await import("./_core/index");
    // Get updated vote totals for this nominee
    const [nomineeVotes] = await db
      .select({
        upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
        downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
      })
      .from(votes)
      .where(eq(votes.nomineeId, data.nomineeId));

    broadcastVoteUpdate({
      nomineeId: data.nomineeId,
      upvotes: Number(nomineeVotes?.upvotes) || 0,
      downvotes: Number(nomineeVotes?.downvotes) || 0,
      score: (Number(nomineeVotes?.upvotes) || 0) - (Number(nomineeVotes?.downvotes) || 0),
    });
  } catch (error) {
    // Don't fail the vote if broadcast fails
    console.warn("[SSE] Failed to broadcast vote update:", error);
  }
}

/** Get weekly vote history for a nominee (last 8 weeks) */
export async function getNomineeVoteHistory(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      weekKey: votes.weekKey,
      upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
      downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
    })
    .from(votes)
    .where(eq(votes.nomineeId, nomineeId))
    .groupBy(votes.weekKey)
    .orderBy(votes.weekKey);
  return rows.map((r) => ({
    weekKey: r.weekKey,
    upvotes: Number(r.upvotes) || 0,
    downvotes: Number(r.downvotes) || 0,
  }));
}

// ─── Comments ─────────────────────────────────────────────────────────────────

export async function listComments(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      userName: users.name,
      kickUsername: users.kickUsername,
      kickAvatarUrl: users.kickAvatarUrl,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.nomineeId, nomineeId))
    .orderBy(desc(comments.createdAt))
    .limit(50);
}

export async function insertComment(data: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(comments).values(data);
}

// ─── Seed helpers ─────────────────────────────────────────────────────────────

export async function seedNominees() {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select({ id: nominees.id }).from(nominees).limit(1);
  if (existing.length > 0) return; // already seeded

  const seed = [
    { name: "DSP (DarksydePhil)", description: "Legendary gaming streamer known for blaming controllers, chat, and the game itself for every loss. The original lolcow.", imageUrl: "https://i.pravatar.cc/150?img=1", status: "approved" as const },
    { name: "Boogie2988", description: "Perpetually in crisis, perpetually forgiving himself. The cycle never ends.", imageUrl: "https://i.pravatar.cc/150?img=2", status: "approved" as const },
    { name: "Wings of Redemption", description: "Rage quit pioneer. Broke more controllers than records.", imageUrl: "https://i.pravatar.cc/150?img=3", status: "approved" as const },
    { name: "Keemstar", description: "Drama Alert host who somehow always ends up in the drama himself.", imageUrl: "https://i.pravatar.cc/150?img=4", status: "approved" as const },
    { name: "Ice Poseidon", description: "The original IRL streamer. Banned everywhere, streams everywhere.", imageUrl: "https://i.pravatar.cc/150?img=5", status: "approved" as const },
    { name: "Sam Pepper", description: "Prank gone wrong. Multiple times.", imageUrl: "https://i.pravatar.cc/150?img=6", status: "approved" as const },
    { name: "Onision", description: "Banana man turned internet villain. The arc never stops.", imageUrl: "https://i.pravatar.cc/150?img=7", status: "approved" as const },
    { name: "Leafy Is Here", description: "Chin jokes and callout videos. Got banned, came back, got banned again.", imageUrl: "https://i.pravatar.cc/150?img=8", status: "approved" as const },
    { name: "Spoony One", description: "Film critic who became his own worst critic. The original burnout arc.", imageUrl: "https://i.pravatar.cc/150?img=9", status: "approved" as const },
    { name: "Chris Chan", description: "The most documented person on the internet. The lolcow of all lolcows.", imageUrl: "https://i.pravatar.cc/150?img=10", status: "approved" as const },
  ];

  await db.insert(nominees).values(seed);
}
