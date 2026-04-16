"use client";

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { VoteStreakPanel } from "@/components/VoteStreakPanel";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { HomePageSkeleton, LeaderboardSkeleton } from "@/components/SkeletonLoader";
import {
  useRealtimeVotes,
  useVoteStreak,
  useAnimatedLeaderboard,
} from "@/hooks/useRealtimeVotes";
import { motion } from "framer-motion";
import { Crown, Sparkles, Flame, Theater, TrendingUp } from "lucide-react";

export default function Home() {
  const [period, setPeriod] = useState<"alltime" | "week">("alltime");
  const { isAuthenticated } = useAuth();

  const {
    entries,
    isLoading,
    animatingRanks,
    myVotes,
    refetch,
  } = useAnimatedLeaderboard(period);

  const streak = useVoteStreak();

  const { isConnected, lastUpdate } = useRealtimeVotes({
    enabled: true,
    onVoteUpdate: useCallback(() => {
      // Real-time updates handled by useAnimatedLeaderboard
    }, []),
  });

  const castVote = trpc.votes.cast.useMutation({
    onSuccess: (data, variables) => {
      refetch();
      // Show feedback toast
      const voteType = variables.voteType;
      const nominee = entries.find(e => e.nomineeId === variables.nomineeId);
      if (nominee) {
        if (voteType === "up") {
          toast.success(`👑 Crowned ${nominee.name}! Your vote has been counted.`, {
            icon: "🎭",
            duration: 2000,
          });
        } else {
          toast.error(`🃏 Downvoted ${nominee.name}. The court has spoken.`, {
            icon: "⚖️",
            duration: 2000,
          });
        }
      }
    },
    onError: (e) => toast.error(e.message),
  });

  const handleVote = (nomineeId: number, voteType: "up" | "down") => {
    castVote.mutate({ nomineeId, voteType });
  };

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col">
      <Header />

      <main id="main-content" className="container py-6 md:py-8 flex-1">
        {/* 🎪 JESTER COURT HEADER - Enhanced with Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center relative"
        >
          {/* Floating Jester Elements */}
          <div className="absolute top-0 left-[5%] text-4xl opacity-60 hidden md:block">
            <motion.span 
              animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block filter drop-shadow-lg"
            >🃏</motion.span>
          </div>
          <div className="absolute top-0 right-[5%] text-4xl opacity-60 hidden md:block">
            <motion.span 
              animate={{ y: [0, -15, 0], rotate: [0, -15, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
              className="inline-block filter drop-shadow-lg"
            >🎭</motion.span>
          </div>

          {/* Title Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
            
            <div className="relative px-6 py-4 md:px-10 md:py-6">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-8">
                <motion.span 
                  animate={{ rotate: [0, 20, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl filter drop-shadow-lg"
                >👑</motion.span>
                <motion.span 
                  animate={{ rotate: [0, -20, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  className="text-2xl filter drop-shadow-lg"
                >👑</motion.span>
              </div>
              
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-black text-gradient-jester mb-2"
                style={{ 
                  fontFamily: "'Orbitron', serif", 
                  letterSpacing: "0.05em",
                  textShadow: "0 0 30px oklch(0.75 0.25 140 / 0.4)"
                }}
              >
                THE COURT OF FOOLS
              </h1>
            </div>
          </motion.div>

          <motion.p 
            className="text-base md:text-lg text-[#fbbf24] font-medium italic mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            "Where the biggest jesters of streaming are crowned by the people"
          </motion.p>

          {/* Quick Stats Bar */}
          <motion.div 
            className="flex justify-center gap-6 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-muted-foreground">
              <span className="text-[#fbbf24] font-bold">{entries.length}</span> Jesters
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              <span className="text-[#fbbf24] font-bold">
                {entries.reduce((sum, e) => sum + e.upvotes + e.downvotes, 0).toLocaleString()}
              </span> Votes Cast
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              {isConnected ? "🟢 Live" : "🔴 Offline"}
            </span>
          </motion.div>
        </motion.div>

        {/* 🎪 TOP 3 PODIUM - Show the leaders */}
        {entries.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center items-end gap-2 md:gap-4">
              {/* 2nd Place */}
              {entries[1] && (
                <Link href={`/nominee/${entries[1].nomineeId}`}>
                  <motion.div 
                    className="flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <img 
                        src={entries[1].imageUrl || `https://i.pravatar.cc/80?u=${entries[1].nomineeId}`}
                        alt={entries[1].name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-3"
                        style={{ borderColor: '#C0C0C0', boxShadow: '0 0 15px #C0C0C060' }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C0C0C0] rounded-full flex items-center justify-center text-black font-bold text-xs">2</div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs md:text-sm font-bold text-[#C0C0C0] truncate max-w-[80px]">{entries[1].name}</p>
                      <p className="text-[10px] text-muted-foreground">{entries[1].score > 0 ? '+' : ''}{entries[1].score}</p>
                    </div>
                    <div className="w-16 md:w-20 h-16 bg-gradient-to-t from-[#C0C0C0]/30 to-transparent rounded-t-lg mt-1" />
                  </motion.div>
                </Link>
              )}
              
              {/* 1st Place */}
              {entries[0] && (
                <Link href={`/nominee/${entries[0].nomineeId}`}>
                  <motion.div 
                    className="flex flex-col items-center cursor-pointer -mt-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="text-3xl mb-1"
                      animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >👑</motion.div>
                    <div className="relative">
                      <img 
                        src={entries[0].imageUrl || `https://i.pravatar.cc/100?u=${entries[0].nomineeId}`}
                        alt={entries[0].name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4"
                        style={{ borderColor: '#FFD700', boxShadow: '0 0 20px #FFD70080' }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFD700] rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm md:text-base font-bold text-[#FFD700] truncate max-w-[100px]">{entries[0].name}</p>
                      <p className="text-xs text-[#fbbf24]">{entries[0].score > 0 ? '+' : ''}{entries[0].score}</p>
                    </div>
                    <div className="w-20 md:w-24 h-24 bg-gradient-to-t from-[#FFD700]/30 to-transparent rounded-t-lg mt-1" />
                  </motion.div>
                </Link>
              )}
              
              {/* 3rd Place */}
              {entries[2] && (
                <Link href={`/nominee/${entries[2].nomineeId}`}>
                  <motion.div 
                    className="flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <img 
                        src={entries[2].imageUrl || `https://i.pravatar.cc/80?u=${entries[2].nomineeId}`}
                        alt={entries[2].name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-3"
                        style={{ borderColor: '#CD7F32', boxShadow: '0 0 15px #CD7F3260' }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#CD7F32] rounded-full flex items-center justify-center text-black font-bold text-xs">3</div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs md:text-sm font-bold text-[#CD7F32] truncate max-w-[80px]">{entries[2].name}</p>
                      <p className="text-[10px] text-muted-foreground">{entries[2].score > 0 ? '+' : ''}{entries[2].score}</p>
                    </div>
                    <div className="w-16 md:w-20 h-12 bg-gradient-to-t from-[#CD7F32]/30 to-transparent rounded-t-lg mt-1" />
                  </motion.div>
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* 🎪 TIME PERIOD SELECTOR - Medieval Style */}
        <div className="flex justify-center gap-2 mb-6">
          <motion.button
            onClick={() => setPeriod("alltime")}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              period === "alltime"
                ? "jester-btn"
                : "bg-[#27273a] text-[#94a3b8] hover:bg-[#3f3f5f]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Crown className="inline w-4 h-4 mr-2" />
            All Time Legends
          </motion.button>
          <motion.button
            onClick={() => setPeriod("week")}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              period === "week"
                ? "jester-btn"
                : "bg-[#27273a] text-[#94a3b8] hover:bg-[#3f3f5f]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="inline w-4 h-4 mr-2" />
            Weekly Clownery
          </motion.button>
        </div>

        {/* 🎪 MAIN CONTENT - Live Leaderboard */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Theater className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-gradient-jester">The Royal Rankings</span>
                </h2>
                <ConnectionStatus isConnected={isConnected} lastUpdate={lastUpdate} />
              </div>

              <LiveLeaderboard
                entries={entries}
                isLoading={isLoading}
                animatingRanks={animatingRanks}
                myVotes={myVotes}
                onVote={handleVote}
                isAuthenticated={isAuthenticated}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vote Streak Panel */}
            <VoteStreakPanel streak={streak} />

            {/* CTA for non-authenticated users */}
            {!isAuthenticated && (
              <motion.div 
                className="jester-card p-6 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="font-bold text-lg mb-2 text-[#fbbf24]">Join the Court!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Login to cast your votes and crown the biggest jesters
                </p>
                <Link href="/login">
                  <motion.button 
                    className="jester-btn w-full honk-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enter the Court
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Fun Fact */}
            <motion.div 
              className="medieval-scroll text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-bold text-[#8b4513] mb-2">📜 Royal Decree</h4>
              <p className="text-sm text-[#5d4e37] italic">
                "The fool who knows he is a fool is for that very reason wise. 
                The fool who thinks himself wise is the greatest fool of all."
              </p>
              <p className="text-xs text-[#8b7355] mt-2">— Ancient Streaming Wisdom</p>
            </motion.div>
          </div>
        </div>

        {/* 🎪 RESEARCH HIGHLIGHT */}
        <motion.div 
          className="mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="jester-card p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-[#fbbf24]" />
              <h3 className="font-bold text-[#fbbf24]">2024-2025 Streaming Research</h3>
              <Flame className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Tracking the biggest controversies: Adin Ross's Kick→Twitch return, N3on's platform drama, 
              TrainwrecksTV's gambling streams, xQc's endless feuds, and more.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#9146FF]"></span> Twitch
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#53FC18]"></span> Kick
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF0000]"></span> YouTube
              </span>
            </div>
          </div>
        </motion.div>

        {/* 🎪 SEO CONTENT SECTION - Hidden visually but available to crawlers */}
        <section className="sr-only" aria-label="About TopJester">
          <h2>TopJester - The Court of Fools: Streamer Rankings and Lolcow Voting</h2>
          <p>
            TopJester is the premier destination for tracking the biggest jesters, lolcows, and controversial figures 
            in streaming culture. Our community-driven platform allows users to vote on streamers from Twitch, Kick, 
            YouTube, and other platforms who have become infamous for their dramatic content, controversial behavior, 
            or entertaining mishaps.
          </p>
          <p>
            The term "lolcow" originated from internet culture to describe individuals who are endlessly entertaining 
            due to their lack of self-awareness, dramatic behavior, or constant controversies. From DSP's gaming rage 
            to Wings of Redemption's legendary trolling saga, from Ice Poseidon's IRL pioneering to modern Kick streamers 
            like Adin Ross and N3on, we track them all.
          </p>
          <p>
            Our database includes legendary figures like DarkSydePhil (DSP), Wings of Redemption, LowTierGod, Boogie2988, 
            Chris Chan, and Onision, alongside modern streamers like Sneako, JiDion, and Cx Network alumni. 
            Each profile includes their most infamous moments, controversies, and verified social media links.
          </p>
          <p>
            Join our community to vote on who deserves the crown of the biggest jester. Login with Kick, Twitch, 
            or YouTube OAuth to participate in real-time voting and track the ever-changing rankings of streaming's 
            most controversial figures.
          </p>
          <h3>Featured Categories</h3>
          <ul>
            <li>Gaming Lolcows - Streamers known for gaming rage and skill issues</li>
            <li>IRL Streamers - In-real-life content creators and their chaotic adventures</li>
            <li>Mukbang Creators - Food-related content with dramatic elements</li>
            <li>Commentary Channels - Opinionated creators and their hot takes</li>
            <li>Cx Network Alumni - Members of the legendary IRL streaming group</li>
          </ul>
          <h3>Platform Coverage</h3>
          <ul>
            <li>Twitch - The original streaming platform</li>
            <li>Kick - The controversial new streaming platform</li>
            <li>YouTube - Video and streaming content</li>
            <li>Rumble - Alternative video platform</li>
          </ul>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
