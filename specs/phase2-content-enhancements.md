# Phase 2: Content & Research Enhancements Spec

## Overview
Extend jester-vote with rich content features based on research data from Twitch API, IP2 Network, and streaming culture sources.

## Database Schema Extensions (Already Exists)
Tables already in schema:
- `notableMoments` - Clips and video embeds
- `controversies` - Documented incidents with severity
- `newsItems` - Community updates and news
- `externalLinks` - Know Your Meme, Wikipedia, etc.

## Acceptance Criteria

### Backend Endpoints
- [ ] `nominees.getRichProfile` - Returns nominee with all related data (moments, controversies, news, links)
- [ ] `nominees.addNotableMoment` - Admin/submitter adds clip (YouTube/Kick embed URL)
- [ ] `nominees.addControversy` - Admin adds documented incident
- [ ] `nominees.addNewsItem` - Community submits news (requires approval)
- [ ] `nominees.addExternalLink` - Add KYM, Wikipedia, etc.

### Frontend Components
- [ ] `NotableClipsSection` - Grid of embedded Twitch/Kick/YouTube clips
- [ ] `ControversiesSection` - Timeline of documented incidents with severity badges
- [ ] `NewsSection` - Community news feed with approval status
- [ ] `ExternalLinksSection` - Links to KYM, Wikipedia, socials
- [ ] `TheArcTimeline` - Visual timeline combining moments + controversies

### Data Population
- [ ] Populate all 10 seed nominees with real Twitch/IP2 streamer data
- [ ] Add real clips from xQc, Kai Cenat, IShowSpeed, Mizkif, Trainwreckstv
- [ ] Add known controversies for each streamer
- [ ] Add external links to KYM pages where available

## Technical Requirements
- Use Twitch clip embed: `https://clips.twitch.tv/embed?clip=<SLUG>&parent=<DOMAIN>`
- Use Kick embed format (research needed)
- Use YouTube embed: `https://www.youtube.com/embed/<VIDEO_ID>`
- Severity badges: minor (yellow), moderate (orange), major (red)
- Responsive grid for clips (1 col mobile, 2 col tablet, 3 col desktop)

## Research Data Available
- Twitch API: OAuth flows, clip embeds, top streamers (xQc, Kai Cenat, IShowSpeed, Mizkif, Trainwreckstv)
- IP2 Network: Aggregates YouTube, Twitch, Kick, Rumble, DLive streamers
- Lolcow culture: Drama-driven, high engagement, controversial content
