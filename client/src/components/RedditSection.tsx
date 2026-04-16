"use client";

import { motion } from "framer-motion";
import { RedditEmbed, RedditEmbedCompact } from "./embeds";
import { ExternalLink } from "lucide-react";

interface RedditSectionProps {
  redditUrls: string[];
  nomineeName: string;
  compact?: boolean;
}

export function RedditSection({ redditUrls, nomineeName, compact = false }: RedditSectionProps) {
  if (!redditUrls || redditUrls.length === 0) return null;

  const EmbedComponent = compact ? RedditEmbedCompact : RedditEmbed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="jester-border-subtle bg-card p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          style={{ color: "oklch(0.75 0.25 140)" }}
        >
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.56 4.615 1.635A2.501 2.501 0 0 1 18 14.002c0 .74-.32 1.404-.833 1.861.258.332.415.742.415 1.19a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5c0-.448.157-.858.415-1.19a2.49 2.49 0 0 1-.833-1.86c0-.74.32-1.404.833-1.861-1.135-1.075-2.79-1.565-4.615-1.635l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056c0-.688.562-1.249 1.25-1.249.383 0 .729.173.965.449.95-.143 2.58-.286 3.972-.143.346-.544.96-.898 1.658-.898.698 0 1.312.354 1.658.898 1.392-.143 3.022 0 3.972.143.236-.276.582-.449.965-.449zM8.5 14.002c-.828 0-1.5.672-1.5 1.5 0 .828.672 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.828-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.672-1.5 1.5 0 .828.672 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.828-.672-1.5-1.5-1.5z" />
        </svg>
        <h2
          className="text-xs font-bold tracking-widest"
          style={{ color: "oklch(0.75 0.25 140)" }}
        >
          REDDIT DISCUSSIONS
        </h2>
      </div>

      <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        {redditUrls.map((url, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EmbedComponent postUrl={url} />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border text-center">
        <a
          href={`https://www.reddit.com/search/?q=${encodeURIComponent(nomineeName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors inline-flex items-center gap-1"
        >
          Search more on Reddit <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  );
}
