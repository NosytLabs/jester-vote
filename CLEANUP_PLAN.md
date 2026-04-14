# TopJester Site Cleanup Plan

## Current Status
- **54 LOLCOWS** in database
- **Build:** ✅ Passing
- **Next.js Migration:** Phase 1-2 Complete

## Cleanup Tasks

### 1. Code Quality
- [ ] Remove unused imports
- [ ] Fix TypeScript warnings
- [ ] Optimize bundle size (chunks >500KB)
- [ ] Add error boundaries
- [ ] Improve loading states

### 2. SEO Optimization
- [ ] Add dynamic meta tags per page (react-helmet-async)
- [ ] Create OpenGraph images
- [ ] Verify sitemap.xml accuracy
- [ ] Add structured data for all 54 lolcows
- [ ] Implement SSR for crawlability

### 3. Performance
- [ ] Code split large components
- [ ] Optimize images
- [ ] Add lazy loading
- [ ] Implement service worker
- [ ] Add caching strategies

### 4. Security
- [ ] Verify security headers in production
- [ ] Add CSP policy
- [ ] Sanitize user inputs
- [ ] Rate limiting on API

### 5. Accessibility
- [ ] Verify all images have alt text
- [ ] Check color contrast
- [ ] Test keyboard navigation
- [ ] Add ARIA labels

### 6. Content
- [ ] Verify all 54 lolcows have accurate info
- [ ] Add real clip URLs
- [ ] Update outdated information
- [ ] Add verification badges

### 7. Next.js Migration
- [ ] Complete database setup
- [ ] Migrate all components
- [ ] Implement voting system
- [ ] Add authentication
- [ ] Deploy to Vercel

## Priority Order
1. **HIGH:** Next.js migration (fixes SPA crawlability)
2. **HIGH:** Dynamic meta tags
3. **MEDIUM:** Bundle optimization
4. **MEDIUM:** Security headers verification
5. **LOW:** Content updates

## Success Criteria
- [ ] 75+ audit score
- [ ] All pages crawlable
- [ ] <3s load time
- [ ] No console errors
- [ ] All 54 lolcows visible
