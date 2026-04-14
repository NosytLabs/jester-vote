import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, AlertCircle, ExternalLink, Radio } from "lucide-react";

export interface KickEmbedProps {
  channelName: string; // Kick channel name
  clipId?: string; // Optional clip ID for clips
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
}

export interface KickClipEmbedProps {
  clipUrl: string;
  className?: string;
}

// Extract channel name from Kick URL
function extractChannelName(url: string): string | null {
  const patterns = [
    /kick\.com\/([a-zA-Z0-9_-]+)/i,
    /kick\.com\/video\/([a-zA-Z0-9_-]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// Extract clip ID from Kick clip URL
function extractClipId(url: string): string | null {
  const match = url.match(/kick\.com\/[a-zA-Z0-9_-]+\?clip=([a-zA-Z0-9_-]+)/i);
  return match ? match[1] : null;
}

// Main Kick Live Stream Embed
export function KickEmbed({
  channelName,
  clipId,
  className = "",
  autoplay = false,
  muted = true,
}: KickEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check if stream is live (basic check via Kick API would require backend)
  useEffect(() => {
    if (!channelName) return;

    // Note: Kick doesn't have a public client-side API for live status
    // This would need a backend proxy or we can assume live for embed purposes
    setIsLive(true);
  }, [channelName]);

  if (!channelName) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Kick channel</span>
        </div>
      </div>
    );
  }

  // Build Kick embed URL
  // Kick uses a simple iframe embed format
  const buildEmbedUrl = () => {
    const params = new URLSearchParams();
    
    if (clipId) {
      // Clip embed
      return `https://player.kick.com/${channelName}?clip=${clipId}`;
    }
    
    // Live stream embed
    if (autoplay) params.set("autoplay", "true");
    if (muted) params.set("muted", "true");
    
    return `https://player.kick.com/${channelName}?${params.toString()}`;
  };

  const embedUrl = buildEmbedUrl();
  const channelUrl = `https://kick.com/${channelName}`;

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      <div className="relative aspect-video bg-black">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Radio size={32} className="text-[oklch(0.75_0.25_140)] animate-pulse" />
                <span className="text-xs text-muted-foreground">Loading Kick...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-4">
            <AlertCircle size={32} className="text-destructive mb-2" />
            <span className="text-sm text-muted-foreground mb-2">Failed to load stream</span>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
            >
              Watch on Kick <ExternalLink size={10} />
            </a>
          </div>
        )}

        {/* Live indicator */}
        {isLive && !hasError && !isLoading && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-destructive/90 px-2 py-1 rounded text-[10px] font-bold text-white">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
          </div>
        )}

        {/* Kick iframe */}
        {isVisible && (
          <iframe
            src={embedUrl}
            title={`Kick - ${channelName}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`absolute inset-0 w-full h-full ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}
      </div>

      {/* Channel info */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">{channelName}</span>
            {isLive && (
              <span className="text-[10px] text-[oklch(0.65_0.22_25)] font-medium">
                ● Live
              </span>
            )}
          </div>
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1 shrink-0"
          >
            Watch <ExternalLink size={8} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Kick Clip Embed from URL
export function KickClipEmbed({ clipUrl, className = "" }: KickClipEmbedProps) {
  const channelName = extractChannelName(clipUrl);
  const clipId = extractClipId(clipUrl);

  if (!channelName || !clipId) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Kick clip URL</span>
        </div>
        <a
          href={clipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1 mt-2"
        >
          View on Kick <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  return (
    <KickEmbed
      channelName={channelName}
      clipId={clipId}
      className={className}
    />
  );
}

// Compact Kick preview card
export function KickEmbedCompact({
  channelName,
  className = "",
}: {
  channelName: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const channelUrl = `https://kick.com/${channelName}`;

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      <div className="relative aspect-video bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-[oklch(0.75_0.25_140)]/20 rounded-full flex items-center justify-center border-2 border-[oklch(0.75_0.25_140)]">
            <Play size={20} className="text-[oklch(0.75_0.25_140)] fill-[oklch(0.75_0.25_140)] ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white font-medium">
          Kick
        </div>
        {isVisible && (
          <iframe
            src={`https://player.kick.com/${channelName}?muted=true`}
            className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="p-2">
        <span className="text-xs font-medium text-foreground">{channelName}</span>
      </div>
    </div>
  );
}
