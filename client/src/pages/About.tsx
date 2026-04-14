import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Crown, Theater, Scale, Gavel } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main role="main" className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
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
              Where the biggest jesters of streaming are crowned
            </p>
          </div>

          {/* Content Cards */}
          <div className="space-y-6">
            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                TopJester is a community-driven platform where viewers vote to rank 
                the most entertaining, controversial, and clown-worthy streamers. 
                We believe in letting the community decide who truly deserves the 
                crown of the biggest jester in streaming.
              </p>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Theater className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">How It Works</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">1.</span>
                  <span>Browse the Court and discover streamers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">2.</span>
                  <span>Cast your vote: upvote for entertainment, downvote for clownery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">3.</span>
                  <span>Watch real-time rankings update as the community votes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24]">4.</span>
                  <span>Submit new jesters for the community to judge</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Gavel className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Community First</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                TopJester is built by the community, for the community. We don't 
                take sides or promote specific streamers. The rankings are purely 
                determined by community votes. Join us in celebrating the most 
                entertaining moments in streaming history!
              </p>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.p 
            className="text-center text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Not affiliated with ip2.network — A unique jester-themed ranking platform
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}