# TopJester Next.js Migration

A modern Next.js 16 application with server-side rendering, tRPC API, and MySQL database integration.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Better SEO and initial page load
- **tRPC API** - Type-safe API routes
- **MySQL Database** - Via Drizzle ORM (compatible with parent project)
- **Responsive Design** - Mobile-first with hamburger menu
- **SEO Optimized** - Dynamic metadata, sitemap, robots.txt
- **Accessibility** - ARIA labels, keyboard navigation, focus states

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
