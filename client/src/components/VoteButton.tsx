import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Sparkles, Flame } from "lucide-react";
import { useState, useCallback, memo } from "react";

interface VoteButtonProps {
  type: "up" | "down";
  count: number;
  isActive: boolean;
  isAnimating: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showStreak?: boolean;
  streakCount?: number;
}

const sizeConfig = {
  sm: {
    button: "px-2 py-1 text-xs gap-1",
    icon: 11,
    particleCount: 6,
  },
  md: {
    button: "px-3 py-1.5 text-sm gap-1.5",
    icon: 14,
    particleCount: 8,
  },
  lg: {
    button: "px-4 py-2 text-sm gap-2",
    icon: 16,
    particleCount: 12,
  },
};

// Particle animation for vote feedback
function VoteParticles({ type, isAnimating }: { type: "up" | "down"; isAnimating: boolean }) {
  if (!isAnimating) return null;

  const color = type === "up" ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)";
  const particles = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: i * 0.02,
            }}
          />
        );
      })}
    </div>
  );
}

// Streak badge component
function StreakBadge({ count, type }: { count: number; type: "up" | "down" }) {
  if (count < 3) return null;

  const isHotStreak = count >= 5;
  const Icon = isHotStreak ? Flame : Sparkles;
  const color = type === "up" ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)";

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      className="absolute -top-2 -right-2 flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[8px] font-bold"
      style={{
        background: isHotStreak
          ? `linear-gradient(135deg, ${color}, ${type === "up" ? "oklch(0.85 0.2 85)" : "oklch(0.75 0.15 35)"})`
          : color,
        color: "oklch(0.08 0 0)",
        boxShadow: `0 0 10px ${color}60`,
      }}
    >
      <Icon size={8} />
      {count}
    </motion.div>
  );
}

export function VoteButton({
  type,
  count,
  isActive,
  isAnimating,
  onClick,
  disabled = false,
  size = "md",
  showStreak = false,
  streakCount = 0,
}: VoteButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const config = sizeConfig[size];

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  const isUp = type === "up";
  const activeColor = isUp ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)";
  const hoverColor = isUp ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)";

  // Dynamic border and background based on state
  const getButtonStyles = () => {
    if (isActive) {
      return {
        borderColor: activeColor,
        background: `${activeColor}20`,
        color: activeColor,
        boxShadow: `0 0 15px ${activeColor}40, inset 0 0 10px ${activeColor}20`,
      };
    }
    if (isPressed) {
      return {
        borderColor: hoverColor,
        background: `${hoverColor}30`,
        color: hoverColor,
        transform: "scale(0.95)",
      };
    }
    return {
      borderColor: "oklch(0.22 0 0)",
      background: "transparent",
      color: "oklch(0.6 0 0)",
    };
  };

  const Icon = isUp ? ThumbsUp : ThumbsDown;
  const styles = getButtonStyles();

  return (
    <motion.button
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      disabled={disabled}
      className={`relative flex items-center border transition-all duration-200 ${config.button} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={styles}
      whileHover={
        !disabled && !isActive
          ? {
              borderColor: hoverColor,
              color: hoverColor,
              boxShadow: `0 0 10px ${hoverColor}30`,
            }
          : undefined
      }
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Particles */}
      <VoteParticles type={type} isAnimating={isAnimating} />

      {/* Icon with animation */}
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.3, 1],
                rotate: isUp ? [0, -15, 0] : [0, 15, 0],
              }
            : {}
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Icon size={config.icon} />
      </motion.div>

      {/* Count with number animation */}
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="font-bold min-w-[1.5ch] text-center"
        >
          {count}
        </motion.span>
      </AnimatePresence>

      {/* Streak badge */}
      {showStreak && streakCount > 0 && (
        <StreakBadge count={streakCount} type={type} />
      )}

      {/* Active indicator pulse */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{ borderColor: activeColor }}
          animate={{
            boxShadow: [
              `0 0 0px ${activeColor}00`,
              `0 0 20px ${activeColor}60`,
              `0 0 0px ${activeColor}00`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}

// Compact vote button pair for list items
interface VoteButtonPairProps {
  nomineeId: number;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  onVote: (type: "up" | "down") => void;
  disabled?: boolean;
  size?: "sm" | "md";
  isAnimating?: boolean;
  animationType?: "up" | "down" | null;
}

function VoteButtonPairComponent({
  upvotes,
  downvotes,
  userVote,
  onVote,
  disabled = false,
  size = "md",
  isAnimating = false,
  animationType = null,
}: VoteButtonPairProps) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <VoteButton
        type="up"
        count={upvotes}
        isActive={userVote === "up"}
        isAnimating={isAnimating && animationType === "up"}
        onClick={() => onVote("up")}
        disabled={disabled}
        size={size}
      />
      <VoteButton
        type="down"
        count={downvotes}
        isActive={userVote === "down"}
        isAnimating={isAnimating && animationType === "down"}
        onClick={() => onVote("down")}
        disabled={disabled}
        size={size}
      />
    </div>
  );
}

export const VoteButtonPair = memo(VoteButtonPairComponent);

// Large vote buttons for nominee detail page
interface LargeVoteButtonsProps {
  upvotes: number;
  downvotes: number;
  score: number;
  userVote?: "up" | "down" | null;
  onVote: (type: "up" | "down") => void;
  disabled?: boolean;
  isAnimating?: boolean;
  animationType?: "up" | "down" | null;
}

function LargeVoteButtonsComponent({
  upvotes,
  downvotes,
  score,
  userVote,
  onVote,
  disabled = false,
  isAnimating = false,
  animationType = null,
}: LargeVoteButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex items-center gap-2">
        <VoteButton
          type="up"
          count={upvotes}
          isActive={userVote === "up"}
          isAnimating={isAnimating && animationType === "up"}
          onClick={() => onVote("up")}
          disabled={disabled}
          size="lg"
        />
        <VoteButton
          type="down"
          count={downvotes}
          isActive={userVote === "down"}
          isAnimating={isAnimating && animationType === "down"}
          onClick={() => onVote("down")}
          disabled={disabled}
          size="lg"
        />
      </div>

      {/* Score display */}
      <motion.div
        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 border"
        style={{
          borderColor:
            score > 0
              ? "oklch(0.75 0.25 140)"
              : score < 0
              ? "oklch(0.65 0.22 25)"
              : "oklch(0.22 0 0)",
          background:
            score > 0
              ? "oklch(0.75 0.25 140 / 0.1)"
              : score < 0
              ? "oklch(0.65 0.22 25 / 0.1)"
              : "oklch(0.12 0 0)",
        }}
        animate={
          isAnimating
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Score
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="text-lg font-black"
            style={{
              color:
                score > 0
                  ? "oklch(0.75 0.25 140)"
                  : score < 0
                  ? "oklch(0.65 0.22 25)"
                  : "oklch(0.6 0 0)",
              fontFamily: "'Orbitron', monospace",
            }}
          >
            {score > 0 ? "+" : ""}
            {score}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export const LargeVoteButtons = memo(LargeVoteButtonsComponent);

export default VoteButton;
