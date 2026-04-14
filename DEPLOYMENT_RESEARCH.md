# TopJester Deployment Research & Recommendations

## Current State
- **Stack:** React + Vite + Express + SQLite (SPA - Single Page Application)
- **Issue:** SPA structure prevents proper SEO/crawling (audit score capped)
- **Database:** 38 TRUE lolcows documented
- **Domain:** TopJester.com available ($13.82)

---

## Option 1: Migrate to Next.js (RECOMMENDED)

### Pros
- ✅ **Server-Side Rendering (SSR)** - Solves SPA crawlability issue
- ✅ **Dynamic Meta Tags** - Per-page SEO
- ✅ **API Routes** - Built-in backend (replace Express)
- ✅ **Image Optimization** - Automatic WebP/AVIF
- ✅ **Vercel/Coolify Deploy** - Easy deployment
- ✅ **React Server Components** - Better performance
- ✅ **File-based Routing** - Cleaner structure

### Cons
- ⚠️ Migration effort (2-3 days)
- ⚠️ Need to refactor routing
- ⚠️ SQLite → PostgreSQL recommended for production

### Migration Path
```
Current: React SPA (Vite) + Express API + SQLite
    ↓
Next.js 14+ with App Router
    ↓
- Pages: /app/route/page.tsx
- API: /app/api/route/route.ts
- Database: PostgreSQL (via Drizzle ORM)
- Auth: NextAuth.js (replaces custom OAuth)
- Deploy: Vercel (free) or Coolify (self-hosted)
```

### Effort Estimate
- **Migration:** 2-3 days
- **Testing:** 1 day
- **Deploy:** 1 day
- **Total:** 4-5 days

---

## Option 2: Keep React + Add Prerendering

### Pros
- ✅ **Less effort** (1-2 days)
- ✅ **Keep current stack**
- ✅ **react-snap or prerender.io**

### Cons
- ⚠️ Still SPA under the hood
- ⚠️ Dynamic content issues
- ⚠️ Limited SEO improvement

### Tools
- `react-snap` - Prerender to static HTML
- `prerender.io` - Service-based prerendering
- `vite-plugin-ssr` - Vite SSR plugin

---

## Option 3: Coolify Deployment (Current Method)

### Pros
- ✅ **Self-hosted** - Full control
- ✅ **Docker-based** - Consistent
- ✅ **Free** (use your own hardware)
- ✅ **Traefik proxy** - Automatic SSL
- ✅ **Already working** for lethometry.com

### Cons
- ⚠️ **OOM Issues** - Coolify builds can fail on low RAM
- ⚠️ **Manual intervention** sometimes needed
- ⚠️ **Status mismatch** - Manual containers show as "exited"

### Coolify Deployment Methods

#### A. Docker Image (RECOMMENDED for TopJester)
```bash
# Build locally
docker build -t topjester:latest .

# Push to registry
docker tag topjester:latest ghcr.io/frankiemolt/topjester:latest
docker push ghcr.io/frankiemolt/topjester:latest

# Deploy via Coolify API
curl -X POST "http://localhost:8000/api/v1/applications/dockerimage" \
  -H "Authorization: Bearer $COOLIFY_TOKEN" \
  -d '{
    "project_uuid": "...",
    "docker_registry_image_name": "ghcr.io/frankiemolt/topjester",
    "docker_registry_image_tag": "latest",
    "name": "topjester",
    "domains": "https://topjester.com",
    "ports_exposes": "3000"
  }'
```

#### B. Git-based (Problematic)
- Requires GitHub App authentication
- Can fail on private repos
- OOM issues during build

---

## Option 4: WordPress (NOT RECOMMENDED)

### Pros
- ✅ Easy content management
- ✅ Plugins for everything
- ✅ Familiar to many users

### Cons
- ❌ **Wrong for this use case** - TopJester is a voting app, not a blog
- ❌ **Performance** - PHP + MySQL slower than Node.js
- ❌ **Custom features hard** - Voting system, OAuth, real-time
- ❌ **Overkill** - Simple site doesn't need CMS

### Verdict: Skip WordPress

---

## Option 5: Static Site + Serverless Functions

### Pros
- ✅ **Astro + Vercel** - Fast, modern
- ✅ **Partial hydration** - Islands architecture
- ✅ **Serverless API** - Vercel/Netlify Functions

### Cons
- ⚠️ Learning curve (Astro syntax)
- ⚠️ Migration effort similar to Next.js

---

## 🎯 RECOMMENDED APPROACH

### Phase 1: Quick Win (Deploy Now)
**Keep current stack, deploy via Coolify Docker Image**
- Register TopJester.com
- Build Docker image locally
- Push to GHCR
- Deploy via Coolify
- **Timeline:** 1 day
- **Result:** Live site, but SPA limitations remain

### Phase 2: SEO Fix (Next 2 weeks)
**Migrate to Next.js for proper SSR**
- Rewrite in Next.js 14+ (App Router)
- Migrate SQLite → PostgreSQL
- Keep Drizzle ORM
- Deploy to Vercel (primary) + Coolify (backup)
- **Timeline:** 1 week
- **Result:** 75+ audit score, full SEO

---

## Tech Stack Comparison

| Feature | React SPA | Next.js | WordPress | Astro |
|---------|-----------|---------|-----------|-------|
| SSR | ❌ | ✅ | ✅ | ✅ |
| SEO | ❌ | ✅ | ✅ | ✅ |
| Performance | ⚠️ | ✅ | ⚠️ | ✅ |
| Voting System | Custom | Custom | Plugin | Custom |
| OAuth | Custom | NextAuth | Plugin | Custom |
| Deploy Ease | ✅ | ✅ | ✅ | ✅ |
| Migration Effort | - | Medium | High | Medium |
| **Score** | 5/10 | **9/10** | 4/10 | 8/10 |

---

## Deployment Decision Matrix

| Priority | Option | Best For |
|----------|--------|----------|
| **Speed** | Coolify Docker | Deploy today |
| **SEO** | Next.js + Vercel | Long-term success |
| **Control** | Coolify Self-hosted | Data sovereignty |
| **Ease** | Vercel | Zero maintenance |

---

## My Recommendation

### Immediate (Today)
1. **Register TopJester.com** ($13.82)
2. **Build Docker image** locally
3. **Deploy via Coolify** (Docker image method)
4. **Site is live** with current SPA limitations

### Short-term (Next 2 weeks)
1. **Migrate to Next.js** for proper SSR
2. **Keep Coolify** as deployment target
3. **Achieve 75+ audit score**

### Why Not WordPress?
TopJester is an interactive voting application with:
- Real-time voting
- OAuth authentication
- Dynamic leaderboards
- User submissions

WordPress is designed for content sites (blogs, portfolios), not interactive applications.

---

## Next Steps

**Want me to:**
1. **Deploy now** with Coolify Docker method? (1 day)
2. **Start Next.js migration**? (1 week)
3. **Both** - deploy now, migrate later?

**Your call!**
