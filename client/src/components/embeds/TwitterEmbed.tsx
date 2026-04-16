"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ExternalLink } from "lucide-react";

export interface TwitterEmbedProps {
  tweetUrl: string;
  className?: string;
}

// Extract tweet ID from various Twitter/X URL formats
function extractTweetId(url: string): string | null {
  // Handle x.com and twitter.com URLs
  const patterns = [
    /(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/i,
    /(?:twitter\.com|x\.com)\/[^/]+\/statuses\/(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function TwitterEmbed({ tweetUrl, className = "" }: TwitterEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tweetId = extractTweetId(tweetUrl);

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

  // Load Twitter widget script when visible
  useEffect(() => {
    if (!isVisible || !tweetId) return;

    // Define Twitter widget type
    type TwitterWidget = {
      widgets: {
        load: () => void;
        createTweet: (
          tweetId: string,
          container: HTMLElement | null,
          options: Record<string, unknown>
        ) => Promise<HTMLElement | null>;
      };
    };
    const win = window as typeof window & { twttr?: TwitterWidget };

    // Check if script already loaded
    if (!win.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        loadTweet();
      };
      script.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      loadTweet();
    }

    function loadTweet() {
      const twttr = win.twttr;
      if (twttr && twttr.widgets && tweetId) {
        twttr.widgets
          .createTweet(tweetId, containerRef.current, {
            theme: "dark",
            cards: "hidden",
            conversation: "none",
            align: "center",
            dnt: true,
          })
          .then((el: HTMLElement | null) => {
            if (el) {
              setIsLoading(false);
            } else {
              // Tweet not found or private
              setHasError(true);
              setIsLoading(false);
            }
          })
          .catch(() => {
            setHasError(true);
            setIsLoading(false);
          });
      }
    }
  }, [isVisible, tweetId]);

  if (!tweetId) {
    return (
      <div
        className={`jester-border-subtle bg-card p-4 ${className}`}
      >
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Twitter/X URL</span>
        </div>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1 mt-2"
        >
          View on X <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="p-4">
          <div className="flex items-center gap-2 text-destructive text-sm mb-2">
            <AlertCircle size={16} />
            <span>Failed to load tweet</span>
          </div>
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
          >
            View on X <ExternalLink size={10} />
          </a>
        </div>
      )}

      {/* Twitter embed container */}
      <div
        className={`twitter-tweet-container ${isLoading ? "hidden" : "block"}`}
        style={{ minHeight: hasError ? "auto" : "200px" }}
      />
    </div>
  );
}

// Fallback iframe embed for when Twitter widget fails
export function TwitterIframeEmbed({ tweetUrl, className = "" }: TwitterEmbedProps) {
  const tweetId = extractTweetId(tweetUrl);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!tweetId) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Twitter/X URL</span>
        </div>
      </div>
    );
  }

  // Use Twitter's oEmbed endpoint
  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&cards=hidden&conversation=none`;

  return (
    <div className={`jester-border-subtle bg-card overflow-hidden ${className}`}>
      {isLoading && (
        <div className="p-4">
          <Skeleton className="h-48 w-full" />
        </div>
      )}
      {hasError ? (
        <div className="p-4">
          <div className="flex items-center gap-2 text-destructive text-sm mb-2">
            <AlertCircle size={16} />
            <span>Failed to load tweet</span>
          </div>
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
          >
            View on X <ExternalLink size={10} />
          </a>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          className={`w-full min-h-[200px] ${isLoading ? "hidden" : "block"}`}
          style={{ border: "none" }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      )}
    </div>
  );
}
