import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Star,
  Crown,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import type { VoteStreak } from "@/hooks";

interface VoteStreakPanelProps {
  streak: VoteStreak;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

// Rank badge with icon
function RankBadge({ rank }: { rank: string }) {
  const rankConfig: Record<string, { icon: typeof Trophy; color: string; bg: string }> = {
    "Jester Novice": { icon: Star, color: "oklch(0.6 0 0)", bg: "oklch(0.15 0 0)" },
    "Court Fool": { icon: Award, color: "oklch(0.65 0.15 250)", bg: "oklch(0.65 0.15 250 / 0.2)" },
    "Royal Jester": { icon: Trophy, color: "oklch(0.75 0.25 140)", bg: "oklch(0.75 0.25 140 / 0.2)" },
    "Master of Mirth": { icon: Crown, color: "oklch(0.85 0.18 85)", bg: "oklch(0.85 0.18 85 / 0.2)" },
    "Legendary Lolcow": { icon: Sparkles, color: "oklch(0.7 0.2 300)", bg: "oklch(0.7 0.2 300 / 0.2)" },
    "Supreme Jester": { icon: Crown, color: "oklch(0.9 0.15 45)", bg: "oklch(0.9 0.15 45 / 0.2)" },
  };

  const config = rankConfig[rank] || rankConfig["Jester Novice"];
  const Icon = config.icon;

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: config.bg,
        border: `1px solid ${config.color}`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon size={14} style={{ color: config.color }} />
      <span className="text-xs font-bold" style={{ color: config.color }}>
        {rank}
      </span>
    </motion.div>
  );
}

// Progress bar to next rank
function RankProgress({ progress, current, next }: { progress: number; current: string; next: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Progress to {next}</span>
        <span className="font-bold" style={{ color: "oklch(0.75 0.25 140)" }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, oklch(0.75 0.25 140), oklch(0.85 0.18 85))",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Stat card
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay = 0,
}: {
  icon: typeof Trophy;
  value: number | string;
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-3 p-3 jester-border-subtle bg-card"
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg"
        style={{ background: `${color}20` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <motion.div
          className="text-lg font-black"
          style={{ color, fontFamily: "'Orbitron', monospace" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1, type: "spring" }}
        >
          {value}
        </motion.div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}

// Streak flame animation
function StreakFlame({ count }: { count: number }) {
  if (count < 3) return null;

  const isHot = count >= 7;

  return (
    <div className="relative flex items-center gap-1">
      <motion.div
        animate={
          isHot
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
              }
            : {}
        }
        transition={{ duration: 0.5, repeat: isHot ? Infinity : 0 }}
      >
        <Flame
          size={20}
          style={{
            color: isHot ? "oklch(0.65 0.22 25)" : "oklch(0.75 0.25 140)",
            filter: isHot ? "drop-shadow(0 0 8px oklch(0.65 0.22 25 / 0.6))" : undefined,
          }}
        />
      </motion.div>
      <span
        className="text-sm font-bold"
        style={{ color: isHot ? "oklch(0.65 0.22 25)" : "oklch(0.75 0.25 140)" }}
      >
        {count} day streak!
      </span>
    </div>
  );
}

// Achievement badge
function AchievementBadge({
  icon: Icon,
  name,
  description,
  unlocked,
  rarity,
}: {
  icon: typeof Trophy;
  name: string;
  description: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}) {
  const rarityColors = {
    common: { color: "oklch(0.6 0 0)", bg: "oklch(0.15 0 0)" },
    rare: { color: "oklch(0.65 0.15 250)", bg: "oklch(0.65 0.15 250 / 0.2)" },
    epic: { color: "oklch(0.75 0.25 140)", bg: "oklch(0.75 0.25 140 / 0.2)" },
    legendary: { color: "oklch(0.85 0.18 85)", bg: "oklch(0.85 0.18 85 / 0.2)" },
  };

  const config = rarityColors[rarity];

  return (
    <motion.div
      className={`flex items-center gap-3 p-2 rounded-lg border ${
        unlocked ? "" : "opacity-40 grayscale"
      }`}
      style={{
        borderColor: unlocked ? config.color : "oklch(0.22 0 0)",
        background: config.bg,
      }}
      whileHover={unlocked ? { scale: 1.02 } : {}}
    >
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full"
        style={{ background: `${config.color}30` }}
      >
        <Icon size={14} style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold truncate" style={{ color: config.color }}>
          {name}
        </div>
        <div className="text-[9px] text-muted-foreground truncate">{description}</div>
      </div>
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-xs"
          style={{ color: config.color }}
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

// Main panel component
export function VoteStreakPanel({ streak, isCollapsed = false, onToggle }: VoteStreakPanelProps) {
  const [showAchievements, setShowAchievements] = useState(false);

  // Calculate achievements based on stats
  const achievements = [
    {
      icon: Star,
      name: "First Vote",
      description: "Cast your first vote",
      unlocked: streak.totalVotes >= 1,
      rarity: "common" as const,
    },
    {
      icon: Target,
      name: "Getting Started",
      description: "Vote on 10 different nominees",
      unlocked: streak.totalVotes >= 10,
      rarity: "common" as const,
    },
    {
      icon: Zap,
      name: "Power Voter",
      description: "Cast 50 total votes",
      unlocked: streak.totalVotes >= 50,
      rarity: "rare" as const,
    },
    {
      icon: Flame,
      name: "On Fire",
      description: "Maintain a 7-day voting streak",
      unlocked: streak.currentStreak >= 7,
      rarity: "rare" as const,
    },
    {
      icon: Trophy,
      name: "Dedicated",
      description: "Cast 100 total votes",
      unlocked: streak.totalVotes >= 100,
      rarity: "epic" as const,
    },
    {
      icon: Crown,
      name: "Legendary",
      description: "Reach Supreme Jester rank",
      unlocked: streak.rank === "Supreme Jester",
      rarity: "legendary" as const,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  if (isCollapsed) {
    return (
      <motion.div
        className="jester-border-subtle bg-card p-3 cursor-pointer"
        onClick={onToggle}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-lg"
              style={{ background: "oklch(0.75 0.25 140 / 0.2)" }}
            >
              <Trophy size={16} style={{ color: "oklch(0.75 0.25 140)" }} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ fontFamily: "'Orbitron', monospace" }}>
                {streak.rank}
              </div>
              <div className="text-[9px] text-muted-foreground">{streak.totalVotes} votes cast</div>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="jester-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: "oklch(0.75 0.25 140 / 0.2)" }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy size={20} style={{ color: "oklch(0.75 0.25 140)" }} />
            </motion.div>
            <div>
              <h3
                className="text-sm font-black uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Your Stats
              </h3>
              <StreakFlame count={streak.currentStreak} />
            </div>
          </div>
          <RankBadge rank={streak.rank} />
        </div>

        {/* Progress to next rank */}
        <RankProgress progress={streak.progressToNext} current={streak.rank} next={streak.nextRank} />
      </div>

      {/* Stats grid */}
      <div className="p-4 grid grid-cols-2 gap-2">
        <StatCard
          icon={Target}
          value={streak.totalVotes}
          label="Total Votes"
          color="oklch(0.75 0.25 140)"
          delay={0}
        />
        <StatCard
          icon={Flame}
          value={streak.currentStreak}
          label="Day Streak"
          color="oklch(0.65 0.22 25)"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          value={streak.longestStreak}
          label="Best Streak"
          color="oklch(0.85 0.18 85)"
          delay={0.2}
        />
        <StatCard
          icon={Zap}
          value={streak.weeklyVotes}
          label="This Week"
          color="oklch(0.7 0.2 300)"
          delay={0.3}
        />
      </div>

      {/* Achievements toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setShowAchievements(!showAchievements)}
          className="flex items-center justify-between w-full p-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors rounded-lg"
        >
          <span className="flex items-center gap-2">
            <Award size={14} style={{ color: "oklch(0.75 0.25 140)" }} />
            Achievements
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-primary text-primary-foreground">
              {unlockedCount}/{achievements.length}
            </span>
          </span>
          <motion.div animate={{ rotate: showAchievements ? 90 : 0 }}>
            <ChevronRight size={14} />
          </motion.div>
        </button>
      </div>

      {/* Achievements list */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AchievementBadge {...achievement} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Compact streak indicator for header/navigation
export function CompactStreakIndicator({ streak }: { streak: VoteStreak }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 jester-border-subtle bg-card"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-1">
        <Flame size={14} style={{ color: "oklch(0.65 0.22 25)" }} />
        <span className="text-xs font-bold" style={{ color: "oklch(0.65 0.22 25)" }}>
          {streak.currentStreak}
        </span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-1">
        <Trophy size={14} style={{ color: "oklch(0.75 0.25 140)" }} />
        <span className="text-xs font-bold" style={{ color: "oklch(0.75 0.25 140)" }}>
          {streak.totalVotes}
        </span>
      </div>
    </motion.div>
  );
}
