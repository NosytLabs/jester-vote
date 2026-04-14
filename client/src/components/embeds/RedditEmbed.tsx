import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ExternalLink, MessageSquare, ArrowBigUp, ArrowBigDown } from "lucide-react";

export interface RedditEmbedProps {
  postUrl: string;
  className?: string;
  showComments?: boolean;
}

interface RedditPostData {
  title: string;
  author: string;
  subreddit: string;
  score: number;
  numComments: number;
  thumbnail?: string;
  selftext?: string;
  permalink: string;
  created: number;
  url: string;
  isVideo?: boolean;
  media?: {
    reddit_video?: {
      fallback_url?: string;
    };
  };
}

// Extract post info from Reddit URL
function extractPostInfo(url: string): { subreddit: string | null; postId: string | null } {
  const patterns = [
    /reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i,
    /reddit\.com\/r\/([^/]+)\/s\/([a-zA-Z0-9]+)/i, // Share URLs
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { subreddit: match[1], postId: match[2] };
    }
  }

  return { subreddit: null, postId: null };
}

// Format number (e.g., 1200 -> 1.2k)
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

// Format relative time
function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() / 1000) - timestamp);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function RedditEmbed({
  postUrl,
  className = "",
  showComments = false,
}: RedditEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [postData, setPostData] = useState<RedditPostData | null>(null);

  const { subreddit, postId } = extractPostInfo(postUrl);

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

  // Fetch post data when visible
  useEffect(() => {
    if (!isVisible || !subreddit || !postId) return;

    const fetchPostData = async () => {
      try {
        // Use Reddit's JSON API (CORS permitting)
        const response = await fetch(
          `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`,
          {
            headers: {
              "User-Agent": "TopJester/1.0",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const post = data[0]?.data?.children[0]?.data;

        if (post) {
          setPostData({
            title: post.title,
            author: post.author,
            subreddit: post.subreddit,
            score: post.score,
            numComments: post.num_comments,
            thumbnail: post.thumbnail && post.thumbnail !== "self" && post.thumbnail !== "default"
              ? post.thumbnail
              : undefined,
            selftext: post.selftext,
            permalink: post.permalink,
            created: post.created_utc,
            url: post.url,
            isVideo: post.is_video,
            media: post.media,
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Reddit post:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [isVisible, subreddit, postId]);

  if (!subreddit || !postId) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Reddit URL</span>
        </div>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1 mt-2"
        >
          View on Reddit <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  const redditUrl = `https://reddit.com${postData?.permalink || `/r/${subreddit}/comments/${postId}`}`;

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="p-4">
          <div className="flex items-center gap-2 text-destructive text-sm mb-2">
            <AlertCircle size={16} />
            <span>Failed to load Reddit post</span>
          </div>
          <a
            href={redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
          >
            View on Reddit <ExternalLink size={10} />
          </a>
        </div>
      )}

      {/* Post content */}
      {!isLoading && !hasError && postData && (
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <span className="font-bold text-[oklch(0.75_0.25_140)]">
              r/{postData.subreddit}
            </span>
            <span>•</span>
            <span>Posted by u/{postData.author}</span>
            <span>•</span>
            <span>{formatRelativeTime(postData.created)}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-2">
            {postData.title}
          </h3>

          {/* Self text preview */}
          {postData.selftext && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
              {postData.selftext}
            </p>
          )}

          {/* Thumbnail/Image */}
          {postData.thumbnail && !postData.isVideo && (
            <div className="mb-3 rounded overflow-hidden">
              <img
                src={postData.thumbnail}
                alt="Post thumbnail"
                className="w-full h-auto max-h-48 object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Video embed */}
          {postData.isVideo && postData.media?.reddit_video?.fallback_url && (
            <div className="mb-3 rounded overflow-hidden bg-black">
              <video
                src={postData.media.reddit_video.fallback_url}
                controls
                className="w-full max-h-48"
                preload="metadata"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs">
              <ArrowBigUp size={18} className="text-muted-foreground" />
              <span className="font-bold">{formatNumber(postData.score)}</span>
              <ArrowBigDown size={18} className="text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare size={14} />
              <span>{formatNumber(postData.numComments)} comments</span>
            </div>
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
            >
              View <ExternalLink size={8} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact Reddit preview card
export function RedditEmbedCompact({
  postUrl,
  className = "",
}: {
  postUrl: string;
  className?: string;
}) {
  const [postData, setPostData] = useState<RedditPostData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { subreddit, postId } = extractPostInfo(postUrl);

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

  useEffect(() => {
    if (!isVisible || !subreddit || !postId) return;

    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`,
          {
            headers: {
              "User-Agent": "TopJester/1.0",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const post = data[0]?.data?.children[0]?.data;

        if (post) {
          setPostData({
            title: post.title,
            author: post.author,
            subreddit: post.subreddit,
            score: post.score,
            numComments: post.num_comments,
            permalink: post.permalink,
            created: post.created_utc,
            url: post.url,
          });
        }
      } catch (error) {
        console.error("Error fetching Reddit post:", error);
      }
    };

    fetchPostData();
  }, [isVisible, subreddit, postId]);

  if (!subreddit || !postId) {
    return (
      <div className={`jester-border-subtle bg-card p-2 ${className}`}>
        <span className="text-xs text-destructive">Invalid URL</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1 text-[10px] text-muted-foreground">
          <span className="font-bold text-[oklch(0.75_0.25_140)]">r/{subreddit}</span>
          <span>•</span>
          <span>u/{postData?.author || "..."}</span>
        </div>
        <h4 className="text-xs font-medium text-foreground line-clamp-2">
          {postData?.title || "Loading..."}
        </h4>
        {postData && (
          <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <ArrowBigUp size={12} />
              {formatNumber(postData.score)}
            </span>
            <span className="flex items-center gap-0.5">
              <MessageSquare size={10} />
              {formatNumber(postData.numComments)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Reddit iframe embed (alternative method using embedly)
export function RedditIframeEmbed({
  postUrl,
  className = "",
}: {
  postUrl: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { subreddit, postId } = extractPostInfo(postUrl);

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

  if (!subreddit || !postId) {
    return (
      <div className={`jester-border-subtle bg-card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle size={16} />
          <span>Invalid Reddit URL</span>
        </div>
      </div>
    );
  }

  // Reddit's official embed uses embedly
  const embedUrl = `https://www.redditmedia.com/r/${subreddit}/comments/${postId}?embed=true&theme=dark&showmedia=false&showtitle=true`;

  return (
    <div
      ref={containerRef}
      className={`jester-border-subtle bg-card overflow-hidden ${className}`}
    >
      {isLoading && (
        <div className="p-4">
          <Skeleton className="h-48 w-full" />
        </div>
      )}
      {hasError ? (
        <div className="p-4">
          <div className="flex items-center gap-2 text-destructive text-sm mb-2">
            <AlertCircle size={16} />
            <span>Failed to load Reddit post</span>
          </div>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
          >
            View on Reddit <ExternalLink size={10} />
          </a>
        </div>
      ) : (
        isVisible && (
          <iframe
            src={embedUrl}
            className={`w-full min-h-[200px] ${isLoading ? "hidden" : "block"}`}
            style={{ border: "none" }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )
      )}
    </div>
  );
}
