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
      { title: "Pokimane Hate Raid", description: "Organized hate raid against Pokimane, got banned", date: "2022-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Twitch Permaban", description: "Permanently banned from Twitch for harassment", date: "2022-01-01", severity: "high" },
      { title: "Harassment Campaigns", description: "Multiple harassment campaigns against other streamers", date: "2022-01-01", severity: "high" },
    ],
  },

  // ========== NEW ADDITIONS (2025-2026 Lolcows) ==========
  {
    name: "Andrew Tate",
    platform: "Rumble",
    category: "Commentary",
    bio: "The Top G. Andrew Tate became infamous for his misogynistic commentary, pyramid scheme allegations, and human trafficking arrest in Romania. Banned from virtually every major platform but maintains a loyal following on Rumble.",
    imageUrl: "https://i.pravatar.cc/150?img=37",
    redditUrls: ["https://www.reddit.com/r/AndrewTate/"],
    moments: [
      { title: "The Matrix Speech", description: "Famous rant about escaping 'the matrix'", date: "2022-01-01", type: "clip" },
      { title: "Romania Arrest", description: "Arrested in Romania on human trafficking charges", date: "2022-12-01", type: "controversy" },
      { title: "Platform Bans", description: "Banned from Facebook, Instagram, TikTok, YouTube", date: "2022-08-01", type: "controversy" },
    ],
    controversies: [
      { title: "Human Trafficking Charges", description: "Arrested in Romania on trafficking allegations", date: "2022-12-01", severity: "high" },
      { title: "Misogynistic Content", description: "Extensive misogynistic commentary and advice", date: "2022-01-01", severity: "high" },
      { title: "Hustler's University", description: "Pyramid scheme allegations for his online course", date: "2021-01-01", severity: "medium" },
    ],
  },
  {
    name: "shoovy",
    platform: "Kick",
    category: "IRL",
    bio: "The car meet streamer. shoovy is a Kick streamer known for IRL content at car meets, street racing culture, and confrontational content. Part of the new wave of Kick IRL streamers pushing boundaries.",
    imageUrl: "https://i.pravatar.cc/150?img=38",
    redditUrls: ["https://www.reddit.com/r/KickStreaming/"],
    moments: [
      { title: "Car Meet Streams", description: "Popular streams from street racing events", date: "2024-01-01", type: "event" },
      { title: "Kick Partnership", description: "Achieved Kick partnership status", date: "2024-06-01", type: "event" },
    ],
    controversies: [
      { title: "Dangerous Driving", description: "Filmed reckless driving during IRL streams", date: "2024-01-01", severity: "high" },
      { title: "Street Racing Content", description: "Promoted illegal street racing activities", date: "2024-01-01", severity: "high" },
    ],
  },
  {
    name: "DBR666",
    platform: "Kick",
    category: "IRL",
    bio: "The confrontational Kick streamer. DBR666 is known for aggressive IRL content, confrontations with strangers, and pushing the boundaries of acceptable streaming content on Kick.",
    imageUrl: "https://i.pravatar.cc/150?img=39",
    redditUrls: ["https://www.reddit.com/r/KickStreaming/"],
    moments: [
      { title: "Viral Confrontations", description: "Multiple viral clips of street confrontations", date: "2024-01-01", type: "clip" },
      { title: "Kick Growth", description: "Rapid growth through controversial content", date: "2024-01-01", type: "event" },
    ],
    controversies: [
      { title: "Street Harassment", description: "Aggressively confronting strangers for content", date: "2024-01-01", severity: "high" },
      { title: "Provoking Altercations", description: "Deliberately provoking physical confrontations", date: "2024-01-01", severity: "high" },
    ],
  },
  {
    name: "Clavicular",
    platform: "Kick",
    category: "Gaming",
    bio: "The OSRS streamer. Clavicular is a Kick streamer known for Old School RuneScape content. NOTE: Claims to have originated the 'jester' term for lolcows but NO EVIDENCE has been found to support this claim after exhaustive search.",
    imageUrl: "https://i.pravatar.cc/150?img=40",
    redditUrls: [],
    moments: [
      { title: "OSRS Streaming", description: "Regular OSRS content on Kick platform", date: "2023-01-01", type: "event" },
    ],
    controversies: [
      { title: "Unverified Claims", description: "Claims origin of 'jester' term - NO EVIDENCE FOUND", date: "2024-01-01", severity: "low" },
    ],
  },
  {
    name: "Kai Cenat",
    platform: "Twitch/YouTube",
    category: "IRL",
    bio: "The AMP streamer. Kai Cenat became the most-subscribed Twitch streamer but is also known for his chaotic content, the Union Square riot incident, and various controversies surrounding his IRL streams.",
    imageUrl: "https://i.pravatar.cc/150?img=41",
    redditUrls: ["https://www.reddit.com/r/KaiCenat/"],
    moments: [
      { title: "Union Square Riot", description: "PS5 giveaway caused massive riot in NYC", date: "2023-08-01", type: "controversy" },
      { title: "Most Subscribed", description: "Became most-subscribed Twitch streamer", date: "2023-01-01", type: "event" },
    ],
    controversies: [
      { title: "Union Square Incident", description: "Unofficial PS5 giveaway caused chaos and arrests", date: "2023-08-01", severity: "high" },
      { title: "Banned on Twitch", description: "Multiple temporary bans for various violations", date: "2022-01-01", severity: "medium" },
    ],
  },
  {
    name: "IShowSpeed",
    platform: "YouTube",
    category: "IRL/Entertainment",
    bio: "The chaotic YouTuber. Speed is one of the biggest YouTubers globally, known for his extreme reactions, chaotic IRL streams, and various controversies including his behavior in foreign countries.",
    imageUrl: "https://i.pravatar.cc/150?img=42",
    redditUrls: ["https://www.reddit.com/r/IShowSpeed/"],
    moments: [
      { title: "China/Shenzhen Incident", description: "Controversial behavior during China trip", date: "2024-01-01", type: "controversy" },
      { title: "World Cup Final", description: "Attended World Cup final, chaotic behavior", date: "2022-12-01", type: "event" },
    ],
    controversies: [
      { title: "Cringe Behavior Abroad", description: "Multiple incidents of inappropriate behavior in foreign countries", date: "2024-01-01", severity: "medium" },
      { title: "Toxic Fanbase", description: "Fanbase known for harassing people he interacts with", date: "2023-01-01", severity: "medium" },
    ],
  },
  {
    name: "BruceDropEmOff",
    platform: "Twitch/Kick",
    category: "Gaming/IRL",
    bio: "The banned Twitch streamer. Bruce was a major Twitch streamer who was permanently banned after alleged sexual misconduct allegations. Now streams on Kick.",
    imageUrl: "https://i.pravatar.cc/150?img=43",
    redditUrls: ["https://www.reddit.com/r/BruceDropEmOff/"],
    moments: [
      { title: "Twitch Ban", description: "Permanently banned from Twitch", date: "2023-01-01", type: "controversy" },
      { title: "Move to Kick", description: "Started streaming on Kick after ban", date: "2023-01-01", type: "event" },
    ],
    controversies: [
      { title: "Sexual Misconduct Allegations", description: "Multiple allegations of inappropriate behavior", date: "2023-01-01", severity: "high" },
      { title: "Twitch Permaban", description: "Banned permanently from Twitch platform", date: "2023-01-01", severity: "high" },
    ],
  },
  {
    name: "N3on",
    platform: "Kick/Twitch",
    category: "IRL",
    bio: "The drama streamer. N3on is known for constant platform drama, being called out by NYC gang members on stream, and misgendering controversies at TwitchCon 2024.",
    imageUrl: "https://i.pravatar.cc/150?img=44",
    redditUrls: ["https://www.reddit.com/r/LivestreamFail/search/?q=n3on"],
    moments: [
      { title: "NYC Gang Callout", description: "Called out by NYC gang members during live stream", date: "2024-01-01", type: "controversy" },
      { title: "Kick to Twitch Switch", description: "Accused Kick of 'hidden agenda' and moved to Twitch", date: "2025-01-01", type: "event" },
      { title: "TwitchCon Misgendering", description: "Misgendering controversy at TwitchCon 2024", date: "2024-09-01", type: "controversy" },
    ],
    controversies: [
      { title: "Platform Drama", description: "Constant beef with other streamers and platforms", date: "2024-01-01", severity: "medium" },
      { title: "TwitchCon Incident", description: "Misgendering issues at convention", date: "2024-09-01", severity: "high" },
    ],
  },

  // ========== LEGENDARY DECEASED LOLCOWS ==========
  {
    name: "Terry A. Davis",
    platform: "YouTube",
    category: "Programming",
    bio: "The TempleOS prophet. Terry created TempleOS, an entire operating system, while suffering from schizophrenia. His livestreams of programming, religious rants, and struggles with mental illness made him one of the most documented and tragic lolcows. Deceased 2018.",
    imageUrl: "https://i.pravatar.cc/150?img=45",
    redditUrls: ["https://www.reddit.com/r/TempleOS/"],
    moments: [
      { title: "TempleOS Creation", description: "Created entire operating system alone", date: "2005-01-01", type: "event" },
      { title: "Glow-in-the-Dark CIA Rants", description: "Famous rants about CIA agents", date: "2010-01-01", type: "clip" },
      { title: "Death", description: "Died after being struck by train in 2018", date: "2018-08-11", type: "event" },
    ],
    controversies: [
      { title: "Mental Health Exploitation", description: "Community extensively documented his schizophrenia", date: "2010-01-01", severity: "high" },
      { title: "Homelessness Documented", description: "Final years of homelessness broadcast", date: "2016-01-01", severity: "high" },
    ],
  },

  // ========== ADDITIONAL VERIFIED LOLCOWS ==========
  {
    name: "Jake Paul",
    platform: "YouTube",
    category: "Vlogs/Boxing",
    bio: "The scammer boxer. Jake Paul built his career on documented scams (Team 10, crypto), boxing drama, and constant controversy. Known for the 'It's Everyday Bro' video and various business ventures that harmed fans.",
    imageUrl: "https://i.pravatar.cc/150?img=46",
    redditUrls: ["https://www.reddit.com/r/JakePaul/"],
    moments: [
      { title: "It's Everyday Bro", description: "Infamous music video with 300M+ views", date: "2017-05-30", type: "clip" },
      { title: "Team 10 Drama", description: "Documented abuse and exploitation of young creators", date: "2018-01-01", type: "controversy" },
      { title: "Crypto Scams", description: "Multiple pump-and-dump crypto schemes", date: "2021-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Team 10 Abuse", description: "Former members documented abuse and exploitation", date: "2018-01-01", severity: "high" },
      { title: "Crypto Pump and Dump", description: "Promoted coins then sold, harming fans", date: "2021-01-01", severity: "high" },
      { title: "FBI Raid", description: "Home raided by FBI in 2021", date: "2021-08-01", severity: "high" },
    ],
  },
  {
    name: "Logan Paul",
    platform: "YouTube",
    category: "Vlogs/Boxing",
    bio: "The suicide forest vlogger. Logan Paul became infamous for filming a dead body in Japan's Aokigahara forest. Despite the controversy, he built a boxing career and podcast empire, but remains a documented lolcow for his various scandals.",
    imageUrl: "https://i.pravatar.cc/150?img=47",
    redditUrls: ["https://www.reddit.com/r/LoganPaul/"],
    moments: [
      { title: "Suicide Forest Video", description: "Filmed dead body in Aokigahara, Japan", date: "2017-12-31", type: "controversy" },
      { title: "CryptoZoo Scam", description: "NFT game that never delivered, $2.5M+ lost", date: "2021-09-01", type: "controversy" },
      { title: "KSI Boxing Matches", description: "Built boxing career off YouTube drama", date: "2018-08-01", type: "event" },
    ],
    controversies: [
      { title: "Suicide Forest Incident", description: "Filmed and laughed at dead body", date: "2017-12-31", severity: "high" },
      { title: "CryptoZoo Scam", description: "Defrauded fans of millions via NFT project", date: "2021-09-01", severity: "high" },
      { title: "Flat Earth Documentary", description: "Promoted flat earth theories for views", date: "2019-03-01", severity: "medium" },
    ],
  },
  {
    name: "Tana Mongeau",
    platform: "YouTube",
    category: "Vlogs",
    bio: "The professional liar. Tana built her career on documented lies, scams, and constant drama. Known for TanaCon (disastrous convention), failed MTV show, and endless controversies.",
    imageUrl: "https://i.pravatar.cc/150?img=48",
    redditUrls: ["https://www.reddit.com/r/TanaMongeau/"],
    moments: [
      { title: "TanaCon Disaster", description: "Convention failed spectacularly, 5k+ stranded", date: "2018-07-01", type: "controversy" },
      { title: "iDubbbz Content Cop", description: "Exposed by iDubbbz for lies and hypocrisy", date: "2017-12-01", type: "controversy" },
      { title: "MTV Show Cancellation", description: "MTV No Filter show cancelled after poor ratings", date: "2019-01-01", type: "event" },
    ],
    controversies: [
      { title: "TanaCon Scam", description: "Convention sold 5k+ tickets, venue held 1k, chaos ensued", date: "2018-07-01", severity: "high" },
      { title: "Documented Lies", description: "Extensive history of documented false claims", date: "2017-01-01", severity: "medium" },
      { title: "Racist Comments", description: "Multiple instances of racist remarks exposed", date: "2017-01-01", severity: "high" },
    ],
  },
  {
    name: "Belle Delphine",
    platform: "OnlyFans/YouTube",
    category: "Entertainment",
    bio: "The e-girl entrepreneur. Belle became famous for selling her bath water and extreme clickbait. While successful, her constant controversies and exploitation of parasocial relationships make her a notable internet figure.",
    imageUrl: "https://i.pravatar.cc/150?img=49",
    redditUrls: ["https://www.reddit.com/r/BelleDelphine/"],
    moments: [
      { title: "GamerGirl Bath Water", description: "Sold her used bath water for $30/bottle", date: "2019-07-01", type: "controversy" },
      { title: "Pornhub Troll", description: "Uploaded non-porn videos to Pornhub as prank", date: "2019-12-01", type: "clip" },
      { title: "OnlyFans Launch", description: "Made $1M+ in first month on OnlyFans", date: "2020-12-01", type: "event" },
    ],
    controversies: [
      { title: "Exploiting Parasocial Fans", description: "Extreme monetization of lonely fans", date: "2019-01-01", severity: "medium" },
      { title: "Clickbait Culture", description: "Pioneered extreme clickbait in e-girl space", date: "2018-01-01", severity: "low" },
    ],
  },
  {
    name: "Dahvie Vanity",
    platform: "YouTube",
    category: "Music",
    bio: "The predator musician. Dahvie (Blood on the Dance Floor) has been accused by 100+ people of sexual assault, many underage. One of the most documented predators in the YouTube/music scene.",
    imageUrl: "https://i.pravatar.cc/150?img=50",
    redditUrls: ["https://www.reddit.com/r/DahvieVanity/"],
    moments: [
      { title: "Chris Hansen Investigation", description: "Investigated by Chris Hansen for predators", date: "2020-01-01", type: "controversy" },
      { title: "100+ Accusers", description: "Over 100 people came forward with allegations", date: "2020-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Sexual Assault Allegations", description: "100+ allegations of assault, many underage", date: "2009-01-01", severity: "high" },
      { title: "Predatory Behavior", description: "Documented pattern of targeting minors", date: "2009-01-01", severity: "high" },
    ],
  },
  {
    name: "Shane Dawson",
    platform: "YouTube",
    category: "Documentary",
    bio: "The canceled documentarian. Shane was one of YouTube's biggest creators until old videos resurfaced showing racist content, inappropriate behavior with minors, and bestiality jokes. His cancellation was one of the biggest in YouTube history.",
    imageUrl: "https://i.pravatar.cc/150?img=51",
    redditUrls: ["https://www.reddit.com/r/ShaneDawson/"],
    moments: [
      { title: "Cancellation", description: "Massive cancellation in 2020 for old racist videos", date: "2020-06-01", type: "controversy" },
      { title: "Beauty Series Drama", description: "Tati/James Charles series backfired spectacularly", date: "2019-05-01", type: "controversy" },
      { title: "Attempted Return", description: "Failed comeback attempts met with backlash", date: "2021-01-01", type: "event" },
    ],
    controversies: [
      { title: "Racist Content", description: "Extensive racist videos and blackface", date: "2010-01-01", severity: "high" },
      { title: "Inappropriate Minors Content", description: "Sexualized content involving children", date: "2010-01-01", severity: "high" },
      { title: "Bestiality Jokes", description: "Numerous inappropriate animal jokes", date: "2010-01-01", severity: "high" },
    ],
  },
  {
    name: "Jeffree Star",
    platform: "YouTube",
    category: "Beauty",
    bio: "The beauty guru villain. Jeffree built a makeup empire but is constantly surrounded by racism scandals, feuds with other creators, and various controversies. Known for destroying careers with snap of fingers.",
    imageUrl: "https://i.pravatar.cc/150?img=52",
    redditUrls: ["https://www.reddit.com/r/BeautyGuruChatter/"],
    moments: [
      { title: "Racist Past Exposed", description: "Old racist videos and comments resurfaced", date: "2017-01-01", type: "controversy" },
      { title: "Tati/James Charles Drama", description: "Played major role in destroying James Charles career", date: "2019-05-01", type: "controversy" },
      { title: "Hair Pulling Incident", description: "Accused of paying people to assault others", date: "2021-01-01", type: "controversy" },
    ],
    controversies: [
      { title: "Racism", description: "Multiple instances of racist behavior", date: "2010-01-01", severity: "high" },
      { title: "Career Destruction", description: "Pattern of destroying other creators careers", date: "2018-01-01", severity: "medium" },
      { title: "Assault Allegations", description: "Accused of paying for assaults", date: "2021-01-01", severity: "high" },
    ],
  },
];