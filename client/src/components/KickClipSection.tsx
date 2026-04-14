import { motion } from "framer-motion";
import { KickClipEmbed, KickEmbed } from "./embeds";
import { Radio, ExternalLink } from "lucide-react";

interface KickClipSectionProps {
  kickClipUrls: string[];
  channelName?: string;
}

export function KickClipSection({ kickClipUrls, channelName }: KickClipSectionProps) {
  if (!kickClipUrls || kickClipUrls.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="jester-border-subtle bg-card p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Radio size={16} style={{ color: "oklch(0.75 0.25 140)" }} />
        <h2
          className="text-xs font-bold tracking-widest"
          style={{ color: "oklch(0.75 0.25 140)" }}
        >
          KICK CLIPS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kickClipUrls.map((url, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KickClipEmbed clipUrl={url} />
          </motion.div>
        ))}
      </div>

      {channelName && (
        <div className="mt-4 pt-3 border-t border-border text-center">
          <a
            href={`https://kick.com/${channelName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors inline-flex items-center gap-1"
          >
            Watch live on Kick <ExternalLink size={10} />
          </a>
        </div>
      )}
    </motion.div>
  );
}

// Also export a variant for live streams
interface KickLiveSectionProps {
  channelName: string;
}

export function KickLiveSection({ channelName }: KickLiveSectionProps) {
  if (!channelName) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="jester-border-subtle bg-card p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Radio size={16} style={{ color: "oklch(0.75 0.25 140)" }} />
        <h2
          className="text-xs font-bold tracking-widest"
          style={{ color: "oklch(0.75 0.25 140)" }}
        >
          LIVE ON KICK
        </h2>
        <div className="ml-auto flex items-center gap-1.5 bg-destructive/90 px-2 py-0.5 rounded text-[10px] font-bold text-white">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
      </div>

      <KickEmbed channelName={channelName} />
    </motion.div>
  );
}
