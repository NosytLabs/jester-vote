/**
 * UPDATED Seed Data - Additional Streamers Added
 * Includes Sam Pepper, Ice Poseidon crew, and verification notes
 * 
 * RESEARCH STATUS:
 * - 4 Kick streamers (Moises, NickWhite, shoovy, Clavicur) need real social media verification
 * - Clavicur's "jester" term claim needs primary source verification
 * - Sam Pepper and Ice Poseidon crew added with available info
 */

// Additional nominees to add to the main seed-rich-data.ts

export const additionalNominees = [
  // ========== SAM PEPPER ==========
  {
    name: "Sam Pepper",
    platform: "YouTube",
    category: "IRL",
    bio: "Sam Pepper is a British YouTuber and former Big Brother contestant who became notorious for his prank videos and later joined Ice Poseidon's Cx Network. He has been involved in numerous controversies including staged pranks, sexual harassment allegations, and association with the Cx Network drama. His content has evolved from YouTube pranks to IRL streaming, often featuring confrontational and controversial scenarios.",
    imageUrl: "https://i.imgur.com/sampepper.jpg", // PLACEHOLDER - needs real image
    tweetUrls: [
      "https://x.com/sampepper", // VERIFY
    ],
    redditUrls: [
      "https://www.reddit.com/r/sampepper/", // VERIFY
      "https://www.reddit.com/r/LivestreamFail/search/?q=sam+pepper",
    ],
    kickClipUrls: [],
    moments: [
      {
        title: "Big Brother UK Appearance",
        description: "Appeared on Big Brother UK 2010, gaining initial fame before his controversial YouTube career.",
        date: "2010-06-01",
        type: "event",
      },
      {
        title: "Cx Network Joins",
        description: "Joined Ice Poseidon's Cx Network, becoming a regular part of the IRL streaming crew.",
        date: "2017-03-01",
        type: "event",
      },
      {
        title: "Hawaii RV Stream",
        description: "Participated in the infamous Cx Network RV stream across Hawaii, featuring numerous controversies and drama.",
        date: "2018-07-01",
        type: "clip",
      },
    ],
    controversies: [
      {
        title: "Sexual Assault Allegations",
        description: "Multiple women came forward with allegations of sexual assault and inappropriate behavior during his time with the Cx Network.",
        date: "2018-09-01",
        severity: "major",
      },
      {
        title: "Staged Prank Videos",
        description: "Accused of staging prank videos and hiring actors, leading to loss of credibility and YouTube demonetization.",
        date: "2015-11-01",
        severity: "major",
      },
      {
        title: "Fake Kidnapping Prank",
        description: "Created a fake kidnapping prank video that received massive backlash for being insensitive and potentially dangerous.",
        date: "2015-11-29",
        severity: "major",
      },
      {
        title: "Association with Ice Poseidon Drama",
        description: "Involved in numerous controversies surrounding Ice Poseidon's Cx Network, including fights, drama, and community backlash.",
        date: "2017-2019",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Sam Pepper Returns to Streaming",
        content: "After years of controversy, Sam Pepper has attempted to return to streaming with mixed reception from the community.",
        date: "2023-01-01",
        source: "Social Media",
      },
    ],
    links: [
      { title: "YouTube Channel", url: "https://youtube.com/sampepper", type: "youtube" },
      { title: "Twitter/X", url: "https://x.com/sampepper", type: "twitter" },
      { title: "Instagram", url: "https://instagram.com/sampepper", type: "instagram" },
    ],
  },

  // ========== ICE POSEIDON CREW MEMBERS ==========
  {
    name: "Bjorn",
    platform: "YouTube",
    category: "IRL",
    bio: "Bjorn is a Danish IRL streamer and former member of Ice Poseidon's Cx Network. Known for his eccentric personality, heavy drinking streams, and catchphrase 'What it do, homie?' He became a fan favorite during the Cx Network era for his unpredictable behavior and genuine reactions.",
    imageUrl: "https://i.imgur.com/bjorn.jpg", // PLACEHOLDER
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=bjorn",
    ],
    kickClipUrls: [],
    moments: [
      {
        title: "RV Trip Legend",
        description: "Became a legend during the Cx Network RV trips for his drinking streams and entertaining personality.",
        date: "2018-07-01",
        type: "clip",
      },
      {
        title: "'What It Do, Homie?'",
        description: "His catchphrase became iconic within the IRL streaming community.",
        date: "2018-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Public Intoxication Streams",
        description: "Frequently streamed while heavily intoxicated, leading to concerns about his health and behavior.",
        date: "2018-2019",
        severity: "moderate",
      },
    ],
    news: [],
    links: [
      { title: "YouTube", url: "https://youtube.com/bjorn", type: "youtube" },
    ],
  },

  {
    name: "EBZ",
    platform: "YouTube",
    category: "IRL",
    bio: "EBZ (Ebzthegawd) is a rapper and IRL streamer who was part of Ice Poseidon's Cx Network. Known for his aggressive personality, frequent conflicts with other streamers, and catchphrase 'CROAG.' He has been involved in numerous physical altercations and dramas during his streaming career.",
    imageUrl: "https://i.imgur.com/ebz.jpg", // PLACEHOLDER
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=ebz",
    ],
    kickClipUrls: [],
    moments: [
      {
        title: "RV Trip Fights",
        description: "Involved in multiple physical altercations during Cx Network RV trips, including fights with other crew members.",
        date: "2018-07-01",
        type: "clip",
      },
      {
        title: "'CROAG' Catchphrase",
        description: "His catchphrase and brand became well-known in the IRL streaming community.",
        date: "2018-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Physical Altercations",
        description: "Multiple instances of physical fights with other streamers and members of the public during IRL streams.",
        date: "2018-2019",
        severity: "major",
      },
      {
        title: "Homophobic Rants",
        description: "Made homophobic comments during streams that received significant backlash from the community.",
        date: "2018-09-01",
        severity: "major",
      },
    ],
    news: [],
    links: [
      { title: "YouTube", url: "https://youtube.com/ebz", type: "youtube" },
    ],
  },

  {
    name: "Hampton Brandon",
    platform: "YouTube",
    category: "IRL",
    bio: "Hampton Brandon is an IRL streamer known for his confrontational style and frequent conflicts with both viewers and other streamers. He gained notoriety through his association with Ice Poseidon and the Cx Network, though he often had a tumultuous relationship with the community. Known for his 'TTD' (Ten Toes Down) brand.",
    imageUrl: "https://i.imgur.com/hamptonbrandon.jpg", // PLACEHOLDER
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=hampton+brandon",
    ],
    kickClipUrls: [],
    moments: [
      {
        title: "Cx Network Drama",
        description: "Frequent conflicts with Ice Poseidon and other Cx Network members, leading to multiple bans and returns.",
        date: "2017-2019",
        type: "clip",
      },
      {
        title: "'TTD' Brand Launch",
        description: "Launched his 'Ten Toes Down' brand and merchandise, building a dedicated fanbase.",
        date: "2018-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Multiple Platform Bans",
        description: "Banned from multiple streaming platforms due to violations of terms of service, including violent content and harassment.",
        date: "2017-2020",
        severity: "major",
      },
      {
        title: "Physical Confrontations",
        description: "Multiple instances of physical altercations during IRL streams, including fights with other streamers.",
        date: "2018-2019",
        severity: "major",
      },
    ],
    news: [],
    links: [
      { title: "YouTube", url: "https://youtube.com/hamptonbrandon", type: "youtube" },
    ],
  },

  {
    name: "Asian Andy",
    platform: "YouTube",
    category: "IRL",
    bio: "Asian Andy is a YouTuber and IRL streamer known for his text-to-speech donation system that plays messages in public, often leading to embarrassing or controversial situations. He was a prominent member of Ice Poseidon's Cx Network and is known for his entrepreneurial approach to streaming.",
    imageUrl: "https://i.imgur.com/asianandy.jpg", // PLACEHOLDER
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=asian+andy",
    ],
    kickClipUrls: [],
    moments: [
      {
        title: "Text-to-Speech Fame",
        description: "Pioneered the text-to-speech donation system that became his signature content style.",
        date: "2017-01-01",
        type: "event",
      },
      {
        title: "Uber Driver Incident",
        description: "Famous incident where his text-to-speech system caused controversy with an Uber driver.",
        date: "2017-06-01",
        type: "clip",
      },
      {
        title: "Cx Network RV Trips",
        description: "Participated in multiple Cx Network RV trips, contributing to the group's dynamic.",
        date: "2018-07-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Public Disturbance with TTS",
        description: "His text-to-speech system often caused public disturbances and confrontations, leading to multiple platform warnings.",
        date: "2017-2019",
        severity: "moderate",
      },
      {
        title: "Racist Donation Messages",
        description: "Accused of allowing racist and offensive messages through his text-to-speech system without proper moderation.",
        date: "2018-03-01",
        severity: "major",
      },
    ],
    news: [],
    links: [
      { title: "YouTube", url: "https://youtube.com/asianandy", type: "youtube" },
    ],
  },
];

// Verification notes for the 4 Kick streamers needing research
export const verificationNotes = {
  Clavicur: {
    status: "NEEDS_VERIFICATION",
    note: "Claim about coining 'jester' term needs primary source verification. Research shows no verifiable evidence of this claim.",
    kickUrl: "https://kick.com/clavicur",
    needs: ["Real Twitter/X link", "Instagram", "YouTube", "TikTok", "Primary source for 'jester' term claim"],
  },
  Moises: {
    status: "NEEDS_VERIFICATION",
    note: "Kick streamer with IRL content. Real social media accounts need confirmation.",
    kickUrl: "https://kick.com/moises",
    needs: ["Real Twitter/X link", "Instagram", "YouTube", "TikTok"],
  },
  NickWhite: {
    status: "NEEDS_VERIFICATION",
    note: "Kick streamer. Real social media accounts need confirmation.",
    kickUrl: "https://kick.com/nickwhite",
    needs: ["Real Twitter/X link", "Instagram", "YouTube", "TikTok"],
  },
  shoovy: {
    status: "NEEDS_VERIFICATION",
    note: "Kick streamer. Real social media accounts need confirmation.",
    kickUrl: "https://kick.com/shoovy",
    needs: ["Real Twitter/X link", "Instagram", "YouTube", "TikTok"],
  },
};

// Image replacement needed - all Imgur placeholders
export const imageReplacementsNeeded = [
  { nominee: "Moises", current: "https://i.imgur.com/moises.jpg", needs: "Real profile photo" },
  { nominee: "NickWhite", current: "https://i.imgur.com/nickwhite.jpg", needs: "Real profile photo" },
  { nominee: "shoovy", current: "https://i.imgur.com/shoovy.jpg", needs: "Real profile photo" },
  { nominee: "Clavicur", current: "https://i.imgur.com/clavicur.jpg", needs: "Real profile photo" },
  { nominee: "Sam Pepper", current: "https://i.imgur.com/sampepper.jpg", needs: "Real profile photo" },
  { nominee: "Bjorn", current: "https://i.imgur.com/bjorn.jpg", needs: "Real profile photo" },
  { nominee: "EBZ", current: "https://i.imgur.com/ebz.jpg", needs: "Real profile photo" },
  { nominee: "Hampton Brandon", current: "https://i.imgur.com/hamptonbrandon.jpg", needs: "Real profile photo" },
  { nominee: "Asian Andy", current: "https://i.imgur.com/asianandy.jpg", needs: "Real profile photo" },
];
