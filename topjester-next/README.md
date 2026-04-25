# TopJester / jester-vote.com

A modern Next.js 15 application for [jester-vote.com](https://jester-vote.com) — the Court of Fools, a community-driven ranking site for internet lolcows and streaming jesters.

## 🎯 What is This?

TopJester lets users vote on the biggest lolcows (infamous internet personalities known for entertaining dysfunction) from platforms like Twitch, Kick, YouTube, and more.

- **Live leaderboard** with upvote/downvote scoring
- **Category browsing** (Gaming, IRL, YouTube Drama, Legendary, etc.)
- **User submissions** for new nominees
- **OAuth login** via Kick, Twitch, or YouTube (coming soon)

## 🚀 Tech Stack

- **Next.js 15** with App Router and server-side rendering
- **MySQL** via Drizzle ORM
- **Tailwind CSS v4** with custom jester/court theme
- **Radix UI** + Lucide icons
- **TypeScript** throughout

## 🌟 Features

- **Server-Side Rendering (SSR)** — Better SEO and initial page load
- **Live Leaderboard** — Real-time ranking with upvote/downvote scoring
- **Category System** — Gaming, IRL, YouTube Drama, Legendary, Mental Health
- **User Submissions** — Submit new nominees for community review
- **Responsive Design** — Mobile-first with hamburger menu
- **SEO Optimized** — Dynamic metadata, sitemap, robots.txt, JSON-LD structured data
- **Security Headers** — CSP, HSTS, X-Frame-Options, and more via next.config.ts
- **Accessibility** — ARIA labels, keyboard navigation, focus states
- **Dark Mode** — Full dark theme with custom jester/court palette

## 📁 Project Structure

```
topjester-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/trpc/[trpc]/    # tRPC API endpoint
│   │   ├── about/              # About page
│   │   ├── leaderboard/        # Leaderboard page
│   │   ├── login/              # Login page
│   │   ├── page.tsx            # Homepage (SSR)
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Tailwind styles
│   │   ├── robots.ts           # Robots config
│   │   └── sitemap.ts          # Dynamic sitemap
│   ├── components/
│   │   ├── Header.tsx          # Navigation with mobile menu
│   │   └── Footer.tsx          # 4-column footer
│   └── lib/
│       ├── db/                 # Database setup
│       │   ├── index.ts        # MySQL connection
│       │   └── schema.ts       # Drizzle schema
│       └── trpc/               # tRPC setup
│           ├── trpc.ts         # Router definition
│           ├── context.ts      # Context creator
│           └── provider.tsx    # React provider
├── drizzle.config.ts           # Drizzle Kit config
├── next.config.ts              # Next.js config
└── .env.local                  # Environment variables
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

3. **Run database migrations:**
   ```bash
   npm run db:push
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📊 Expected SEO Score

| Category | Expected Score |
|----------|---------------|
| Performance | 85+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 85+ |
| **Overall** | **75-85** |

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

```env
# Database
DATABASE_URL=mysql://user:pass@host:3306/topjester

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=random-secret-key

# OAuth (optional)
KICK_CLIENT_ID=your-kick-client-id
KICK_CLIENT_SECRET=your-kick-secret
```

## 🔧 Database Schema

The schema is compatible with the parent project's MySQL database:

- `nominees` - Streamers/lolcows with vote counts
- `votes` - User votes (up/down) with week tracking
- `users` - OAuth users from Kick/Twitch/YouTube
- `comments` - User comments on nominees
- `notable_moments` - Key events/clips
- `controversies` - Documented controversies

## 📱 Mobile Features

- Hamburger menu with slide-out drawer
- Touch-friendly vote buttons
- Responsive grid layouts
- Body scroll lock when menu open
- Escape key to close menu

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Focus visible indicators
- Keyboard navigation support
- Screen reader friendly

## 🎨 Styling

- Tailwind CSS v4
- Custom jester theme colors
- CSS variables for theming
- Gradient text effects
- Animated transitions

## 📝 License

MIT - Same as parent project
