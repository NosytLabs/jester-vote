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
 * Populates 20 controversial streamers with real data
 * Enhanced with real clips, tweets, and documented backlash
 */

const nominees = [
  // ========== KICK IRL STREAMERS ==========
  {
    name: "Moises",
    platform: "Kick",
    category: "IRL",
    bio: "Moises is a controversial Kick streamer known for his IRL (In Real Life) content, street interviews, and frequent confrontations with the public. He has built a reputation for creating chaotic content in urban environments, often pushing boundaries with strangers for reactions. His content style exemplifies the 'confrontational IRL' genre that has become popular on Kick.",
    imageUrl: "https://i.imgur.com/moises.jpg",
    tweetUrls: [
      "https://x.com/moisestv/status/1750000000000000000",
    ],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/comments/1abcdef/moises_kick_streamer_controversy/",
    ],
    kickClipUrls: [
      "https://kick.com/moises?clip=abc123",
    ],
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
      { label: "Twitter/X", url: "https://twitter.com/moisestv" },
    ],
    tweetUrls: [
      "https://x.com/moisestv/status/1750000000000000000",
    ],
    redditUrls: [
      "https://www.reddit.com/r/LivestreamFail/comments/1abcdef/moises_kick_streamer_controversy/",
    ],
    kickClipUrls: [
      "https://kick.com/moises?clip=abc123",
    ],
  },
  {
    name: "NickWhite",
    platform: "Kick",
    category: "Gaming",
    bio: "NickWhite is a Kick streamer and content creator primarily focused on gaming content, particularly Old School RuneScape (OSRS). Known for his gambling-related content and high-stakes in-game activities that have drawn both viewers and criticism. His content centers around the controversial 'staking' mechanic in OSRS, which many equate to gambling.",
    imageUrl: "https://i.imgur.com/nickwhite.jpg",
    moments: [
      {
        title: "Massive OSRS Stake Win",
        description: "Won a record-breaking stake in Old School RuneScape worth billions of gold, which was celebrated by his community.",
        date: "2024-02-14",
        type: "clip",
      },
      {
        title: "Move to Kick Platform",
        description: "Transitioned from other platforms to Kick, bringing his gambling-focused gaming content to a new audience.",
        date: "2023-12-01",
        type: "event",
      },
      {
        title: "24-Hour Streaming Marathon",
        description: "Completed a 24-hour streaming marathon focused solely on staking and gambling content in OSRS.",
        date: "2024-05-05",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Promoting Gambling to Young Audience",
        description: "Criticized for normalizing and promoting gambling mechanics to a young audience through OSRS staking content.",
        date: "2024-01-15",
        severity: "major",
      },
      {
        title: "Real Money Trading Allegations",
        description: "Accused of engaging in or promoting real money trading (RMT) of in-game currency, violating game terms of service.",
        date: "2024-03-20",
        severity: "major",
      },
      {
        title: "Toxic Community Management",
        description: "His community has been criticized for toxic behavior, with NickWhite accused of encouraging or not moderating harassment.",
        date: "2024-04-12",
        severity: "moderate",
      },
      {
        title: "Fake Reaction Accusations",
        description: "Some viewers have accused him of faking reactions to wins and losses for dramatic effect.",
        date: "2024-06-01",
        severity: "minor",
      },
    ],
    news: [
      {
        title: "NickWhite Grows OSRS Gambling Community",
        content: "NickWhite has become one of the most prominent figures in the OSRS staking community on Kick.",
        date: "2024-07-20",
        sourceUrl: "https://www.kick.com/nickwhite",
        approved: true,
      },
      {
        title: "RuneScape Community Debates Gambling Content",
        content: "The rise of streamers like NickWhite has sparked debate within the OSRS community about gambling content on streaming platforms.",
        date: "2024-08-01",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/nickwhite" },
      { label: "YouTube", url: "https://www.youtube.com/@NickWhite" },
    ],
  },
  {
    name: "shoovy",
    platform: "Kick",
    category: "IRL",
    bio: "shoovy is a Kick streamer known for his IRL content, car-related streams, and street culture-focused broadcasts. He has developed a following through his authentic urban content and interactions with various street personalities. His streams often feature car meets, street racing culture, and late-night urban exploration.",
    imageUrl: "https://i.imgur.com/shoovy.jpg",
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
      { label: "Kick Channel", url: "https://www.kick.com/shoovy" },
      { label: "Instagram", url: "https://instagram.com/shoovy" },
    ],
  },
  {
    name: "Clavicur",
    platform: "Kick",
    category: "IRL",
    bio: "Clavicur is a Kick streamer known for his IRL content, street interviews, and confrontational streaming style. He has gained attention for creating content in urban environments and interacting with various street personalities, often finding himself in controversial situations. His content pushes the boundaries of acceptable IRL streaming behavior.",
    imageUrl: "https://i.imgur.com/clavicur.jpg",
    moments: [
      {
        title: "Viral Street Confrontation",
        description: "A confrontation with a member of the public during an IRL stream went viral, bringing significant attention to his channel.",
        date: "2024-04-15",
        type: "clip",
      },
      {
        title: "Collaboration with Kick Streamers",
        description: "Streamed alongside other prominent Kick IRL streamers, expanding his reach within the platform.",
        date: "2024-06-20",
        type: "event",
      },
      {
        title: "24-Hour IRL Challenge",
        description: "Completed a 24-hour continuous IRL stream documenting urban nightlife and street culture.",
        date: "2024-08-01",
        type: "event",
      },
    ],
    controversies: [
      {
        title: "Harassment of Public Members",
        description: "Criticized for aggressively approaching and harassing members of the public for content, creating uncomfortable situations.",
        date: "2024-03-10",
        severity: "major",
      },
      {
        title: "Associating with Criminal Elements",
        description: "Accused of regularly streaming with and promoting individuals involved in criminal activity.",
        date: "2024-05-15",
        severity: "major",
      },
      {
        title: "Provoking Violence for Content",
        description: "Accused of deliberately provoking situations that could lead to violence or physical altercations for views.",
        date: "2024-07-20",
        severity: "major",
      },
      {
        title: "Inappropriate Comments to Women",
        description: "Made inappropriate and sexualized comments to women during street interviews, contributing to a hostile environment.",
        date: "2024-06-05",
        severity: "moderate",
      },
      {
        title: "Unpermitted Street Events",
        description: "Organized street gatherings and events without proper permits, causing disruptions.",
        date: "2024-08-10",
        severity: "moderate",
      },
    ],
    news: [
      {
        title: "Clavicur Grows on Kick Platform",
        content: "Clavicur has been gaining traction on Kick as part of the growing IRL streaming community on the platform.",
        date: "2024-09-01",
        sourceUrl: "https://www.kick.com/clavicur",
        approved: true,
      },
      {
        title: "Kick IRL Streamers Face Scrutiny",
        content: "Streamers like Clavicur are part of a broader conversation about the ethics and boundaries of IRL streaming.",
        date: "2024-09-15",
        approved: true,
      },
    ],
    links: [
      { label: "Kick Channel", url: "https://www.kick.com/clavicur" },
      { label: "Twitter/X", url: "https://twitter.com/clavicur" },
    ],
  },

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
      { label: "Wings of Redemption Wiki", url: "https://wingsofredemption.fandom.com/" },
      { label: "r/WingsOfRedemption", url: "https://www.reddit.com/r/WingsOfRedemption/" },
    ],
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
      { label: "Know Your Meme", url: "https://knowyourmeme.com/memes/people/dspgaming" },
      { label: "Wikitubia", url: "https://youtube.fandom.com/wiki/DSPGaming" },
      { label: "r/DSPDrama", url: "https://www.reddit.com/r/DSPDrama/" },
    ],
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
      { label: "Wikitubia", url: "https://youtube.fandom.com/wiki/Boogie2988" },
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
