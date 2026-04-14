import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLegacyLoginUrl } from "@/const";
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
import { Clock, Trophy, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [period, setPeriod] = useState<"alltime" | "week">("alltime");
  const { isAuthenticated } = useAuth();

  // Real-time leaderboard with animations
  const {
    entries,
    isLoading,
    animatingRanks,
    myVotes,
    refetch,
  } = useAnimatedLeaderboard(period);

  // Vote streak and gamification
  const streak = useVoteStreak();

  // Real-time connection status
  const { isConnected, lastUpdate } = useRealtimeVotes({
    enabled: true,
    onVoteUpdate: useCallback(() => {
      // Real-time updates are handled by useAnimatedLeaderboard
    }, []),
  });

  // Vote mutation with optimistic updates
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
    <div className="min-h-screen bg-background">
      <Header />

      <main role="main" className="container py-4 sm:py-6">
        {/* Page title - Medieval Court Theme */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          {/* Royal banner */}
          <div className="court-banner py-2 mb-4 mx-auto max-w-lg rounded-lg">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">👑</span>
            </motion.div>
          </div>
          
          <h1
            className="text-2xl sm:text-4xl font-black tracking-widest jester-hat"
            style={{
              fontFamily: "'Orbitron', monospace",
              color: "oklch(0.75 0.25 140)",
              textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.4), 0 0 40px oklch(0.55 0.22 300 / 0.3)",
            }}
          >
            THE COURT OF FOOLS
          </h1>
          
          <motion.p 
            className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-[oklch(0.75_0.25_140)]">🎭</span> Who's the biggest clown in streaming? <span className="text-[oklch(0.75_0.25_140)]">🤡</span><br/>
            Cast your vote in the Royal Court of Chaos! <span className="text-[oklch(0.85_0.18_85)]">👑</span>
          </motion.p>
          
          {/* Funny tagline rotation */}
          <motion.div
            className="mt-2 text-[10px] text-[oklch(0.65_0.22_300)] italic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Where the lolcows roam and the jesters get crowned"
          </motion.div>
        </motion.div>

        {/* Stats bar - Royal Court Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6"
        >
          <div className="jester-border-subtle bg-card p-3 flex items-center gap-3 hover-laugh">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: "oklch(0.75 0.25 140 / 0.2)" }}
            >
              <span className="text-xl">🎭</span>
            </div>
            <div>
              <div
                className="text-lg font-black"
                style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)" }}
              >
                {entries.length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Court Jesters
              </div>
            </div>
          </div>

          <div className="jester-border-subtle bg-card p-3 flex items-center gap-3 hover-laugh">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: "oklch(0.85 0.18 85 / 0.2)" }}
            >
              <span className="text-xl">🤡</span>
            </div>
            <div>
              <div
                className="text-lg font-black"
                style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)" }}
              >
                Live
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Clownery
              </div>
            </div>
          </div>

          <div className="jester-border-subtle bg-card p-3 flex items-center gap-3 sm:col-span-2 hover-laugh">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: "oklch(0.65 0.22 25 / 0.2)" }}
            >
              <span className="text-xl">👑</span>
            </div>
            <div className="flex-1">
              <div
                className="text-sm font-bold truncate"
                style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)" }}
              >
                {isAuthenticated ? streak.rank : "Join the Royal Court"}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {isAuthenticated
                  ? `${streak.totalVotes} royal decrees cast`
                  : "Login to crown fools"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Leaderboard - takes 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-4">
            {/* Mode toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-0 jester-border p-0.5">
                <button
                  onClick={() => setPeriod("alltime")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors honk-btn ${
                    period === "alltime"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>🏛️</span>
                  HALL OF SHAME
                </button>
                <button
                  onClick={() => setPeriod("week")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors honk-btn ${
                    period === "week"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>🎪</span>
                  WEEKLY CLOWNERY
                </button>
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="relative"
                  animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isConnected
                        ? "oklch(0.75 0.25 140)"
                        : "oklch(0.65 0.22 25)",
                    }}
                  />
                  {isConnected && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "oklch(0.75 0.25 140)" }}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <span
                  className="text-[10px] uppercase tracking-wider font-medium"
                  style={{
                    color: isConnected
                      ? "oklch(0.75 0.25 140)"
                      : "oklch(0.65 0.22 25)",
                  }}
                >
                  {isConnected ? "Live" : "Offline"}
                </span>
              </div>
            </motion.div>

            {/* Live leaderboard */}
            <LiveLeaderboard
              entries={entries}
              animatingRanks={animatingRanks}
              myVotes={myVotes}
              onVote={handleVote}
              isLoading={isLoading}
            />
          </div>

          {/* Sidebar - takes 1 column on large screens */}
          <div className="lg:col-span-1 space-y-4">
            {/* Vote streak panel (only when authenticated) */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VoteStreakPanel streak={streak} />
              </motion.div>
            )}

            {/* Submit CTA - Royal Nominations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="jester-border p-4 text-center bg-card"
            >
              <p className="text-xs text-muted-foreground mb-2">
                <span className="text-[oklch(0.75_0.25_140)]">🎪</span> Spotted a worthy fool?
              </p>
              <p className="text-[10px] text-muted-foreground mb-3 italic">
                "The Court is always seeking new entertainers..."
              </p>
              {isAuthenticated ? (
                <Link href="/submit">
                  <motion.span
                    className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer honk-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-1">👑</span> NOMINATE A JESTER
                  </motion.span>
                </Link>
              ) : (
                <motion.a
                  href={getLegacyLoginUrl()}
                  className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors honk-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1">🎭</span> LOGIN TO THE COURT
                </motion.a>
              )}
            </motion.div>

            {/* About card - Royal Decree */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="jester-border-subtle p-4 bg-card court-banner"
            >
              <h3
                className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1"
                style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.75 0.25 140)" }}
              >
                <span>📜</span> Royal Decree
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                By order of the Court of Fools, all lolcows, jesters, and clowns 
                shall be ranked by popular vote. Long live the chaos! 
                <span className="text-[oklch(0.75_0.25_140)]">🎭🤡👑</span>
              </p>
              <div className="mt-2 pt-2 border-t border-[oklch(0.22_0_0)] text-[9px] text-[oklch(0.55_0.22_300)] italic">
                "In clownery we trust, in drama we delight"
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer - Royal Court Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-[10px] text-muted-foreground border-t border-border pt-4"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span>🎭</span>
            <span className="text-[oklch(0.75_0.25_140)]">TopJester</span>
            <span>👑</span>
            <span className="text-[oklch(0.85_0.18_85)]">Court of Fools</span>
            <span>🤡</span>
          </div>
          <div className="text-[9px] opacity-60">
            Community Rankings • Login with Kick to cast royal decrees • Real-time clownery
          </div>
          <motion.div 
            className="mt-2 text-[8px] text-[oklch(0.55_0.22_300)]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "May the best clown win" 🏆
          </motion.div>
        </motion.div>
      </main>

      {/* Connection status indicator */}
      <ConnectionStatus
        isConnected={isConnected}
        lastUpdate={lastUpdate}
        onReconnect={() => window.location.reload()}
      />
    </div>
  );
}
