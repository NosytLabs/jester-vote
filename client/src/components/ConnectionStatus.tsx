"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, Activity, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface ConnectionStatusProps {
  isConnected: boolean;
  lastUpdate?: Date | null;
  onReconnect?: () => void;
}

export function ConnectionStatus({ isConnected, lastUpdate, onReconnect }: ConnectionStatusProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>("");

  useEffect(() => {
    if (!lastUpdate) return;

    const interval = setInterval(() => {
      const diff = Date.now() - lastUpdate.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);

      if (minutes > 0) {
        setTimeSinceUpdate(`${minutes}m ago`);
      } else if (seconds > 0) {
        setTimeSinceUpdate(`${seconds}s ago`);
      } else {
        setTimeSinceUpdate("just now");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 px-3 py-2 jester-border-subtle bg-card/90 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Status indicator */}
        <motion.div
          className="relative"
          animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: isConnected ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
              boxShadow: isConnected
                ? "0 0 10px oklch(0.75 0.25 140 / 0.6)"
                : "0 0 10px oklch(0.65 0.22 25 / 0.6)",
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

        {/* Status text */}
        <span
          className="text-xs font-medium"
          style={{
            color: isConnected ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
          }}
        >
          {isConnected ? "Live" : "Offline"}
        </span>

        {/* Icon */}
        {isConnected ? (
          <Wifi size={14} style={{ color: "oklch(0.75 0.25 140)" }} />
        ) : (
          <WifiOff size={14} style={{ color: "oklch(0.65 0.22 25)" }} />
        )}
      </motion.button>

      {/* Details popup */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-48 p-3 jester-border bg-card shadow-xl"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span
                  className="text-xs font-bold"
                  style={{
                    color: isConnected ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
                  }}
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>

              {lastUpdate && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last update</span>
                  <span className="text-xs font-medium">{timeSinceUpdate}</span>
                </div>
              )}

              {!isConnected && onReconnect && (
                <motion.button
                  onClick={onReconnect}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold mt-2"
                  style={{
                    background: "oklch(0.75 0.25 140 / 0.2)",
                    color: "oklch(0.75 0.25 140)",
                    border: "1px solid oklch(0.75 0.25 140)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw size={12} />
                  Reconnect
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Inline status for headers
export function InlineConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        className="relative"
        animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isConnected ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
          }}
        />
      </motion.div>
      <span
        className="text-[10px] uppercase tracking-wider font-medium"
        style={{
          color: isConnected ? "oklch(0.75 0.25 140)" : "oklch(0.65 0.22 25)",
        }}
      >
        {isConnected ? "Live" : "Offline"}
      </span>
    </div>
  );
}

// Activity indicator with pulse
export function ActivityIndicator({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Activity size={14} style={{ color: active ? "oklch(0.75 0.25 140)" : "oklch(0.6 0 0)" }} />
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-3 rounded-full"
            style={{ backgroundColor: active ? "oklch(0.75 0.25 140)" : "oklch(0.3 0 0)" }}
            animate={
              active
                ? {
                    scaleY: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
