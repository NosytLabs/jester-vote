# 🎪 Jester-Vote

**The Court of Fools** — Where the biggest jesters of streaming are crowned by the people.

A real-time voting platform for ranking streamers based on their lolcow/jester behavior. Built with React, Express, and tRPC.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🗳️ **Real-time Voting** — Up/down votes with live SSE updates
- 🎴 **Baseball Cards** — Holographic profile cards for each nominee
- 🏆 **Leaderboard** — Top 3 podium with gold/silver/bronze styling
- 🔐 **Multi-Platform OAuth** — Login with Twitch, YouTube, or Kick
- 📊 **Vote History** — Weekly and all-time rankings
- 💬 **Comments** — Community reactions on each nominee
- 🔥 **Controversy Tracking** — Document notable moments and drama

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/FrankieMolt/jester-vote.git
cd jester-vote

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your OAuth credentials

# Run database migrations
pnpm run db:migrate

# Seed the database
pnpm run db:seed

# Start development server
pnpm run dev
```

## 🔐 OAuth Setup

### Kick (Recommended)
1. Go to https://kick.com/developer/apps
2. Create a new app
3. Set callback URL: `http://localhost:3000/api/oauth/callback`
4. Copy Client ID and Secret to `.env`

### Twitch
1. Go to https://dev.twitch.tv/console/apps
2. Create a new app
3. Set callback URL: `http://localhost:3000/api/oauth/callback`
4. Copy Client ID and Secret to `.env`

### YouTube (Google)
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 credentials
3. Set callback URL: `http://localhost:3000/api/oauth/callback`
4. Enable YouTube Data API v3
5. Copy Client ID and Secret to `.env`

## 🏗️ Architecture

```
jester-vote/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utilities
│   └── public/          # Static assets
├── server/          # Express backend
│   ├── _core/        # Core modules
│   ├── db.ts         # Database functions
│   └── routers.ts    # tRPC routers
├── drizzle/         # Database schema
└── dist/            # Build output
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express, tRPC, MySQL (Drizzle ORM)
- **Auth**: Multi-platform OAuth (Twitch, YouTube, Kick)
- **Real-time**: Server-Sent Events (SSE)
- **Build**: Vite, esbuild

## 📝 Available Scripts

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run start      # Start production server
pnpm run typecheck  # Run TypeScript checks
pnpm run db:migrate # Run database migrations
pnpm run db:seed    # Seed database with nominees
```

## 🎭 Featured Streamers

The platform tracks 20+ streamers including:

- **Classic Lolcows**: DSP, Boogie2988, Wings of Redemption, Chris Chan
- **Modern Controversies**: Adin Ross, N3on, TrainwrecksTV, xQc, Sneako
- **Rising Stars**: Kai Cenat, IShowSpeed, Nickmercs, BruceDropEmOff

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checks
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

*Not affiliated with ip2.network — Unique jester-themed ranking platform*
