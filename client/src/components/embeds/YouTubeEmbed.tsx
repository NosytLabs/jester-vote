import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, AlertCircle, ExternalLink } from "lucide-react";

export interface YouTubeEmbedProps {
  videoUrl: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  start?: number; // Start time in seconds
  clipStart?: number; // Clip start time
  clipEnd?: number; // Clip end time
}

// Extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// Extract clip ID if present
function extractClipId(url: string): string | null {
  const match = url.match(/clip\/([a-zA-Z0-9_-]+)/i);
  return match ? match[1] : null;
}

export function YouTubeEmbed({
  videoUrl,
  title = "YouTube Video",
  className = "",
  autoplay = false,
  start,
  clipStart,
  clipEnd,
}: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = extractVideoId(videoUrl);
  const clipId = extractClipId(videoUrl);

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

  if (!videoId && !clipId) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid YouTube URL</span>
        </div>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[oklch(0.65_0.22_25)] hover:underline flex items-center gap-1 mt-2"
        >
          Watch on YouTube <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  // Build embed URL with parameters
  const buildEmbedUrl = () => {
    const params = new URLSearchParams();
    params.set("rel", "0"); // Don't show related videos
    params.set("modestbranding", "1"); // Minimal branding
    params.set("theme", "dark"); // Dark theme
    params.set("color", "white"); // White progress bar

    if (autoplay) params.set("autoplay", "1");
    if (start) params.set("start", start.toString());

    // For clips, use the clip embed URL
    if (clipId) {
      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    // For regular videos with clip times
    if (clipStart !== undefined) {
      params.set("start", clipStart.toString());
      if (clipEnd !== undefined) {
        params.set("end", clipEnd.toString());
      }
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const embedUrl = buildEmbedUrl();
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setShowThumbnail(false);
    setIsLoading(true);
  };

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      <div className="relative aspect-video bg-black">
        {/* Thumbnail with play button (lazy loading optimization) */}
        {showThumbnail && thumbnailUrl && (
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={handlePlay}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              onError={(e) => {
                // Fallback to lower quality thumbnail
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-12 bg-[oklch(0.65_0.22_25)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white font-medium">
              YouTube
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && !showThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Skeleton className="w-full h-full" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-4">
            <AlertCircle size={32} className="text-destructive mb-2" />
            <span className="text-sm text-muted-foreground mb-2">Failed to load video</span>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[oklch(0.65_0.22_25)] hover:underline flex items-center gap-1"
            >
              Watch on YouTube <ExternalLink size={10} />
            </a>
          </div>
        )}

        {/* YouTube iframe */}
        {isVisible && !showThumbnail && !hasError && (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}
      </div>

      {/* Video info */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground line-clamp-1">{title}</span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[oklch(0.65_0.22_25)] hover:underline flex items-center gap-1 shrink-0"
          >
            Watch <ExternalLink size={8} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Compact version for lists/grids
export function YouTubeEmbedCompact({
  videoUrl,
  className = "",
}: {
  videoUrl: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = extractVideoId(videoUrl);

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

  if (!videoId) {
    return (
      <div className={`jester-border-subtle bg-card p-2 ${className}`}>
        <span className="text-xs text-destructive">Invalid URL</span>
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      <div className="relative aspect-video">
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <AlertCircle size={20} className="text-destructive" />
          </div>
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt="YouTube thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-8 bg-[oklch(0.65_0.22_25)]/90 rounded flex items-center justify-center hover:bg-[oklch(0.65_0.22_25)] transition-colors cursor-pointer">
                <Play size={16} className="text-white fill-white ml-0.5" />
              </div>
            </div>
            {isVisible && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&theme=dark`}
                className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setHasError(true)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
