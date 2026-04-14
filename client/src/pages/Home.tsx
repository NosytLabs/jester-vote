import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
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
    onSuccess: () => {
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleVote = (nomineeId: number, voteType: "up" | "down") => {
    castVote.mutate({ nomineeId, voteType });
  };

  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />

      <main role="main" className="container py-6">
        {/* 🎪 JESTER COURT HEADER - Glassmorphism Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative"
        >
          {/* Floating Jester Elements with Glassmorphism */}
          <div className="absolute top-0 left-[10%] text-4xl opacity-60 hidden md:block">
            <motion.span 
              animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block filter drop-shadow-lg"
            >🃏</motion.span>
          </div>
          <div className="absolute top-0 right-[10%] text-4xl opacity-60 hidden md:block">
            <motion.span 
              animate={{ y: [0, -15, 0], rotate: [0, -15, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
              className="inline-block filter drop-shadow-lg"
            >🎭</motion.span>
          </div>

          {/* Glassmorphism Title Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-block"
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
            
            <div className="relative px-8 py-6 md:px-12 md:py-8">
              {/* Crown decorations */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-12">
                <motion.span 
                  animate={{ rotate: [0, 20, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl filter drop-shadow-lg"
                >👑</motion.span>
                <motion.span 
                  animate={{ rotate: [0, -20, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  className="text-3xl filter drop-shadow-lg"
                >👑</motion.span>
              </div>
              
              {/* Main Title */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-black text-gradient-jester mb-3"
                style={{ fontFamily: "'Orbitron', serif", letterSpacing: "0.05em" }}
                animate={{ textShadow: [
                  "0 0 20px oklch(0.75 0.25 140 / 0.4)",
                  "0 0 40px oklch(0.75 0.25 140 / 0.6)",
                  "0 0 20px oklch(0.75 0.25 140 / 0.4)"
                ]}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                THE COURT
                <br />
                <span className="text-3xl md:text-5xl lg:text-6xl">OF FOOLS</span>
              </motion.h1>
            </div>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-[#fbbf24] font-medium italic mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            "Where the biggest jesters of streaming are crowned by the people"
          </motion.p>

          {/* Animated Court Divider */}
          <motion.div 
            className="max-w-lg mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.div>

        {/* 🎪 STATS CARDS - Glassmorphism Modern Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8]/20 to-[#fbbf24]/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg group-hover:border-[#fbbf24]/30 transition-all duration-300" />
            <div className="relative p-5 text-center">
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >🎪</motion.div>
              <p className="text-3xl font-black text-[#fbbf24] drop-shadow-lg">{entries.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Court Jesters</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/20 to-[#fbbf24]/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg group-hover:border-[#fbbf24]/30 transition-all duration-300" />
            <div className="relative p-5 text-center">
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: -10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >⚔️</motion.div>
              <p className="text-3xl font-black text-[#fbbf24] drop-shadow-lg">
                {entries.reduce((sum, e) => sum + e.upvotes + e.downvotes, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Royal Decrees</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a]/20 to-[#fbbf24]/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg group-hover:border-[#fbbf24]/30 transition-all duration-300" />
            <div className="relative p-5 text-center">
              <motion.div 
                className="text-4xl mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >🔥</motion.div>
              <p className="text-3xl font-black text-[#fbbf24] drop-shadow-lg">
                {streak.globalStats?.totalVotes24h?.toLocaleString() || "0"}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Today's Clownery</p>
            </div>
          </motion.div>

          <motion.div 
            className="jester-card p-4 text-center laugh-hover cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
          >
            <div className="text-3xl mb-2">🤡</div>
            <p className="text-2xl font-bold text-[#fbbf24]">
              {isConnected ? "🟢" : "🔴"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isConnected ? "Court in Session" : "Court Adjourned"}
            </p>
          </motion.div>
        </div>

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

        {/* 🎪 FOOTER */}
        <motion.footer 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="court-divider max-w-sm mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            🎪 The Court of Fools — Where streamers are judged by the people 🎪
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Login with <span className="text-[#53FC18]">Kick</span>, <span className="text-[#9146FF]">Twitch</span>, or <span className="text-[#FF0000]">YouTube</span> to join the voting
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Not affiliated with ip2.network — Unique jester-themed ranking platform
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
