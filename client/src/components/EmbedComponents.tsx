import { useState } from "react";
import { motion } from "framer-motion";

// Kick Clip Embed
export function KickClipEmbed({ clipId, title }: { clipId: string; title?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card border border-border">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">🎬</div>
            <p className="text-xs text-muted-foreground">Loading clip...</p>
          </div>
        </div>
      )}
      <iframe
        src={`https://clips.kick.com/embed?clip=${clipId}&autoplay=false`}
        className="w-full h-full"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title={title || "Kick Clip"}
      />
    </div>
  );
}

// Twitch Clip Embed  
export function TwitchClipEmbed({ clipId, title }: { clipId: string; title?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card border border-border">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">🎮</div>
            <p className="text-xs text-muted-foreground">Loading clip...</p>
          </div>
        </div>
      )}
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${clipId}&parent=localhost&autoplay=false`}
        className="w-full h-full"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title={title || "Twitch Clip"}
      />
    </div>
  );
}

// YouTube Video Embed
export function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card border border-border">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">📺</div>
            <p className="text-xs text-muted-foreground">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        className="w-full h-full"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title={title || "YouTube Video"}
      />
    </div>
  );
}

// Tweet Embed (simplified - uses Twitter publish widget)
export function TweetEmbed({ tweetUrl }: { tweetUrl: string }) {
  return (
    <div className="rounded-lg overflow-hidden bg-card border border-border p-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">🐦</div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-2">Tweet</p>
          <a 
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[oklch(0.75_0.25_140)] hover:underline break-all"
          >
            {tweetUrl}
          </a>
        </div>
      </div>
    </div>
  );
}

// Reddit Post Embed
export function RedditEmbed({ redditUrl, title }: { redditUrl: string; title?: string }) {
  const postId = redditUrl.split("/comments/")[1]?.split("/")[0];
  
  return (
    <div className="rounded-lg overflow-hidden bg-card border border-border p-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">🤖</div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Reddit</p>
          {title && <p className="text-sm font-medium mb-1">{title}</p>}
          <a 
            href={redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[oklch(0.75_0.25_140)] hover:underline break-all"
          >
            {redditUrl}
          </a>
        </div>
      </div>
    </div>
  );
}

// Generic Social Embed
export function SocialEmbed({ 
  type, 
  url, 
  title 
}: { 
  type: "kick" | "twitch" | "youtube" | "tweet" | "reddit";
  url: string;
  title?: string;
}) {
  const icons = {
    kick: "🎬",
    twitch: "🎮", 
    youtube: "📺",
    tweet: "🐦",
    reddit: "🤖"
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden bg-card border border-border p-3 hover:border-[oklch(0.75_0.25_140)] transition-colors"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-xl">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase">{type}</p>
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors truncate block"
            title={url}
          >
            {title || url}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
