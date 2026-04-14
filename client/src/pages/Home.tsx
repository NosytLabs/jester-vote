import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { VoteStreakPanel } from "@/components/VoteStreakPanel";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import {
  useRealtimeVotes,
  useVoteStreak,
  useAnimatedLeaderboard,
} from "@/hooks/useRealtimeVotes";
import { motion } from "framer-motion";
import { Crown, Sparkles, Flame, Theater } from "lucide-react";

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
        {/* 🎪 JESTER COURT HEADER - Unique, NOT ip2.network clone */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center relative"
        >
          {/* Floating Jester Elements */}
          <div className="absolute top-0 left-[15%] text-3xl opacity-40">
            <motion.span 
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >🃏</motion.span>
          </div>
          <div className="absolute top-0 right-[15%] text-3xl opacity-40">
            <motion.span 
              animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >🎭</motion.span>
          </div>

          {/* Main Title - Medieval Court Style */}
          <div className="relative inline-block">
            <motion.div
              className="text-5xl md:text-7xl font-black text-gradient-jester mb-2 jester-hat"
              style={{ fontFamily: "serif" }}
            >
              🏰 THE COURT OF FOOLS 🏰
            </motion.div>
            
            {/* Crown decorations */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-8">
              <motion.span 
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >👑</motion.span>
              <motion.span 
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-2xl"
              >👑</motion.span>
            </div>
          </div>

          {/* Subtitle - Medieval Style */}
          <motion.p 
            className="text-lg text-[#fbbf24] font-medium italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            "Where the biggest jesters of streaming are crowned by the people"
          </motion.p>

          {/* Court Divider */}
          <div className="court-divider max-w-md mx-auto mt-4" />
        </motion.div>

        {/* 🎪 STATS CARDS - Unique Jester Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div 
            className="jester-card p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl mb-2">🎪</div>
            <p className="text-2xl font-bold text-[#fbbf24]">{entries.length}</p>
            <p className="text-xs text-muted-foreground">Court Jesters</p>
          </motion.div>

          <motion.div 
            className="jester-card p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <div className="text-3xl mb-2">⚔️</div>
            <p className="text-2xl font-bold text-[#fbbf24]">
              {entries.reduce((sum, e) => sum + e.upvotes + e.downvotes, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Royal Decrees</p>
          </motion.div>

          <motion.div 
            className="jester-card p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <div className="text-3xl mb-2">🔥</div>
            <p className="text-2xl font-bold text-[#fbbf24]">
              {streak.globalStats?.totalVotes24h?.toLocaleString() || "0"}
            </p>
            <p className="text-xs text-muted-foreground">Today's Clownery</p>
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

        {/* 🎪 FOOTER */}
        <motion.footer 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="court-divider max-w-sm mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            🎪 The Court of Fools — Where streamers are judged by the people 🎪
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Not affiliated with ip2.network — Unique jester-themed ranking platform
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
