# Next.js Migration Plan for TopJester

## Goal
Migrate from React SPA (Vite) + Express to Next.js 14+ with App Router for SSR and better SEO.

## Current Stack
- **Frontend:** React 19 + Vite + TailwindCSS
- **Backend:** Express + tRPC + SQLite (Drizzle ORM)
- **Auth:** Custom OAuth (Kick, Twitch, YouTube)
- **Build:** Vite + esbuild

## Target Stack
- **Framework:** Next.js 14+ (App Router)
- **Database:** PostgreSQL (Neon/Supabase) - SQLite not recommended for serverless
- **Auth:** NextAuth.js (replaces custom OAuth)
- **ORM:** Drizzle ORM (keep)
- **Styling:** TailwindCSS (keep)
- **UI:** shadcn/ui (already using Radix)

## Migration Phases

### Phase 1: Setup (Iteration 1)
- [ ] Create new Next.js project with shadcn/ui
- [ ] Configure TailwindCSS, TypeScript
- [ ] Install shadcn components
- [ ] Setup Drizzle ORM with PostgreSQL

### Phase 2: Database Migration (Iteration 2)
- [ ] Convert SQLite schema to PostgreSQL
- [ ] Update Drizzle config
- [ ] Migrate seed data
- [ ] Test database connection

### Phase 3: Auth Migration (Iteration 3)
- [ ] Setup NextAuth.js
- [ ] Configure Kick OAuth provider
- [ ] Configure Twitch OAuth provider
- [ ] Configure YouTube OAuth provider
- [ ] Migrate user session logic

### Phase 4: Page Migration (Iterations 4-8)
- [ ] Migrate Home page (/)
- [ ] Migrate Leaderboard page
- [ ] Migrate Nominee detail pages
- [ ] Migrate About page
- [ ] Migrate Login page
- [ ] Migrate Admin page

### Phase 5: API Routes (Iteration 9)
- [ ] Convert Express routes to Next.js API routes
- [ ] Migrate tRPC setup
- [ ] Migrate voting endpoints
- [ ] Migrate admin endpoints

### Phase 6: SEO & Performance (Iteration 10)
- [ ] Add dynamic metadata for each page
- [ ] Add OpenGraph tags
- [ ] Generate sitemap
- [ ] Add robots.txt
- [ ] Configure image optimization

### Phase 7: Testing & Deployment (Iteration 11)
- [ ] Run typecheck
- [ ] Run build
- [ ] Test all routes
- [ ] Deploy to Vercel

## File Structure

```
topjester-next/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx                 # Home
│   │   ├── leaderboard/page.tsx     # Leaderboard
│   │   ├── nominee/[id]/page.tsx    # Nominee detail
│   │   ├── about/page.tsx           # About
│   │   ├── login/page.tsx           # Login
│   │   └── admin/page.tsx           # Admin
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── trpc/[trpc]/route.ts
│   │   └── vote/route.ts
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # shadcn components
│   ├── LiveLeaderboard.tsx
│   ├── BaseballCard.tsx
│   └── ...
├── lib/
│   ├── db/                          # Drizzle ORM
│   ├── auth.ts                      # NextAuth config
│   └── trpc/                        # tRPC setup
├── public/                          # Static assets
├── drizzle/
│   └── schema.ts                    # Database schema
└── next.config.js
```

## Backpressure Gates
- TypeScript: `tsc --noEmit` must pass
- Build: `next build` must succeed
- Lint: `next lint` must pass

## Risks
- Database migration from SQLite to PostgreSQL
- OAuth provider configuration complexity
- tRPC integration with Next.js App Router
- Session management changes

## Success Criteria
- [ ] All pages render with SSR
- [ ] Dynamic meta tags work per page
- [ ] 75+ audit score achievable
- [ ] All 46 lolcows migrated
- [ ] Voting system works
- [ ] Admin dashboard works
