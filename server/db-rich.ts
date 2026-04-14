import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { notableMoments, controversies, newsItems, externalLinks, nomineeTweets, nomineeRedditPosts, nomineeKickClips } from "../drizzle/schema";
import type { InsertNotableMoment, InsertControversy, InsertNewsItem, InsertExternalLink, InsertNomineeTweet, InsertNomineeRedditPost, InsertNomineeKickClip } from "../drizzle/schema";

// ─── Notable Moments ───────────────────────────────────────────────────────────

export async function listNotableMoments(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(notableMoments)
    .where(eq(notableMoments.nomineeId, nomineeId))
    .orderBy(desc(notableMoments.timestamp));
}

export async function insertNotableMoment(data: InsertNotableMoment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(notableMoments).values(data);
}

// ─── Controversies ────────────────────────────────────────────────────────────

export async function listControversies(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(controversies)
    .where(eq(controversies.nomineeId, nomineeId))
    .orderBy(desc(controversies.date));
}

export async function insertControversy(data: InsertControversy) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(controversies).values(data);
}

// ─── News Items ───────────────────────────────────────────────────────────────

export async function listNewsItems(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(newsItems)
    .where(eq(newsItems.nomineeId, nomineeId))
    .orderBy(desc(newsItems.date))
    .limit(20);
}

export async function insertNewsItem(data: InsertNewsItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsItems).values(data);
}

// ─── External Links ───────────────────────────────────────────────────────────

export async function listExternalLinks(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(externalLinks).where(eq(externalLinks.nomineeId, nomineeId));
}

export async function insertExternalLink(data: InsertExternalLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(externalLinks).values(data);
}

// ─── Seed rich data ───────────────────────────────────────────────────────────

// ─── Tweets ────────────────────────────────────────────────────────────────

export async function listNomineeTweets(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(nomineeTweets)
    .where(eq(nomineeTweets.nomineeId, nomineeId))
    .orderBy(desc(nomineeTweets.createdAt));
}

export async function insertNomineeTweet(data: InsertNomineeTweet) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(nomineeTweets).values(data);
}

// ─── Reddit Posts ────────────────────────────────────────────────────────────

export async function listNomineeRedditPosts(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(nomineeRedditPosts)
    .where(eq(nomineeRedditPosts.nomineeId, nomineeId))
    .orderBy(desc(nomineeRedditPosts.createdAt));
}

export async function insertNomineeRedditPost(data: InsertNomineeRedditPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(nomineeRedditPosts).values(data);
}

// ─── Kick Clips ──────────────────────────────────────────────────────────────

export async function listNomineeKickClips(nomineeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(nomineeKickClips)
    .where(eq(nomineeKickClips.nomineeId, nomineeId))
    .orderBy(desc(nomineeKickClips.createdAt));
}

export async function insertNomineeKickClip(data: InsertNomineeKickClip) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(nomineeKickClips).values(data);
}

// ─── Seed rich data ───────────────────────────────────────────────────────────

export async function seedRichData() {
  const db = await getDb();
  if (!db) return;

  // Check if already seeded
  const existing = await db.select({ id: externalLinks.id }).from(externalLinks).limit(1);
  if (existing.length > 0) return;

  // Seed external links for each nominee
  const links = [
    { nomineeId: 1, label: "Know Your Meme", url: "https://knowyourmeme.com/memes/darksydephil" },
    { nomineeId: 2, label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ice_Poseidon" },
    { nomineeId: 3, label: "Know Your Meme", url: "https://knowyourmeme.com/people/onision" },
    { nomineeId: 4, label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Chris_Chan" },
    { nomineeId: 5, label: "Know Your Meme", url: "https://knowyourmeme.com/people/keemstar" },
  ];

  for (const link of links) {
    await db.insert(externalLinks).values(link);
  }

  // Seed controversies
  const controversies_data = [
    {
      nomineeId: 1,
      title: "Controller Throwing Incident",
      description: "DSP throws controller during stream, blames it on lag.",
      date: "2015-03-20",
      severity: "minor" as const,
      sourceUrl: "https://youtube.com/watch?v=example",
    },
    {
      nomineeId: 1,
      title: "Patreon Meltdown",
      description: "DSP rants about Patreon supporters not donating enough.",
      date: "2018-07-15",
      severity: "moderate" as const,
      sourceUrl: "https://youtube.com/watch?v=example",
    },
    {
      nomineeId: 2,
      title: "Banned from Twitch",
      description: "Ice Poseidon banned from Twitch multiple times for TOS violations.",
      date: "2017-12-10",
      severity: "major" as const,
      sourceUrl: "https://youtube.com/watch?v=example",
    },
  ];

  for (const c of controversies_data) {
    await db.insert(controversies).values(c);
  }

  // Seed notable moments
  const moments_data = [
    {
      nomineeId: 1,
      title: "The Legendary Rage Quit",
      description: "DSP's most iconic controller throw moment.",
      videoUrl: "https://www.youtube.com/embed/example",
      timestamp: "2015-03-20",
    },
    {
      nomineeId: 2,
      title: "First IRL Stream",
      description: "Ice Poseidon's pioneering IRL streaming moment.",
      videoUrl: "https://www.youtube.com/embed/example",
      timestamp: "2015-08-10",
    },
  ];

  for (const m of moments_data) {
    await db.insert(notableMoments).values(m);
  }
}
