import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, TrendingUp, TrendingDown, Minus, Crown, Trophy, Medal, Award } from "lucide-react";
import { memo } from "react";
import { VoteButtonPair, VoteButton } from "./VoteButton";
import type { LeaderboardEntry } from "@/hooks";

interface LiveLeaderboardProps {
  entries: LeaderboardEntry[];
  animatingRanks: Set<number>;
  myVotes: Record<number, "up" | "down">;
  onVote: (nomineeId: number, type: "up" | "down") => void;
  isLoading?: boolean;
  isAuthenticated?: boolean;
}

// Rank badge with crown/medal for top 3
function RankBadge({
  rank,
  rankChange,
  isAnimating,
}: {
  rank: number;
  rankChange: "up" | "down" | "same";
  isAnimating: boolean;
}) {
  const rankIcons = [
    { icon: Crown, color: "oklch(0.85 0.18 85)", bg: "oklch(0.85 0.18 85 / 0.2)" }, // Gold
    { icon: Trophy, color: "oklch(0.75 0.05 250)", bg: "oklch(0.75 0.05 250 / 0.2)" }, // Silver
    { icon: Medal, color: "oklch(0.65 0.12 55)", bg: "oklch(0.65 0.12 55 / 0.2)" }, // Bronze
  ];

  const rankConfig = rankIcons[rank - 1];
  const Icon = rankConfig?.icon || Award;
  const color = rankConfig?.color || "oklch(0.75 0.25 140)";
  const bgColor = rankConfig?.bg || "oklch(0.75 0.25 140 / 0.1)";

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-12 sm:h-14"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Rank number - fixed height for alignment */}
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-black text-lg sm:text-xl"
        style={{
          fontFamily: "'Orbitron', monospace",
          background: bgColor,
          border: `2px solid ${color}`,
          color: color,
          boxShadow: rank <= 3 ? `0 0 15px ${color}40` : "none",
        }}
      >
        {rank <= 3 ? <Icon size={18} /> : `#${rank}`}
      </div>

      {/* Rank change indicator */}
      <AnimatePresence mode="wait">
        {rankChange !== "same" && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="absolute -bottom-4 flex items-center gap-0.5 text-[9px] font-bold"
            style={{
              color: rankChange === "up" ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
            }}
          >
            {rankChange === "up" ? (
              <>
                <TrendingUp size={10} />
                +{Math.abs(rank)}
              </>
            ) : (
              <>
                <TrendingDown size={10} />
                -{Math.abs(rank)}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Score display with animation
function ScoreDisplay({ score }: { score: number }) {
  const color =
    score > 0 ? "oklch(0.75 0.25 140)" : score < 0 ? "oklch(0.65 0.22 25)" : "oklch(0.6 0 0)";

  return (
    <div className="hidden sm:flex flex-col items-center justify-center min-w-[60px] h-12">
      <AnimatePresence mode="wait">
        <motion.span
          key={score}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          className="text-sm font-bold"
          style={{ color, fontFamily: "'Orbitron', monospace" }}
        >
          {score > 0 ? "+" : ""}
          {score}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">score</span>
    </div>
  );
}

// Individual leaderboard row
function LeaderboardRow({
  entry,
  isAnimating,
  userVote,
  onVote,
}: {
  entry: LeaderboardEntry;
  isAnimating: boolean;
  userVote?: "up" | "down";
  onVote: (type: "up" | "down") => void;
}) {
  const isTop3 = entry.currentRank <= 3;
  
  // Get platform color
  const getPlatformColor = (name: string) => {
    const kickStreamers = ["Adin Ross", "TrainwrecksTV", "xQc", "N3on", "Nickmercs", "BruceDropEmOff"];
    if (kickStreamers.includes(name)) return "#53FC18";
    return "#9146FF";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      className={`group relative ${isTop3 ? "jester-border" : "jester-border-subtle"} bg-card hover:bg-secondary transition-all duration-300`}
      style={{
        boxShadow: isTop3 ? `0 0 20px ${getPlatformColor(entry.name)}20` : undefined,
        borderColor: isTop3 ? getPlatformColor(entry.name) : undefined,
      }}
    >
      {/* Rank change flash effect */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                entry.rankChange === "up"
                  ? "linear-gradient(90deg, transparent, oklch(0.75 0.25 140 / 0.3), transparent)"
                  : entry.rankChange === "down"
                  ? "linear-gradient(90deg, transparent, oklch(0.65 0.22 25 / 0.3), transparent)"
                  : undefined,
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 min-h-[72px] sm:min-h-[80px]">
        {/* Rank - fixed height for alignment */}
        <div className="shrink-0 h-12 sm:h-14 flex items-center">
          <RankBadge
            rank={entry.currentRank}
            rankChange={entry.rankChange}
            isAnimating={isAnimating}
          />
        </div>

        {/* Avatar - fixed height for alignment */}
        <div className="shrink-0 relative h-12 sm:h-14 flex items-center">
          {entry.imageUrl ? (
            <motion.img
              src={entry.imageUrl}
              alt={entry.name}
              width="56"
              height="56"
              loading="lazy"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
              style={{
                border:
                  entry.currentRank === 1
                    ? "3px solid #FFD700"
                    : entry.currentRank === 2
                    ? "3px solid #C0C0C0"
                    : entry.currentRank === 3
                    ? "3px solid #CD7F32"
                    : "2px solid oklch(0.75 0.25 140)",
                boxShadow:
                  entry.currentRank <= 3 
                    ? `0 0 15px ${entry.currentRank === 1 ? '#FFD700' : entry.currentRank === 2 ? '#C0C0C0' : '#CD7F32'}60`
                    : "0 0 10px oklch(0.75 0.25 140 / 0.2)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://i.pravatar.cc/56?u=${entry.nomineeId}`;
              }}
              whileHover={{ scale: 1.05 }}
            />
          ) : (
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 bg-muted flex items-center justify-center text-lg font-bold"
              style={{ 
                border: entry.currentRank <= 3 
                  ? `2px solid ${entry.currentRank === 1 ? '#FFD700' : entry.currentRank === 2 ? '#C0C0C0' : '#CD7F32'}`
                  : "2px solid oklch(0.75 0.25 140)",
                color: "oklch(0.75 0.25 140)",
              }}
            >
              {entry.name[0]?.toUpperCase()}
            </div>
          )}
          {/* Top 3 Badge */}
          {entry.currentRank <= 3 && (
            <div 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
              style={{
                background: entry.currentRank === 1 ? '#FFD700' : entry.currentRank === 2 ? '#C0C0C0' : '#CD7F32',
                color: '#000',
                boxShadow: '0 0 5px rgba(0,0,0,0.5)',
              }}
            >
              {entry.currentRank === 1 ? '👑' : entry.currentRank === 2 ? '🥈' : '🥉'}
            </div>
          )}
        </div>

        {/* Name + description - centered with avatar */}
        <div className="flex-1 min-w-0 flex flex-col justify-center h-12 sm:h-14">
          <Link href={`/nominee/${entry.nomineeId}`}>
            <motion.span
              className="text-sm sm:text-base font-bold text-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer transition-colors truncate block leading-tight"
              whileHover={{ x: 2 }}
            >
              {entry.name}
            </motion.span>
          </Link>
          {entry.description && (
            <p className="text-xs text-muted-foreground truncate hidden sm:block mt-0.5 leading-relaxed">
              {entry.description}
            </p>
          )}

          {/* Mobile score */}
          <div className="sm:hidden flex items-center gap-2 mt-1">
            <span
              className="text-xs font-bold"
              style={{
                color:
                  entry.score > 0
                    ? "oklch(0.75 0.25 140)"
                    : entry.score < 0
                    ? "oklch(0.65 0.22 25)"
                    : "oklch(0.6 0 0)",
              }}
            >
              {entry.score > 0 ? "+" : ""}
              {entry.score}
            </span>
          </div>
        </div>

        {/* Score (desktop) */}
        <div className="hidden sm:flex items-center">
          <ScoreDisplay score={entry.score} />
        </div>

        {/* Vote buttons - aligned center with content */}
        <div className="flex items-center justify-center shrink-0 h-12 sm:h-14">
          <VoteButtonPair
            nomineeId={entry.nomineeId}
            upvotes={entry.upvotes}
            downvotes={entry.downvotes}
            userVote={userVote}
            onVote={onVote}
            size="md"
          />
        </div>

        {/* Profile link */}
        <Link href={`/nominee/${entry.nomineeId}`}>
          <motion.div
            className="shrink-0 p-1 flex items-center"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight
              size={18}
              className="text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer transition-colors"
            />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

// Skeleton loader
function LeaderboardSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="jester-border-subtle p-3 sm:p-4 animate-pulse bg-card h-16 sm:h-20"
        />
      ))}
    </div>
  );
}

// Empty state
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="jester-border p-8 sm:p-12 text-center bg-gradient-to-b from-card to-background"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Trophy
          size={64}
          className="mx-auto mb-6"
          style={{ color: "oklch(0.75 0.25 140)" }}
        />
      </motion.div>
      <h3 
        className="text-xl sm:text-2xl font-bold mb-3" 
        style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)" }}
      >
        The Court is Empty
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
        No jesters have been crowned yet. Be the first to submit a streamer 
        with documented controversies to the rankings!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/submit">
          <motion.button
            className="jester-btn px-6 py-3 rounded-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit a Jester
          </motion.button>
        </Link>
        <Link href="/about">
          <motion.button
            className="px-6 py-3 rounded-lg font-bold border border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)] hover:bg-[oklch(0.75_0.25_140)]/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// Main leaderboard component
export const LiveLeaderboard = memo(function LiveLeaderboard({
  entries,
  animatingRanks,
  myVotes,
  onVote,
  isLoading,
}: LiveLeaderboardProps) {
  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-1 sm:space-y-2">
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <LeaderboardRow
            key={entry.nomineeId}
            entry={entry}
            isAnimating={animatingRanks.has(entry.nomineeId)}
            userVote={myVotes[entry.nomineeId]}
            onVote={(type) => onVote(entry.nomineeId, type)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

// Compact leaderboard for sidebars/mobile
export const CompactLeaderboard = memo(function CompactLeaderboard({
  entries,
  animatingRanks,
  myVotes,
  onVote,
  limit = 5,
}: LiveLeaderboardProps & { limit?: number }) {
  const displayEntries = entries.slice(0, limit);

  return (
    <div className="space-y-1">
      {displayEntries.map((entry) => (
        <motion.div
          key={entry.nomineeId}
          layout
          className="flex items-center gap-2 p-2 jester-border-subtle bg-card"
        >
          <span
            className="text-xs font-bold w-5 text-center"
            style={{
              color:
                entry.currentRank === 1
                  ? "oklch(0.85 0.18 85)"
                  : entry.currentRank === 2
                  ? "oklch(0.75 0.05 250)"
                  : entry.currentRank === 3
                  ? "oklch(0.65 0.12 55)"
                  : "oklch(0.6 0 0)",
              fontFamily: "'Orbitron', monospace",
            }}
          >
            #{entry.currentRank}
          </span>

          {entry.imageUrl ? (
            <img
              src={entry.imageUrl}
              alt={entry.name}
              className="w-8 h-8 object-cover"
              style={{ border: "1px solid oklch(0.22 0 0)" }}
            />
          ) : (
            <div className="w-8 h-8 bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
              {entry.name[0]?.toUpperCase()}
            </div>
          )}

          <Link href={`/nominee/${entry.nomineeId}`} className="flex-1 min-w-0">
            <span className="text-xs font-bold truncate block hover:text-[oklch(0.75_0.25_140)] cursor-pointer">
              {entry.name}
            </span>
          </Link>

          <span
            className="text-xs font-bold"
            style={{
              color:
                entry.score > 0
                  ? "oklch(0.75 0.25 140)"
                  : entry.score < 0
                  ? "oklch(0.65 0.22 25)"
                  : "oklch(0.6 0 0)",
            }}
          >
            {entry.score > 0 ? "+" : ""}
            {entry.score}
          </span>

          <VoteButtonPair
            nomineeId={entry.nomineeId}
            upvotes={entry.upvotes}
            downvotes={entry.downvotes}
            userVote={myVotes[entry.nomineeId]}
            onVote={(type) => onVote(entry.nomineeId, type)}
            size="sm"
          />
        </motion.div>
      ))}
    </div>
  );
});
