# Phase 3: Profile Page Enhancements Spec

## Overview
Transform nominee profile pages into rich, engaging destinations with timeline visualization, embedded media, and community content.

## Acceptance Criteria

### Profile Page Sections (in order)
1. **Hero Section** (existing) - Avatar, name, vote buttons, rank
2. **The Arc Timeline** (NEW) - Visual timeline combining notable moments + controversies
3. **Notable Clips** (NEW) - Grid of embedded videos from Twitch/Kick/YouTube
4. **Controversies** (NEW) - Documented incidents with severity badges and dates
5. **Recent News** (NEW) - Community-submitted updates (approved only)
6. **External Links** (NEW) - Know Your Meme, Wikipedia, social media
7. **Comments** (existing) - Community discussion

### The Arc Timeline Component
- [ ] Vertical timeline layout (left line, right content)
- [ ] Combined view of moments (positive) and controversies (negative)
- [ ] Color coding: Green for moments, Red for controversies
- [ ] Date markers with relative time ("2 years ago")
- [ ] Expandable cards showing full description
- [ ] Click to scroll to full section

### Notable Clips Section
- [ ] Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Lazy-loaded iframes for performance
- [ ] Clip cards with: thumbnail (if available), title, platform icon, date
- [ ] Support Twitch clips, Kick clips, YouTube videos
- [ ] "Add Clip" button for authenticated users (opens modal)

### Controversies Section
- [ ] List view with severity badges
- [ ] Badge colors: minor (yellow), moderate (orange), major (red)
- [ ] Date display with relative time
- [ ] Expandable description
- [ ] Source link (if available)
- [ ] "Add Controversy" button (admin only)

### News Section
- [ ] Feed layout newest first
- [ ] Approval badge for pending items (admin view)
- [ ] Source link display
- [ ] "Submit News" button for authenticated users
- [ ] "Approve/Reject" buttons for admin

### External Links Section
- [ ] Grid of link cards with platform icons
- [ ] Supported platforms: Know Your Meme, Wikipedia, Twitter/X, Reddit, Discord, Kick, Twitch, YouTube
- [ ] Auto-detect platform from URL for icon selection
- [ ] "Add Link" button for authenticated users

## Technical Requirements
- Use existing `recharts` for timeline visualization
- Use `framer-motion` for smooth section animations
- Use `lucide-react` for icons
- All sections collapsible/expandable
- Deep linking to specific sections via URL hash

## Data Requirements
- Requires Phase 2 backend endpoints to be complete
- Requires populated data for seed nominees
