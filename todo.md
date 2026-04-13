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
