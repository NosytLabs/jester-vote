# Jester Vote

> Voting interface and ranking system for [topjester.com](https://topjester.com) — rank your favourite Twitch, YouTube, and Kick streamers.

## What it does

- **Streamer rankings** — community-driven leaderboards across Twitch, YouTube, and Kick
- **OAuth login** — sign in with your Twitch, YouTube, or Kick account
- **Real-time stats** — vote counts, rank changes, trending streamers
- **Two frontends** — Vite/React app (`/`) and Next.js app (`/topjester-next`)

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite 7, Tailwind CSS 4, Radix UI, Framer Motion |
| API | Express, tRPC, Zod |
| Database | MySQL + Drizzle ORM |
| Auth | Twitch / YouTube / Kick OAuth2 |
| Storage | AWS S3 (presigned uploads) |
| Testing | Vitest |

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy env config
cp .env.example .env
# Fill in DATABASE_URL, OAuth credentials, etc.

# Push DB schema
pnpm db:push

# Seed sample data
pnpm seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Production build (client + server) |
| `pnpm start` | Start production server |
| `pnpm test` | Run Vitest tests |
| `pnpm typecheck` | TypeScript check |
| `pnpm format` | Prettier format |
| `pnpm db:push` | Generate + migrate DB schema |
| `pnpm seed` | Seed database with sample data |

## Environment Variables

See [`.env.example`](.env.example) for all required variables. Key ones:

```env
DATABASE_URL=mysql://user:password@localhost:3306/jestervote
TWITCH_CLIENT_ID=...
TWITCH_CLIENT_SECRET=...
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
KICK_CLIENT_ID=...
KICK_CLIENT_SECRET=...
JWT_SECRET=...
```

## Project Structure

```
jester-vote/
├── client/          # Vite + React frontend
├── server/          # Express + tRPC backend
├── shared/          # Shared types and schemas
├── drizzle/         # DB migrations
├── topjester-next/  # Next.js frontend (alternate)
└── specs/           # Feature specs
```

## License

MIT
