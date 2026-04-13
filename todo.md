# JesterVote - TODO

## Database & Backend
- [x] Schema: nominees table (id, name, description, imageUrl, status, submittedBy, createdAt)
- [x] Schema: votes table (id, nomineeId, userId, voteType, weekKey, createdAt)
- [x] Schema: comments table (id, nomineeId, userId, content, createdAt)
- [x] Run migration and apply SQL
- [x] Kick OAuth integration (swap Manus OAuth for Kick OAuth)
- [x] tRPC: nominees.list (public, with weekly/alltime toggle)
- [x] tRPC: nominees.getById (public, with vote history)
- [x] tRPC: nominees.submit (protected, creates pending nominee)
- [x] tRPC: nominees.approve / nominees.reject (admin only)
- [x] tRPC: votes.cast (protected, upvote/downvote, one per user per nominee)
- [x] tRPC: votes.getUserVotes (protected, returns user's vote map)
- [x] tRPC: comments.list (public)
- [x] tRPC: comments.add (protected)
- [x] tRPC: admin.pendingNominees (admin only)

## Frontend Pages & Components
- [x] Global dark theme: black bg, purple header, green dashed borders (index.css)
- [x] App.tsx: routes for /, /nominee/:id, /submit, /admin
- [x] Header component: logo, nav links, Kick login button / user avatar
- [x] Home page: leaderboard with weekly/alltime toggle
- [x] LeaderboardCard component: rank #, avatar, name, description, upvote/downvote buttons, vote count
- [x] Nominee profile page: bio, vote history chart (recharts), comments section
- [x] Submit nominee form page (protected)
- [x] Admin panel page (admin only): pending nominees list with approve/reject buttons
- [x] Login gate: redirect unauthenticated users when they try to vote or submit

## Polish & Testing
- [x] Seed 10 default nominees for demo
- [x] Vitest: votes.cast one-per-user enforcement
- [x] Vitest: admin approve/reject procedure
- [x] Responsive design check
- [x] Final checkpoint and delivery


## Phase 2: Content & Research Enhancements
- [ ] Research top lolcows and jester culture (DONE - see research_findings.md)
- [ ] Extend database schema: add notableMoments, controversies, newsItems, externalLinks tables
- [ ] Create backend endpoints for rich profile data (timeline, clips, news)
- [ ] Populate all 10 nominees with real data: arcs, descriptions, links
- [ ] Add YouTube/Kick embed support for clips
- [ ] Build timeline/arc visualization component

## Phase 3: Profile Page Enhancements
- [ ] Add "The Arc" timeline section to nominee profiles
- [ ] Add "Notable Clips" section with embedded videos
- [ ] Add "Recent News" section with community updates
- [ ] Add "Controversies" section with documented incidents
- [ ] Add "Know Your Meme" and external links
- [ ] Add community evidence submission form
- [ ] Add prediction/discussion section

## Phase 4: Social Sharing & Virality
- [ ] Add Twitter/X share button
- [ ] Add Reddit share button
- [ ] Add Discord share button
- [ ] Add TikTok share button
- [ ] Create shareable nominee cards with custom images
- [ ] Build embed widget for other sites
- [ ] Add "Weekly Jester" banner and share feature
- [ ] Add trending/upset alerts

## Phase 5: UI/UX Improvements
- [ ] Improve mobile responsiveness (stacked cards, touch-friendly)
- [ ] Add animated rank transitions
- [ ] Add trending/controversial badges
- [ ] Improve typography and readability
- [ ] Add search and filter functionality
- [ ] Optimize header and navigation
- [ ] Add loading states and skeleton screens
- [ ] Test on mobile, tablet, desktop

## Phase 6: Final Polish & Testing
- [ ] Populate all nominees with rich data
- [ ] Test all social sharing features
- [ ] Test embeds and clips
- [ ] Mobile QA across devices
- [ ] Performance optimization
- [ ] Final checkpoint and delivery
