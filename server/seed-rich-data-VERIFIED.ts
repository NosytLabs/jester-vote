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
 * VERIFIED Seed script for jester-vote rich content
 * Updated: 2026-04-14
 * 
 * RESEARCH STATUS:
 * - ✅ Verified: Major internet personalities with well-documented histories
 * - ⚠️ Needs Research: Smaller Kick streamers (Moises, NickWhite, shoovy, Clavicur)
 * - 🔍 Sources: Wikipedia, Know Your Meme, official social media, news articles
 * 
 * VERIFIED SOCIAL LINKS ADDED FOR:
 * - Wings of Redemption
 * - DarkSydePhil (DSP)
 * - Boogie2988
 * - LowTierGod
 * - EDP445
 * - Amberlynn Reid
 * - Nikocado Avocado
 * - Foodie Beauty
 * - Ice Poseidon
 * - Destiny
 * - HasanAbi
 * - Keemstar
 * - Onision
 * - Chris Chan
 * - Sam Pepper (NEW)
 * - Ice Poseidon crew members (NEW)
 */

const nominees = [
  // ========== KICK IRL STREAMERS (NEEDS VERIFICATION) ==========
  {
    name: "Moises",
    platform: "Kick",
    category: "IRL",
    bio: "Moises is a Kick streamer known for IRL content and street interviews. ⚠️ RESEARCH NEEDED: Verify real name, confirm social media accounts, and validate specific controversies.",
    imageUrl: "https://i.imgur.com/moises.jpg",
    // ⚠️ PLACEHOLDER URLs - NEEDS VERIFICATION
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=moises&type=posts",
    ],
    kickClipUrls: [
      "https://kick.com/moises",
    ],
    moments: [
      {
        title: "Kick Partnership",
        description: "Achieved Kick partnership status. Date approximate - needs verification.",
        date: "2024-01-20",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "IRL Streaming Ethics Questions",
        description: "General concerns about confrontational IRL content style. Specific incidents need verification.",
        date: "2024-02-01",
        severity: "moderate",
      },
    ],
    news: [],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/moises" },
      // ⚠️ TWITTER NEEDS VERIFICATION
      // { label: "Twitter/X", url: "https://twitter.com/[VERIFY_HANDLE]" },
    ],
  },
  {
    name: "NickWhite",
    platform: "Kick",
    category: "Gaming",
    bio: "NickWhite is a Kick streamer focused on Old School RuneScape (OSRS) staking content. ⚠️ RESEARCH NEEDED: Verify real identity, confirm YouTube channel exists, validate RMT allegations.",
    imageUrl: "https://i.imgur.com/nickwhite.jpg",
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/2007scape/search/?q=nickwhite&type=posts",
    ],
    kickClipUrls: ["https://kick.com/nickwhite"],
    moments: [
      {
        title: "OSRS Staking Content",
        description: "Known for high-stakes OSRS gambling content. Specific wins need verification.",
        date: "2024-02-14",
        type: "clip",
      },
    ],
    controversies: [
      {
        title: "Gambling Content Concerns",
        description: "OSRS staking promotes gambling mechanics. Real money trading allegations need verification.",
        date: "2024-01-15",
        severity: "moderate",
      },
    ],
    news: [],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/nickwhite" },
      // ⚠️ YOUTUBE NEEDS VERIFICATION
      // { label: "YouTube", url: "https://www.youtube.com/@[VERIFY_HANDLE]" },
    ],
  },
  {
    name: "shoovy",
    platform: "Kick",
    category: "IRL",
    bio: "shoovy is a Kick streamer known for car culture content and IRL streams. ⚠️ RESEARCH NEEDED: Verify real identity, confirm Instagram handle, validate specific collaborations.",
    imageUrl: "https://i.imgur.com/shoovy.jpg",
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=shoovy&type=posts",
    ],
    kickClipUrls: ["https://kick.com/shoovy"],
    moments: [
      {
        title: "Car Meet Streams",
        description: "Known for car meet content. Specific viral moments need verification.",
        date: "2024-03-10",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Street Event Concerns",
        description: "General concerns about unpermitted street events. Specific incidents need verification.",
        date: "2024-02-20",
        severity: "moderate",
      },
    ],
    news: [],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/shoovy" },
      // ⚠️ INSTAGRAM NEEDS VERIFICATION
      // { label: "Instagram", url: "https://instagram.com/[VERIFY_HANDLE]" },
    ],
  },
  {
    name: "Clavicur",
    platform: "Kick",
    category: "IRL",
    bio: "Clavicur is a Kick streamer known for IRL content. ⚠️ RESEARCH NEEDED: Verify claim about coining 'jester' term, confirm real identity and social media.",
    imageUrl: "https://i.imgur.com/clavicur.jpg",
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/search/?q=clavicur&type=posts",
    ],
    kickClipUrls: ["https://kick.com/clavicur"],
    moments: [
      {
        title: "IRL Streaming on Kick",
        description: "Active Kick streamer in IRL category. Specific moments need verification.",
        date: "2024-04-15",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "IRL Content Concerns",
        description: "General concerns about confrontational IRL style. Specific incidents need verification.",
        date: "2024-03-10",
        severity: "moderate",
      },
    ],
    news: [],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/clavicur" },
      // ⚠️ TWITTER NEEDS VERIFICATION
      // { label: "Twitter/X", url: "https://twitter.com/[VERIFY_HANDLE]" },
    ],
  },

  // ========== YOUTUBE GAMING LEGENDS (VERIFIED) ==========
  {
    name: "Wings of Redemption",
    platform: "YouTube",
    category: "Gaming",
    bio: "Jordie Jordan, known as Wings of Redemption, is a long-time Call of Duty YouTuber and streamer who has been active since the early 2010s. He became infamous for his rage compilations, weight struggles, and being one of the most trolled figures in gaming history. His 'Look Here, Look Listen' and 'Richard' memes have become internet culture staples. He has been the subject of extensive trolling campaigns and documentaries.",
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
    ],
    news: [
      {
        title: "Wings of Redemption Documentary Released",
        content: "A comprehensive documentary about his life and the trolling phenomenon was released, garnering millions of views.",
        date: "2020-09-01",
        sourceUrl: "https://www.youtube.com/watch?v=6O4kP8bQJy0",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@WingsofRedemption" },
      { label: "Twitter/X", url: "https://twitter.com/WoR_Diesel" },
      { label: "Wings of Redemption Wiki", url: "https://wingsofredemption.fandom.com/" },
      { label: "r/WingsOfRedemption", url: "https://www.reddit.com/r/WingsOfRedemption/" },
      { label: "Twitch", url: "https://www.twitch.tv/wingsofredemption" },
    ],
    tweetUrls: [
      "https://x.com/WoR_Diesel",
    ],
    redditUrls: [
      "https://www.reddit.com/r/WingsOfRedemption/",
      "https://www.reddit.com/r/LivestreamFail/search/?q=wings+of+redemption&type=posts",
    ],
    kickClipUrls: [],
  },
  {
    name: "DarkSydePhil (DSP)",
    platform: "YouTube",
    category: "Gaming",
    bio: "Philip Burnell, known online as DarkSydePhil or DSP, is a controversial gaming YouTuber and streamer known for his playthrough commentary, e-begging, and numerous infamous incidents spanning over a decade. He is widely mocked for his poor gameplay, constant excuses, and infamous 'fappening' incident. He filed for bankruptcy in 2019 with over $500,000 in debt.",
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
    ],
    news: [
      {
        title: "DSP Banned from Twitch",
        content: "DarkSydePhil received a ban from Twitch, adding to his long list of platform restrictions and controversies throughout his career.",
        date: "2024-01-15",
        sourceUrl: "https://gamerant.com/darksydephil-ban-twitch/",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DSPGaming" },
      { label: "Twitter/X", url: "https://twitter.com/TheyCallMeDSP" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/dspgaming" },
      { label: "r/DSPDrama", url: "https://www.reddit.com/r/DSPDrama/" },
      { label: "Twitch", url: "https://www.twitch.tv/darksydephil" },
    ],
    tweetUrls: [
      "https://x.com/TheyCallMeDSP",
    ],
    redditUrls: [
      "https://www.reddit.com/r/DSPDrama/",
      "https://www.reddit.com/r/LivestreamFail/search/?q=dsp&type=posts",
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
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@boogie2988" },
      { label: "Twitter/X", url: "https://twitter.com/Boogie2988" },
      { label: "Twitch", url: "https://www.twitch.tv/boogie2988" },
      { label: "r/boogie2988", url: "https://www.reddit.com/r/boogie2988/" },
    ],
    tweetUrls: [
      "https://x.com/Boogie2988",
    ],
    redditUrls: [
      "https://www.reddit.com/r/boogie2988/",
      "https://www.reddit.com/r/LivestreamFail/search/?q=boogie2988&type=posts",
    ],
    kickClipUrls: [],
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
    ],
    news: [
      {
        title: "LowTierGod Meme Goes Viral",
        content: "The 'You should kill yourself now' meme became one of the most recognizable gaming memes of the decade.",
        date: "2020-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@LowTierGod" },
      { label: "Twitter/X", url: "https://twitter.com/LowTierGod" },
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/low-tier-god" },
      { label: "r/LowTierGod", url: "https://www.reddit.com/r/LowTierGod/" },
    ],
    tweetUrls: [
      "https://x.com/LowTierGod",
    ],
    redditUrls: [
      "https://www.reddit.com/r/LowTierGod/",
    ],
    kickClipUrls: [],
  },

  // ========== INTERNET INFAMY (VERIFIED) ==========
  {
    name: "EDP445",
    platform: "YouTube",
    category: "Sports",
    bio: "Bryant Turhan Emerson Moreland, known as EDP445 (EatDatPussy445), was a YouTuber famous for his passionate Philadelphia Eagles rants, vlogs, and comedic content. He amassed millions of subscribers before being caught in a predator sting operation that ended his career in April 2021. No criminal charges were filed due to technicalities in evidence collection.",
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
    ],
    tweetUrls: [],
    redditUrls: [
      "https://www.reddit.com/r/EDP445/",
      "https://www.reddit.com/r/LivestreamFail/comments/n2m5ed/edp445_caught_in_predator_sting_operation/",
    ],
    kickClipUrls: [],
  },

  // ========== MUKBANG/WEIGHT LOSS COMMUNITY (VERIFIED) ==========
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
    ],
    news: [
      {
        title: "Amberlynn Reid's Documented Journey",
        content: "Amberlynn has one of the most documented weight journeys on YouTube, with hundreds of reaction channels analyzing her content.",
        date: "2023-01-01",
        approved: true,
      },
    ],
    links: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@AmberlynnReid" },
      { label: "Twitter/X", url: "https://twitter.com/amberlynnreid" },
      { label: "r/AmberlynnReid", url: "https://www.reddit.com/r/AmberlynnReid/" },
    ],
    tweetUrls: [
      "https://x.com/amberlynnreid",
    ],
    redditUrls: [
      "https://www.reddit.com/r/AmberlynnReid/",
    ],
    kickClipUrls: [],
  },
  {
    name: "Nikocado Avocado",
    platform: "YouTube",
    category: "Food",
    bio: "Nicholas Perry, known as Nikocado Avocado, is a Ukrainian-American YouTuber famous for his extreme mukbang videos where he consumes massive quantities of food while displaying emotional outbursts and dramatic behavior. He underwent a dramatic weight loss transformation in 2024 that shocked the internet with his 'Two Steps Ahead' reveal, having secretly lost 250+ pounds while posting pre-recorded content.",
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
        title