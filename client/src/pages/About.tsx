import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Crown, Theater, Scale, Gavel, Users, Sparkles, Flame, Trophy } from "lucide-react";

// Featured jesters data based on 2024-2025 research
const FEATURED_JESTERS = [
  {
    name: "Adin Ross",
    platform: "Kick → Twitch",
    tagline: "The King of Controversy",
    description: "Permanently banned from Twitch in 2023, moved to Kick as their golden boy, then unbanned and returned to Twitch in 2025. Known for the infamous Playboi Carti stream disaster and Andrew Tate collaborations.",
    emoji: "👑",
    color: "#9146FF"
  },
  {
    name: "N3on",
    platform: "Kick → Twitch",
    tagline: "The Drama Magnet",
    description: "Called out by NYC gang members, accused Kick of having a 'hidden agenda' against him, and switched to Twitch in 2025. Known for misgendering controversies at TwitchCon 2024.",
    emoji: "🔥",
    color: "#53FC18"
  },
  {
    name: "TrainwrecksTV",
    platform: "Kick Co-Owner",
    tagline: "The Gambling Baron",
    description: "Co-owner of Kick streaming platform. Accused Stake of 'greed' and had public conflicts with the platform. Known for burning through millions in gambling streams and Rust event controversies.",
    emoji: "🎰",
    color: "#53FC18"
  },
  {
    name: "xQc",
    platform: "Twitch",
    tagline: "The Drama King",
    description: "Long-standing rivalry with Pokimane, feuds with Kai Cenat over who started the celebrity streamer wave. Known for calling out Twitch's inconsistent moderation and the infamous Adept lawsuit drama.",
    emoji: "⚔️",
    color: "#9146FF"
  },
  {
    name: "Sneako",
    platform: "Rumble/X",
    tagline: "The Provocateur",
    description: "Banned from multiple platforms, moved to Rumble. Known for posting NYC vlogs featuring controversial streamer callouts and provocative political content.",
    emoji: "🗽",
    color: "#FF0000"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main role="main" className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🎭
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
              About The Court
            </h1>
            <p className="text-lg text-[#fbbf24]">
              Where the biggest jesters of streaming are crowned by the people
            </p>
          </div>

          {/* Featured Jesters Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-[#fbbf24]" />
              <h2 className="text-2xl font-bold text-gradient-jester">The Royal Court of 2024-2025</h2>
              <Trophy className="w-6 h-6 text-[#fbbf24]" />
            </div>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Based on extensive research of streaming controversies, platform drama, and community reactions. 
              These are the jesters who dominated headlines and sparked the most debate.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {FEATURED_JESTERS.map((jester, index) => (
                <motion.div
                  key={jester.name}
                  className="jester-card p-5 relative overflow-hidden group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: jester.color }}
                  />
                  
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="text-4xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {jester.emoji}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-[#fbbf24]">{jester.name}</h3>
                          <span 
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ 
                              backgroundColor: `${jester.color}20`,
                              color: jester.color,
                              border: `1px solid ${jester.color}40`
                            }}
                          >
                            {jester.platform}
                          </span>
                        </div>
                        <p className="text-xs text-[#fbbf24]/80 italic mb-2">{jester.tagline}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {jester.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Cards */}
          <div className="space-y-6">
            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                TopJester is a community-driven platform where viewers vote to rank 
                the most entertaining, controversial, and clown-worthy streamers. 
                We believe in letting the community decide who truly deserves the 
                crown of the biggest jester in streaming. Our research tracks platform 
                drama, controversies, and viral moments across Twitch, Kick, YouTube, and beyond.
              </p>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Theater className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">How It Works</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">1.</span>
                  <span>Browse the Court and discover streamers with documented controversies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">2.</span>
                  <span>Cast your vote: upvote for entertainment value, downvote for clownery level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">3.</span>
                  <span>Watch real-time rankings update as the community votes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">4.</span>
                  <span>Submit new jesters with evidence of their most controversial moments</span>
                </li>
              </ul>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="jester-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-[#fbbf24]" />
                  <h2 className="text-xl font-bold text-[#fbbf24]">Fair & Transparent</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our voting system is designed to be fair and transparent. Each user 
                  gets one vote per streamer, and votes are counted in real-time. 
                  We use a weighted algorithm that considers both upvotes and downvotes 
                  to determine the true "jester score" of each streamer.
                </p>
              </motion.div>

              <motion.div 
                className="jester-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-[#fbbf24]" />
                  <h2 className="text-xl font-bold text-[#fbbf24]">Community Driven</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  TopJester is built by the community, for the community. We don't 
                  take sides or promote specific streamers. The rankings are purely 
                  determined by community votes. Join us in documenting and celebrating 
                  the most entertaining moments in streaming history!
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Research Methodology</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Our research tracks streamers across multiple platforms and sources:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Platform bans & unbans", "Viral controversies", "Community reactions", "Drama between streamers", "TwitchCon incidents", "Gambling streams", "Celebrity collaborations", "Platform switches"].map((item, i) => (
                  <motion.div 
                    key={item}
                    className="bg-[#27273a] rounded-lg px-3 py-2 text-xs text-center text-[#94a3b8]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.05 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.p 
            className="text-center text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Not affiliated with ip2.network — A unique jester-themed ranking platform
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}