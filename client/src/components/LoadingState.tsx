import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = "Loading the Court...", fullScreen = false }: LoadingStateProps) {
  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-gradient-court" 
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Animated Jester Hat */}
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🃏
        </motion.div>
        
        {/* Loading Text */}
        <motion.p 
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
        
        {/* Loading Dots */}
        <motion.div 
          className="flex justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#fbbf24]"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Skeleton card for loading states
export function SkeletonCard() {
  return (
    <div className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Avatar skeleton */}
        <div className="w-16 h-16 rounded-xl bg-white/10 animate-pulse" />
        
        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse" />
        </div>
        
        {/* Score skeleton */}
        <div className="w-12 h-8 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = "🎭", title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-[#fbbf24] text-black font-semibold rounded-xl hover:bg-[#fbbf24]/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
