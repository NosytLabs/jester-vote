import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitch, Youtube, Flame, Crown, Skull, TrendingUp, MessageSquare, Film, Newspaper, Clock, RotateCw } from "lucide-react";

interface LolcowData {
  name: string;
  platform: string;
  category: string;
  imageUrl?: string;
  bio?: string;
}

interface StatsData {
  score: number;
  upvotes: number;
  downvotes: number;
  controversyCount: number;
  momentCount: number;
  newsCount: number;
  yearsActive: number;
}

interface BaseballCardProps {
  lolcow: LolcowData;
  stats: StatsData;
  rank?: number;
  className?: string;
}

// Platform icon mapping
const PlatformIcon = ({ platform, size = 24 }: { platform: string; size?: number }) => {
  const p = platform?.toLowerCase() || "other";
  switch (p) {
    case "twitch":
      return <Twitch size={size} className="text-[#9146FF]" />;
    case "youtube":
      return <Youtube size={size} className="text-[#FF0000]" />;
    case "kick":
      return <Flame size={size} className="text-[#53FC18]" />;
    case "rumble":
      return <Crown size={size} className="text-[#60B246]" />;
    default:
      return <Crown size={size} style={{ color: "oklch(0.75 0.25 140)" }} />;
  }
};

// Holographic background animation component
const HolographicBackground = ({ isFlipped }: { isFlipped: boolean }) => (
  <div className="absolute inset-0 overflow-hidden rounded-lg">
    {/* Base holographic gradient */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: isFlipped
          ? [
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)",
              "linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)",
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            ]
          : [
              "linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f1e 100%)",
              "linear-gradient(135deg, #1a1a3e 0%, #2d1b69 25%, #4a148c 50%, #2d1b69 75%, #1a1a3e 100%)",
              "linear-gradient(135deg, #2d1b69 0%, #4a148c 25%, #6a1b9a 50%, #4a148c 75%, #2d1b69 100%)",
              "linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f1e 100%)",
            ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Shimmer effect */}
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        background: "linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)",
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["200% 200%", "-200% -200%"],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Rainbow holographic overlay */}
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffd700, #00ff80, #00ffff, #0080ff, #8000ff, #ff0080)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Gold foil accent component
const GoldFoilAccent = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div 
      className="absolute top-0 left-0 right-0 h-1"
      style={{
        background: "linear-gradient(90deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
        boxShadow: "0 0 10px #FFD700, 0 0 20px #FFA500",
      }}
    />
    <div 
      className="absolute bottom-0 left-0 right-0 h-1"
      style={{
        background: "linear-gradient(90deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
        boxShadow: "0 0 10px #FFD700, 0 0 20px #FFA500",
      }}
    />
    <div 
      className="absolute top-0 bottom-0 left-0 w-1"
      style={{
        background: "linear-gradient(180deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
        boxShadow: "0 0 10px #FFD700, 0 0 20px #FFA500",
      }}
    />
    <div 
      className="absolute top-0 bottom-0 right-0 w-1"
      style={{
        background: "linear-gradient(180deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
        boxShadow: "0 0 10px #FFD700, 0 0 20px #FFA500",
      }}
    />
  </div>
);

// Stat box component - like baseball card stats
const StatBox = ({ 
  label, 
  value, 
  icon: Icon, 
  color = "gold",
  large = false 
}: { 
  label: string; 
  value: number | string; 
  icon: React.ElementType; 
  color?: "gold" | "silver" | "bronze" | "green" | "red";
  large?: boolean;
}) => {
  const colorStyles = {
    gold: "from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-900",
    silver: "from-gray-500 via-gray-300 to-gray-500 text-gray-900",
    bronze: "from-amber-700 via-amber-500 to-amber-700 text-amber-950",
    green: "from-green-600 via-green-400 to-green-600 text-green-900",
    red: "from-red-600 via-red-400 to-red-600 text-red-900",
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center p-2 rounded ${large ? 'col-span-2' : ''}`}
      style={{
        background: "linear-gradient(135deg, oklch(0.15 0 0), oklch(0.08 0 0))",
        border: "2px solid oklch(0.75 0.25 140)",
        boxShadow: "inset 0 0 10px oklch(0.75 0.25 140 / 0.2), 0 0 5px oklch(0.75 0.25 140 / 0.3)",
      }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px oklch(0.75 0.25 140 / 0.5)" }}
    >
      <Icon size={large ? 20 : 14} className="mb-1" style={{ color: "oklch(0.75 0.25 140)" }} />
      <span className={`font-black ${large ? 'text-2xl' : 'text-lg'}`} style={{ 
        fontFamily: "'Orbitron', monospace",
        color: "oklch(0.92 0 0)",
        textShadow: "0 0 10px oklch(0.75 0.25 140 / 0.5)",
      }}>
        {typeof value === 'number' && value > 0 ? '+' : ''}{value}
      </span>
      <span className="text-[8px] uppercase tracking-wider text-oklch(0.6 0 0)">
        {label}
      </span>
    </motion.div>
  );
};

// Front of card
const CardFront = ({ 
  lolcow, 
  stats, 
  rank,
  onFlip 
}: { 
  lolcow: LolcowData; 
  stats: StatsData; 
  rank?: number;
  onFlip: () => void;
}) => {
  const scoreColor = stats.score > 0 ? "oklch(0.75 0.25 140)" : stats.score < 0 ? "oklch(0.65 0.22 25)" : "oklch(0.6 0 0)";
  
  return (
    <div className="relative w-full h-full p-4 flex flex-col">
      <GoldFoilAccent />
      
      {/* Header with rank badge */}
      <div className="flex items-center justify-between mb-3 z-10">
        {rank && rank <= 3 ? (
          <motion.div
            className="flex items-center gap-1 px-2 py-1 rounded"
            style={{
              background: rank === 1 
                ? "linear-gradient(135deg, #FFD700, #FFA500)" 
                : rank === 2 
                  ? "linear-gradient(135deg, #C0C0C0, #A0A0A0)"
                  : "linear-gradient(135deg, #CD7F32, #A0522D)",
              boxShadow: "0 0 10px rgba(255,215,0,0.5)",
            }}
            animate={{ boxShadow: ["0 0 5px rgba(255,215,0,0.3)", "0 0 15px rgba(255,215,0,0.7)", "0 0 5px rgba(255,215,0,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown size={12} className="text-black" />
            <span className="text-xs font-black text-black">#{rank}</span>
          </motion.div>
        ) : (
          <div />
        )}
        
        {/* Platform badge */}
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.75 0.25 140)",
            color: "oklch(0.75 0.25 140)",
          }}
        >
          <PlatformIcon platform={lolcow.platform} size={14} />
          <span className="uppercase">{lolcow.platform}</span>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex-1 min-h-0 mb-3 z-10">
        <motion.div
          className="w-full h-full relative overflow-hidden rounded-lg"
          style={{
            border: "3px solid oklch(0.75 0.25 140)",
            boxShadow: "0 0 20px oklch(0.75 0.25 140 / 0.4), inset 0 0 30px rgba(0,0,0,0.5)",
          }}
          whileHover={{ boxShadow: "0 0 30px oklch(0.75 0.25 140 / 0.6)" }}
        >
          {lolcow.imageUrl ? (
            <motion.img
              src={lolcow.imageUrl}
              alt={lolcow.name}
              className="w-full h-full object-cover"
              style={{ filter: "contrast(1.1) saturate(1.2)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ) : (
            <div className="w-full h-full bg-oklch(0.15 0 0) flex items-center justify-center">
              <span className="text-6xl font-black" style={{ 
                color: "oklch(0.75 0.25 140)",
                fontFamily: "'Orbitron', monospace",
                textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.5)",
              }}>
                {lolcow.name[0]?.toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Holographic overlay on image */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(255,215,0,0.1) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
          />
        </motion.div>
        
        {/* Category badge */}
        <div 
          className="absolute bottom-2 left-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#000",
            boxShadow: "0 0 10px rgba(255,215,0,0.5)",
          }}
        >
          {lolcow.category}
        </div>
      </div>

      {/* Name */}
      <motion.h2 
        className="text-lg font-black text-center mb-2 z-10"
        style={{ 
          fontFamily: "'Orbitron', monospace",
          color: "oklch(0.92 0 0)",
          textShadow: "0 0 15px oklch(0.75 0.25 140 / 0.5), 2px 2px 4px rgba(0,0,0,0.8)",
          letterSpacing: "0.05em",
        }}
      >
        {lolcow.name}
      </motion.h2>

      {/* Main stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3 z-10">
        <StatBox label="JESTER SCORE" value={stats.score} icon={TrendingUp} color={stats.score >= 0 ? "green" : "red"} />
        <StatBox label="CROWN VOTES" value={stats.upvotes} icon={Crown} color="gold" />
        <StatBox label="YIKES VOTES" value={stats.downvotes} icon={Skull} color="red" />
      </div>

      {/* Flip hint */}
      <motion.button
        onClick={onFlip}
        className="flex items-center justify-center gap-1 text-[10px] text-oklch(0.6 0 0) hover:text-oklch(0.75 0.25 140) transition-colors z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCw size={10} />
        <span>FLIP FOR STATS</span>
      </motion.button>
    </div>
  );
};

// Back of card
const CardBack = ({ 
  lolcow, 
  stats,
  onFlip 
}: { 
  lolcow: LolcowData; 
  stats: StatsData;
  onFlip: () => void;
}) => {
  const totalVotes = stats.upvotes + stats.downvotes;
  const approvalRate = totalVotes > 0 ? Math.round((stats.upvotes / totalVotes) * 100) : 0;
  
  return (
    <div className="relative w-full h-full p-4 flex flex-col">
      <GoldFoilAccent />
      
      {/* Header */}
      <div className="text-center mb-3 z-10">
        <h3 
          className="text-sm font-black uppercase tracking-widest"
          style={{ 
            fontFamily: "'Orbitron', monospace",
            color: "oklch(0.75 0.25 140)",
            textShadow: "0 0 10px oklch(0.75 0.25 140 / 0.5)",
          }}
        >
          {lolcow.name}
        </h3>
        <p className="text-[10px] text-oklch(0.6 0 0) uppercase tracking-wider">
          Career Statistics
        </p>
      </div>

      {/* Detailed stats grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 z-10">
        <StatBox label="CONTROVERSIES" value={stats.controversyCount} icon={Flame} color="red" />
        <StatBox label="CLIPS" value={stats.momentCount} icon={Film} color="gold" />
        <StatBox label="NEWS" value={stats.newsCount} icon={Newspaper} color="silver" />
        <StatBox label="YEARS" value={stats.yearsActive} icon={Clock} color="bronze" />
        
        {/* Approval rate - large stat */}
        <motion.div
          className="col-span-2 flex flex-col items-center justify-center p-3 rounded"
          style={{
            background: "linear-gradient(135deg, oklch(0.12 0 0), oklch(0.08 0 0))",
            border: "2px solid oklch(0.75 0.25 140)",
            boxShadow: "inset 0 0 20px oklch(0.75 0.25 140 / 0.2), 0 0 10px oklch(0.75 0.25 140 / 0.3)",
          }}
        >
          <span className="text-[10px] uppercase tracking-wider text-oklch(0.6 0 0) mb-1">
            Approval Rating
          </span>
          <motion.span 
            className="text-3xl font-black"
            style={{ 
              fontFamily: "'Orbitron', monospace",
              color: approvalRate >= 50 ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
              textShadow: approvalRate >= 50 
                ? "0 0 15px oklch(0.75 0.25 140 / 0.5)" 
                : "0 0 15px oklch(0.65 0.22 25 / 0.5)",
            }}
          >
            {approvalRate}%
          </motion.span>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-oklch(0.6 0 0)">
            <span>{stats.upvotes} UP</span>
            <span>/</span>
            <span>{stats.downvotes} DOWN</span>
          </div>
        </motion.div>

        {/* Total votes */}
        <motion.div
          className="col-span-2 text-center p-2 rounded"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.15 0 0), transparent)",
            borderTop: "1px dashed oklch(0.75 0.25 140 / 0.5)",
            borderBottom: "1px dashed oklch(0.75 0.25 140 / 0.5)",
          }}
        >
          <span className="text-[10px] uppercase tracking-wider text-oklch(0.6 0 0)">
            Total Votes Cast
          </span>
          <p className="text-xl font-black" style={{ 
            fontFamily: "'Orbitron', monospace",
            color: "oklch(0.92 0 0)",
          }}>
            {totalVotes.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Bio preview if available */}
      {lolcow.bio && (
        <div className="mt-2 p-2 rounded text-[10px] text-oklch(0.7 0 0) italic z-10" style={{
          background: "oklch(0.1 0 0 / 0.5)",
          borderLeft: "2px solid oklch(0.75 0.25 140)",
        }}>
          "{lolcow.bio.slice(0, 80)}{lolcow.bio.length > 80 ? '...' : ''}"
        </div>
      )}

      {/* Flip hint */}
      <motion.button
        onClick={onFlip}
        className="flex items-center justify-center gap-1 text-[10px] text-oklch(0.6 0 0) hover:text-oklch(0.75 0.25 140) transition-colors mt-2 z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCw size={10} />
        <span>FLIP BACK</span>
      </motion.button>
    </div>
  );
};

// Main BaseballCard component
export function BaseballCard({ lolcow, stats, rank, className = "" }: BaseballCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <motion.div
      className={`relative w-full max-w-[300px] aspect-[3/4] cursor-pointer mx-auto ${className}`}
      style={{ perspective: "1200px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlip();
        }
      }}
      aria-label={`${nominee.name} baseball card. Click to flip.`}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered && !isFlipped ? 1.02 : 1,
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <HolographicBackground isFlipped={false} />
          <CardFront lolcow={lolcow} stats={stats} rank={rank} onFlip={handleFlip} />
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <HolographicBackground isFlipped={true} />
          <CardBack lolcow={lolcow} stats={stats} onFlip={handleFlip} />
        </div>
      </motion.div>

      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-2xl -z-10"
        style={{
          background: "linear-gradient(45deg, oklch(0.75 0.25 140), oklch(0.55 0.22 300), oklch(0.75 0.25 140))",
          filter: "blur(12px)",
          opacity: 0.3,
        }}
        animate={{ 
          opacity: isHovered ? [0.4, 0.6, 0.4] : [0.3, 0.4, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {/* Flip hint tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        Click to flip
      </motion.div>
    </motion.div>
  );
}

export default BaseballCard;
