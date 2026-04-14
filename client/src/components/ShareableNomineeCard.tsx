import { motion } from "framer-motion";
import { Trophy, TrendingUp, Crown } from "lucide-react";

interface ShareableNomineeCardProps {
  nomineeId: number;
  name: string;
  imageUrl: string | null;
  rank: number;
  upvotes: number;
  downvotes: number;
  score: number;
  isWeeklyJester?: boolean;
  description?: string | null;
}

export default function ShareableNomineeCard({
  nomineeId,
  name,
  imageUrl,
  rank,
  upvotes,
  downvotes,
  score,
  isWeeklyJester = false,
  description,
}: ShareableNomineeCardProps) {
  const rankColors: Record<number, string> = {
    1: "oklch(0.85 0.18 85)",   // Gold
    2: "oklch(0.75 0.05 250)",   // Silver
    3: "oklch(0.65 0.12 55)",    // Bronze
  };
  const rankColor = rankColors[rank] || "oklch(0.75 0.25 140)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.12 0 0) 0%, oklch(0.08 0 0) 100%)",
        border: `2px solid ${rankColor}`,
        boxShadow: `0 0 30px ${rankColor}40`,
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${rankColor},
            ${rankColor} 1px,
            transparent 1px,
            transparent 10px
          )`,
        }}
      />

      {/* Weekly Jester Badge */}
      {isWeeklyJester && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-10"
        >
          <div 
            className="flex items-center justify-center gap-2 py-2 text-xs font-black tracking-widest"
            style={{
              background: rankColor,
              color: "oklch(0.08 0 0)",
            }}
          >
            <Crown size={14} />
            WEEKLY JESTER
            <Crown size={14} />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative p-6 flex flex-col items-center text-center">
        {/* Rank Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="mb-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl"
            style={{
              background: `linear-gradient(135deg, ${rankColor}20, ${rankColor}40)`,
              border: `2px solid ${rankColor}`,
              color: rankColor,
              fontFamily: "'Orbitron', monospace",
            }}
          >
            #{rank}
          </div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-4"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-24 h-24 object-cover"
              style={{ border: `3px solid ${rankColor}` }}
              onError={(e) => { 
                (e.target as HTMLImageElement).src = `https://i.pravatar.cc/96?u=${nomineeId}`; 
              }}
            />
          ) : (
            <div
              className="w-24 h-24 flex items-center justify-center text-4xl font-bold"
              style={{ 
                background: `linear-gradient(135deg, ${rankColor}20, ${rankColor}40)`,
                border: `3px solid ${rankColor}`,
                color: rankColor,
              }}
            >
              {name[0]?.toUpperCase()}
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-black mb-2"
          style={{ 
            fontFamily: "'Orbitron', monospace",
            color: "oklch(0.92 0 0)",
          }}
        >
          {name}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xs text-muted-foreground mb-4 max-w-[200px] line-clamp-2"
          >
            {description}
          </motion.p>
        )}

        {/* Stats */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "oklch(0.75 0.25 140)" }}>
              {upvotes}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Upvotes</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "oklch(0.65 0.22 25)" }}>
              {downvotes}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Downvotes</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div 
              className="text-lg font-bold"
              style={{ color: score > 0 ? "oklch(0.75 0.25 140)" : score < 0 ? "oklch(0.65 0.22 25)" : "oklch(0.6 0 0)" }}
            >
              {score > 0 ? "+" : ""}{score}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</div>
          </div>
        </motion.div>

        {/* TopJester branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 text-xs font-bold tracking-widest"
          style={{ color: rankColor }}
        >
          <Trophy size={12} />
          TOP<span style={{ color: "oklch(0.92 0 0)" }}>JESTER</span>
          <TrendingUp size={12} />
        </motion.div>

        {/* URL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-[10px] text-muted-foreground"
        >
          topjester.com/nominee/{nomineeId}
        </motion.div>
      </div>
    </motion.div>
  );
}
