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
 * TRUE LOLCOWS/JESTERS DATABASE
 * Only streamers who are genuinely laughed AT, not laughed WITH
 * Documented downfalls, mental health exploitation, internet trainwrecks
 */

const nominees = [
  // ========== LEGENDARY LOLCOWS ==========
  {
    name: "DSP (DarkSydePhil)",
    platform: "YouTube",
    category: "Gaming",
    bio: "The original gaming lolcow. DSP is infamous for blaming controllers, games, lag, and chat for every failure. Known for his 'ack ack ack' laugh, constant begging for tips, and inability to take criticism.",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    redditUrls: ["https://www.reddit.com/r/DSPDrama/"],
    moments: [
      { title: "The $1000 Door Incident", description: "Locked himself out and begged for $1000 to fix it", date: "2019-08-15", type: "controversy" },
      { title: "Controller Throw Compilation", description: "Hundreds of broken controllers over the years", date: "2020-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Tax Fraud Allegations", description: "Failed to pay taxes for years, claimed ignorance", date: "2018-12-01", severity: "high" },
      { title: "Cat Incident", description: "Accidentally revealed inappropriate content with cat present", date: "2020-05-01", severity: "high" },
    ],
  },
  {
    name: "Boogie2988",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The perpetual victim. Boogie built his channel on sympathy for his weight and difficult past, but became infamous for constant crisis cycles, self-pity, and questionable decisions.",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    redditUrls: ["https://www.reddit.com/r/SamandTolki/"],
    moments: [
      { title: "The Sam and Tolki Divorce", description: "Public divorce drama that exposed his behavior", date: "2017-12-01", type: "controversy" },
      { title: "Frank Hassle Incident", description: "Drama with another YouTuber that went physical", date: "2020-07-01", type: "controversy" },
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
    bio: "The rage quit pioneer. Wings built his reputation on breaking controllers, yelling at teammates, and blaming everyone but himself. Known for his 'LOOK HERE, LOOK LISTEN' catchphrase.",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    redditUrls: ["https://www.reddit.com/r/WingsOfRedemption/"],
    moments: [
      { title: "LOOK HERE, LOOK LISTEN", description: "Iconic catchphrase born from a rant", date: "2015-06-01", type: "clip" },
      { title: "Controller Break Compilation", description: "Dozens of destroyed controllers", date: "2016-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Racist Rant on Stream", description: "Used racial slurs during heated gaming moment", date: "2016-08-01", severity: "high" },
    ],
  },
  {
    name: "LowTierGod",
    platform: "YouTube",
    category: "Gaming",
    bio: "The delusional fighting game player. LTG is known for his massive ego, blaming opponents for 'online tactics,' and his infamous rant about what his opponents should do after losing.",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    redditUrls: ["https://www.reddit.com/r/LowTierGod/"],
    moments: [
      { title: "You Should Kill Yourself Rant", description: "The infamous rant that made him internet famous", date: "2017-05-01", type: "clip" },
      { title: "Ban Evasion Marathon", description: "Created dozens of accounts to evade bans", date: "2018-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Harassment Campaigns", description: "Organized harassment of other players", date: "2018-01-01", severity: "high" },
      { title: "Multiple Platform Bans", description: "Banned from Twitch, YouTube, Twitter repeatedly", date: "2019-01-01", severity: "high" },
    ],
  },
  {
    name: "Elpresador",
    platform: "YouTube",
    category: "Gaming",
    bio: "The conspiracy theorist gamer. Known for his rants about 'the system,' claiming games are rigged against him, and his basement-dwelling lifestyle.",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    redditUrls: ["https://www.reddit.com/r/Elpresador/"],
    moments: [
      { title: "The System is Rigged", description: "Classic rant about gaming being unfair", date: "2014-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Conspiracy Theories", description: "Spread various conspiracy theories on stream", date: "2016-01-01", severity: "medium" },
    ],
  },
  {
    name: "OnlyUseMeBlade",
    platform: "YouTube",
    category: "IRL",
    bio: "The alcoholic IRL streamer. Blade built a following on Call of Duty content, but his IRL streams became infamous for his severe alcoholism, passing out on camera, and inappropriate behavior.",
    imageUrl: "https://i.pravatar.cc/150?img=6",
    redditUrls: ["https://www.reddit.com/r/Blade/"],
    moments: [
      { title: "Passed Out on Stream", description: "Frequently passed out drunk during streams", date: "2019-01-01", type: "clip" },
      { title: "The Wheelchair Era", description: "Lost ability to walk due to alcoholism", date: "2020-01-01", type: "event" },
    ],
    controversies: [
      { title: "Sexual Assault Allegations", description: "Multiple women accused him of assault while he was drunk", date: "2019-01-01", severity: "high" },
    ],
  },
  {
    name: "Nikocado Avocado",
    platform: "YouTube",
    category: "Mukbang",
    bio: "The mukbang meltdown artist. Started as a vegan violinist but transformed into one of YouTube's most infamous figures through staged breakdowns, extreme eating, and manufactured drama.",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    redditUrls: ["https://www.reddit.com/r/NikocadoAvocado/"],
    moments: [
      { title: "The Vegan Era", description: "Started as a wholesome vegan violinist", date: "2014-01-01", type: "event" },
      { title: "Mukbang Meltdown", description: "Famous breakdown videos that went viral", date: "2018-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Exploiting Mental Health", description: "Accused of faking breakdowns for views", date: "2019-01-01", severity: "high" },
    ],
  },
  {
    name: "Chris Chan",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The internet's most documented lolcow. Creator of Sonichu, obsessively documented by trolls for over a decade. A tragic case of someone with autism being exploited by the internet.",
    imageUrl: "https://i.pravatar.cc/150?img=8",
    redditUrls: ["https://www.reddit.com/r/ChrisChan/"],
    moments: [
      { title: "Sonichu Creation", description: "Created the infamous Sonichu comic series", date: "2000-01-01", type: "event" },
      { title: "Arrest and Jail", description: "Arrested in 2021 for serious charges", date: "2021-08-01", type: "controversy" },
    ],
    controversies: [
      { title: "Decade of Harassment", description: "Harassed by internet trolls for over 10 years", date: "2007-01-01", severity: "high" },
    ],
  },
  {
    name: "Onision",
    platform: "YouTube",
    category: "Comedy",
    bio: "The predator comedian. Built a following on edgy comedy but became infamous for grooming allegations, abusive relationships, and disturbing behavior. Banned from most platforms.",
    imageUrl: "https://i.pravatar.cc/150?img=9",
    redditUrls: ["https://www.reddit.com/r/Onision/"],
    moments: [
      { title: "The Banana Song", description: "Viral comedy video that started his fame", date: "2009-01-01", type: "clip" },
      { title: "Chris Hansen Investigation", description: "Investigated by Chris Hansen", date: "2019-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Grooming Allegations", description: "Multiple allegations of grooming minors", date: "2019-01-01", severity: "high" },
    ],
  },

  // ========== MENTAL HEALTH / EXPLOITATION ==========
  {
    name: "Eugenia Cooney",
    platform: "YouTube",
    category: "Fashion/Beauty",
    bio: "The eating disorder controversy. Eugenia's severe anorexia has been broadcast to millions for years, with constant concern from viewers and accusations that YouTube is exploiting her condition for views.",
    imageUrl: "https://i.pravatar.cc/150?img=11",
    redditUrls: ["https://www.reddit.com/r/EugeniaCooney/"],
    moments: [
      { title: "Shane Dawson Intervention", description: "Shane Dawson documentary about her condition", date: "2019-07-01", type: "event" },
      { title: "Return to YouTube", description: "Returned after treatment, condition deteriorated again", date: "2019-07-01", type: "event" },
    ],
    controversies: [
      { title: "Platform Exploitation", description: "YouTube accused of profiting from her disorder", date: "2019-01-01", severity: "high" },
    ],
  },
  {
    name: "Trisha Paytas",
    platform: "YouTube",
    category: "Entertainment",
    bio: "The professional trainwreck. Trisha has built a career on public breakdowns, controversial statements, and constant drama. Known for claiming to be transgender, multiple personalities, and various other claims that were later walked back.",
    imageUrl: "https://i.pravatar.cc/150?img=12",
    redditUrls: ["https://www.reddit.com/r/trishapaytas/"],
    moments: [
      { title: "Coming Out as Transgender", description: "Claimed to be transgender, later walked back", date: "2019-10-01", type: "controversy" },
      { title: "Dissociative Identity Disorder Claims", description: "Claimed to have multiple personalities", date: "2020-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Mental Health Trivialization", description: "Accused of trivializing serious mental health conditions", date: "2020-01-01", severity: "high" },
    ],
  },
  {
    name: "Gabbie Hanna",
    platform: "YouTube",
    category: "Entertainment",
    bio: "The manic episode streamer. Gabbie became infamous for her 2022 TikTok manic episode where she posted hundreds of erratic videos in a short period. A disturbing look at mental health crisis broadcast in real-time.",
    imageUrl: "https://i.pravatar.cc/150?img=13",
    redditUrls: ["https://www.reddit.com/r/GabbieHanna/"],
    moments: [
      { title: "The 100+ TikToks Day", description: "Posted over 100 erratic videos in one day", date: "2022-08-01", type: "controversy" },
      { title: "Manic Episode Broadcast", description: "Mental health crisis streamed live", date: "2022-08-01", type: "controversy" },
    ],
    controversies: [
      { title: "Mental Health Exploitation", description: "Platform allowed manic episode to be broadcast", date: "2022-08-01", severity: "high" },
    ],
  },
  {
    name: "Jason Genova",
    platform: "YouTube",
    category: "Fitness",
    bio: "The bodybuilding lolcow. Jason is a bodybuilder with developmental disabilities who became infamous in the fitness community for his delusional claims, bizarre behavior, and being exploited by those around him.",
    imageUrl: "https://i.pravatar.cc/150?img=14",
    redditUrls: ["https://www.reddit.com/r/JasonGenova/"],
    moments: [
      { title: "Order 66", description: "Called for his followers to 'Order 66' people who criticized him", date: "2015-01-01", type: "clip" },
      { title: "The Delray Misfits", description: "Featured in the infamous Delray Misfits series", date: "2014-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Exploitation Concerns", description: "Concerns about exploitation due to his disabilities", date: "2016-01-01", severity: "high" },
    ],
  },
  {
    name: "KingCobraJFS",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The autistic goth lolcow. Josh is a YouTuber with autism who became infamous for his bizarre cooking videos, obsession with goth culture, and inability to handle criticism.",
    imageUrl: "https://i.pravatar.cc/150?img=15",
    redditUrls: ["https://www.reddit.com/r/kingcobrajfs/"],
    moments: [
      { title: "The Wand Business", description: "Sells handmade wands to fans", date: "2018-01-01", type: "clip" },
      { title: "Cooking Videos", description: "Bizarre cooking content that's become legendary", date: "2016-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Exploitation by Trolls", description: "Constantly manipulated by internet trolls", date: "2017-01-01", severity: "high" },
    ],
  },
  {
    name: "Chantal (Foodie Beauty)",
    platform: "YouTube",
    category: "Mukbang",
    bio: "The mukbang trainwreck. Chantal built a following on mukbang content but became infamous for her inability to maintain any diet, constant health crises, and toxic relationships broadcast publicly.",
    imageUrl: "https://i.pravatar.cc/150?img=16",
    redditUrls: ["https://www.reddit.com/r/FoodieBeauty/"],
    moments: [
      { title: "The Nader Era", description: "Toxic relationship with Nader broadcast publicly", date: "2021-01-01", type: "controversy" },
      { title: "Failed Diet Arcs", description: "Dozens of failed diet attempts, each abandoned quickly", date: "2019-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Animal Neglect", description: "Accused of neglecting her pets", date: "2020-01-01", severity: "high" },
    ],
  },

  // ========== CX NETWORK (IRL Pioneers) ==========
  {
    name: "Ice Poseidon",
    platform: "Kick",
    category: "IRL",
    bio: "The IRL streaming pioneer who destroyed his own career. Pioneered IRL streaming on Twitch, but constant swatting, racist donations, and the infamous airplane incident got him banned. Now streams on Kick with a fraction of his former audience.",
    imageUrl: "https://i.pravatar.cc/150?img=21",
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/"],
    moments: [
      { title: "The Airplane Incident", description: "Got banned from Twitch for being swatted on a plane", date: "2017-04-01", type: "controversy" },
      { title: "CX Network Collapse", description: "His streaming network fell apart spectacularly", date: "2019-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Swatting Epidemic", description: "His community constantly swatted him and others", date: "2017-01-01", severity: "high" },
      { title: "Racist Donations", description: "Allowed racist text-to-speech donations", date: "2017-01-01", severity: "high" },
    ],
  },
  {
    name: "Sam Pepper",
    platform: "YouTube",
    category: "IRL",
    bio: "The prankster who went too far. Sam started as a YouTube prankster but became infamous for inappropriate pranks, the 'killing best friend' video, and association with the Cx Network.",
    imageUrl: "https://i.pravatar.cc/150?img=22",
    redditUrls: ["https://www.reddit.com/r/SamPepper/"],
    moments: [
      { title: "Killing Best Friend Prank", description: "Faked killing his friend for a prank video", date: "2015-11-01", type: "controversy" },
      { title: "Sexual Harassment Pranks", description: "Multiple pranks accused of being sexual harassment", date: "2014-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Sexual Harassment", description: "Multiple pranks crossed into harassment territory", date: "2014-01-01", severity: "high" },
    ],
  },
  {
    name: "Hampton Brandon",
    platform: "Kick",
    category: "IRL",
    bio: "TTD - Ten Toes Down. Brandon was one of the most chaotic IRL streamers in the Cx Network era, famous for his confrontations, 'content king' attitude, and constant bans.",
    imageUrl: "https://i.pravatar.cc/150?img=23",
    redditUrls: ["https://www.reddit.com/r/hamptonbrandon/"],
    moments: [
      { title: "TTD Movement", description: "Started the Ten Toes Down movement", date: "2017-01-01", type: "event" },
      { title: "Constant Bans", description: "Banned from virtually every platform repeatedly", date: "2017-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Physical Altercations", description: "Fought with people on stream constantly", date: "2017-01-01", severity: "high" },
    ],
  },
  {
    name: "Mexican Andy",
    platform: "Kick",
    category: "IRL",
    bio: "The original 'Andy' archetype. Andy started by sniping Ice Poseidon's streams and became a Cx Network staple. Known for his awkwardness and being the template for the 'Andy' streamer phenomenon.",
    imageUrl: "https://i.pravatar.cc/150?img=24",
    redditUrls: ["https://www.reddit.com/r/MexicanAcne/"],
    moments: [
      { title: "First Stream Sniper", description: "Started the stream sniping meta", date: "2017-01-01", type: "event" },
      { title: "Failed Romance Arcs", description: "Constant failed attempts at relationships on stream", date: "2017-06-01", type: "clip" },
    ],
    controversies: [
      { title: "Stalking Allegations", description: "Accused of inappropriate behavior toward women", date: "2018-01-01", severity: "medium" },
    ],
  },
  {
    name: "SJC",
    platform: "YouTube",
    category: "IRL",
    bio: "Samuel J. Cummings - 'I'm a businessman.' SJC was a Cx Network streamer known for his delusional business claims, RV trip drama, and being a constant source of memes.",
    imageUrl: "https://i.pravatar.cc/150?img=25",
    redditUrls: ["https://www.reddit.com/r/SamandTolki/"],
    moments: [
      { title: "I'm a Businessman", description: "The meme that defined him", date: "2018-01-01", type: "clip" },
      { title: "RV Trip Drama", description: "Part of the infamous Cx RV trips", date: "2018-06-01", type: "event" },
    ],
    controversies: [
      { title: "Scam Allegations", description: "Accused of various business scams", date: "2018-01-01", severity: "medium" },
    ],
  },
  {
    name: "EBZ",
    platform: "YouTube",
    category: "IRL",
    bio: "EBZ (Ebtisam) - 'Gator Skin.' A Cx Network streamer known for his rap career, 'gator skin' catchphrase, and confrontations.",
    imageUrl: "https://i.pravatar.cc/150?img=26",
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/"],
    moments: [
      { title: "Gator Skin", description: "Famous catchphrase about being tough", date: "2018-01-01", type: "clip" },
      { title: "RV Trip Fights", description: "Multiple physical altercations on RV trips", date: "2018-06-01", type: "controversy" },
    ],
    controversies: [
      { title: "Physical Violence", description: "Multiple fights on stream", date: "2018-01-01", severity: "high" },
    ],
  },
  {
    name: "Asian Andy",
    platform: "YouTube",
    category: "IRL",
    bio: "The TTS pioneer. Asian Andy became famous for his text-to-speech donation streams where viewers would play embarrassing or offensive messages in public places.",
    imageUrl: "https://i.pravatar.cc/150?img=27",
    redditUrls: ["https://www.reddit.com/r/asianandy/"],
    moments: [
      { title: "TTS in Library", description: "Played embarrassing TTS in UCLA library", date: "2017-01-01", type: "clip" },
      { title: "Uber Driver Incident", description: "TTS caused issues with Uber driver", date: "2017-06-01", type: "controversy" },
    ],
    controversies: [
      { title: "Public Disturbance", description: "TTS donations caused public disturbances", date: "2017-01-01", severity: "medium" },
    ],
  },
  {
    name: "Tracksuit Andy",
    platform: "YouTube",
    category: "IRL",
    bio: "The UK Andy. A British streamer who became part of the Cx Network, known for his tracksuit aesthetic and being part of the European IRL streaming scene.",
    imageUrl: "https://i.pravatar.cc/150?img=28",
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/"],
    moments: [
      { title: "UK Streams", description: "Brought UK IRL content to the network", date: "2018-01-01", type: "event" },
    ],
    controversies: [],
  },
  {
    name: "Burger Planet",
    platform: "YouTube",
    category: "IRL",
    bio: "The delusional IRL streamer. Burger Planet was known for his strange behavior, conspiracy theories, and being generally disliked within the Cx Network community.",
    imageUrl: "https://i.pravatar.cc/150?img=29",
    redditUrls: ["https://www.reddit.com/r/Ice_Poseidon/"],
    moments: [
      { title: "Conspiracy Rants", description: "Constant conspiracy theories on stream", date: "2018-01-01", type: "clip" },
    ],
    controversies: [
      { title: "Stalking Behavior", description: "Accused of stalking female streamers", date: "2018-01-01", severity: "high" },
    ],
  },
  {
    name: "Andy Milonakis",
    platform: "Twitch",
    category: "IRL",
    bio: "The man-child comedian. Andy has a growth hormone deficiency that makes him look like a child despite being an adult. Known for his sketch comedy but became a Cx Network figure through IRL streaming.",
    imageUrl: "https://i.pravatar.cc/150?img=30",
    redditUrls: ["https://www.reddit.com/r/andymilonakis/"],
    moments: [
      { title: "Cx Network Join", description: "Joined Ice Poseidon's network", date: "2018-01-01", type: "event" },
    ],
    controversies: [],
  },
  {
    name: "Hyphonix",
    platform: "YouTube",
    category: "Gaming/IRL",
    bio: "The OSRS streamer turned IRL. Hyphonix built his following on Old School RuneScape but became known for IRL content and his association with the Cx Network.",
    imageUrl: "https://i.pravatar.cc/150?img=31",
    redditUrls: ["https://www.reddit.com/r/Hyphonix/"],
    moments: [
      { title: "OSRS to IRL", description: "Transitioned from gaming to IRL streaming", date: "2018-01-01", type: "event" },
    ],
    controversies: [],
  },

  // ========== ADDITIONAL TRUE LOLCOWS ==========
  {
    name: "Projared",
    platform: "YouTube",
    category: "Gaming",
    bio: "The cheating scandal lolcow. Jared became infamous for his cheating scandal, allegations of soliciting nudes from fans, and the dramatic public breakdown of his marriage. A case study in how not to handle a scandal.",
    imageUrl: "https://i.pravatar.cc/150?img=32",
    redditUrls: ["https://www.reddit.com/r/Projared/"],
    moments: [
      { title: "Cheating Scandal", description: "Public cheating scandal with Heidi", date: "2019-05-01", type: "controversy" },
      { title: "Nude Allegations", description: "Accused of soliciting nudes from underage fans", date: "2019-05-01", type: "controversy" },
    ],
    controversies: [
      { title: "Cheating on Wife", description: "Cheated on his wife with another streamer", date: "2019-05-01", severity: "high" },
      { title: "Underage Fan Allegations", description: "Accused of inappropriate contact with minors", date: "2019-05-01", severity: "high" },
    ],
  },
  {
    name: "Sam Hyde",
    platform: "YouTube",
    category: "Comedy",
    bio: "The banned comedian. Sam Hyde of Million Dollar Extreme became infamous for his alt-right adjacent comedy, getting his show cancelled, and being banned from virtually every platform.",
    imageUrl: "https://i.pravatar.cc/150?img=33",
    redditUrls: ["https://www.reddit.com/r/milliondollarextreme/"],
    moments: [
      { title: "MDE World Peace Cancelled", description: "Adult Swim cancelled his show", date: "2016-01-01", type: "controversy" },
      { title: "Platform Bans", description: "Banned from YouTube, Twitter, and others", date: "2017-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Alt-Right Associations", description: "Accused of alt-right sympathies", date: "2016-01-01", severity: "high" },
    ],
  },
  {
    name: "LeafyIsHere",
    platform: "YouTube",
    category: "Commentary",
    bio: "The cyberbully commentator. Leafy built his career on 'content nuke' videos attacking other YouTubers, particularly minors. Banned from YouTube for harassment.",
    imageUrl: "https://i.pravatar.cc/150?img=34",
    redditUrls: ["https://www.reddit.com/r/LeafyIsHere/"],
    moments: [
      { title: "Content Nuke Series", description: "Built career on attacking other YouTubers", date: "2015-01-01", type: "clip" },
      { title: "YouTube Ban", description: "Permanently banned for harassment", date: "2020-08-01", type: "controversy" },
    ],
    controversies: [
      { title: "Harassment of Minors", description: "Accused of harassing underage YouTubers", date: "2016-01-01", severity: "high" },
      { title: "Cyberbullying", description: "Built platform on cyberbullying others", date: "2015-01-01", severity: "high" },
    ],
  },
  {
    name: "FouseyTube",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The manic episode lolcow. Yousef Erakat became infamous for his public mental health breakdowns, the disastrous 'July 15th' event, and his inability to maintain stability.",
    imageUrl: "https://i.pravatar.cc/150?img=35",
    redditUrls: ["https://www.reddit.com/r/FouseyTube/"],
    moments: [
      { title: "July 15th Disaster", description: "Promised huge event, delivered nothing", date: "2018-07-15", type: "controversy" },
      { title: "Mental Health Crisis", description: "Public manic episodes broadcast live", date: "2018-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Scam Event", description: "July 15th event was a complete scam", date: "2018-07-15", severity: "high" },
      { title: "Exploitation", description: "Mental health exploited for content", date: "2018-01-01", severity: "high" },
    ],
  },
  {
    name: "JiDion",
    platform: "YouTube",
    category: "IRL",
    bio: "The prankster who went too far. JiDion became famous for his pranks but became infamous for the Pokimane hate raid and getting permanently banned from Twitch.",
    imageUrl: "https://i.pravatar.cc/150?img=36",
    redditUrls: ["https://www.reddit.com/r/JiDion/"],
    moments: [
      { title: "P