import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'topjester.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS nominees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    platform TEXT NOT NULL,
    category TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT,
    upvotes INTEGER DEFAULT 0 NOT NULL,
    downvotes INTEGER DEFAULT 0 NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL,
    status TEXT DEFAULT 'approved' NOT NULL,
    submitted_by_user_id INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominee_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    vote_type TEXT NOT NULL,
    week_key TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    open_id TEXT NOT NULL UNIQUE,
    email TEXT,
    name TEXT,
    kick_username TEXT,
    kick_avatar_url TEXT,
    login_method TEXT,
    role TEXT DEFAULT 'user' NOT NULL,
    last_signed_in INTEGER,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominee_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notable_moments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominee_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT,
    type TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS controversies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominee_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT,
    severity TEXT NOT NULL
  );
`);

const now = Date.now();

const sampleNominees = [
  {
    name: 'DSP',
    platform: 'Twitch',
    category: 'Gaming',
    bio: 'Digital Satan: The legendary rage-quitter who taught an entire generation about gaming hospitality. His famous "skill issues" and tantrums made him one of the most documented cases of streamer meltdown in history.',
    upvotes: 8500,
    downvotes: 234,
    score: 8266,
  },
  {
    name: 'WingsOfRedemption',
    platform: 'Twitch',
    category: 'Gaming',
    bio: 'Wings became infamous for his endless Feardraft saga, where he claimed to have killed a fictional character named Pepe Silvia. His complete lack of self-awareness and inability to accept reality made him a prime lolcow.',
    upvotes: 7200,
    downvotes: 156,
    score: 7044,
  },
  {
    name: 'Ice Poseidon',
    platform: 'Twitch',
    category: 'IRL Streamers',
    bio: 'The pioneer of IRL streaming who brought the chaos to the streets. From getting SWATted multiple times to building a cult following, Ice defined a generation of chaotic content creators.',
    upvotes: 6100,
    downvotes: 312,
    score: 5788,
  },
  {
    name: 'Adin Ross',
    platform: 'Kick',
    category: 'Modern Streamers',
    bio: 'The crown prince of controversy. From racist rants to relationship drama, Adin has become the face of modern Kick drama with his endless stream of scandals and tantrums.',
    upvotes: 8900,
    downvotes: 1890,
    score: 7010,
  },
  {
    name: 'N3ON',
    platform: 'Kick',
    category: 'Modern Streamers',
    bio: 'A walking contradiction who somehow became one of the most watched streamers while being permanently banned from every platform. His legacy of lies and manipulation continues.',
    upvotes: 5400,
    downvotes: 890,
    score: 4510,
  },
  {
    name: 'Trainwreck',
    platform: 'Kick',
    category: 'Gambling',
    bio: 'The gambling king who introduced slots to Twitch, then moved to Kick where his Stake sponsorship made him millions while ruining countless viewers lives.',
    upvotes: 4200,
    downvotes: 2100,
    score: 2100,
  },
  {
    name: 'XQC',
    platform: 'Twitch',
    category: 'Gaming',
    bio: 'The chat bot who became the ultimate normie streamer. His inability to play any game without rage teamed with his ego made him a prime target for roasting.',
    upvotes: 3800,
    downvotes: 1200,
    score: 2600,
  },
  {
    name: 'Mizkif',
    platform: 'Twitch',
    category: 'Gaming',
    bio: 'From the Light eyemaster to alleged assault cover-ups, Mizkif has had one of the most dramatic falls from grace in streaming history.',
    upvotes: 3100,
    downvotes: 890,
    score: 2210,
  },
  {
    name: 'Hasanabi',
    platform: 'Twitch',
    category: 'Political',
    bio: 'The "bread tuber" who proved that you can be wrong about everything and still have fans. His predictions aged like milk and his ego knows no bounds.',
    upvotes: 1500,
    downvotes: 3400,
    score: -1900,
  },
  {
    name: 'Destiny',
    platform: 'Twitch',
    category: 'Political',
    bio: 'The debate lord who eats his own viewers. His legendary screeching matches and inability to hold a conversation made him a fan favorite.',
    upvotes: 2800,
    downvotes: 1100,
    score: 1700,
  },
  {
    name: 'Amouranth',
    platform: 'Twitch',
    category: 'IRL Streamers',
    bio: 'The ASMR queen who proved you can monetize simps while being married. Her husband Kiki became a legend in his own right.',
    upvotes: 12000,
    downvotes: 4500,
    score: 7500,
  },
  {
    name: 'TimTheTatMan',
    platform: 'Twitch',
    category: 'Gaming',
    bio: 'The man who got banned for saying "nigga" on his private stream and then tried to make a comeback. A tale of ego and poor decisions.',
    upvotes: 1100,
    downvotes: 2300,
    score: -1200,
  },
];

const insertNom = db.prepare(`
  INSERT OR IGNORE INTO nominees (name, platform, category, bio, upvotes, downvotes, score, status, created_at, updated_at)
  VALUES (@name, @platform, @category, @bio, @upvotes, @downvotes, @score, 'approved', @created_at, @updated_at)
`);

for (const nom of sampleNominees) {
  insertNom.run({ ...nom, created_at: now, updated_at: now });
}

console.log(`✓ Seeded ${sampleNominees.length} sample nominees`);
console.log(`✓ Database ready at: ${dbPath}`);

db.close();