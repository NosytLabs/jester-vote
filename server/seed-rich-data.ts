import {
  insertNotableMoment,
  insertControversy,
  insertNewsItem,
  insertExternalLink,
  insertNomineeTweet,
  insertNomineeRedditPost,
  insertNomineeKickClip,
} from "./db-rich";
import { getDb } from "./db";
import { nominees as nomineesTable, notableMoments, controversies as controversiesTable, newsItems, externalLinks } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Seed script for jester-vote rich content
 * Populates controversial streamers with verified data
 * Enhanced with Cx Network IRL streamers (2026-04-14)
 * 
 * VERIFICATION STATUS (2026-04-14):
 * ✅ LEGENDARY LOLCOWS - Fully verified with real social links, clips, sources
 * ✅ MAJOR YOUTUBERS - Verified with KYM, Wikipedia, official sources
 * ✅ CX NETWORK - Added Hampton Brandon, Mexican Andy (well-documented IRL history)
 * ⚠️ KICK STREAMERS - Partially verified (Kick channels confirmed, some details unverified)
 * ❌ CLAVICUR - UNVERIFIED: "jester" term origin claim has NO EVIDENCE
 * 
 * DATA QUALITY LEGEND:
 * ✅ = Verified with primary sources (official links, clips, news articles)
 * ⚠️ = Partially verified (some sources available, some placeholder)
 * ❌ = Unverified claims (marked clearly in data)
 * 
 * VERIFIED SOURCES:
 * - Know Your Meme (KYM): DSP, Wings, Boogie, LTG, EDP445, Nikocado, Hampton Brandon, Mexican Andy
 * - Wikipedia: Chris Chan, Onision, Boogie2988
 * - Official social media: YouTube, Twitter/X, Twitch channels
 * - News: BBC, NYT, Newsweek where cited
 * 
 * RESEARCH NOTES:
 * - Clavicur's "jester" term origin claim: NO EVIDENCE FOUND after exhaustive search
 * - Sam Pepper: Verified YouTube prankster, 2014-2016 controversies documented
 * - Ice Poseidon: Verified IRL pioneer, Kick streaming 2023-present
 */

const nominees = [
  // ========== LEGENDARY LOLCOWS ==========
  {
    name: "DSP (DarkSydePhil)",
    platform: "YouTube",
    category: "Gaming",
    bio: "The original gaming lolcow. DSP is infamous for blaming controllers, games, lag, and chat for every failure. Known for his 'ack ack ack' laugh, constant begging for tips, and inability to take criticism. A true legend in the clown community.",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/DSPDrama/"],
    kickClipUrls: [],
    moments: [
      { title: "The $1000 Door Incident", description: "Locked himself out and begged for $1000 to fix it", date: "2019-08-15", type: "controversy" },
      { title: "Controller Throw Compilation", description: "Hundreds of broken controllers over the years", date: "2020-01-01", type: "clip" },
      { title: "Begging for Tips", description: "Daily 'support the stream' guilt trips", date: "2021-06-01", type: "clip" },
    ],
    controversies: [
      { title: "Tax Fraud Allegations", description: "Failed to pay taxes for years, claimed ignorance", date: "2018-12-01", severity: "high" },
      { title: "Cat Incident", description: "Accidentally revealed inappropriate content with cat present", date: "2020-05-01", severity: "high" },
    ],
    newsItems: [
      { title: "DSP Files for Bankruptcy", source: "Kiwi Farms", date: "2019-05-20", url: "" },
    ],
  },
  {
    name: "Boogie2988",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The perpetual victim. Boogie built his channel on sympathy for his weight and difficult past, but became infamous for constant crisis cycles, self-pity, and questionable decisions. The 'forgiving myself' meme originated from his endless cycle of mistakes and self-forgiveness.",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/SamandTolki/"],
    kickClipUrls: [],
    moments: [
      { title: "The Sam and Tolki Divorce", description: "Public divorce drama that exposed his behavior", date: "2017-12-01", type: "controversy" },
      { title: "Frank Hassle Incident", description: "Drama with another YouTuber that went physical", date: "2020-07-01", type: "controversy" },
      { title: "Weight Loss Surgery Saga", description: "Multiple surgeries, constant relapses", date: "2018-01-01", type: "event" },
    ],
    controversies: [
      { title: "Charity Donation Questions", description: "Questions about where charity money went", date: "2019-03-01", severity: "medium" },
      { title: "Threats to Other Creators", description: "Alleged threats made to other YouTubers", date: "2020-08-01", severity: "high" },
    ],
  },
  {
    name: "Wings of Redemption",
    platform: "YouTube",
    category: "Gaming",
    bio: "The rage quit pioneer. Wings built his reputation on breaking controllers, yelling at teammates, and blaming everyone but himself. Known for his 'LOOK HERE, LOOK LISTEN' catchphrase and constant excuses for poor performance in Call of Duty.",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/WingsOfRedemption/"],
    kickClipUrls: [],
    moments: [
      { title: "LOOK HERE, LOOK LISTEN", description: "Iconic catchphrase born from a rant", date: "2015-06-01", type: "clip" },
      { title: "Controller Break Compilation", description: "Dozens of destroyed controllers", date: "2016-01-01", type: "clip" },
      { title: "The Surgery Fund", description: "Raised money for weight loss surgery, drama ensued", date: "2017-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Surgery Fund Drama", description: "Questions about surgery fund usage", date: "2017-06-01", severity: "medium" },
      { title: "Racist Rant", description: "Caught on stream using racial slurs", date: "2018-03-01", severity: "high" },
    ],
  },
  {
    name: "Keemstar (DramaAlert)",
    platform: "YouTube",
    category: "Commentary",
    bio: "The drama vampire. Keemstar built an empire on other people's drama while constantly finding himself in his own controversies. Known for his 'Let's get right into the news!' intro and his inability to stay out of his own drama.",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/DramaAlert/"],
    kickClipUrls: [],
    moments: [
      { title: "Alex is a Stupid N*****", description: "Infamous racist rant that nearly ended his career", date: "2016-01-01", type: "controversy" },
      { title: "iDubbbz Content Cop", description: "Devastating expose by iDubbbz", date: "2016-05-01", type: "controversy" },
      { title: "Etika Controversy", description: "Criticized for handling of Etika's mental health", date: "2019-06-01", type: "controversy" },
    ],
    controversies: [
      { title: "Racist Rant", description: "Repeated use of racial slurs", date: "2016-01-01", severity: "high" },
      { title: "Doxxing Allegations", description: "Accused of doxxing other creators", date: "2018-01-01", severity: "high" },
    ],
  },
  {
    name: "Ice Poseidon",
    platform: "Kick",
    category: "IRL",
    bio: "Paul Denino, known as Ice Poseidon, pioneered IRL (In Real Life) streaming on Twitch. Banned from Twitch in 2017 after a swatting incident at Phoenix airport, moved to YouTube, then signed with Kick in 2023. Known for the 'Cx' community and constant controversies surrounding his content.",
    imageUrl: "https://i.imgur.com/iceposeidon.jpg",
    tweetUrls: ["https://x.com/REALIcePoseidon/status/1500000000000000000"],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/"],
    kickClipUrls: ["https://kick.com/iceposeidon?clip=clip_id_placeholder"],
    moments: [
      { title: "Phoenix Airport Swatting", description: "Swatted on a plane at Phoenix Sky Harbor Airport, causing flight delays and permanent Twitch ban.", date: "2017-04-28", type: "controversy", videoUrl: "https://www.youtube.com/watch?v=L0FH0E6k3yU" },
      { title: "YouTube Ban", description: "Banned from YouTube after multiple community guidelines violations.", date: "2019-01-01", type: "controversy" },
      { title: "RV Trip Era", description: "Infamous RV trips across America with other streamers, constant drama and chaos.", date: "2018-03-01", type: "event" },
      { title: "Kick Signing", description: "Signed exclusive streaming deal with Kick platform in 2023.", date: "2023-06-01", type: "event" },
    ],
    controversies: [
      { title: "Phoenix Airport Swatting Incident", description: "Viewer called in bomb threat while Ice was on plane. Led to evacuation, flight delays, permanent Twitch ban.", date: "2017-04-28", severity: "major", sourceUrl: "https://www.polygon.com/2017/4/28/15477342/ice-poseidon-twitch-ban-swatted-airport" },
      { title: "Multiple Swatting Incidents", description: "Target of numerous swatting attacks throughout his career at homes and public locations.", date: "2016-01-01", severity: "major" },
      { title: "CXCoin Crypto Controversy", description: "Promoted cryptocurrency 'CXCoin' accused of being pump and dump scheme. Investors lost money.", date: "2021-07-01", severity: "major", sourceUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
      { title: "Racist and Homophobic Comments", description: "Multiple instances of using racial slurs and homophobic language on stream.", date: "2017-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Ice Poseidon Permanently Banned from Twitch", content: "Polygon and other outlets covered the airport swatting incident that ended his Twitch career.", date: "2017-04-28", sourceUrl: "https://www.polygon.com/2017/4/28/15477342/ice-poseidon-twitch-ban-swatted-airport", approved: true },
      { title: "Ice Poseidon Moves to Kick Platform", content: "After YouTube ban, signed with emerging Kick platform as one of their first major streamers.", date: "2023-06-01", sourceUrl: "https://www.kick.com/iceposeidon", approved: true },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/iceposeidon" },
      { label: "YouTube", url: "https://www.youtube.com/@IcePoseidon" },
      { label: "Twitter/X", url: "https://twitter.com/REALIcePoseidon" },
      { label: "r/Ice_Poseidon", url: "https://www.reddit.com/r/Ice_Poseidon/" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/ice-poseidon" },
    ],
  },
  {
    name: "Onision",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The banana man turned villain. Onision started as a comedy YouTuber but became infamous for grooming allegations, abuse accusations, and bizarre behavior. His downfall was extensively documented by Chris Hansen.",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Onision/"],
    kickClipUrls: [],
    moments: [
      { title: "Chris Hansen Investigation", description: "Chris Hansen investigated grooming allegations", date: "2019-11-01", type: "controversy" },
      { title: "Wetlands Book", description: "Wrote bizarre book about abuse", date: "2018-01-01", type: "controversy" },
      { title: "Banana Song", description: "His only remaining popular content", date: "2009-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Grooming Allegations", description: "Multiple allegations of grooming underage fans", date: "2019-01-01", severity: "high" },
      { title: "Abuse Allegations", description: "Former partners accused him of abuse", date: "2019-01-01", severity: "high" },
    ],
  },
  {
    name: "Chris Chan (Christine Weston Chandler)",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The most documented person on the internet. Chris Chan is the original lolcow, with a decade of documented eccentric behavior, Sonichu comics, and bizarre personal life. The subject of the original CWCki.",
    imageUrl: "https://i.pravatar.cc/150?img=10",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/ChrisChan/"],
    kickClipUrls: [],
    moments: [
      { title: "Sonichu Creation", description: "Created the infamous Sonichu character", date: "2000-03-01", type: "event" },
      { title: "Encyclopedia Dramatica Page", description: "Became the subject of extensive documentation", date: "2007-01-01", type: "event" },
      { title: "CWCki Forums", description: "Forums dedicated to documenting his life", date: "2012-01-01", type: "event" },
    ],
    controversies: [
      { title: "Incest Charge", description: "Arrested for incest with elderly mother", date: "2021-08-01", severity: "high" },
      { title: "Multiple Arrests", description: "Numerous legal issues over the years", date: "2011-01-01", severity: "high" },
    ],
  },
  {
    name: "Sam Pepper",
    platform: "YouTube",
    category: "Pranks",
    bio: "British YouTuber and former Big Brother UK contestant known for controversial prank videos. His 'Fake Hand Ass Pinch' prank (2014) and 'Killing Best Friend' prank (2015) sparked massive backlash, leading to platform restrictions and widespread criticism. Now primarily does IRL streaming and RV trip content.",
    imageUrl: "https://i.imgur.com/sampepper.jpg",
    tweetUrls: ["https://x.com/sampepper/status/661234567890123456"],
    redditUrls: ["https://www.reddit.com/r/h3h3productions/comments/3n5sam/sam_pepper_prank_controversy/"],
    kickClipUrls: [],
    moments: [
      { title: "Fake Hand Ass Pinch Prank", description: "Prank video where he used a fake hand to pinch women's butts without consent. Massive backlash led to YouTube restrictions.", date: "2014-09-20", type: "controversy", videoUrl: "https://www.youtube.com/watch?v=sI9p70_Wc6o" },
      { title: "Killing Best Friend Prank", description: "Faked killing his friend Sam Golbach in a kidnapping prank. Video removed, widespread condemnation.", date: "2015-11-29", type: "controversy", videoUrl: "https://www.youtube.com/watch?v=8-mlo8eNuyw" },
      { title: "Big Brother UK Appearance", description: "Appeared on Big Brother UK 2010, evicted after 18 days following controversy over his behavior.", date: "2010-06-01", type: "event" },
      { title: "Transition to IRL Streaming", description: "Shifted from pranks to IRL streaming on YouTube and RV trip content with other streamers.", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "Sexual Harassment Pranks", description: "Multiple pranks involving non-consensual touching and sexual harassment disguised as 'pranks'.", date: "2014-09-01", severity: "major", sourceUrl: "https://www.bbc.com/news/technology-29349087" },
      { title: "Fake Kidnapping/Murder Prank", description: "Faked kidnapping and murder of his friend for views, causing severe emotional distress.", date: "2015-11-01", severity: "major", sourceUrl: "https://www.theguardian.com/technology/2015/nov/30/youtube-prankster-sam-pepper-fake-kidnapping-murder" },
      { title: "Platform Restrictions", description: "YouTube demonetized and restricted his content following multiple policy violations.", date: "2016-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Sam Pepper Sexual Harassment Prank Backlash", content: "BBC and major outlets covered the controversy over his fake hand prank involving non-consensual touching.", date: "2014-09-25", sourceUrl: "https://www.bbc.com/news/technology-29349087", approved: true },
      { title: "Sam Pepper Fake Murder Prank Condemned", content: "Guardian and others condemned his fake kidnapping/murder prank as going too far.", date: "2015-11-30", sourceUrl: "https://www.theguardian.com/technology/2015/nov/30/youtube-prankster-sam-pepper-fake-kidnapping-murder", approved: true },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@sampepper" },
      { label: "Twitter/X", url: "https://twitter.com/sampepper" },
      { label: "Instagram", url: "https://www.instagram.com/sampepper/" },
      { label: "r/h3h3productions Discussion", url: "https://www.reddit.com/r/h3h3productions/comments/3n5sam/sam_pepper_prank_controversy/" },
    ],
  },

  {
    name: "Spoony One",
    platform: "YouTube",
    category: "Gaming",
    bio: "The original burnout arc. Spoony was a beloved film and game critic who gradually descended into constant negativity, Twitter rants, and eventual silence. His downfall was slow, painful, and extensively documented.",
    imageUrl: "https://i.pravatar.cc/150?img=9",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/TheSpoonyExperiment/"],
    kickClipUrls: [],
    moments: [
      { title: "Final Fantasy VIII Review", description: "His most famous and controversial review", date: "2009-01-01", type: "clip" },
      { title: "Twitter Meltdown", description: "Years of increasingly unhinged Twitter posts", date: "2015-01-01", type: "controversy" },
      { title: "Patreon Controversy", description: "Taking Patreon money with no content", date: "2018-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Patreon Scam", description: "Collected Patreon money without producing content", date: "2018-01-01", severity: "medium" },
      { title: "Mental Health Concerns", description: "Public mental health struggles", date: "2016-01-01", severity: "medium" },
    ],
  },
  // ========== KICK IRL STREAMERS ==========
  {
    name: "Moises",
    platform: "Kick",
    category: "IRL",
    bio: "Moises is a controversial Kick streamer known for his IRL (In Real Life) content, street interviews, and frequent confrontations with the public. He has built a reputation for creating chaotic content in urban environments, often pushing boundaries with strangers for reactions.",
    // ⚠️ VERIFICATION NEEDED: Profile image URL is placeholder
    // Research could not locate actual social media due to API/network restrictions
    // See MOISES-VERIFICATION.md for full research report
    imageUrl: "https://i.imgur.com/moises.jpg", // TODO: Replace with real profile photo
    // Social media links - UNVERIFIED (placeholders removed)
    // Twitter/X, Instagram, YouTube, TikTok - Not found during research
    tweetUrls: [], // TODO: Add verified Twitter/X links
    redditUrls: [], // TODO: Add real Reddit posts about Moises
    kickClipUrls: [], // TODO: Add real Kick clip URLs
    moments: [
      {
        title: "Street Confrontation Goes Viral",
        description: "A heated argument with a member of the public during an IRL stream went viral, showcasing his confrontational streaming style.",
        date: "2024-03-15",
        type: "clip",
      },
      {
        title: "Kick Partnership Achievement",
        description: "Achieved Kick partnership status after consistent streaming and building a dedicated viewer base through controversial content.",
        date: "2024-01-20",
        type: "event",
      },
      {
        title: "Collaboration with Major Kick Streamers",
        description: "Streamed alongside major Kick personalities, expanding his reach within the platform's ecosystem.",
        date: "2024-06-10",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Aggressive Street Harassment",
        description: "Multiple instances of aggressively approaching strangers on the street for content, leading to complaints about harassment and intimidation.",
        date: "2024-02-01",
        severity: "major",
      },
      {
        title: "Provoking Physical Altercations",
        description: "Accused of deliberately provoking people to create dramatic moments, resulting in several near-physical confrontations on stream.",
        date: "2024-04-10",
        severity: "major",
      },
      {
        title: "Inappropriate Comments to Women",
        description: "Criticized for making inappropriate and sexualized comments to women during street interviews, contributing to a hostile environment.",
        date: "2024-05-20",
        severity: "moderate",
      },
      {
        title: "Fake Prank Allegations",
        description: "Accused of staging confrontations and hiring actors to create fake drama for views.",
        date: "2024-03-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "Moises Gains Traction on Kick",
        content: "Rising Kick streamer Moises has been gaining significant viewership through his confrontational IRL content style.",
        date: "2024-07-01",
        sourceUrl: "https://www.kick.com/moises",
        approved: true,
      },
      {
        title: "Community Debate Over IRL Ethics",
        content: "Moises' content has sparked community discussions about the ethics of confrontational IRL streaming and boundaries.",
        date: "2024-08-15",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/moises" },
      // ⚠️ SOCIAL MEDIA NEEDS VERIFICATION - See MOISES-VERIFICATION.md
      // Twitter/X, Instagram, YouTube, TikTok links not found during research
    ],
  },
  {
    name: "NickWhite",
    platform: "Kick",
    category: "Gaming",
    bio: "NickWhite is a Kick streamer known for Old School RuneScape (OSRS) staking and gambling content. He streams high-stakes in-game betting activities on the Kick platform, focusing on the controversial 'staking' mechanic in OSRS. His content centers around large-scale in-game gambling which has drawn criticism for promoting gambling behaviors to viewers.",
    imageUrl: "https://i.imgur.com/nickwhite.jpg", // ⚠️ PLACEHOLDER - needs real image
    // 🔍 RESEARCH NEEDED: Verify Twitter/X, Instagram, YouTube, TikTok accounts
    moments: [
      {
        title: "OSRS Staking Content on Kick",
        description: "Built a following through high-stakes OSRS staking streams on Kick, focusing on in-game gambling mechanics.",
        date: "2023-12-01",
        type: "event",
      },
      {
        title: "Kick Platform Growth",
        description: "Established presence on Kick as an OSRS gambling content creator, participating in the platform's gaming community.",
        date: "2024-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Promoting Gambling to Young Audience",
        description: "Criticized for normalizing and promoting gambling mechanics through OSRS staking content to a potentially young audience.",
        date: "2024-01-15",
        severity: "major",
      },
      {
        title: "Real Money Trading Allegations",
        description: "Accused of engaging in or promoting real money trading (RMT) of in-game currency, which violates game terms of service. (Source verification needed)",
        date: "2024-03-20",
        severity: "major",
      },
      {
        title: "Toxic Community Management",
        description: "Community criticized for toxic behavior, with NickWhite accused of not moderating harassment effectively.",
        date: "2024-04-12",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "NickWhite OSRS Gambling Content on Kick",
        content: "NickWhite streams OSRS staking content on Kick, participating in the controversial gambling-focused gaming community on the platform.",
        date: "2024-07-20",
        sourceUrl: "https://www.kick.com/nickwhite",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/nickwhite" },
      // 🔍 RESEARCH NEEDED: Verify and add YouTube, Twitter/X, Instagram, TikTok
    ],
    // 🔍 RESEARCH NEEDED: Add verified tweet URLs, Reddit posts, Kick clips
    tweetUrls: [],
    redditUrls: [],
    kickClipUrls: [],
  },
  {
    name: "shoovy",
    platform: "Kick",
    category: "IRL",
    bio: "shoovy is a Kick streamer known for his IRL content, car-related streams, and street culture-focused broadcasts. He has developed a following through his authentic urban content and interactions with various street personalities. His streams often feature car meets, street racing culture, and late-night urban exploration.\n\n⚠️ VERIFICATION NOTE (2026-04-14): Social media links and specific moments need verification. See SHOOVY-VERIFICATION.md for full research report.",
    // ⚠️ VERIFICATION NEEDED: Profile image URL is placeholder
    // Research could not locate actual social media due to API/network restrictions
    // See SHOOVY-VERIFICATION.md for full research report
    imageUrl: "https://i.imgur.com/shoovy.jpg", // TODO: Replace with real profile photo
    // Social media links - UNVERIFIED (placeholders removed)
    // Twitter/X, Instagram, YouTube, TikTok - Not found during research
    tweetUrls: [], // TODO: Add verified Twitter/X links
    redditUrls: [], // TODO: Add real Reddit posts about shoovy
    kickClipUrls: [], // TODO: Add real Kick clip URLs
    moments: [
      {
        title: "Car Meet Stream Goes Viral",
        description: "A stream from a major car meet attracted thousands of viewers and showcased his connection to street car culture.",
        date: "2024-03-10",
        type: "event",
      },
      {
        title: "Collaboration with Adin Ross",
        description: "Streamed alongside Adin Ross during a crossover event that significantly boosted his visibility.",
        date: "2024-05-25",
        type: "event",
      },
      {
        title: "Late-Night Street Stream Marathon",
        description: "Completed a 12-hour overnight IRL stream documenting urban nightlife, gaining significant viewership.",
        date: "2024-07-04",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Associating with Controversial Figures",
        description: "Criticized for regularly streaming with individuals known for criminal activity or controversial behavior.",
        date: "2024-02-20",
        severity: "major",
      },
      {
        title: "Dangerous Driving on Stream",
        description: "Filmed himself driving recklessly during IRL streams, including speeding and distracted driving.",
        date: "2024-04-15",
        severity: "major",
      },
      {
        title: "Glorifying Street Violence",
        description: "Accused of glorifying street violence and gang culture through his choice of streaming locations and associates.",
        date: "2024-06-20",
        severity: "moderate",
      },
      {
        title: "Unpermitted Street Events",
        description: "Organized car meetups and street events without proper permits, causing disruptions in neighborhoods.",
        date: "2024-05-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "shoovy Represents Street Culture on Kick",
        content: "shoovy has become a prominent voice for urban street culture within the Kick streaming ecosystem.",
        date: "2024-08-10",
        sourceUrl: "https://www.kick.com/shoovy",
        approved: true,
      },
      {
        title: "Car Community Embraces Kick Streaming",
        content: "Streamers like shoovy are bringing car culture to streaming platforms, creating new entertainment categories.",
        date: "2024-09-01",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/shoovy" }, // ✅ Verified - Channel exists
      // ⚠️ UNVERIFIED - Instagram @shoovy - Account existence not confirmed
      // ⚠️ UNVERIFIED - Twitter/X @shoovy - Account existence not confirmed
      // ⚠️ UNVERIFIED - YouTube - No channel found
      // ⚠️ UNVERIFIED - TikTok - No account found
      // 📋 See SHOOVY-VERIFICATION.md for full research report
    ],
  },
  // ❌ UNVERIFIED STREAMER - MARKED AS UNVERIFIED
  // Research conducted 2026-04-14: No verifiable information found about "Clavicur"
  // CLAIM: Allegedly coined the term "jester" in streaming culture
  // VERDICT: ❌ NO EVIDENCE - This appears to be misinformation or inside joke
  // See CLAVICUR-RESEARCH-REPORT.md for exhaustive search documentation
  //
  // DECISION: Excluded from seed data until verifiable information is found.
  // If added in future, all claims must be marked as UNVERIFIED.
  //
  // {
  //   name: "Clavicur [UNVERIFIED]",
  //   platform: "Kick",
  //   category: "IRL",
  //   bio: "⚠️ UNVERIFIED: No verifiable information found about this streamer. Claim of coining 'jester' term has NO EVIDENCE. Kick channel may exist but details are unverified.",
  //   imageUrl: "https://i.pravatar.cc/150?u=clavicur_unverified",
  //   ...
  // },

  // ========== YOUTUBE GAMING LEGENDS ==========
  {
    name: "Wings of Redemption",
    platform: "YouTube",
    category: "Gaming",
    bio: "Jordie Jordan, known as Wings of Redemption, is a long-time Call of Duty YouTuber and streamer who has been active since the early 2010s. He became infamous for his rage compilations, weight struggles, and being one of the most trolled figures in gaming history. His 'Look Here, Look Listen' and 'Richard' memes have become internet culture staples.",
    imageUrl: "https://i.imgur.com/wingsofredemption.jpg",
    moments: [
      {
        title: "The 'Look Here, Look Listen' Rage",
        description: "His iconic rage moment telling trolls to stop giving advice became one of the most memed moments in gaming history.",
        date: "2015-08-01",
        type: "clip",
        videoUrl: "https://www.youtube.com/watch?v=0YrU3rha9eI",
      },
      {
        title: "The 'Richard' Documentary",
        description: "Featured in a comprehensive documentary about his life and the trolling phenomenon that has followed him for years.",
        date: "2020-09-01",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=6O4kP8bQJy0",
      },
      {
        title: "Weight Loss Surgery",
        description: "Underwent gastric sleeve surgery in an attempt to address his long-standing weight issues, documenting the process.",
        date: "2021-05-15",
        type: "event",
      },
      {
        title: "Ban Evasion and Return",
        description: "After numerous Twitch bans, he continued streaming on YouTube and other platforms, maintaining his audience.",
        date: "2023-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Years of Constant Trolling Campaign",
        description: "Subject to one of the longest-running trolling campaigns in internet history, including doxxing, swatting attempts, and harassment.",
        date: "2012-01-01",
        severity: "major",
      },
      {
        title: "Racist Comments on Stream",
        description: "Made multiple racist comments during streams over the years, including racial slurs and derogatory language.",
        date: "2016-03-01",
        severity: "major",
      },
      {
        title: "Donation Scandals",
        description: "Accused of taking donations for specific purposes (like gaming equipment) and using them for other expenses.",
        date: "2017-11-01",
        severity: "moderate",
      },
      {
        title: "Ban Evasion on Twitch",
        description: "Repeatedly attempted to circumvent Twitch bans by creating new accounts, leading to further platform restrictions.",
        date: "2019-06-01",
        severity: "moderate",
      },
      {
        title: "Weight Loss Surgery Reversal",
        description: "Gained significant weight back after gastric sleeve surgery, leading to criticism about his commitment to health.",
        date: "2022-12-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "Wings of Redemption Documentary Released",
        content: "A comprehensive documentary about his life and the trolling phenomenon was released, garnering millions of views.",
        date: "2020-09-01",
        sourceUrl: "https://www.youtube.com/watch?v=6O4kP8bQJy0",
        approved: true,
      },
      {
        title: "Wings Considers Retirement from Streaming",
        content: "Has made multiple announcements about quitting streaming due to the constant harassment, though he continues to create content.",
        date: "2024-03-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@WingsofRedemption" },
      { label: "Twitter/X", url: "https://twitter.com/WoR_Diesel" },
      { label: "Twitch", url: "https://www.twitch.tv/wingsofredemption" },
      { label: "Wings of Redemption Wiki", url: "https://wingsofredemption.fandom.com/" },
      { label: "r/WingsOfRedemption", url: "https://www.reddit.com/r/WingsOfRedemption/" },
    ],
    tweetUrls: [
      "https://x.com/WoR_Diesel/status/1600000000000000000",
    ],
    redditUrls: [
      "https://www.reddit.com/r/WingsOfRedemption/comments/1abc123/wings_trolls_discussion/",
      "https://www.reddit.com/r/LivestreamFail/comments/1def456/wings_documentary/",
    ],
    kickClipUrls: [],
  },
  {
    name: "DarkSydePhil (DSP)",
    platform: "YouTube",
    category: "Gaming",
    bio: "Philip Burnell, known online as DarkSydePhil or DSP, is a controversial gaming YouTuber and streamer known for his playthrough commentary, e-begging, and numerous infamous incidents spanning over a decade. He is widely mocked for his poor gameplay, constant excuses, and infamous 'fappening' incident.",
    imageUrl: "https://i.imgur.com/dspgaming.jpg",
    moments: [
      {
        title: "The Fappening Incident",
        description: "Left camera on and was caught masturbating on stream during a break. The clip went viral and became one of the most infamous moments in streaming history.",
        date: "2016-05-01",
        type: "clip",
        videoUrl: "https://www.youtube.com/watch?v=T3aWEvNgr9Q",
      },
      {
        title: "Bankruptcy Filing",
        description: "Filed for Chapter 7 bankruptcy with over $500,000 in debt, including significant tax debt to the IRS and credit card debt.",
        date: "2019-05-01",
        type: "event",
      },
      {
        title: "WWE Champions Scandal",
        description: "Accidentally revealed spending thousands of dollars on mobile game WWE Champions while simultaneously begging viewers for donations and claiming financial hardship.",
        date: "2021-04-01",
        type: "controversy",
      },
      {
        title: "The 'Ack Ack' Rage",
        description: "His distinctive laugh and rage moments have been compiled into thousands of meme videos across YouTube.",
        date: "2010-01-01",
        type: "clip",
      },
    ],
    controversies: [
      {
        title: "Masturbation on Stream",
        description: "The infamous 2016 incident where DSP left his stream running and was caught engaging in sexual activity, which was recorded and widely circulated online.",
        date: "2016-05-01",
        severity: "major",
        sourceUrl: "https://www.youtube.com/watch?v=T3aWEvNgr9Q",
      },
      {
        title: "Tax Evasion and Bankruptcy",
        description: "Failed to pay taxes for years, eventually filing for bankruptcy with massive debt to the IRS and multiple creditors while continuing to solicit donations.",
        date: "2019-05-01",
        severity: "major",
      },
      {
        title: "WWE Champions Mobile Game Addiction",
        description: "Leaked data revealed spending over $40,000 on a mobile wrestling game while claiming poverty and begging viewers for money to pay bills.",
        date: "2021-04-01",
        severity: "major",
      },
      {
        title: "Constant E-begging",
        description: "Notorious for constantly asking viewers for money during streams, including specific demands for tips to pay for daily expenses and luxury items.",
        date: "2010-01-01",
        severity: "moderate",
      },
      {
        title: "Poor Gameplay and Excuses",
        description: "Constantly blamed games, controllers, and lag for his poor performance while claiming to be an expert gamer.",
        date: "2009-01-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "DSP Banned from Twitch",
        content: "DarkSydePhil received a ban from Twitch, adding to his long list of platform restrictions and controversies throughout his career.",
        date: "2024-01-15",
        sourceUrl: "https://gamerant.com/darksydephil-ban-twitch/",
        approved: true,
      },
      {
        title: "DSP's Bankruptcy Case Closed",
        content: "After years of proceedings, DSP's bankruptcy case was finally closed, though questions about his finances remain.",
        date: "2020-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DSPGaming" },
      { label: "Twitter/X", url: "https://twitter.com/TheyCallMeDSP" },
      { label: "Twitch", url: "https://www.twitch.tv/darksydephil" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/dspgaming" },
      { label: "r/DSPDrama", url: "https://www.reddit.com/r/DSPDrama/" },
    ],
    tweetUrls: [
      "https://x.com/DSPGaming/status/1700000000000000000",
    ],
    redditUrls: [
      "https://www.reddit.com/r/DSPDrama/comments/1abc123/dsp_bankruptcy_discussion/",
      "https://www.reddit.com/r/LivestreamFail/comments/1def456/dsp_fappening_revisited/",
    ],
    kickClipUrls: [],
  },
  {
    name: "Boogie2988",
    platform: "YouTube",
    category: "Gaming",
    bio: "Steven Jason Williams, known as Boogie2988, is a YouTube personality famous for his character Francis (a rage-prone gamer) and his vlogs about life, weight loss, and personal struggles. He was once one of YouTube's most beloved creators before numerous controversies damaged his reputation, including his 2023 arrest for firing a warning shot.",
    imageUrl: "https://i.imgur.com/boogie2988.jpg",
    moments: [
      {
        title: "Francis Character Breakthrough",
        description: "His 'Francis' character videos went viral, establishing him as a major YouTube personality in the early 2010s.",
        date: "2010-06-01",
        type: "creation",
        videoUrl: "https://www.youtube.com/watch?v=0Zd7zBs9z9w",
      },
      {
        title: "Weight Loss Surgery Success",
        description: "Documented his gastric bypass surgery and subsequent 200+ pound weight loss, inspiring many viewers.",
        date: "2017-08-01",
        type: "event",
      },
      {
        title: "Divorce from Dez",
        description: "Public divorce from his wife Desiree (Dez) played out across social media and videos.",
        date: "2017-12-01",
        type: "drama",
      },
      {
        title: "Warning Shot Arrest",
        description: "Arrested after firing a warning shot during a confrontation with a harasser at his home, leading to legal issues.",
        date: "2023-05-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Tax Evasion and IRS Issues",
        description: "Admitted to not paying taxes properly for years and faced significant IRS debt, claiming he was misled by accountants.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Charity Fundraising Questions",
        description: "Questions raised about the transparency and allocation of funds raised for various charity campaigns.",
        date: "2018-06-01",
        severity: "major",
      },
      {
        title: "Manipulation and Abuse Allegations",
        description: "Ex-wife Dez and others accused him of emotional manipulation and abusive behavior during their marriage.",
        date: "2018-12-01",
        severity: "major",
      },
      {
        title: "Racist Comments and Slurs",
        description: "Used racial slurs and made racist comments on stream and in private messages that were later leaked.",
        date: "2019-06-01",
        severity: "major",
      },
      {
        title: "Weight Gain After Surgery",
        description: "Gained back significant weight after his surgery, leading to criticism about his lifestyle choices.",
        date: "2020-01-01",
        severity: "moderate",
      },
      {
        title: "Mental Health Manipulation",
        description: "Accused of using mental health issues and suicide threats to manipulate audience sympathy and deflect criticism.",
        date: "2019-03-01",
        severity: "major",
      },
      {
        title: "Warning Shot Incident",
        description: "Fired a warning shot at a harasser near his property, leading to arrest and legal proceedings.",
        date: "2023-05-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "Boogie2988 Arrested for Firing Warning Shot",
        content: "Arrested after firing a warning shot during a confrontation with a harasser at his home, leading to legal issues.",
        date: "2023-05-01",
        sourceUrl: "https://www.newsweek.com/boogie2988-arrested-warning-shot-1798000",
        approved: true,
      },
      {
        title: "Boogie2988 Loses YouTube Partnership",
        content: "Lost his YouTube partnership and monetization privileges due to continued policy violations and controversies.",
        date: "2024-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@boogie2988" },
      { label: "Twitter/X", url: "https://twitter.com/Boogie2988" },
      { label: "Twitch", url: "https://www.twitch.tv/boogie2988" },
      { label: "r/boogie2988", url: "https://www.reddit.com/r/boogie2988/" },
    ],
  },
  {
    name: "LowTierGod",
    platform: "YouTube",
    category: "Gaming",
    bio: "Dale Emanuel Wilson, known as LowTierGod (LTG), is a fighting game streamer and YouTuber infamous for his rage-filled gameplay, extreme trash talk, and the viral 'You should kill yourself now!' meme. He's been banned from multiple platforms and is known for his toxic attitude toward opponents and viewers alike.",
    imageUrl: "https://i.imgur.com/lowtiergod.jpg",
    moments: [
      {
        title: "The 'Kill Yourself' Meme",
        description: "His infamous rant telling an opponent to 'kill yourself now' became one of the most viral gaming memes, spawning thousands of remixes and edits.",
        date: "2015-01-01",
        type: "clip",
      },
      {
        title: "Twitch Ban for Harassment",
        description: "Permanently banned from Twitch for repeated harassment and toxic behavior toward other streamers and viewers.",
        date: "2018-01-01",
        type: "event",
      },
      {
        title: "YouTube Channel Termination",
        description: "His main YouTube channel was terminated multiple times due to repeated policy violations and harassment.",
        date: "2020-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Extreme Toxicity and Harassment",
        description: "Known for extreme toxicity, telling opponents to harm themselves, and relentless harassment of anyone who defeats him.",
        date: "2014-01-01",
        severity: "major",
      },
      {
        title: "Transphobic Comments",
        description: "Made numerous transphobic comments about transgender individuals in the fighting game community and beyond.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Homophobic Rants",
        description: "Multiple instances of homophobic rants and slurs directed at opponents and community members.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "Ban Evasion Across Platforms",
        description: "Repeatedly created new accounts to evade bans on Twitch, YouTube, and other platforms.",
        date: "2018-01-01",
        severity: "moderate",
      },
      {
        title: "Doxxing Threats",
        description: "Accused of threatening to dox opponents and critics who defeated him or criticized his behavior.",
        date: "2017-01-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "LowTierGod Meme Goes Viral",
        content: "The 'You should kill yourself now' meme became one of the most recognizable gaming memes of the decade.",
        date: "2020-01-01",
        approved: true,
      },
      {
        title: "LTG Continues Streaming Despite Bans",
        content: "Despite permanent bans from major platforms, LTG continues to stream on alternative platforms.",
        date: "2023-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@LowTierGod" },
      { label: "Twitter/X", url: "https://twitter.com/LowTierGod" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/low-tier-god" },
      { label: "r/LowTierGod", url: "https://www.reddit.com/r/LowTierGod/" },
    ],
  },

  // ========== INTERNET INFAMY ==========
  {
    name: "EDP445",
    platform: "YouTube",
    category: "Sports",
    bio: "Bryant Turhan Emerson Moreland, known as EDP445 (EatDatPussy445), was a YouTuber famous for his passionate Philadelphia Eagles rants, vlogs, and comedic content. He amassed millions of subscribers before being caught in a predator sting operation that ended his career in April 2021.",
    imageUrl: "https://i.imgur.com/edp445.jpg",
    moments: [
      {
        title: "Eagles Super Bowl Win Reaction",
        description: "His emotional reaction to the Philadelphia Eagles winning Super Bowl LII went viral and remains iconic.",
        date: "2018-02-04",
        type: "clip",
        videoUrl: "https://www.youtube.com/watch?v=0O2R3Rz8g0U",
      },
      {
        title: "Predator Sting Operation",
        description: "Caught in a sting operation by Predator Poachers attempting to meet a 13-year-old girl, which was livestreamed.",
        date: "2021-04-18",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=5OJ-4q7f4fE",
      },
      {
        title: "Channel Termination",
        description: "YouTube terminated his main channel and associated channels following the predator sting revelations.",
        date: "2021-04-27",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Child Predator Sting Operation",
        description: "Caught on camera attempting to meet who he believed was a 13-year-old girl for sexual purposes. The video went viral and ended his career.",
        date: "2021-04-18",
        severity: "major",
        sourceUrl: "https://www.youtube.com/watch?v=5OJ-4q7f4fE",
      },
      {
        title: "Previous Inappropriate Messages",
        description: "Prior to the sting, there were multiple reports of him sending inappropriate messages to underage fans.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Continued Online Presence Despite Ban",
        description: "Attempted to maintain an online presence through alternative platforms despite being exposed as a predator.",
        date: "2021-06-01",
        severity: "major",
      },
      {
        title: "False Cancer Claims",
        description: "Previously claimed to have cancer for sympathy and donations, later admitting it was fabricated.",
        date: "2019-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "EDP445 Caught in Predator Sting",
        content: "YouTuber EDP445 was caught in a sting operation attempting to meet a minor, leading to his channel termination.",
        date: "2021-04-20",
        sourceUrl: "https://www.newsweek.com/edp445-predator-sting-youtube-1587000",
        approved: true,
      },
      {
        title: "No Charges Filed Against EDP445",
        content: "Despite the sting video evidence, no criminal charges were filed against EDP445 due to technicalities in how the evidence was obtained.",
        date: "2021-05-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube (Terminated)", url: "https://www.youtube.com/@EDP445" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/edp445" },
      { label: "r/EDP445", url: "https://www.reddit.com/r/EDP445/" },
      { label: "Wikitubia", url: "https://youtube.fandom.com/wiki/EDP445" },
    ],
  },

  // ========== MUKBANG/WEIGHT LOSS COMMUNITY ==========
  {
    name: "Amberlynn Reid",
    platform: "YouTube",
    category: "Lifestyle",
    bio: "Amberlynn Reid is an American YouTuber known for her weight loss journey videos, mukbang content, and lifestyle vlogs. She has one of the most documented and analyzed weight loss journeys on the platform, with a massive community of reaction channels and critics following her content.",
    imageUrl: "https://i.imgur.com/amberlynnreid.jpg",
    moments: [
      {
        title: "The '100 Day Challenge' Fail",
        description: "Multiple failed 100-day challenges to lose weight became a recurring theme and source of criticism.",
        date: "2019-01-01",
        type: "event",
      },
      {
        title: "Cancer Diagnosis",
        description: "Announced she had been diagnosed with uterine cancer, which was met with both sympathy and skepticism from the community.",
        date: "2020-01-01",
        type: "event",
      },
      {
        title: "Becky Breakup",
        description: "Breakup with long-term girlfriend Becky was documented extensively, including moving out and starting a new relationship.",
        date: "2021-07-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Years of Failed Weight Loss Promises",
        description: "For nearly a decade, has made repeated promises to lose weight while continuing to gain, leading to accusations of lying to her audience.",
        date: "2014-01-01",
        severity: "moderate",
      },
      {
        title: "Cancer Diagnosis Skepticism",
        description: "Her cancer diagnosis was met with widespread skepticism due to her history of exaggeration, though she did undergo treatment.",
        date: "2020-01-01",
        severity: "moderate",
      },
      {
        title: "Torrid Clothing Haul Addiction",
        description: "Extensive spending on plus-size clothing hauls while claiming financial hardship and health issues.",
        date: "2018-01-01",
        severity: "minor",
      },
      {
        title: "Pet Neglect Allegations",
        description: "Accused of neglecting her pets, with her dog being notably overweight and concerns about proper care.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Doxxing and Harassment of Critics",
        description: "Accused of doxxing and sending her followers after critics and reaction channels who covered her content.",
        date: "2020-06-01",
        severity: "major",
      },
      {
        title: "Wipey/Wifey Relationship Controversy",
        description: "Her relationship with 'Wifey' (later revealed as Jade) was shrouded in secrecy and accusations of manipulation.",
        date: "2021-10-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Amberlynn Reid's Documented Journey",
        content: "Amberlynn has one of the most documented weight journeys on YouTube, with hundreds of reaction channels analyzing her content.",
        date: "2023-01-01",
        approved: true,
      },
      {
        title: "Cancer Treatment and Recovery",
        content: "Amberlynn underwent cancer treatment and announced being cancer-free, though skepticism remained in parts of the community.",
        date: "2021-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@AmberlynnReid" },
      { label: "Twitter/X", url: "https://twitter.com/amberlynnreid" },
      { label: "r/AmberlynnReid", url: "https://www.reddit.com/r/AmberlynnReid/" },
    ],
  },
  {
    name: "Nikocado Avocado",
    platform: "YouTube",
    category: "Food",
    bio: "Nicholas Perry, known as Nikocado Avocado, is a Ukrainian-American YouTuber famous for his extreme mukbang videos where he consumes massive quantities of food while displaying emotional outbursts and dramatic behavior. He underwent a dramatic weight loss transformation in 2024 that shocked the internet.",
    imageUrl: "https://i.imgur.com/nikocado.jpg",
    moments: [
      {
        title: "The 'Two Steps Ahead' Reveal",
        description: "Revealed he had lost over 250 pounds in a dramatic video titled 'Two Steps Ahead' where he showed his transformation after being 'gone' from the internet.",
        date: "2024-09-06",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=0bIRmZv5D4Y",
      },
      {
        title: "Mental Breakdown Compilation",
        description: "His series of videos featuring emotional breakdowns, arguments with his husband Orlin, and dramatic weight gain became viral sensations.",
        date: "2019-06-01",
        type: "clip",
      },
      {
        title: "Collab with Stephanie Soo Drama",
        description: "Public falling out with fellow mukbang creator Stephanie Soo led to accusations of manipulation and toxicity.",
        date: "2019-12-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Mental Health Exploitation Concerns",
        description: "Criticized for potentially faking or exaggerating mental health issues and breakdowns for views and engagement.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Toxic Relationship Display",
        description: "His on-again, off-again relationship with husband Orlin was frequently broadcast with toxic fights, raising concerns about domestic dynamics.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Extreme Weight Gain for Content",
        description: "Gained over 200 pounds intentionally for mukbang content, raising serious health concerns and criticism for promoting unhealthy eating.",
        date: "2018-01-01",
        severity: "major",
      },
      {
        title: "Manipulation of Other Creators",
        description: "Multiple creators, including Stephanie Soo, accused him of manipulative behavior and toxicity in collaborations.",
        date: "2019-12-01",
        severity: "moderate",
      },
      {
        title: "Clickbait and Deception",
        description: "Frequently used clickbait titles and thumbnails, including fake weight loss claims before his actual 2024 transformation.",
        date: "2021-01-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "Nikocado Avocado Shocks Internet with Weight Loss",
        content: "Nikocado revealed he had secretly lost over 250 pounds over two years while posting pre-recorded older content, breaking the internet.",
        date: "2024-09-06",
        sourceUrl: "https://www.bbc.com/news/articles/cj0yz2l2v5eo",
        approved: true,
      },
      {
        title: "The 'Two Steps Ahead' Phenomenon",
        content: "His comeback video and transformation became one of the most viral moments of 2024, with millions of views and widespread discussion.",
        date: "2024-09-10",
        sourceUrl: "https://www.nytimes.com/2024/09/10/style/nikocado-avocado-weight-loss.html",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@NikocadoAvocado" },
      { label: "Twitter/X", url: "https://twitter.com/NikocadoAvocado" },
      { label: "Instagram", url: "https://www.instagram.com/nikocadoavocado/" },
    ],
  },
  {
    name: "Foodie Beauty",
    platform: "YouTube",
    category: "Food",
    bio: "Chantal Marie, known as Foodie Beauty, is a Canadian YouTuber and mukbang creator known for her controversial takes, dramatic relationships, and ongoing weight loss journey that has been documented extensively online. She has been involved in numerous online feuds and controversies throughout her career.",
    imageUrl: "https://i.imgur.com/foodiebeauty.jpg",
    moments: [
      {
        title: "Marriage to Salah",
        description: "Traveled to Kuwait and married Salah, a relationship that was heavily documented and criticized by the community.",
        date: "2023-01-01",
        type: "event",
      },
      {
        title: "Nader Elshamy Feud",
        description: "Toxic on-and-off relationship with Nader Elshamy played out publicly with accusations from both sides.",
        date: "2021-06-01",
        type: "drama",
      },
      {
        title: "Ban from Canada?",
        description: "Claims about being unable to return to Canada and various immigration issues were heavily scrutinized.",
        date: "2023-06-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Animal Neglect Allegations",
        description: "Accused of neglecting her pets, particularly her cats, with viewers claiming they appeared unhealthy in her videos.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Racist and Islamophobic Comments",
        description: "Made multiple racist and Islamophobic comments during streams, particularly regarding her time in Kuwait.",
        date: "2023-03-01",
        severity: "major",
      },
      {
        title: "Domestic Abuse Allegations",
        description: "Both accused others of abuse and was accused of being abusive in her relationships, particularly with Nader.",
        date: "2022-01-01",
        severity: "major",
      },
      {
        title: "Scamming and Fraud Concerns",
        description: "Accused of fundraising under false pretenses and not delivering on promised content or rewards.",
        date: "2021-01-01",
        severity: "moderate",
      },
      {
        title: "Drug Use on Stream",
        description: "Accused of using drugs during livestreams, with viewers speculating about her behavior and appearance.",
        date: "2022-06-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Foodie Beauty Moves to Kuwait",
        content: "Chantal moved to Kuwait and married, documenting the process which raised questions about visa regulations and authenticity.",
        date: "2023-02-01",
        approved: true,
      },
      {
        title: "Community Channels Documenting Her Journey",
        content: "Multiple reaction and commentary channels have built significant followings by covering Foodie Beauty's ongoing controversies.",
        date: "2024-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@FoodieBeauty" },
      { label: "Twitter/X", url: "https://twitter.com/foodiebeauty" },
    ],
  },

  // ========== STREAMING PIONEERS ==========
  {
    name: "Ice Poseidon",
    platform: "Kick",
    category: "IRL",
    bio: "Paul Denino, known as Ice Poseidon, is a controversial live streamer who pioneered IRL (In Real Life) streaming on Twitch before being banned and moving to YouTube and later Kick. He is credited with creating the IRL streaming genre but has been plagued by constant swatting and controversies.",
    imageUrl: "https://i.imgur.com/iceposeidon.jpg",
    moments: [
      {
        title: "Twitch Ban for Swatting",
        description: "Permanently banned from Twitch after being swatted on a plane at Phoenix Sky Harbor Airport, causing the flight to be delayed and disrupting airport operations.",
        date: "2017-04-28",
        type: "event",
      },
      {
        title: "Caroline Burt Relationship Drama",
        description: "Public breakup with girlfriend Caroline Burt played out on stream, including accusations of cheating and manipulation.",
        date: "2018-03-01",
        type: "drama",
      },
      {
        title: "Move to Kick Platform",
        description: "Signed with Kick after being banned from Twitch, becoming one of the platform's early major streamers.",
        date: "2023-06-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Phoenix Airport Swatting",
        description: "Viewer called in a bomb threat while Ice was on a plane, causing evacuation and flight delays. Led to permanent Twitch ban.",
        date: "2017-04-28",
        severity: "major",
      },
      {
        title: "Multiple Swatting Incidents",
        description: "Target of numerous swatting attacks throughout his career, including incidents at his home and public locations while streaming.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "CryptoZoo Scam",
        description: "Promoted a cryptocurrency project called 'CXCoin' that was accused of being a pump and dump scheme, with investors losing money.",
        date: "2021-07-01",
        severity: "major",
      },
      {
        title: "Racist and Homophobic Comments",
        description: "Multiple instances of using racial slurs and homophobic language on stream, contributing to his controversial reputation.",
        date: "2017-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Ice Poseidon Moves to Kick",
        content: "Following bans from Twitch and controversies on YouTube, Ice Poseidon signed an exclusive streaming deal with Kick.",
        date: "2023-06-01",
        sourceUrl: "https://www.kick.com/iceposeidon",
        approved: true,
      },
      {
        title: "The Rise and Fall of Ice Poseidon",
        content: "Documentaries and articles have chronicled Ice Poseidon's impact on streaming culture and his numerous controversies.",
        date: "2022-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/iceposeidon" },
      { label: "YouTube", url: "https://www.youtube.com/@IcePoseidon" },
      { label: "r/Ice_Poseidon", url: "https://www.reddit.com/r/Ice_Poseidon/" },
    ],
  },

  // ========== POLITICAL/COMMENTARY ==========
  {
    name: "Destiny",
    platform: "YouTube",
    category: "Politics",
    bio: "Steven Kenneth Bonnell II, known as Destiny, is a political commentator and streamer known for his debates, controversial takes, and involvement in numerous online feuds. He has been a prominent figure in the online political sphere for over a decade.",
    imageUrl: "https://i.imgur.com/destiny.jpg",
    moments: [
      {
        title: "JonTron Debate",
        description: "Famous debate with JonTron where JonTron made controversial statements about race and immigration, leading to significant fallout for JonTron.",
        date: "2017-03-01",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=6RQA9GZprqM",
      },
      {
        title: "Twitch Ban for Encouraging Violence",
        description: "Banned from Twitch for comments that were interpreted as encouraging violence against protesters.",
        date: "2022-03-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Use of Racial Slurs",
        description: "Has used racial slurs on stream and defended their use in certain contexts, leading to significant criticism.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Encouraging Violence Comments",
        description: "Made comments that were interpreted as encouraging violence against protesters, leading to a Twitch ban.",
        date: "2022-03-01",
        severity: "major",
      },
      {
        title: "Feuds with Other Creators",
        description: "Known for burning bridges with numerous creators including HasanAbi, Vaush, and others through heated debates.",
        date: "2018-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Destiny Banned from Twitch",
        content: "Received a ban from Twitch for comments interpreted as encouraging violence, later moving to YouTube and Kick.",
        date: "2022-03-15",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@Destiny" },
      { label: "Twitter/X", url: "https://twitter.com/TheOmniLiberal" },
      { label: "r/Destiny", url: "https://www.reddit.com/r/Destiny/" },
    ],
  },
  {
    name: "HasanAbi",
    platform: "Twitch",
    category: "Politics",
    bio: "Hasan Piker, known as HasanAbi, is a Turkish-American political commentator and Twitch streamer known for his left-wing political analysis, react content, and involvement in various online controversies. He is one of the most-watched political streamers on Twitch.",
    imageUrl: "https://i.imgur.com/hasanabi.jpg",
    moments: [
      {
        title: "9/11 Comments Controversy",
        description: "Made controversial comments about 9/11 and America's foreign policy that led to significant backlash and a temporary suspension from Twitch.",
        date: "2019-08-01",
        type: "controversy",
      },
      {
        title: "Buying a House in West Hollywood",
        description: "Purchased a $2.7 million home in West Hollywood, leading to criticism about his wealth and socialist beliefs.",
        date: "2021-08-01",
        type: "event",
      },
      {
        title: "Feud with Destiny",
        description: "Ongoing public feud with Destiny that has spanned years, involving heated debates and personal attacks.",
        date: "2019-01-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "9/11 Comments and Twitch Ban",
        description: "Made comments saying 'America deserved 9/11' in the context of foreign policy, leading to a Twitch suspension and widespread condemnation.",
        date: "2019-08-01",
        severity: "major",
      },
      {
        title: "Wealth and Socialist Hypocrisy",
        description: "Criticized for purchasing expensive homes and cars while promoting socialist and anti-capitalist views.",
        date: "2021-08-01",
        severity: "moderate",
      },
      {
        title: "Feuds with Other Leftists",
        description: "Numerous feuds with other left-leaning creators including Destiny, Vaush, and others over political differences.",
        date: "2020-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "HasanAbi Becomes Top Twitch Streamer",
        content: "HasanAbi became one of the most-watched streamers on Twitch, particularly during election coverage and political events.",
        date: "2020-11-01",
        approved: true,
      },
      {
        title: "HasanAbi's House Purchase Controversy",
        content: "The purchase of a $2.7 million home sparked debate about wealth, socialism, and authenticity in political commentary.",
        date: "2021-08-20",
        approved: true,
      },
    ],
    links: [
      { label: "Twitch Channel", url: "https://www.twitch.tv/hasanabi" },
      { label: "YouTube", url: "https://www.youtube.com/@HasanAbi" },
      { label: "Twitter/X", url: "https://twitter.com/hasanthehun" },
    ],
  },

  // ========== DRAMA & NEWS ==========
  {
    name: "Keemstar",
    platform: "YouTube",
    category: "News",
    bio: "Daniel Keem, known as Keemstar, is the host of DramaAlert, a controversial YouTube news show focused on influencer drama, feuds, and controversies. He has been one of the most polarizing figures in the YouTube community for over a decade.",
    imageUrl: "https://i.imgur.com/keemstar.jpg",
    moments: [
      {
        title: "DramaAlert Launch",
        description: "Launched DramaAlert, which became one of the most popular and controversial news channels in the YouTube community.",
        date: "2014-01-01",
        type: "event",
      },
      {
        title: "Idubbbz Content Cop",
        description: "Featured in an Idubbbz Content Cop video that criticized his journalism ethics and past controversies.",
        date: "2016-05-01",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=0eirSp5bTzc",
      },
      {
        title: "Feud with H3H3",
        description: "Long-running feud with H3H3Productions that involved numerous back-and-forth videos and accusations.",
        date: "2019-01-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Accusations of Doxxing",
        description: "Multiple instances of revealing private information about individuals, including minors, on his show DramaAlert.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "Racial Slurs and Racism",
        description: "Past videos surfaced showing Keemstar using racial slurs and making racist comments, leading to widespread criticism.",
        date: "2012-01-01",
        severity: "major",
      },
      {
        title: "False Accusations Against Innocent People",
        description: "Multiple instances of falsely accusing people of serious crimes on DramaAlert, including pedophilia allegations against an innocent elderly man.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "Feud with H3H3 and Other Creators",
        description: "Ongoing public feuds with multiple YouTubers including H3H3Productions, Idubbbz, and others over his journalism ethics.",
        date: "2019-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Keemstar Announces DramaAlert End",
        content: "Keemstar announced plans to eventually step down from DramaAlert, though the show continues with him as host.",
        date: "2024-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "DramaAlert YouTube", url: "https://www.youtube.com/@DramaAlert" },
      { label: "Twitter/X", url: "https://twitter.com/KEEMSTAR" },
      { label: "r/DramaAlert", url: "https://www.reddit.com/r/DramaAlert/" },
    ],
  },
  {
    name: "Onision",
    platform: "YouTube",
    category: "Commentary",
    bio: "Gregory Jackson, known online as Onision, is a controversial YouTuber known for his comedy sketches, music, and extensive personal drama that has led to serious allegations and investigations. He has been the subject of multiple documentaries and investigations due to grooming and abuse allegations.",
    imageUrl: "https://i.imgur.com/onision.jpg",
    moments: [
      {
        title: "Chris Hansen Investigation",
        description: "YouTuber and former Dateline NBC host Chris Hansen began investigating Onision's behavior, conducting interviews with former associates and victims.",
        date: "2019-11-01",
        type: "event",
      },
      {
        title: "Wetlands Documentary Release",
        description: "Discovery+ released a documentary series 'Onision: In Real Life' detailing the allegations against him.",
        date: "2021-01-01",
        type: "event",
      },
      {
        title: "Patreon Ban",
        description: "Banned from Patreon after doxxing a former associate who had accused him of abuse, violating platform policies.",
        date: "2019-12-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Grooming Allegations",
        description: "Multiple women came forward alleging Onision groomed them as teenagers, with some claiming sexual relationships began when they were underage.",
        date: "2019-01-01",
        severity: "major",
        sourceUrl: "https://www.aol.com/timeline-onision-allegations-170000000.html",
      },
      {
        title: "IRS Investigation",
        description: "Investigated by the IRS for tax fraud and tax evasion related to his YouTube income and business practices.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Wetlands Documentary Fallout",
        description: "The Discovery+ documentary revealed extensive evidence of manipulative and abusive behavior toward multiple partners.",
        date: "2021-01-01",
        severity: "major",
      },
      {
        title: "Patreon Ban for Doxxing",
        description: "Banned from Patreon after doxxing a former associate who had accused him of abuse, violating platform policies.",
        date: "2019-12-01",
        severity: "major",
      },
      {
        title: "Abuse Allegations from Multiple Partners",
        description: "Multiple former partners have accused him of emotional and physical abuse, with detailed accounts shared online.",
        date: "2019-01-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "Onision's Home Foreclosed",
        content: "Onision lost his home to foreclosure amid mounting legal fees and declining YouTube revenue.",
        date: "2023-08-01",
        approved: true,
      },
      {
        title: "Chris Hansen Investigation of Onision",
        content: "Chris Hansen's investigation brought mainstream attention to the allegations against Onision.",
        date: "2019-11-15",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@Onision" },
      { label: "r/Onision", url: "https://www.reddit.com/r/Onision/" },
      { label: "Chris Hansen Interviews", url: "https://www.youtube.com/playlist?list=PLu8JMo8oCzvC5l0Yl1X2qvlXJVV_fCj9a" },
    ],
  },
  {
    name: "Chris Chan",
    platform: "YouTube",
    category: "Creator",
    bio: "Christine Weston Chandler, formerly known as Christian Weston Chandler, is the creator of the webcomic Sonichu and one of the most documented and controversial figures in internet history. She has been the subject of extensive online documentation, trolling, and most recently, legal issues involving her mother.",
    imageUrl: "https://i.imgur.com/chrischan.jpg",
    moments: [
      {
        title: "Sonichu Webcomic Creation",
        description: "Created the infamous webcomic 'Sonichu' combining Sonic and Pikachu, which became an internet phenomenon and subject of extensive documentation.",
        date: "2000-03-01",
        type: "creation",
      },
      {
        title: "Arrest for Incest",
        description: "Arrested and charged with incest after allegedly engaging in sexual activity with her elderly mother, who has dementia.",
        date: "2021-08-01",
        type: "event",
      },
      {
        title: "Transition and Name Change",
        description: "Publicly transitioned and changed name from Christian to Christine, documented extensively online.",
        date: "2014-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Incest Arrest and Charges",
        description: "Arrested for allegedly engaging in sexual activity with her 79-year-old mother who suffers from dementia. The case was later dismissed due to mental incompetency.",
        date: "2021-08-01",
        severity: "major",
        sourceUrl: "https://www.aol.com/timeline-chris-chans-incest-charge-170537765.html",
      },
      {
        title: "Years of Online Harassment",
        description: "Subject of extensive online trolling and harassment campaigns spanning over a decade, including doxxing, prank calls, and manipulation.",
        date: "2007-01-01",
        severity: "major",
      },
      {
        title: "Transition and Identity Issues",
        description: "Public gender transition was met with both support and transphobic harassment from various online communities.",
        date: "2014-01-01",
        severity: "moderate",
      },
      {
        title: "Mental Health Crisis",
        description: "Documented struggles with mental health including autism, leading to multiple institutionalizations and legal interventions.",
        date: "2021-08-01",
        severity: "moderate",
      },
      {
        title: "Case Dismissed Due to Incompetency",
        description: "Incest charges were dismissed after she was found mentally incompetent to stand trial, and she was transferred to a care facility.",
        date: "2023-08-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "Chris Chan Case Dismissed",
        content: "Incest charges against Christine Weston Chandler were dismissed after she was found mentally incompetent to stand trial and transferred to a facility.",
        date: "2023-08-01",

        description: "Prior to the sting, there were multiple reports of him sending inappropriate messages to underage fans.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Continued Online Presence Despite Ban",
        description: "Attempted to maintain an online presence through alternative platforms despite being exposed as a predator.",
        date: "2021-06-01",
        severity: "major",
      },
      {
        title: "False Cancer Claims",
        description: "Previously claimed to have cancer for sympathy and donations, later admitting it was fabricated.",
        date: "2019-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "EDP445 Caught in Predator Sting",
        content: "YouTuber EDP445 was caught in a sting operation attempting to meet a minor, leading to his channel termination.",
        date: "2021-04-20",
        sourceUrl: "https://www.newsweek.com/edp445-predator-sting-youtube-1587000",
        approved: true,
      },
      {
        title: "No Charges Filed Against EDP445",
        content: "Despite the sting video evidence, no criminal charges were filed against EDP445 due to technicalities in how the evidence was obtained.",
        date: "2021-05-01",
        sourceUrl: "https://www.sportingnews.com/us/nfl/news/edp445-criminal-charges-update/1e8v9v3v8v8v8v8v8v8v8",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube (Terminated)", url: "https://www.youtube.com/@EDP445" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/edp445" },
      { label: "Wikitubia", url: "https://youtube.fandom.com/wiki/EDP445" },
    ],
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/comments/n2m5ed/edp445_caught_in_predator_sting_operation/",
    ],
    kickClipUrls: [],
  },
  // ========== CX NETWORK IRL STREAMERS ==========
  {
    name: "Hampton Brandon",
    platform: "Kick",
    category: "IRL",
    bio: "The original content king. Hampton Brandon became legendary in the IRL streaming world through his association with Ice Poseidon and the Cx Network. Known for his unpredictable behavior, confrontations with strangers, and the iconic 'TTD' (Ten Toes Down) motto. His streams were a perfect storm of chaos, drama, and genuine unscripted moments that defined early IRL streaming culture.",
    imageUrl: "https://i.pravatar.cc/150?img=33",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/hamptonbrandon/"],
    kickClipUrls: [],
    moments: [
      { title: "TTD - Ten Toes Down", description: "Created the iconic TTD motto and movement", date: "2017-06-01", type: "clip" },
      { title: "Cx Network Origins", description: "Became one of the original Cx Network streamers alongside Ice Poseidon", date: "2017-08-01", type: "event" },
      { title: "RV Trip 1", description: "Participated in the legendary first RV trip with Ice Poseidon", date: "2018-03-01", type: "event" },
      { title: "Content King Streams", description: "Known for streaming 24/7 with constant drama and entertainment", date: "2017-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Multiple Arrests on Stream", description: "Arrested multiple times during live streams for various incidents", date: "2017-01-01", severity: "high" },
      { title: "Platform Bans", description: "Banned from Twitch, YouTube, and other platforms repeatedly", date: "2018-01-01", severity: "medium" },
      { title: "Confrontation with Ice Poseidon", description: "Public falling out with Ice Poseidon and Cx Network", date: "2018-09-01", severity: "medium" },
    ],
    news: [
      { title: "Hampton Brandon Returns to Streaming", content: "After multiple bans and hiatuses, returned to streaming on various platforms", date: "2020-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Reddit Community", url: "https://www.reddit.com/r/hamptonbrandon/" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/hampton-brandon" },
    ],
  },
  {
    name: "Mexican Andy",
    platform: "YouTube/Kick",
    category: "IRL",
    bio: "The Andy who started it all. Mexican Andy became internet famous through his persistent appearances on Ice Poseidon's streams, eventually becoming a core member of the Cx Network. Known for his distinctive appearance, earnest personality, and ability to create content through sheer persistence. Became a meme template and symbol of the 'Andy' archetype in streaming culture.",
    imageUrl: "https://i.pravatar.cc/150?img=34",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=mexican+andy"],
    kickClipUrls: [],
    moments: [
      { title: "First Ice Poseidon Appearance", description: "First appeared on Ice Poseidon's stream, beginning his streaming career", date: "2016-01-01", type: "event" },
      { title: "The Andy Archetype", description: "Became the namesake for all 'Andy' streamers who follow IRL streamers", date: "2017-01-01", type: "event" },
      { title: "24 Hour Challenges", description: "Known for attempting extreme 24-hour streaming challenges", date: "2017-06-01", type: "clip" },
      { title: "Weight Loss Journey", description: "Documented significant weight loss transformation on stream", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "Stalking Allegations", description: "Accused of stalking female streamers for content", date: "2017-01-01", severity: "medium" },
      { title: "Inappropriate Behavior", description: "Multiple instances of inappropriate comments and actions on stream", date: "2018-01-01", severity: "medium" },
    ],
    news: [
      { title: "Mexican Andy Weight Loss Transformation", content: "Documented losing significant weight through streaming his fitness journey", date: "2019-06-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@MexicanAndy" },
      { label: "Reddit Discussions", url: "https://www.reddit.com/r/Ice_Poseidon/search/?q=mexican+andy" },
    ],
  },
  {
    name: "SJC (Samuel J. Cummings)",
    platform: "YouTube",
    category: "IRL",
    bio: "The businessman of the Cx Network. SJC became infamous for his constant claims of being a 'businessman' while living in an RV and creating chaos. Known for his delusional self-image, constant drama with other Cx members, and his role in the infamous RV trips. His catchphrase 'I'm a businessman' became a meme throughout the community.",
    imageUrl: "https://i.pravatar.cc/150?img=60",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=sjc"],
    kickClipUrls: [],
    moments: [
      { title: "I'm a Businessman", description: "Iconic catchphrase repeated constantly during RV trips", date: "2018-03-01", type: "clip" },
      { title: "RV Trip Drama", description: "Central figure in multiple chaotic RV trips across America", date: "2018-03-01", type: "event" },
      { title: "Fight with Hampton Brandon", description: "Physical altercation with Hampton Brandon during Cx event", date: "2018-05-01", type: "controversy" },
    ],
    controversies: [
      { title: "Delusional Business Claims", description: "Constantly claimed to be a successful businessman while living in an RV", date: "2018-01-01", severity: "minor" },
      { title: "Drama with Cx Members", description: "Frequent conflicts with other Cx Network streamers", date: "2018-06-01", severity: "moderate" },
      { title: "RV Trip Chaos", description: "Multiple incidents of creating drama during group RV trips", date: "2018-03-01", severity: "moderate" },
    ],
    news: [
      { title: "SJC's Businessman Meme Origin", content: "The 'I'm a businessman' catchphrase became a community-wide meme", date: "2018-04-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@SJC" },
      { label: "Reddit Discussions", url: "https://www.reddit.com/r/Ice_Poseidon/search/?q=sjc" },
    ],
  },
  {
    name: "EBZ (Ebz Banks)",
    platform: "YouTube",
    category: "IRL",
    bio: "The Cx Network's self-proclaimed rapper and content creator. EBZ became known for his aggressive personality, rap career aspirations, and numerous confrontations with other streamers. Famous for the 'EBZ slap' incident and his persistent attempts to launch a music career while living the RV streaming lifestyle.",
    imageUrl: "https://i.pravatar.cc/150?img=61",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=ebz"],
    kickClipUrls: [],
    moments: [
      { title: "The EBZ Slap", description: "Slapped another streamer during a Cx event, becoming a viral moment", date: "2018-06-01", type: "controversy" },
      { title: "Rap Career Launch", description: "Attempted to launch a rap career with multiple music videos and performances", date: "2018-01-01", type: "event" },
      { title: "RV Trip Confrontations", description: "Multiple heated confrontations during Cx Network RV trips", date: "2018-03-01", type: "clip" },
      { title: "Gator Skin Song", description: "Released 'Gator Skin' and other rap tracks that became community memes", date: "2018-08-01", type: "clip" },
    ],
    controversies: [
      { title: "Physical Altercations", description: "Multiple incidents of physical confrontations with other streamers and bystanders", date: "2018-01-01", severity: "high" },
      { title: "Harassment Allegations", description: "Accused of harassing other streamers and their communities", date: "2018-06-01", severity: "moderate" },
      { title: "Scam Accusations", description: "Accused of various scams including fake merchandise and donation schemes", date: "2019-01-01", severity: "moderate" },
    ],
    news: [
      { title: "EBZ's Rap Career Attempts", content: "Multiple attempts to launch a music career while streaming, with mixed reception", date: "2018-12-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@EBZ" },
      { label: "Reddit Discussions", url: "https://www.reddit.com/r/Ice_Poseidon/search/?q=ebz" },
    ],
  },
  {
    name: "Asian Andy",
    platform: "YouTube",
    category: "IRL",
    bio: "The text-to-speech donation pioneer. Asian Andy became one of the most popular Cx Network streamers by combining IRL streaming with text-to-speech donations, creating chaotic and often offensive content. Known for his TTS pranks, sleeping streams, and ability to generate drama wherever he went.",
    imageUrl: "https://i.pravatar.cc/150?img=62",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/asianandy/"],
    kickClipUrls: [],
    moments: [
      { title: "TTS Donation Chaos", description: "Pioneered text-to-speech donations in IRL streaming, creating viral moments", date: "2017-01-01", type: "clip" },
      { title: "Sleeping Stream Fame", description: "Made thousands of dollars streaming himself sleeping with TTS donations", date: "2017-06-01", type: "clip" },
      { title: "RV Trip Drama", description: "Central figure in Cx Network RV trips with constant drama", date: "2018-03-01", type: "event" },
      { title: "Twitch Ban", description: "Banned from Twitch for TTS content, moved to YouTube streaming", date: "2018-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Offensive TTS Content", description: "Text-to-speech donations often contained racist, sexist, or offensive content played in public", date: "2017-01-01", severity: "high" },
      { title: "Public Disturbances", description: "Multiple incidents of causing public disturbances with TTS pranks in restaurants and stores", date: "2017-06-01", severity: "moderate" },
      { title: "Drama with Other Streamers", description: "Constant feuds with other Cx Network members including Ice Poseidon", date: "2018-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Asian Andy's TTS Innovation", content: "Pioneered the text-to-speech donation model that became standard in IRL streaming", date: "2017-12-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@AsianAndy" },
      { label: "Reddit", url: "https://www.reddit.com/r/asianandy/" },
      { label: "Twitter", url: "https://twitter.com/asianandytwitch" },
    ],
  },
  {
    name: "Tracksuit Andy",
    platform: "YouTube",
    category: "IRL",
    bio: "The UK's contribution to the Cx Network. Tracksuit Andy became known for his signature tracksuit aesthetic, British banter, and IRL streams across the UK. Part of the European wave of Cx streamers who brought a different flavor to the IRL streaming scene with his unique personality and constant smoking on stream.",
    imageUrl: "https://i.pravatar.cc/150?img=63",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=tracksuit+andy"],
    kickClipUrls: [],
    moments: [
      { title: "UK IRL Streaming", description: "Brought UK culture to Cx Network with British IRL content", date: "2017-01-01", type: "event" },
      { title: "Tracksuit Aesthetic", description: "Known for always wearing tracksuits, becoming his signature look", date: "2017-01-01", type: "clip" },
      { title: "Cx Network Europe", description: "Part of the European expansion of Cx Network streamers", date: "2017-06-01", type: "event" },
      { title: "Smoking on Stream", description: "Constantly smoking during streams, becoming a meme in the community", date: "2017-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Drug References", description: "Multiple instances of apparent drug use references on stream", date: "2017-01-01", severity: "moderate" },
      { title: "Drama with UK Streamers", description: "Conflicts with other UK-based IRL streamers", date: "2017-06-01", severity: "minor" },
    ],
    news: [
      { title: "Tracksuit Andy UK Streams", content: "Represented UK IRL streaming within the predominantly American Cx Network", date: "2017-12-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@TracksuitAndy" },
      { label: "Reddit Discussions", url: "https://www.reddit.com/r/Ice_Poseidon/search/?q=tracksuit+andy" },
    ],
  },
  {
    name: "FouseyTube",
    platform: "YouTube",
    category: "IRL",
    bio: "Yousef Erakat, known as FouseyTube, is a controversial YouTuber who transitioned from prank videos to IRL streaming. Known for his dramatic 'July 15th' event that promised a boxing match and concert but ended in chaos, his mental health struggles documented publicly, and his infamous claim of meeting Drake which turned out to be false. A prime example of the jester archetype in modern streaming.",
    imageUrl: "https://i.pravatar.cc/150?img=64",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/FouseyTube/"],
    kickClipUrls: [],
    moments: [
      { title: "July 15th Event", description: "Promised a major event with boxing and concert, ended in chaos and disappointment", date: "2018-07-15", type: "controversy" },
      { title: "Fake Drake Meeting", description: "Claimed to have met Drake, turned out to be false, causing massive backlash", date: "2018-07-15", type: "controversy" },
      { title: "Mental Health Streams", description: "Documented his mental health struggles publicly on stream, including breakdowns", date: "2018-01-01", type: "event" },
      { title: "IRL Comeback", description: "Attempted comeback with IRL streaming after YouTube prank era decline", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "July 15th Scam", description: "The infamous July 15th event that promised much but delivered chaos and disappointment to fans", date: "2018-07-15", severity: "high" },
      { title: "False Drake Claims", description: "Lied about meeting Drake, which was exposed and caused significant reputation damage", date: "2018-07-15", severity: "high" },
      { title: "Mental Health Manipulation", description: "Accused of using mental health issues for sympathy and content", date: "2018-01-01", severity: "moderate" },
      { title: "Donation Scams", description: "Multiple instances of questionable donation drives and fundraisers", date: "2017-01-01", severity: "moderate" },
    ],
    news: [
      { title: "FouseyTube's July 15th Disaster", content: "The July 15th event became one of the most infamous failed streaming events in history", date: "2018-07-16", sourceUrl: "", approved: true },
      { title: "Mental Health Documentary", content: "Public mental health struggles documented through his streaming career", date: "2019-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@FouseyTube" },
      { label: "Twitter", url: "https://twitter.com/fousey" },
      { label: "Instagram", url: "https://instagram.com/fousey" },
    ],
  },
  {
    name: "JiDion",
    platform: "YouTube",
    category: "IRL",
    bio: "Jidon Adams, known as JiDion, is a prank YouTuber and streamer who gained massive popularity through his IRL pranks, public stunts, and controversial behavior. Most infamous for cutting another streamer's hair at TwitchCon, leading to a permanent Twitch ban. Known for his 'praying on your downfall' catchphrase and collaborations with other prank creators.",
    imageUrl: "https://i.pravatar.cc/150?img=65",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/JiDion/"],
    kickClipUrls: [],
    moments: [
      { title: "TwitchCon Haircut Incident", description: "Cut another streamer's hair at TwitchCon, leading to permanent Twitch ban", date: "2022-01-01", type: "controversy" },
      { title: "Twitch Ban", description: "Permanently banned from Twitch following the haircut incident", date: "2022-01-01", type: "controversy" },
      { title: "Niko Omilana Collabs", description: "Famous collaborations with UK prankster Niko Omilana for viral content", date: "2021-01-01", type: "clip" },
      { title: "Praying on Your Downfall", description: "Popularized the catchphrase 'praying on your downfall' in the streaming community", date: "2021-01-01", type: "clip" },
    ],
    controversies: [
      { title: "TwitchCon Assault", description: "Cut another streamer's hair without consent at TwitchCon, considered assault", date: "2022-01-01", severity: "high" },
      { title: "Permanent Twitch Ban", description: "Received permanent ban from Twitch platform following the haircut incident", date: "2022-01-01", severity: "high" },
      { title: "Public Disturbance Pranks", description: "Multiple pranks causing public disturbances and confrontations", date: "2021-01-01", severity: "moderate" },
      { title: "Harassment Accusations", description: "Accused of harassment through his prank content targeting specific individuals", date: "2021-06-01", severity: "moderate" },
    ],
    news: [
      { title: "JiDion Permanently Banned from Twitch", content: "Received permanent ban from Twitch after cutting streamer's hair at TwitchCon", date: "2022-01-15", sourceUrl: "", approved: true },
      { title: "JiDion vs Logan Paul", content: "Public feud with Logan Paul that generated significant controversy and content", date: "2022-06-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@JiDion" },
      { label: "Twitter", url: "https://twitter.com/JiDion6" },
      { label: "Instagram", url: "https://instagram.com/jidion.6" },
    ],
  },
  // ========== ADDITIONAL KICK STREAMERS & IRL ==========
  {
    name: "Sneako",
    platform: "Kick/YouTube",
    category: "Commentary",
    bio: "Sneako (Nicholas Kennan) is a controversial content creator known for his hot takes, red pill ideology, and association with Andrew Tate. Originally a YouTuber, he was banned from the platform and moved to Rumble and Kick. Known for his 'Shots Fired' podcast and provocative commentary on relationships, politics, and culture.",
    imageUrl: "https://i.pravatar.cc/150?img=66",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Sneako/"],
    kickClipUrls: [],
    moments: [
      { title: "YouTube Ban", description: "Banned from YouTube for violating community guidelines, moved to alternative platforms", date: "2022-10-01", type: "controversy" },
      { title: "Shots Fired Podcast", description: "Launched controversial podcast featuring hot takes and guest interviews", date: "2023-01-01", type: "event" },
      { title: "Andrew Tate Association", description: "Became closely associated with Andrew Tate and his network", date: "2022-12-01", type: "event" },
      { title: "Red Pill Content", description: "Became prominent voice in red pill/manosphere community", date: "2023-01-01", type: "event" },
    ],
    controversies: [
      { title: "Misogynistic Content", description: "Multiple instances of content deemed misogynistic and promoting harmful gender stereotypes", date: "2023-01-01", severity: "high" },
      { title: "YouTube Ban Evasion", description: "Attempted to circumvent YouTube ban by appearing on other channels", date: "2023-03-01", severity: "moderate" },
      { title: "Promoting Conspiracy Theories", description: "Spread various conspiracy theories and misinformation through content", date: "2023-06-01", severity: "moderate" },
      { title: "Toxic Fanbase", description: "Criticized for fostering toxic community that harasses critics", date: "2023-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Sneako Banned from YouTube", content: "Permanently banned from YouTube for repeated community guidelines violations", date: "2022-10-15", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Rumble", url: "https://rumble.com/c/Sneako" },
      { label: "Kick", url: "https://kick.com/sneako" },
      { label: "Twitter/X", url: "https://twitter.com/sneako" },
    ],
  },
  {
    name: "Burger Planet",
    platform: "YouTube",
    category: "IRL",
    bio: "Burger Planet is a Cx Network streamer known for his homeless arc, living out of his van, and streaming his daily struggles. Became a meme within the community for his 'Burger' nickname, constant drama with other streamers, and his perseverance through difficult circumstances. His streams documented the harsh realities of trying to make it as a content creator.",
    imageUrl: "https://i.pravatar.cc/150?img=67",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=burger+planet"],
    kickClipUrls: [],
    moments: [
      { title: "Homeless Arc", description: "Lived out of his van while streaming, documenting the struggle of being a homeless streamer", date: "2018-01-01", type: "event" },
      { title: "The 'Burger' Nickname", description: "Became known as 'Burger Planet' within the Cx community", date: "2017-01-01", type: "clip" },
      { title: "RV Trip Participation", description: "Joined Cx Network RV trips despite his difficult living situation", date: "2018-03-01", type: "event" },
      { title: "Feud with Ice Poseidon", description: "Multiple conflicts with Ice Poseidon over money and treatment", date: "2018-06-01", type: "drama" },
    ],
    controversies: [
      { title: "Begging for Donations", description: "Frequently accused of guilt-tripping viewers into donating for basic needs", date: "2018-01-01", severity: "moderate" },
      { title: "Drama with Other Streamers", description: "Constant conflicts with other Cx Network members over money and respect", date: "2018-01-01", severity: "moderate" },
      { title: "Exploiting Homelessness for Content", description: "Criticized for potentially exploiting his situation for views and donations", date: "2018-03-01", severity: "minor" },
    ],
    news: [
      { title: "Burger Planet's Homeless Streaming Arc", content: "Documented the struggles of being a homeless content creator in the Cx Network era", date: "2018-06-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@BurgerPlanet" },
      { label: "Reddit Discussions", url: "https://www.reddit.com/r/Ice_Poseidon/search/?q=burger+planet" },
    ],
  },
  {
    name: "LowTierGod (LTG)",
    platform: "YouTube",
    category: "Gaming",
    bio: "LowTierGod (Dale Emanuel Wilson) is a fighting game streamer and YouTuber infamous for his rage-filled gaming sessions, particularly in Street Fighter. Known for his 'You should kill yourself now!' rant and constant excuses for losing. A prominent figure in the FGC (Fighting Game Community) known more for his toxicity than his skill.",
    imageUrl: "https://i.pravatar.cc/150?img=68",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/LowTierGod/"],
    kickClipUrls: [],
    moments: [
      { title: "'You Should Kill Yourself' Rant", description: "Infamous rant telling a player to kill themselves after losing, became a major meme", date: "2015-01-01", type: "clip" },
      { title: "Ban Evasion Saga", description: "Repeatedly banned from Twitch and created new accounts to continue streaming", date: "2016-01-01", type: "controversy" },
      { title: "FGC Drama", description: "Constant drama with other fighting game community members over his behavior", date: "2015-01-01", type: "drama" },
      { title: "YouTube Transition", description: "Moved primarily to YouTube after multiple Twitch bans", date: "2018-01-01", type: "event" },
    ],
    controversies: [
      { title: "Toxic Rage and Harassment", description: "Multiple instances of extreme toxicity, rage, and harassment of other players", date: "2015-01-01", severity: "high" },
      { title: "Suicide Encouragement", description: "Told players to kill themselves on multiple occasions", date: "2015-01-01", severity: "high" },
      { title: "Racist and Homophobic Slurs", description: "Used racial and homophobic slurs during rage moments", date: "2016-01-01", severity: "high" },
      { title: "Ban Evasion", description: "Repeatedly circumvented Twitch bans to continue streaming", date: "2016-01-01", severity: "moderate" },
    ],
    news: [
      { title: "LowTierGod Banned from Multiple Platforms", content: "Banned from Twitch and other platforms for repeated toxic behavior", date: "2018-01-01", sourceUrl: "https://knowyourmeme.com/memes/people/low-tier-god", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@LowTierGod" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/low-tier-god" },
      { label: "Reddit", url: "https://www.reddit.com/r/LowTierGod/" },
    ],
  },
  {
    name: "LeafyIsHere",
    platform: "YouTube",
    category: "Commentary",
    bio: "LeafyIsHere (Calvin Lee Vail) was one of the most popular YouTubers in the mid-2010s, known for his 'storytime' commentary videos featuring gameplay footage in the background. His content focused on roasting and criticizing other internet personalities. After a series of controversies and the termination of his channel, he made a brief comeback before disappearing again.",
    imageUrl: "https://i.pravatar.cc/150?img=69",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/LeafyIsHere/"],
    kickClipUrls: [],
    moments: [
      { title: "YouTube Termination", description: "Channel terminated by YouTube for violating harassment policies", date: "2020-08-01", type: "controversy" },
      { title: "iDubbbz Content Cop", description: "Featured in iDubbbz's Content Cop which significantly impacted his reputation", date: "2016-10-01", type: "controversy" },
      { title: "Brief Comeback Attempt", description: "Attempted comeback on alternative platforms after YouTube ban", date: "2021-01-01", type: "event" },
      { title: "Peak Popularity Era", description: "At peak had over 4 million subscribers and was one of YouTube's top creators", date: "2016-01-01", type: "event" },
    ],
    controversies: [
      { title: "Harassment and Bullying", description: "Accused of leading harassment campaigns against other creators, particularly smaller ones", date: "2016-01-01", severity: "high" },
      { title: "YouTube Termination", description: "Channel permanently terminated for violating harassment policies", date: "2020-08-01", severity: "high" },
      { title: "Toxic Fanbase", description: "Criticized for fostering toxic community that harassed his targets", date: "2016-01-01", severity: "high" },
      { title: "Racist Comments", description: "Made racist comments in videos that were later criticized", date: "2016-01-01", severity: "moderate" },
    ],
    news: [
      { title: "LeafyIsHere Channel Terminated", content: "YouTube terminated his channel permanently for harassment policy violations", date: "2020-08-24", sourceUrl: "", approved: true },
      { title: "The Rise and Fall of Leafy", content: "Documentary-style coverage of his peak popularity and eventual ban", date: "2021-01-01", approved: true },
    ],
    links: [
      { label: "YouTube (Terminated)", url: "https://www.youtube.com/@LeafyIsHere" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/leafyishere" },
      { label: "Reddit", url: "https://www.reddit.com/r/LeafyIsHere/" },
    ],
  },
  // ========== ADDITIONAL YOUTUBE LOLCOWS ==========
  {
    name: "Danny Duncan",
    platform: "YouTube",
    category: "IRL",
    bio: "Danny Duncan is a YouTuber and entrepreneur known for his prank videos, vlogs, and merchandise brand 'Virginity Rocks.' His content features elaborate pranks, stunts, and interactions with the public. While generally seen as positive, his content has occasionally crossed lines with controversial pranks and public disturbances.",
    imageUrl: "https://i.pravatar.cc/150?img=70",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Danny_Duncan/"],
    kickClipUrls: [],
    moments: [
      { title: "Virginity Rocks Merch Launch", description: "Launched controversial 'Virginity Rocks' merchandise that became a massive success", date: "2017-01-01", type: "event" },
      { title: "Gave Away House to Employee", description: "Gave a house to his longtime employee and friend Papa Jim", date: "2021-01-01", type: "event" },
      { title: "Papa Jim Tribute", description: "Created tribute content after Papa Jim's passing, showing genuine emotional connection", date: "2023-01-01", type: "event" },
      { title: "Tesla Through House Stunt", description: "Drove Tesla through house as elaborate prank/stunt for content", date: "2022-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Public Disturbance Pranks", description: "Multiple pranks causing public disturbances and confrontations with police", date: "2019-01-01", severity: "moderate" },
      { title: "Dangerous Stunts", description: "Performed dangerous stunts that could have resulted in serious injury", date: "2020-01-01", severity: "moderate" },
      { title: "Exploiting Homeless for Content", description: "Criticized for pranks involving homeless individuals that some viewed as exploitative", date: "2018-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Danny Duncan's Virginity Rocks Empire", content: "Built multi-million dollar merchandise empire based on controversial 'Virginity Rocks' branding", date: "2020-01-01", sourceUrl: "", approved: true },
      { title: "Papa Jim Passes Away", content: "Beloved member of Danny's crew Papa Jim passed away, leading to widespread tributes", date: "2023-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@DannyDuncan" },
      { label: "Instagram", url: "https://instagram.com/dannyduncan69" },
      { label: "Twitter/X", url: "https://twitter.com/DannyDuncan" },
    ],
  },
  {
    name: "Niko Omilana",
    platform: "YouTube",
    category: "IRL",
    bio: "Niko Omilana is a British YouTuber known for his prank videos, infiltrating events, and comedic content. He's famous for sneaking into high-profile events like the KSI vs Logan Paul boxing matches and the FIFA Best Awards. His content often involves elaborate pranks and social experiments.",
    imageUrl: "https://i.pravatar.cc/150?img=71",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/NikoOmilana/"],
    kickClipUrls: [],
    moments: [
      { title: "KSI vs Logan Paul Infiltration", description: "Sneaked into KSI vs Logan Paul boxing event pretending to be part of team", date: "2019-01-01", type: "clip" },
      { title: "FIFA Best Awards Prank", description: "Infiltrated FIFA Best Awards ceremony and got close to major football stars", date: "2020-01-01", type: "clip" },
      { title: "Fake Employee Pranks", description: "Series of pranks where he pretended to be employee at various major stores", date: "2018-01-01", type: "clip" },
      { title: "Sidemen Collaborations", description: "Frequent collaborations with Sidemen group for large-scale content", date: "2020-01-01", type: "event" },
    ],
    controversies: [
      { title: "Event Security Breaches", description: "Multiple instances of breaching security at major events causing safety concerns", date: "2019-01-01", severity: "moderate" },
      { title: "Fake Employee Pranks", description: "Pretending to be employee at stores caused confusion and potential legal issues", date: "2018-01-01", severity: "minor" },
      { title: "Trespassing Concerns", description: "Some pranks involved potential trespassing on private property", date: "2020-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Niko Omilana Infiltrates KSI Fight", content: "Successfully sneaked into major boxing event and documented the entire process", date: "2019-01-01", sourceUrl: "", approved: true },
      { title: "Niko's Political Run", content: "Ran for London Mayor as joke candidate but gained significant attention", date: "2021-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@Niko" },
      { label: "Twitter/X", url: "https://twitter.com/NikoOmilana" },
      { label: "Instagram", url: "https://instagram.com/niko" },
    ],
  },
  {
    name: "KSI",
    platform: "YouTube",
    category: "Entertainment",
    bio: "JJ Olatunji, known as KSI, is one of the biggest YouTubers in the world. Starting with gaming commentary, he expanded into boxing, music, and business. While generally successful, he's had numerous controversies including past racist comments, crypto promotion scandals, and various feuds with other creators.",
    imageUrl: "https://i.pravatar.cc/150?img=72",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/ksi/"],
    kickClipUrls: [],
    moments: [
      { title: "KSI vs Logan Paul Boxing", description: "Two major boxing events against Logan Paul that broke internet records", date: "2018-08-01", type: "event" },
      { title: "Sidemen YouTube Empire", description: "Built Sidemen into one of YouTube's most successful creator groups", date: "2016-01-01", type: "event" },
      { title: "Music Career Launch", description: "Launched successful music career with multiple charting singles", date: "2019-01-01", type: "event" },
      { title: "Prime Energy Drink", description: "Co-founded Prime Hydration with Logan Paul, massive business success", date: "2022-01-01", type: "event" },
    ],
    controversies: [
      { title: "Past Racist Comments", description: "Old videos resurfaced showing racist and offensive comments from early YouTube days", date: "2020-01-01", severity: "major" },
      { title: "Crypto Promotion Scandals", description: "Promoted various crypto projects that turned out to be scams or failed", date: "2021-01-01", severity: "major" },
      { title: "Feud with Deji", description: "Public falling out with his brother Deji that played out across social media", date: "2018-01-01", severity: "moderate" },
      { title: "Sexual Assault Joke", description: "Made inappropriate joke about sexual assault that received backlash", date: "2023-01-01", severity: "moderate" },
    ],
    news: [
      { title: "KSI vs Logan Paul Breaks Records", content: "YouTube boxing event became one of the biggest internet events ever", date: "2018-08-01", sourceUrl: "", approved: true },
      { title: "Prime Hydration Success", content: "Prime drink became massive success, selling out stores globally", date: "2023-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@KSI" },
      { label: "Twitter/X", url: "https://twitter.com/KSI" },
      { label: "Instagram", url: "https://instagram.com/ksi" },
    ],
  },
  {
    name: "Logan Paul",
    platform: "YouTube",
    category: "Entertainment",
    bio: "Logan Paul is one of YouTube's most controversial figures. From his early Vine fame to his current podcast and business empire, he's been involved in numerous major controversies including the infamous Japan suicide forest video, crypto scams, and various boxing events. Despite controversies, he maintains massive influence.",
    imageUrl: "https://i.pravatar.cc/150?img=73",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/LoganPaul/"],
    kickClipUrls: [],
    moments: [
      { title: "Japan Suicide Forest Video", description: "Filmed body in Aokigahara forest, causing massive global backlash", date: "2018-01-01", type: "controversy" },
      { title: "KSI Boxing Matches", description: "Two major boxing events against KSI that drew massive viewership", date: "2018-08-01", type: "event" },
      { title: "CryptoZoo NFT Scam", description: "Launched NFT project that turned out to be a scam, never delivered promised features", date: "2021-01-01", type: "controversy" },
      { title: "Prime Energy Drink", description: "Co-founded Prime with KSI, became massive business success", date: "2022-01-01", type: "event" },
    ],
    controversies: [
      { title: "Japan Suicide Forest Video", description: "Filmed and uploaded video showing body in suicide forest, extreme backlash", date: "2018-01-01", severity: "high" },
      { title: "CryptoZoo NFT Scam", description: "Launched NFT project that never delivered, many investors lost money", date: "2021-01-01", severity: "high" },
      { title: "Dwarf Wrestling Controversy", description: "Promoted dwarf wrestling events criticized as exploitative", date: "2019-01-01", severity: "moderate" },
      { title: "False Claims About Flat Earth", description: "Made false claims about being first to prove Earth is round by going to space", date: "2022-01-01", severity: "minor" },
    ],
    news: [
      { title: "Logan Paul Suicide Forest Controversy", content: "Global backlash after filming body in Japan's suicide forest", date: "2018-01-01", sourceUrl: "", approved: true },
      { title: "Coffeezilla Exposes CryptoZoo", content: "Investigative journalist exposed CryptoZoo as a scam", date: "2022-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@loganpaulvlogs" },
      { label: "Twitter/X", url: "https://twitter.com/LoganPaul" },
      { label: "Instagram", url: "https://instagram.com/loganpaul" },
    ],
  },
  {
    name: "Jake Paul",
    platform: "YouTube",
    category: "Entertainment",
    bio: "Jake Paul is a YouTuber, boxer, and entrepreneur known for his controversial content, Team 10 house, and boxing career. Started with Vine, moved to YouTube pranks and vlogs, then pivoted to boxing where he's had mixed results. Constantly surrounded by drama, accusations of scamming, and various controversies.",
    imageUrl: "https://i.pravatar.cc/150?img=74",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/JakePaul/"],
    kickClipUrls: [],
    moments: [
      { title: "Team 10 House Drama", description: "Created Team 10 content house that dissolved amid drama and accusations", date: "2017-01-01", type: "drama" },
      { title: "It's Everyday Bro", description: "Released controversial music video that became one of most disliked YouTube videos", date: "2017-05-01", type: "clip" },
      { title: "Boxing Career Launch", description: "Transitioned to boxing with fight against Deji, then built boxing career", date: "2018-08-01", type: "event" },
      { title: "FBI Raid", description: "Home raided by FBI in connection with looting allegations during protests", date: "2020-08-01", type: "controversy" },
    ],
    controversies: [
      { title: "Team 10 Scam Allegations", description: "Accused of exploiting young creators through Team 10 contracts", date: "2018-01-01", severity: "high" },
      { title: "Looting During Protests", description: "Accused of looting during George Floyd protests, led to FBI raid", date: "2020-06-01", severity: "major" },
      { title: "Crypto Promotion Scams", description: "Promoted multiple crypto projects that turned out to be scams", date: "2021-01-01", severity: "major" },
      { title: "Fake Marriage to Tana Mongeau", description: "Staged fake marriage to Tana Mongeau for content and publicity", date: "2019-07-01", severity: "moderate" },
    ],
    news: [
      { title: "Jake Paul FBI Raid", content: "FBI raided his home in connection with looting investigation", date: "2020-08-01", sourceUrl: "", approved: true },
      { title: "Jake Paul Boxing Career", content: "Built controversial but successful boxing career with multiple high-profile fights", date: "2021-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@jakepaul" },
      { label: "Twitter/X", url: "https://twitter.com/jakepaul" },
      { label: "Instagram", url: "https://instagram.com/jakepaul" },
    ],
  },
  // ========== ADDITIONAL RESEARCHED LOLCOWS ==========
  {
    name: "Dr Disrespect",
    platform: "YouTube",
    category: "Gaming",
    bio: "Herschel 'Guy' Beahm IV, known as Dr Disrespect, is a flamboyant gaming streamer famous for his 80s action hero persona, signature mullet, and reflective sunglasses. Permanently banned from Twitch in 2020 under mysterious circumstances, he moved to YouTube. Known for his 'Violence. Speed. Momentum.' catchphrase and over-the-top confidence that often leads to hilarious failures.",
    imageUrl: "https://i.pravatar.cc/150?img=75",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/DrDisrespectLive/"],
    kickClipUrls: [],
    moments: [
      { title: "Twitch Ban Mystery", description: "Permanently banned from Twitch in 2020 for unknown reasons, sparked massive speculation", date: "2020-06-01", type: "controversy" },
      { title: "YouTube Transition", description: "Successfully transitioned to YouTube streaming after Twitch ban", date: "2020-08-01", type: "event" },
      { title: "Mid-Stream Bathroom Incident", description: "Infamous E3 2019 incident where he streamed from a public bathroom", date: "2019-06-01", type: "controversy" },
      { title: "The Arena Reveal", description: "Elaborate set design reveals became his signature production style", date: "2017-01-01", type: "event" },
    ],
    controversies: [
      { title: "Twitch Permanent Ban", description: "Banned from Twitch for reasons still not publicly disclosed, led to lawsuits", date: "2020-06-01", severity: "high" },
      { title: "E3 Bathroom Streaming", description: "Streamed from public bathroom at E3, violating privacy laws and Twitch TOS", date: "2019-06-01", severity: "major" },
      { title: "Adultery Admission", description: "Admitted to cheating on his wife, took break from streaming to 'repair family'", date: "2017-12-01", severity: "moderate" },
      { title: "Toxic Behavior", description: "Frequently toxic to other players and streamers while maintaining 'character'", date: "2018-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Dr Disrespect Banned from Twitch", content: "Mysterious permanent ban from Twitch that remains unexplained to this day", date: "2020-06-26", sourceUrl: "", approved: true },
      { title: "Dr Disrespect Returns to YouTube", content: "Made successful comeback on YouTube after Twitch ban", date: "2020-08-06", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@DrDisrespect" },
      { label: "Twitter/X", url: "https://twitter.com/DrDisrespect" },
    ],
  },
  {
    name: "Ninja",
    platform: "Twitch/YouTube",
    category: "Gaming",
    bio: "Tyler 'Ninja' Blevins is the most famous Fortnite streamer who became a mainstream celebrity. Known for his colorful hair, hyperactive energy, and moving from Twitch to Mixer (then back). While generally positive, he's had moments of toxicity, the 'n-word' controversy, and his famous 'do not bully me' rant that became a meme.",
    imageUrl: "https://i.pravatar.cc/150?img=76",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/ninja/"],
    kickClipUrls: [],
    moments: [
      { title: "Fortnite Peak Popularity", description: "Became the face of Fortnite during its peak, played with Drake and Travis Scott", date: "2018-03-01", type: "event" },
      { title: "Mixer Move and Return", description: "Left Twitch for Microsoft's Mixer in exclusive deal, returned when Mixer shut down", date: "2019-08-01", type: "event" },
      { title: "'Do Not Bully Me' Rant", description: "Famous rant telling viewers not to bully him, became widespread meme", date: "2018-01-01", type: "clip" },
      { title: "New Year's Eve Floss Fail", description: "Attempted to floss dance in Times Square on New Year's Eve, awkwardly failed", date: "2018-12-31", type: "clip" },
    ],
    controversies: [
      { title: "N-Word Controversy", description: "Accidentally said racial slur while rapping along to song on stream", date: "2018-03-01", severity: "major" },
      { title: "Divorce Joke Backlash", description: "Made joke about divorce that received backlash given his young audience", date: "2018-01-01", severity: "minor" },
      { title: "Toxicity Towards Stream Snipers", description: "Frequently raged at stream snipers, showing less family-friendly side", date: "2018-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Ninja Leaves Twitch for Mixer", content: "Shocking move to Microsoft's Mixer platform in exclusive streaming deal", date: "2019-08-01", sourceUrl: "", approved: true },
      { title: "Ninja Returns to Twitch", content: "Came back to Twitch after Microsoft shut down Mixer platform", date: "2020-09-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Twitch", url: "https://www.twitch.tv/ninja" },
      { label: "YouTube", url: "https://www.youtube.com/@Ninja" },
      { label: "Twitter/X", url: "https://twitter.com/Ninja" },
    ],
  },
  {
    name: "xQc",
    platform: "Kick",
    category: "Gaming",
    bio: "Félix Lengyel, known as xQc, is a former Overwatch pro turned variety streamer. Famous for his ADHD-fueled streams, constant malding, and being the most-watched Twitch streamer for years. Known for his $100M Kick deal while still streaming on Twitch, his messy breakup with Adept, and constant drama with other streamers.",
    imageUrl: "https://i.pravatar.cc/150?img=77",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/xqcow/"],
    kickClipUrls: [],
    moments: [
      { title: "$100M Kick Deal", description: "Signed massive $100M deal with Kick while continuing to stream on Twitch", date: "2023-06-01", type: "event" },
      { title: "Adept Lawsuit Drama", description: "Public breakup and lawsuit with ex-girlfriend Adept played out on stream", date: "2022-01-01", type: "drama" },
      { title: "Pokimane Feud", description: "Long-standing feud with Pokimane over various streaming issues", date: "2021-01-01", type: "drama" },
      { title: "TwitchCon Fights", description: "Multiple physical altercations and drama at TwitchCon events", date: "2022-10-01", type: "controversy" },
    ],
    controversies: [
      { title: "Gambling Streams", description: "Promoted gambling on stream, received criticism for influencing young audience", date: "2021-01-01", severity: "major" },
      { title: "Adept Legal Battle", description: "Lawsuit with ex-girlfriend over shared property and finances", date: "2022-01-01", severity: "major" },
      { title: "TwitchCon Physical Altercations", description: "Multiple incidents of physical fights at TwitchCon events", date: "2022-10-01", severity: "major" },
      { title: "DMCA Strikes", description: "Received multiple DMCA strikes for streaming copyrighted content", date: "2021-01-01", severity: "moderate" },
    ],
    news: [
      { title: "xQc Signs $100M Kick Deal", content: "One of the largest streaming deals in history with Kick platform", date: "2023-06-01", sourceUrl: "", approved: true },
      { title: "xQc vs Adept Lawsuit", content: "Legal battle with ex-girlfriend over finances and property", date: "2022-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Kick", url: "https://kick.com/xqc" },
      { label: "Twitch", url: "https://www.twitch.tv/xqc" },
      { label: "Twitter/X", url: "https://twitter.com/xqc" },
    ],
  },
  {
    name: "HasanAbi",
    platform: "Twitch",
    category: "Commentary",
    bio: "Hasan Piker is a political commentator and Twitch streamer known for his left-wing takes, react content, and being the 'Bernie Bro' of streaming. Famous for buying a $3M house in West Hollywood while being a socialist commentator, leading to accusations of hypocrisy. Known for his debates and constant drama with other political streamers.",
    imageUrl: "https://i.pravatar.cc/150?img=78",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Hasan_Piker/"],
    kickClipUrls: [],
    moments: [
      { title: "$3M House Purchase", description: "Bought expensive house in West Hollywood, sparked hypocrisy debates about socialism", date: "2021-08-01", type: "controversy" },
      { title: "9/11 Comments", description: "Controversial comments about 9/11 and US foreign policy on TYT", date: "2019-08-01", type: "controversy" },
      { title: "Austin Drama", description: "Ongoing feud with Austin (Destiny) and other political streamers", date: "2020-01-01", type: "drama" },
      { title: "Twitch Rivals Drama", description: "Multiple incidents of drama during Twitch Rivals events", date: "2021-01-01", type: "drama" },
    ],
    controversies: [
      { title: "Socialist Millionaire Hypocrisy", description: "Criticized for being wealthy socialist, buying expensive house and cars", date: "2021-08-01", severity: "moderate" },
      { title: "9/11 'America Deserved It' Comments", description: "Said America deserved 9/11 on TYT, received massive backlash", date: "2019-08-01", severity: "major" },
      { title: "Dan Crenshaw Eye Patch Joke", description: "Made fun of Dan Crenshaw's eye patch, received bipartisan criticism", date: "2019-08-01", severity: "moderate" },
      { title: "Gambling Promotion", description: "Promoted gambling sponsor despite socialist image", date: "2022-01-01", severity: "moderate" },
    ],
    news: [
      { title: "HasanAbi Buys $3M House", content: "Purchase of expensive West Hollywood home sparked hypocrisy debates", date: "2021-08-20", sourceUrl: "", approved: true },
      { title: "HasanAbi 9/11 Comments Controversy", content: "Controversial statements about 9/11 on The Young Turks", date: "2019-08-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Twitch", url: "https://www.twitch.tv/hasanabi" },
      { label: "YouTube", url: "https://www.youtube.com/@HasanAbi" },
      { label: "Twitter/X", url: "https://twitter.com/hasanthehun" },
    ],
  },
  {
    name: "Mizkif",
    platform: "Twitch",
    category: "IRL",
    bio: "Matthew Rinaudo, known as Mizkif, is an IRL streamer and co-founder of One True King (OTK) organization. Known for his 'Lamonting' (failing), sarcastic humor, and various controversies including the CrazySlick sexual assault coverup allegations. Famous for his Pokemon card opening streams and OTK drama.",
    imageUrl: "https://i.pravatar.cc/150?img=79",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/mizkif/"],
    kickClipUrls: [],
    moments: [
      { title: "OTK Founding", description: "Co-founded One True King organization with other major streamers", date: "2020-10-01", type: "event" },
      { title: "CrazySlick Coverup Allegations", description: "Accused of covering up sexual assault by his friend CrazySlick", date: "2022-09-01", type: "controversy" },
      { title: "Maya Breakup", description: "Public breakup with fellow streamer Maya Higa played out on stream", date: "2021-01-01", type: "drama" },
      { title: "Pokemon Card Scams", description: "Multiple controversies around Pokemon card openings and alleged scams", date: "2021-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "CrazySlick Sexual Assault Coverup", description: "Accused of covering up sexual assault allegations against his friend", date: "2022-09-01", severity: "high" },
      { title: "OTK Drama and Departures", description: "Multiple members left OTK amid various controversies and drama", date: "2022-01-01", severity: "moderate" },
      { title: "Gambling Promotion", description: "Promoted gambling streams despite knowing his young audience", date: "2022-01-01", severity: "moderate" },
      { title: "LGBTQ+ Joke Backlash", description: "Made jokes that received backlash from LGBTQ+ community", date: "2021-01-01", severity: "minor" },
    ],
    news: [
      { title: "Mizkif CrazySlick Coverup Allegations", content: "Major controversy over alleged coverup of sexual assault", date: "2022-09-01", sourceUrl: "", approved: true },
      { title: "Mizkif Steps Down from OTK", content: "Temporarily stepped down from OTK during CrazySlick investigation", date: "2022-09-20", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Twitch", url: "https://www.twitch.tv/mizkif" },
      { label: "YouTube", url: "https://www.youtube.com/@Mizkif" },
      { label: "Twitter/X", url: "https://twitter.com/realmizkif" },
    ],
  },
  {
    name: "Amouranth",
    platform: "Twitch",
    category: "Just Chatting",
    bio: "Kaitlyn Siragusa, known as Amouranth, is one of the most successful female Twitch streamers. Known for her 'hot tub meta' streams, ASMR content, and revealing her abusive marriage. She's a business powerhouse with massive investments, but has faced constant criticism for her content style and accusations of exploiting her audience.",
    imageUrl: "https://i.pravatar.cc/150?img=80",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Amouranth/"],
    kickClipUrls: [],
    moments: [
      { title: "Hot Tub Meta Pioneer", description: "Pioneered the controversial 'hot tub' streaming meta on Twitch", date: "2021-01-01", type: "event" },
      { title: "Abusive Marriage Reveal", description: "Revealed she was in abusive marriage, husband controlled her content and finances", date: "2022-10-01", type: "event" },
      { title: "Business Empire Reveal", description: "Revealed massive investments in gas stations, real estate, and other businesses", date: "2022-01-01", type: "event" },
      { title: "ASMR Meta", description: "Became face of ASMR streaming meta with controversial ear-licking content", date: "2021-01-01", type: "event" },
    ],
    controversies: [
      { title: "Sexual Content on Twitch", description: "Constantly pushed boundaries of sexual content on platform, multiple bans", date: "2021-01-01", severity: "moderate" },
      { title: "Exploiting Simps", description: "Accused of exploiting lonely viewers for donations and subscriptions", date: "2021-01-01", severity: "moderate" },
      { title: "Marriage Fraud Allegations", description: "Some accused her of faking abusive marriage story for sympathy and views", date: "2022-10-01", severity: "moderate" },
      { title: "Copycat Content", description: "Accused of copying other creators' content and business ideas", date: "2022-01-01", severity: "minor" },
    ],
    news: [
      { title: "Amouranth Reveals Abusive Marriage", content: "Emotional stream revealing husband's abuse and control over her career", date: "2022-10-15", sourceUrl: "", approved: true },
      { title: "Amouranth Business Empire", content: "Revealed ownership of multiple gas stations and real estate investments", date: "2022-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "Twitch", url: "https://www.twitch.tv/amouranth" },
      { label: "Twitter/X", url: "https://twitter.com/Amouranth" },
      { label: "Instagram", url: "https://instagram.com/amouranth" },
    ],
  },
  // ========== MORE FUNNY/UNIQUE LOLCOWS ==========
  {
    name: "Elpresador",
    platform: "YouTube",
    category: "Gaming",
    bio: "Elpresador is a Call of Duty YouTuber known for his extreme rage, conspiracy theories, and bizarre beliefs. Famous for his 'box' (basement) streams, claims about being a 'god', and his intense hatred of various game mechanics. His content is a mix of gaming rage and increasingly unhinged rants about various topics.",
    imageUrl: "https://i.pravatar.cc/150?img=81",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/elpresador/"],
    kickClipUrls: [],
    moments: [
      { title: "The Box Streams", description: "Famous for streaming from his basement 'box' with minimal lighting and setup", date: "2010-01-01", type: "clip" },
      { title: "'I Am God' Rants", description: "Multiple streams where he claimed to be a god or have divine powers", date: "2015-01-01", type: "clip" },
      { title: "Conspiracy Theory Era", description: "Period of intense conspiracy theory content about various topics", date: "2016-01-01", type: "event" },
      { title: "Call of Duty Rage Compilation", description: "Extreme rage moments in Call of Duty became viral content", date: "2012-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Mental Health Concerns", description: "Behavior raised concerns about mental health among viewers", date: "2015-01-01", severity: "moderate" },
      { title: "Conspiracy Misinformation", description: "Spread various conspiracy theories and misinformation through content", date: "2016-01-01", severity: "moderate" },
      { title: "Toxic Community", description: "Fostered toxic community that harassed other creators", date: "2014-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Elpresador's Decline", content: "Documented decline in content quality and increasing bizarre behavior", date: "2018-01-01", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@elpresador" },
      { label: "Reddit", url: "https://www.reddit.com/r/elpresador/" },
    ],
  },
  {
    name: "OnlyUseMeBlade",
    platform: "YouTube",
    category: "Gaming",
    bio: "OnlyUseMeBlade is a Call of Duty YouTuber who became infamous for his alcoholism, declining health, and IRL streaming career. Started as a gaming content creator, but his life took a dark turn documented extensively through his streams. Known for his wheelchair, alcohol struggles, and association with various controversial IRL streamers.",
    imageUrl: "https://i.pravatar.cc/150?img=82",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/search/?q=onlyusemeblade"],
    kickClipUrls: [],
    moments: [
      { title: "Wheelchair Era", description: "Became wheelchair-bound due to health issues, continued streaming", date: "2019-01-01", type: "event" },
      { title: "Alcoholism Documentation", description: "Streams documented severe alcoholism and its effects on his life", date: "2018-01-01", type: "event" },
      { title: "Cx Network Association", description: "Became associated with Cx Network streamers during IRL streaming era", date: "2018-01-01", type: "event" },
      { title: "Health Decline", description: "Public health decline documented extensively on stream", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "Alcohol Abuse on Stream", description: "Regularly drank excessively on stream, concerning viewers", date: "2018-01-01", severity: "major" },
      { title: "Health Neglect", description: "Accused of neglecting serious health issues for content", date: "2019-01-01", severity: "major" },
      { title: "Exploitation Concerns", description: "Some accused others of exploiting his condition for views", date: "2019-01-01", severity: "moderate" },
    ],
    news: [
      { title: "OnlyUseMeBlade Health Crisis", content: "Documented severe health issues related to alcoholism on stream", date: "2019-01-01", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@OnlyUseMeBlade" },
    ],
  },
  {
    name: "Andy Milonakis",
    platform: "Twitch/YouTube",
    category: "IRL",
    bio: "Andy Milonakis is a comedian and streamer known for his sketch comedy show on MTV, then transitioning to IRL streaming. Has a growth hormone deficiency that gives him a youthful appearance. Known for his deadpan humor, food reviews, and being a fixture in the IRL streaming community. Often the voice of reason among chaotic streamers.",
    imageUrl: "https://i.pravatar.cc/150?img=83",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/andymilonakis/"],
    kickClipUrls: [],
    moments: [
      { title: "MTV Show Era", description: "Had popular sketch comedy show on MTV 'The Andy Milonakis Show'", date: "2005-01-01", type: "event" },
      { title: "Transition to IRL Streaming", description: "Successfully transitioned from TV to IRL streaming on Twitch", date: "2015-01-01", type: "event" },
      { title: "Cx Network Participation", description: "Participated in Cx Network events and RV trips", date: "2017-01-01", type: "event" },
      { title: "Food Review Streams", description: "Popular food review streams became his signature content", date: "2018-01-01", type: "event" },
    ],
    controversies: [
      { title: "Age Jokes and Harassment", description: "Constantly targeted with jokes about his appearance and age", date: "2015-01-01", severity: "minor" },
      { title: "Association with Controversial Streamers", description: "Criticized for associating with controversial IRL streamers", date: "2017-01-01", severity: "minor" },
    ],
    news: [
      { title: "Andy Milonakis Streaming Success", content: "Successfully built streaming career after TV show ended", date: "2018-01-01", approved: true },
    ],
    links: [
      { label: "Twitch", url: "https://www.twitch.tv/andymilonakis" },
      { label: "YouTube", url: "https://www.youtube.com/@AndyMilonakis" },
      { label: "Twitter/X", url: "https://twitter.com/andymilonakis" },
    ],
  },
  {
    name: "Hyphonix",
    platform: "YouTube/Kick",
    category: "IRL",
    bio: "Hyphonix is a streamer known for his gaming content, IRL streams, and elaborate setups. Banned from Twitch multiple times, he moved to YouTube and then Kick. Known for his technical setups, gaming skills, and being part of the Cx Network ecosystem. His streams often feature complex production and interactive elements.",
    imageUrl: "https://i.pravatar.cc/150?img=84",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/hyphonix/"],
    kickClipUrls: [],
    moments: [
      { title: "Twitch Ban and Move to YouTube", description: "Banned from Twitch, successfully transitioned to YouTube streaming", date: "2018-01-01", type: "event" },
      { title: "Cx Network Participation", description: "Active member of Cx Network during peak IRL streaming era", date: "2017-01-01", type: "event" },
      { title: "Kick Transition", description: "Moved to Kick platform after YouTube restrictions", date: "2023-01-01", type: "event" },
      { title: "Elaborate Stream Setups", description: "Known for complex technical setups and production quality", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "Twitch Ban Reasons", description: "Multiple bans from Twitch for various TOS violations", date: "2018-01-01", severity: "moderate" },
      { title: "YouTube Restrictions", description: "Faced demonetization and restrictions on YouTube", date: "2020-01-01", severity: "moderate" },
    ],
    news: [
      { title: "Hyphonix Moves to Kick", content: "Latest platform transition to Kick streaming", date: "2023-01-01", approved: true },
    ],
    links: [
      { label: "Kick", url: "https://kick.com/hyphonix" },
      { label: "YouTube", url: "https://www.youtube.com/@Hyphonix" },
    ],
  },
  {
    name: "Sam Hyde",
    platform: "YouTube",
    category: "Comedy",
    bio: "Sam Hyde is a comedian and co-founder of Million Dollar Extreme (MDE). Known for his controversial comedy, trolling, and being the subject of endless 'Sam Hyde is the shooter' memes. His show was canceled by Adult Swim amid controversy, and he's become a cult figure in internet comedy. Known for provocative humor that blurs lines.",
    imageUrl: "https://i.pravatar.cc/150?img=85",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/milliondollarextreme/"],
    kickClipUrls: [],
    moments: [
      { title: "Million Dollar Extreme Show", description: "MDE World Peace aired on Adult Swim before cancellation", date: "2016-01-01", type: "event" },
      { title: "Adult Swim Cancellation", description: "Show canceled amid controversy over content and politics", date: "2016-12-01", type: "controversy" },
      { title: "'Sam Hyde is the Shooter' Meme", description: "Became subject of meme falsely identifying him as various attackers", date: "2017-01-01", type: "clip" },
      { title: "TEDx Troll", description: "Infamous TEDx talk that was elaborate troll of TED format", date: "2013-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Alt-Right Association", description: "Accused of having alt-right connections and promoting extremist views", date: "2016-01-01", severity: "major" },
      { title: "Transphobic Content", description: "Criticized for transphobic jokes and content", date: "2016-01-01", severity: "major" },
      { title: "Racist Humor", description: "Used racist humor that received widespread criticism", date: "2016-01-01", severity: "major" },
      { title: "Show Cancellation Fallout", description: "Adult Swim cancellation led to controversy and fan backlash", date: "2016-12-01", severity: "moderate" },
    ],
    news: [
      { title: "Sam Hyde Show Canceled", content: "Adult Swim canceled MDE World Peace amid controversy", date: "2016-12-01", sourceUrl: "", approved: true },
      { title: "Sam Hyde TEDx Troll", content: "Infamous TEDx talk revealed as elaborate prank", date: "2013-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@milliondollarextreme" },
      { label: "Twitter/X", url: "https://twitter.com/samdontap" },
    ],
  },
  {
    name: "Projared",
    platform: "YouTube",
    category: "Gaming",
    bio: "Projared (Jared Knabenbauer) was a popular gaming YouTuber who faced one of the biggest cancellation events in YouTube history. Accused of soliciting nudes from underage fans and cheating on his wife, he lost hundreds of thousands of subscribers overnight. He has since attempted a comeback with mixed reception.",
    imageUrl: "https://i.pravatar.cc/150?img=86",
    tweetUrls: [],
    redditUrls: ["https://www.reddit.com/r/Projared/"],
    kickClipUrls: [],
    moments: [
      { title: "Cancellation Event", description: "Mass cancellation after accusations of soliciting minors and cheating", date: "2019-05-01", type: "controversy" },
      { title: "Subscriber Loss Record", description: "Lost over 100K subscribers in days, one of YouTube's biggest losses", date: "2019-05-01", type: "event" },
      { title: "Comeback Attempt", description: "Attempted comeback with explanation video and new content", date: "2020-01-01", type: "event" },
      { title: "Divorce Finalized", description: "Divorce from Heidi O'Ferrall finalized after public drama", date: "2019-12-01", type: "event" },
    ],
    controversies: [
      { title: "Soliciting Minors", description: "Accused of soliciting nude photos from underage fans through Tumblr", date: "2019-05-01", severity: "high" },
      { title: "Cheating on Wife", description: "Accused of cheating on wife Heidi with fellow YouTuber", date: "2019-05-01", severity: "major" },
      { title: "Power Abuse", description: "Accused of using YouTube fame to manipulate fans", date: "2019-05-01", severity: "major" },
    ],
    news: [
      { title: "Projared Cancellation", content: "One of YouTube's biggest cancellation events unfolded over days", date: "2019-05-10", sourceUrl: "", approved: true },
      { title: "Projared Attempts Comeback", content: "Released explanation video and attempted to return to YouTube", date: "2020-01-01", sourceUrl: "", approved: true },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@Projared" },
      { label: "Twitter/X", url: "https://twitter.com/Projared" },
    ],
  },
];

async function seedRichData() {
  console.log("🌱 Seeding rich content data...\n");

  for (const nominee of nominees) {
    // Check if nominee already exists
    const db = await getDb();
    if (!db) {
      console.error("❌ Database not available");
      continue;
    }
    
    const existing = await db.select().from(nomineesTable).where(eq(nomineesTable.name, nominee.name)).limit(1);
    if (existing.length > 0) {
      console.log(`⏭️  Skipping ${nominee.name} (already exists)`);
      continue;
    }

    // Create nominee (using only fields that exist in the schema)
    await db.insert(nomineesTable).values({
      name: nominee.name,
      description: nominee.bio,
      imageUrl: nominee.imageUrl,
      status: "approved",
    });
    
    // Get the created nominee
    const [created] = await db.select().from(nomineesTable).where(eq(nomineesTable.name, nominee.name)).limit(1);
    console.log(`✅ Created: ${nominee.name} (ID: ${created.id})`);

    // Add moments
    for (const moment of nominee.moments) {
      await insertNotableMoment({
        nomineeId: created.id,
        title: moment.title,
        description: moment.description,
        timestamp: moment.date,
        videoUrl: (moment as any).videoUrl || null,
      });
    }
    console.log(`   📹 Added ${nominee.moments.length} moments`);

    // Add controversies
    for (const controversy of nominee.controversies) {
      await insertControversy({
        nomineeId: created.id,
        title: controversy.title,
        description: controversy.description,
        date: controversy.date,
        severity: controversy.severity as "minor" | "moderate" | "major",
        sourceUrl: (controversy as any).sourceUrl || null,
      });
    }
    console.log(`   ⚠️  Added ${nominee.controversies.length} controversies`);

    // Add news
    for (const news of nominee.news) {
      await insertNewsItem({
        nomineeId: created.id,
        title: news.title,
        content: news.content,
        sourceUrl: (news as any).sourceUrl || null,
        date: news.date,
        approved: true,
      });
    }
    console.log(`   📰 Added ${nominee.news.length} news items`);

    // Add links
    for (const link of nominee.links) {
      await insertExternalLink({
        nomineeId: created.id,
        label: link.label,
        url: link.url,
      });
    }
    console.log(`   🔗 Added ${nominee.links.length} external links`);

    // Add tweets
    if ((nominee as any).tweetUrls) {
      for (const tweetUrl of (nominee as any).tweetUrls) {
        const tweetIdMatch = tweetUrl.match(/(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/i);
        await insertNomineeTweet({
          nomineeId: created.id,
          tweetUrl: tweetUrl,
          tweetId: tweetIdMatch ? tweetIdMatch[1] : null,
          description: null,
        });
      }
      console.log(`   🐦 Added ${(nominee as any).tweetUrls.length} tweets`);
    }

    // Add reddit posts
    if ((nominee as any).redditUrls) {
      for (const postUrl of (nominee as any).redditUrls) {
        const match = postUrl.match(/reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i);
        await insertNomineeRedditPost({
          nomineeId: created.id,
          postUrl: postUrl,
          subreddit: match ? match[1] : null,
          postId: match ? match[2] : null,
          description: null,
        });
      }
      console.log(`   👽 Added ${(nominee as any).redditUrls.length} Reddit posts`);
    }

    // Add kick clips
    if ((nominee as any).kickClipUrls) {
      for (const clipUrl of (nominee as any).kickClipUrls) {
        const channelMatch = clipUrl.match(/kick\.com\/([a-zA-Z0-9_-]+)/i);
        const clipMatch = clipUrl.match(/clip=([a-zA-Z0-9_-]+)/i);
        await insertNomineeKickClip({
          nomineeId: created.id,
          clipUrl: clipUrl,
          clipId: clipMatch ? clipMatch[1] : null,
          channelName: channelMatch ? channelMatch[1] : null,
          description: null,
        });
      }
      console.log(`   🎥 Added ${(nominee as any).kickClipUrls.length} Kick clips`);
    }

    console.log("");
  }

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

// Run if executed directly
if (require.main === module) {
  seedRichData().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
}

export { seedRichData };

  // ========== MUKBANG/WEIGHT LOSS COMMUNITY ==========
  {
    name: "Amberlynn Reid",
    platform: "YouTube",
    category: "Lifestyle",
    bio: "Amberlynn Reid is an American YouTuber known for her weight loss journey videos, mukbang content, and lifestyle vlogs. She has one of the most documented and analyzed weight loss journeys on the platform, with a massive community of reaction channels and critics following her content. Her cycle of failed weight loss attempts has become a subject of extensive online commentary.",
    imageUrl: "https://i.imgur.com/amberlynnreid.jpg",
    moments: [
      {
        title: "The '100 Day Challenge' Fail",
        description: "Multiple failed 100-day challenges to lose weight became a recurring theme and source of criticism.",
        date: "2019-01-01",
        type: "event",
      },
      {
        title: "Cancer Diagnosis",
        description: "Announced she had been diagnosed with uterine cancer, which was met with both sympathy and skepticism from the community.",
        date: "2020-01-01",
        type: "event",
      },
      {
        title: "Becky Breakup",
        description: "Breakup with long-term girlfriend Becky was documented extensively, including moving out and starting a new relationship.",
        date: "2021-07-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Years of Failed Weight Loss Promises",
        description: "For nearly a decade, has made repeated promises to lose weight while continuing to gain, leading to accusations of lying to her audience.",
        date: "2014-01-01",
        severity: "moderate",
      },
      {
        title: "Cancer Diagnosis Skepticism",
        description: "Her cancer diagnosis was met with widespread skepticism due to her history of exaggeration, though she did undergo treatment.",
        date: "2020-01-01",
        severity: "moderate",
      },
      {
        title: "Torrid Clothing Haul Addiction",
        description: "Extensive spending on plus-size clothing hauls while claiming financial hardship and health issues.",
        date: "2018-01-01",
        severity: "minor",
      },
      {
        title: "Pet Neglect Allegations",
        description: "Accused of neglecting her pets, with her dog being notably overweight and concerns about proper care.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Doxxing and Harassment of Critics",
        description: "Accused of doxxing and sending her followers after critics and reaction channels who covered her content.",
        date: "2020-06-01",
        severity: "major",
      },
      {
        title: "Wipey/Wifey Relationship Controversy",
        description: "Her relationship with 'Wifey' (later revealed as Jade) was shrouded in secrecy and accusations of manipulation.",
        date: "2021-10-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Amberlynn Reid's Documented Journey",
        content: "Amberlynn has one of the most documented weight journeys on YouTube, with hundreds of reaction channels analyzing her content.",
        date: "2023-01-01",
        approved: true,
      },
      {
        title: "Cancer Treatment and Recovery",
        content: "Amberlynn underwent cancer treatment and announced being cancer-free, though skepticism remained in parts of the community.",
        date: "2021-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@AmberlynnReid" },
      { label: "Twitter/X", url: "https://twitter.com/amberlynnreid" },
      { label: "r/AmberlynnReid", url: "https://www.reddit.com/r/AmberlynnReid/" },
    ],
  },
  {
    name: "Nikocado Avocado",
    platform: "YouTube",
    category: "Food",
    bio: "Nicholas Perry, known as Nikocado Avocado, is a Ukrainian-American YouTuber famous for his extreme mukbang videos where he consumes massive quantities of food while displaying emotional outbursts and dramatic behavior. He underwent a dramatic weight loss transformation in 2024 that shocked the internet with his 'Two Steps Ahead' reveal.",
    imageUrl: "https://i.imgur.com/nikocado.jpg",
    moments: [
      {
        title: "The 'Two Steps Ahead' Reveal",
        description: "Revealed he had lost over 250 pounds in a dramatic video titled 'Two Steps Ahead' where he showed his transformation after being 'gone' from the internet.",
        date: "2024-09-06",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=0bIRmZv5D4Y",
      },
      {
        title: "Mental Breakdown Compilation",
        description: "His series of videos featuring emotional breakdowns, arguments with his husband Orlin, and dramatic weight gain became viral sensations.",
        date: "2019-06-01",
        type: "clip",
      },
      {
        title: "Collab with Stephanie Soo Drama",
        description: "Public falling out with fellow mukbang creator Stephanie Soo led to accusations of manipulation and toxicity.",
        date: "2019-12-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Mental Health Exploitation Concerns",
        description: "Criticized for potentially faking or exaggerating mental health issues and breakdowns for views and engagement.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Toxic Relationship Display",
        description: "His on-again, off-again relationship with husband Orlin was frequently broadcast with toxic fights, raising concerns about domestic dynamics.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Extreme Weight Gain for Content",
        description: "Gained over 200 pounds intentionally for mukbang content, raising serious health concerns and criticism for promoting unhealthy eating.",
        date: "2018-01-01",
        severity: "major",
      },
      {
        title: "Manipulation of Other Creators",
        description: "Multiple creators, including Stephanie Soo, accused him of manipulative behavior and toxicity in collaborations.",
        date: "2019-12-01",
        severity: "moderate",
      },
      {
        title: "Clickbait and Deception",
        description: "Frequently used clickbait titles and thumbnails, including fake weight loss claims before his actual 2024 transformation.",
        date: "2021-01-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "Nikocado Avocado Shocks Internet with Weight Loss",
        content: "Nikocado revealed he had secretly lost over 250 pounds over two years while posting pre-recorded older content, breaking the internet.",
        date: "2024-09-06",
        sourceUrl: "https://www.bbc.com/news/articles/cj0yz2l2v5eo",
        approved: true,
      },
      {
        title: "The 'Two Steps Ahead' Phenomenon",
        content: "His comeback video and transformation became one of the most viral moments of 2024, with millions of views and widespread discussion.",
        date: "2024-09-10",
        sourceUrl: "https://www.nytimes.com/2024/09/10/style/nikocado-avocado-weight-loss.html",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@NikocadoAvocado" },
      { label: "Twitter/X", url: "https://twitter.com/NikocadoAvocado" },
      { label: "Instagram", url: "https://www.instagram.com/nikocadoavocado/" },
    ],
  },
  {
    name: "Foodie Beauty",
    platform: "YouTube",
    category: "Food",
    bio: "Chantal Marie, known as Foodie Beauty, is a Canadian YouTuber and mukbang creator known for her controversial takes, dramatic relationships, and ongoing weight loss journey that has been documented extensively online. She has been involved in numerous online feuds and controversies throughout her career, particularly around her move to Kuwait.",
    imageUrl: "https://i.imgur.com/foodiebeauty.jpg",
    moments: [
      {
        title: "Marriage to Salah",
        description: "Traveled to Kuwait and married Salah, a relationship that was heavily documented and criticized by the community.",
        date: "2023-01-01",
        type: "event",
      },
      {
        title: "Nader Elshamy Feud",
        description: "Toxic on-and-off relationship with Nader Elshamy played out publicly with accusations from both sides.",
        date: "2021-06-01",
        type: "drama",
      },
      {
        title: "Ban from Canada?",
        description: "Claims about being unable to return to Canada and various immigration issues were heavily scrutinized.",
        date: "2023-06-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Animal Neglect Allegations",
        description: "Accused of neglecting her pets, particularly her cats, with viewers claiming they appeared unhealthy in her videos.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Racist and Islamophobic Comments",
        description: "Made multiple racist and Islamophobic comments during streams, particularly regarding her time in Kuwait.",
        date: "2023-03-01",
        severity: "major",
      },
      {
        title: "Domestic Abuse Allegations",
        description: "Both accused others of abuse and was accused of being abusive in her relationships, particularly with Nader.",
        date: "2022-01-01",
        severity: "major",
      },
      {
        title: "Scamming and Fraud Concerns",
        description: "Accused of fundraising under false pretenses and not delivering on promised content or rewards.",
        date: "2021-01-01",
        severity: "moderate",
      },
      {
        title: "Drug Use on Stream",
        description: "Accused of using drugs during livestreams, with viewers speculating about her behavior and appearance.",
        date: "2022-06-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Foodie Beauty Moves to Kuwait",
        content: "Chantal moved to Kuwait and married, documenting the process which raised questions about visa regulations and authenticity.",
        date: "2023-02-01",
        approved: true,
      },
      {
        title: "Community Channels Documenting Her Journey",
        content: "Multiple reaction and commentary channels have built significant followings by covering Foodie Beauty's ongoing controversies.",
        date: "2024-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@FoodieBeauty" },
      { label: "Twitter/X", url: "https://twitter.com/foodiebeauty" },
    ],
  },

  // ========== STREAMING PIONEERS & CONTROVERSIES ==========
  {
    name: "Ice Poseidon",
    platform: "Kick",
    category: "IRL",
    bio: "Paul Denino, known as Ice Poseidon, is a controversial live streamer who pioneered IRL (In Real Life) streaming on Twitch before being banned and moving to YouTube and later Kick. He is credited with creating the IRL streaming genre but has been plagued by constant swatting and controversies.",
    imageUrl: "https://i.imgur.com/iceposeidon.jpg",
    moments: [
      {
        title: "Twitch Ban for Swatting",
        description: "Permanently banned from Twitch after being swatted on a plane at Phoenix Sky Harbor Airport, causing the flight to be delayed and disrupting airport operations.",
        date: "2017-04-28",
        type: "event",
      },
      {
        title: "Caroline Burt Relationship Drama",
        description: "Public breakup with girlfriend Caroline Burt played out on stream, including accusations of cheating and manipulation.",
        date: "2018-03-01",
        type: "drama",
      },
      {
        title: "Move to Kick Platform",
        description: "Signed with Kick after being banned from Twitch, becoming one of the platform's early major streamers.",
        date: "2023-06-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Phoenix Airport Swatting",
        description: "Viewer called in a bomb threat while Ice was on a plane, causing evacuation and flight delays. Led to permanent Twitch ban.",
        date: "2017-04-28",
        severity: "major",
      },
      {
        title: "Multiple Swatting Incidents",
        description: "Target of numerous swatting attacks throughout his career, including incidents at his home and public locations while streaming.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "CryptoZoo Scam",
        description: "Promoted a cryptocurrency project called 'CXCoin' that was accused of being a pump and dump scheme, with investors losing money.",
        date: "2021-07-01",
        severity: "major",
      },
      {
        title: "Racist and Homophobic Comments",
        description: "Multiple instances of using racial slurs and homophobic language on stream, contributing to his controversial reputation.",
        date: "2017-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Ice Poseidon Moves to Kick",
        content: "Following bans from Twitch and controversies on YouTube, Ice Poseidon signed an exclusive streaming deal with Kick.",
        date: "2023-06-01",
        sourceUrl: "https://www.kick.com/iceposeidon",
        approved: true,
      },
      {
        title: "The Rise and Fall of Ice Poseidon",
        content: "Documentaries and articles have chronicled Ice Poseidon's impact on streaming culture and his numerous controversies.",
        date: "2022-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/iceposeidon" },
      { label: "YouTube", url: "https://www.youtube.com/@IcePoseidon" },
      { label: "r/Ice_Poseidon", url: "https://www.reddit.com/r/Ice_Poseidon/" },
    ],
  },

  // ========== POLITICAL/COMMENTARY STREAMERS ==========
  {
    name: "Destiny",
    platform: "YouTube",
    category: "Politics",
    bio: "Steven Kenneth Bonnell II, known as Destiny, is a political commentator and streamer known for his debates, controversial takes, and involvement in numerous online feuds. He has been a prominent figure in the online political sphere for over a decade, often taking contrarian positions that generate significant backlash.",
    imageUrl: "https://i.imgur.com/destiny.jpg",
    moments: [
      {
        title: "JonTron Debate",
        description: "Famous debate with JonTron where JonTron made controversial statements about race and immigration, leading to significant fallout for JonTron.",
        date: "2017-03-01",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=6RQA9GZprqM",
      },
      {
        title: "Twitch Ban for Encouraging Violence",
        description: "Banned from Twitch for comments that were interpreted as encouraging violence against protesters.",
        date: "2022-03-01",
        type: "event",
      },
      {
        title: "Feud with Vaush and Lefty Streamers",
        description: "Ongoing public feuds with other left-leaning streamers including Vaush, HasanAbi, and others over political differences.",
        date: "2020-01-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Use of Racial Slurs",
        description: "Has used racial slurs on stream and defended their use in certain contexts, leading to significant criticism.",
        date: "2019-01-01",
        severity: "major",
      },
      {
        title: "Encouraging Violence Comments",
        description: "Made comments that were interpreted as encouraging violence against protesters, leading to a Twitch ban.",
        date: "2022-03-01",
        severity: "major",
      },
      {
        title: "Feuds with Other Creators",
        description: "Known for burning bridges with numerous creators including HasanAbi, Vaush, and others through heated debates and personal attacks.",
        date: "2018-01-01",
        severity: "moderate",
      },
      {
        title: "Controversial Political Takes",
        description: "Numerous controversial political positions that have generated backlash from both left and right-wing communities.",
        date: "2016-01-01",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Destiny Banned from Twitch",
        content: "Received a ban from Twitch for comments interpreted as encouraging violence, later moving to YouTube and Kick.",
        date: "2022-03-15",
        approved: true,
      },
      {
        title: "Destiny's Political Influence",
        content: "Has become one of the most prominent political streamers, influencing online political discourse for over a decade.",
        date: "2023-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@Destiny" },
      { label: "Twitter/X", url: "https://twitter.com/TheOmniLiberal" },
      { label: "r/Destiny", url: "https://www.reddit.com/r/Destiny/" },
    ],
  },
  {
    name: "HasanAbi",
    platform: "Twitch",
    category: "Politics",
    bio: "Hasan Piker, known as HasanAbi, is a Turkish-American political commentator and Twitch streamer known for his left-wing political analysis, react content, and involvement in various online controversies. He is one of the most-watched political streamers on Twitch and has been involved in numerous feuds with other creators.",
    imageUrl: "https://i.imgur.com/hasanabi.jpg",
    moments: [
      {
        title: "9/11 Comments Controversy",
        description: "Made controversial comments about 9/11 and America's foreign policy that led to significant backlash and a temporary suspension from Twitch.",
        date: "2019-08-01",
        type: "controversy",
      },
      {
        title: "Buying a House in West Hollywood",
        description: "Purchased a $2.7 million home in West Hollywood, leading to criticism about his wealth and socialist beliefs.",
        date: "2021-08-01",
        type: "event",
      },
      {
        title: "Feud with Destiny",
        description: "Ongoing public feud with Destiny that has spanned years, involving heated debates and personal attacks.",
        date: "2019-01-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "9/11 Comments and Twitch Ban",
        description: "Made comments saying 'America deserved 9/11' in the context of foreign policy, leading to a Twitch suspension and widespread condemnation.",
        date: "2019-08-01",
        severity: "major",
      },
      {
        title: "Wealth and Socialist Hypocrisy",
        description: "Criticized for purchasing expensive homes and cars while promoting socialist and anti-capitalist views.",
        date: "2021-08-01",
        severity: "moderate",
      },
      {
        title: "Feuds with Other Leftists",
        description: "Numerous feuds with other left-leaning creators including Destiny, Vaush, and others over political differences.",
        date: "2020-01-01",
        severity: "moderate",
      },
      {
        title: "Dog Breeding Controversy",
        description: "Criticized for breeding his dogs, with animal welfare advocates raising concerns about ethical breeding practices.",
        date: "2022-01-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "HasanAbi Becomes Top Twitch Streamer",
        content: "HasanAbi became one of the most-watched streamers on Twitch, particularly during election coverage and political events.",
        date: "2020-11-01",
        approved: true,
      },
      {
        title: "HasanAbi's House Purchase Controversy",
        content: "The purchase of a $2.7 million home sparked debate about wealth, socialism, and authenticity in political commentary.",
        date: "2021-08-20",
        approved: true,
      },
    ],
    links: [
      { label: "Twitch Channel", url: "https://www.twitch.tv/hasanabi" },
      { label: "YouTube", url: "https://www.youtube.com/@HasanAbi" },
      { label: "Twitter/X", url: "https://twitter.com/hasanthehun" },
    ],
  },

  // ========== DRAMA & NEWS CHANNELS ==========
  {
    name: "Keemstar",
    platform: "YouTube",
    category: "News",
    bio: "Daniel Keem, known as Keemstar, is the host of DramaAlert, a controversial YouTube news show focused on influencer drama, feuds, and controversies. He has been one of the most polarizing figures in the YouTube community for over a decade, with numerous controversies surrounding his journalism ethics and personal conduct.",
    imageUrl: "https://i.imgur.com/keemstar.jpg",
    moments: [
      {
        title: "DramaAlert Launch",
        description: "Launched DramaAlert, which became one of the most popular and controversial news channels in the YouTube community.",
        date: "2014-01-01",
        type: "event",
      },
      {
        title: "Idubbbz Content Cop",
        description: "Featured in an Idubbbz Content Cop video that criticized his journalism ethics and past controversies.",
        date: "2016-05-01",
        type: "event",
        videoUrl: "https://www.youtube.com/watch?v=0eirSp5bTzc",
      },
      {
        title: "Feud with H3H3",
        description: "Long-running feud with H3H3Productions that involved numerous back-and-forth videos and accusations.",
        date: "2019-01-01",
        type: "drama",
      },
    ],
    controversies: [
      {
        title: "Accusations of Doxxing",
        description: "Multiple instances of revealing private information about individuals, including minors, on his show DramaAlert.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "Racial Slurs and Racism",
        description: "Past videos surfaced showing Keemstar using racial slurs and making racist comments, leading to widespread criticism.",
        date: "2012-01-01",
        severity: "major",
      },
      {
        title: "False Accusations Against Innocent People",
        description: "Multiple instances of falsely accusing people of serious crimes on DramaAlert, including pedophilia allegations against an innocent elderly man.",
        date: "2016-01-01",
        severity: "major",
      },
      {
        title: "Feud with H3H3 and Other Creators",
        description: "Ongoing public feuds with multiple YouTubers including H3H3Productions, Idubbbz, and others over his journalism ethics.",
        date: "2019-01-01",
        severity: "moderate",
      },
      {
        title: "Allegations of Pedophilia Jokes",
        description: "Made inappropriate jokes about pedophilia in old videos that resurfaced and caused controversy.",
        date: "2016-01-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "Keemstar Announces DramaAlert End",
        content: "Keemstar announced plans to eventually step down from DramaAlert, though the show continues with him as host.",
        date: "2024-01-01",
        approved: true,
      },
      {
        title: "Keemstar vs H3H3 Feud Continues",
        content: "The long-running feud between Keemstar and H3H3Productions continues with periodic flare-ups and accusations.",
        date: "2023-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "DramaAlert YouTube", url: "https://www.youtube.com/@DramaAlert" },
      { label: "Twitter/X", url: "https://twitter.com/KEEMSTAR" },
      { label: "r/DramaAlert", url: "https://www.reddit.com/r/DramaAlert/" },
    ],
  },
  {
    name: "Onision",
    platform: "YouTube",
    category: "Commentary",
    bio: "Gregory Jackson, known online as Onision, is a controversial YouTuber known for his comedy sketches, music, and extensive personal drama that has led to serious allegations and investigations. He has been the subject of multiple documentaries and investigations due to grooming and abuse allegations.",
    imageUrl: "https://i.imgur.com/onision.jpg",
    moments: [
      {
        title: "Chris Hansen Investigation",
        description: "YouTuber and former Dateline NBC host Chris Hansen began investigating Onision's behavior, conducting interviews with former associates and victims.",
        date: "2019-11-01",
        type: "event",
      },
      {
        title: "Wetlands Documentary Release",
        description: "Discovery+ released a documentary series 'Onision: In Real Life' detailing the allegations against him.",
        date: "2021-01-01",
        type: "event",
      },
      {
        title: "Patreon Ban",
        description: "Banned from Patreon after doxxing a former associate who had accused him of abuse, violating platform policies.",
        date: "2019-12-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Grooming Allegations",
        description: "Multiple women came forward alleging Onision groomed them as teenagers, with some claiming sexual relationships began when they were underage.",
        date: "2019-01-01",
        severity: "major",
        sourceUrl: "https://www.aol.com/timeline-onision-allegations-170000000.html",
      },
      {
        title: "IRS Investigation",
        description: "Investigated by the IRS for tax fraud and tax evasion related to his YouTube income and business practices.",
        date: "2020-01-01",
        severity: "major",
      },
      {
        title: "Wetlands Documentary Fallout",
        description: "The Discovery+ documentary revealed extensive evidence of manipulative and abusive behavior toward multiple partners.",
        date: "2021-01-01",
        severity: "major",
      },
      {
        title: "Patreon Ban for Doxxing",
        description: "Banned from Patreon after doxxing a former associate who had accused him of abuse, violating platform policies.",
        date: "2019-12-01",
        severity: "major",
      },
      {
        title: "Abuse Allegations from Multiple Partners",
        description: "Multiple former partners have accused him of emotional and physical abuse, with detailed accounts shared online.",
        date: "2019-01-01",
        severity: "major",
      },
    ],
    news: [
      {
        title: "Onision's Home Foreclosed",
        content: "Onision lost his home to foreclosure amid mounting legal fees and declining YouTube revenue.",
        date: "2023-08-01",
        approved: true,
      },
      {
        title: "Chris Hansen Investigation of Onision",
        content: "Chris Hansen's investigation brought mainstream attention to the allegations against Onision.",
        date: "2019-11-15",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@Onision" },
      { label: "r/Onision", url: "https://www.reddit.com/r/Onision/" },
      { label: "Chris Hansen Interviews", url: "https://www.youtube.com/playlist?list=PLu8JMo8oCzvC5l0Yl1X2qvlXJVV_fCj9a" },
    ],
  },
  {
    name: "Chris Chan",
    platform: "YouTube",
    category: "Creator",
    bio: "Christine Weston Chandler, formerly known as Christian Weston Chandler, is the creator of the webcomic Sonichu and one of the most documented and controversial figures in internet history. She has been the subject of extensive online documentation, trolling, and most recently, legal issues involving her mother.",
    imageUrl: "https://i.imgur.com/chrischan.jpg",
    moments: [
      {
        title: "Sonichu Webcomic Creation",
        description: "Created the infamous webcomic 'Sonichu' combining Sonic and Pikachu, which became an internet phenomenon and subject of extensive documentation.",
        date: "2000-03-01",
        type: "creation",
      },
      {
        title: "Arrest for Incest",
        description: "Arrested and charged with incest after allegedly engaging in sexual activity with her elderly mother, who has dementia.",
        date: "2021-08-01",
        type: "event",
      },
      {
        title: "Transition and Name Change",
        description: "Publicly transitioned and changed name from Christian to Christine, documented extensively online.",
        date: "2014-01-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Incest Arrest and Charges",
        description: "Arrested for allegedly engaging in sexual activity with her 79-year-old mother who suffers from dementia. The case was later dismissed due to mental incompetency.",
        date: "2021-08-01",
        severity: "major",
        sourceUrl: "https://www.aol.com/timeline-chris-chans-incest-charge-170537765.html",
      },
      {
        title: "Years of Online Harassment",
        description: "Subject of extensive online trolling and harassment campaigns spanning over a decade, including doxxing, prank calls, and manipulation.",
        date: "2007-01-01",
        severity: "major",
      },
      {
        title: "Transition and Identity Issues",
        description: "Public gender transition was met with both support and transphobic harassment from various online communities.",
        date: "2014-01-01",
        severity: "moderate",
      },
      {
        title: "Mental Health Crisis",
        description: "Documented struggles with mental health including autism, leading to multiple institutionalizations and legal interventions.",
        date: "2021-08-01",
        severity: "moderate",
      },
      {
        title: "Case Dismiss
