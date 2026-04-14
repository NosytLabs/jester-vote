import { motion } from "framer-motion";
import Header from "@/components/Header";
import { ExternalLink, Github, Archive, MessageSquare, Database, Video, Globe, Code } from "lucide-react";

const resourceCategories = [
  {
    title: "Chat Loggers",
    icon: MessageSquare,
    description: "Tools for archiving Twitch and YouTube chat",
    resources: [
      {
        name: "twitch-chat-logger",
        author: "bernardopires",
        url: "https://github.com/bernardopires/twitch-chat-logger",
        stars: 64,
        license: "MIT",
        description: "PostgreSQL-based Twitch chat logger for archiving conversations",
      },
      {
        name: "Twitch_Batch_Logger",
        author: "gamedeff",
        url: "https://github.com/gamedeff/Twitch_Batch_Logger",
        stars: 11,
        license: "MIT",
        description: "Batch logger for multiple channels simultaneously",
      },
      {
        name: "spaghetti-logger",
        author: "chfoo",
        url: "https://github.com/chfoo/spaghetti-logger",
        stars: 9,
        description: "Lightweight Twitch.tv chat logger",
      },
      {
        name: "twitchlogger",
        author: "mlvzk",
        url: "https://github.com/mlvzk/twitchlogger",
        stars: 9,
        license: "MIT",
        description: "Minimal resource usage, can log every live chat at once",
      },
    ],
  },
  {
    title: "Video Archiving",
    icon: Video,
    description: "Download and archive streams and videos",
    resources: [
      {
        name: "yt-dlp",
        author: "yt-dlp",
        url: "https://github.com/yt-dlp/yt-dlp",
        stars: 92000,
        license: "Unlicense",
        description: "Active fork of youtube-dl with better livestream support",
      },
      {
        name: "youtube-dl",
        author: "ytdl-org",
        url: "https://github.com/ytdl-org/youtube-dl",
        stars: 132000,
        license: "Unlicense",
        description: "The standard tool for downloading videos from YouTube and other sites",
      },
      {
        name: "streamlink",
        author: "streamlink",
        url: "https://github.com/streamlink/streamlink",
        stars: 10000,
        license: "BSD-2",
        description: "CLI utility for extracting video streams from various services",
      },
    ],
  },
  {
    title: "Documentation & Wiki",
    icon: Database,
    description: "Build documentation sites for streamer archives",
    resources: [
      {
        name: "Wiki.js",
        author: "Requarks",
        url: "https://github.com/Requarks/wiki",
        stars: 24000,
        license: "AGPL-3.0",
        description: "Modern, feature-rich open source wiki platform",
      },
      {
        name: "Outline",
        author: "outline",
        url: "https://github.com/outline/outline",
        stars: 27000,
        license: "BSD-3",
        description: "Fast, modern wiki and knowledge base for teams",
      },
      {
        name: "MediaWiki",
        author: "wikimedia",
        url: "https://github.com/wikimedia/mediawiki",
        stars: 4000,
        license: "GPL-2.0+",
        description: "The software that powers Wikipedia",
      },
    ],
  },
  {
    title: "Community Platforms",
    icon: Globe,
    description: "Build discussion forums and communities",
    resources: [
      {
        name: "Discourse",
        author: "discourse",
        url: "https://github.com/discourse/discourse",
        stars: 43000,
        license: "GPL-2.0",
        description: "Modern, open source discussion platform",
      },
      {
        name: "Lemmy",
        author: "LemmyNet",
        url: "https://github.com/LemmyNet/lemmy",
        stars: 11000,
        license: "AGPL-3.0",
        description: "Federated Reddit alternative",
      },
      {
        name: "Flarum",
        author: "flarum",
        url: "https://github.com/flarum/core",
        stars: 14000,
        license: "MIT",
        description: "Simple, fast, free forum software",
      },
    ],
  },
  {
    title: "Web Archiving",
    icon: Archive,
    description: "Archive web pages and content",
    resources: [
      {
        name: "ArchiveBox",
        author: "ArchiveBox",
        url: "https://github.com/ArchiveBox/ArchiveBox",
        stars: 21000,
        license: "MIT",
        description: "Self-hosted web archiving platform",
      },
      {
        name: "waybackpy",
        author: "akamhy",
        url: "https://github.com/akamhy/waybackpy",
        stars: 800,
        license: "MIT",
        description: "Python interface to Wayback Machine",
      },
    ],
  },
  {
    title: "This Project's Stack",
    icon: Code,
    description: "Open source tools used to build TopJester",
    resources: [
      {
        name: "React",
        author: "facebook",
        url: "https://github.com/facebook/react",
        stars: 230000,
        license: "MIT",
        description: "UI library for building the frontend",
      },
      {
        name: "tRPC",
        author: "trpc",
        url: "https://github.com/trpc/trpc",
        stars: 35000,
        license: "MIT",
        description: "End-to-end typesafe APIs",
      },
      {
        name: "Drizzle ORM",
        author: "drizzle-team",
        url: "https://github.com/drizzle-team/drizzle-orm",
        stars: 22000,
        license: "Apache-2.0",
        description: "TypeScript ORM for database",
      },
      {
        name: "shadcn/ui",
        author: "shadcn",
        url: "https://github.com/shadcn-ui/ui",
        stars: 75000,
        license: "MIT",
        description: "Beautiful UI components",
      },
      {
        name: "Coolify",
        author: "coollabsio",
        url: "https://github.com/coollabsio/coolify",
        stars: 34000,
        license: "Apache-2.0",
        description: "Self-hosted deployment platform",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🛠️
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
              Open Source Resources
            </h1>
            <p className="text-lg text-[#fbbf24] max-w-2xl mx-auto">
              Free and open source tools for documenting, archiving, and discussing internet culture
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="jester-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-6 h-6 text-[#fbbf24]" />
                  <h2 className="text-2xl font-bold text-[#fbbf24]">{category.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category.resources.map((resource, i) => (
                    <motion.a
                      key={resource.name}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-4 bg-[#27273a] rounded-lg border border-[#3f3f5f] hover:border-[#fbbf24]/50 transition-colors group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Github className="w-5 h-5 text-[#fbbf24]" />
                          <span className="font-bold text-[#fbbf24] group-hover:text-white transition-colors">
                            {resource.name}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#fbbf24] transition-colors" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 flex-1">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[#fbbf24]">⭐ {resource.stars.toLocaleString()}</span>
                        {resource.license && (
                          <span className="text-muted-foreground">📄 {resource.license}</span>
                        )}
                        <span className="text-muted-foreground">by {resource.author}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              All resources are open source and free to use. 
              Support the developers by starring their repositories!
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Last updated: April 2025 • Suggest additions via GitHub
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
