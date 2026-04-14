import { motion } from "framer-motion";
import { TwitterEmbed } from "./embeds";
import { MessageSquare, ExternalLink } from "lucide-react";

interface TweetSectionProps {
  tweetUrls: string[];
  nomineeName: string;
}

export function TweetSection({ tweetUrls, nomineeName }: TweetSectionProps) {
  if (!tweetUrls || tweetUrls.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="jester-border-subtle bg-card p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={16} style={{ color: "oklch(0.75 0.25 140)" }} />
        <h2
          className="text-xs font-bold tracking-widest"
          style={{ color: "oklch(0.75 0.25 140)" }}
        >
          NOTABLE TWEETS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tweetUrls.map((url, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TwitterEmbed tweetUrl={url} />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border text-center">
        <a
          href={`https://twitter.com/search?q=${encodeURIComponent(nomineeName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors inline-flex items-center gap-1"
        >
          Search more on X <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  );
}
