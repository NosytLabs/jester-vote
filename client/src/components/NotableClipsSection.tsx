import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotableMoment {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string | null;
  timestamp: string | null;
}

interface NotableClipsSectionProps {
  moments: NotableMoment[];
}

function getEmbedUrl(url: string): string {
  // Handle YouTube URLs
  if (url.includes("youtube.com/watch")) {
    const videoId = url.match(/v=([^&]+)/)?.[1];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  // Handle Twitch URLs
  if (url.includes("twitch.tv/videos/")) {
    const videoId = url.match(/videos\/(\d+)/)?.[1];
    if (videoId) {
      const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
      return `https://player.twitch.tv/?video=${videoId}&parent=${parent}`;
    }
  }
  if (url.includes("clips.twitch.tv/")) {
    const clipId = url.split("clips.twitch.tv/")[1]?.split("?")[0];
    if (clipId) {
      const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
      return `https://clips.twitch.tv/embed?clip=${clipId}&parent=${parent}`;
    }
  }
  // Return original if no transformation needed
  return url;
}

function getPlatformIcon(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("twitch.tv") || url.includes("clips.twitch.tv")) return "Twitch";
  return "Video";
}

export function NotableClipsSection({ moments }: NotableClipsSectionProps) {
  const clipsWithVideo = moments.filter((m) => m.videoUrl);

  if (clipsWithVideo.length === 0) {
    return null;
  }

  return (
    <div className="jester-border-subtle bg-card p-4 mb-4">
      <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-4 tracking-widest flex items-center gap-2">
        <Play size={12} /> NOTABLE CLIPS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clipsWithVideo.map((clip) => (
          <div key={clip.id} className="jester-border-subtle overflow-hidden">
            {/* Video Embed */}
            {clip.videoUrl && (
              <div className="relative aspect-video bg-black">
                <iframe
                  src={getEmbedUrl(clip.videoUrl)}
                  title={clip.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {/* Info */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-foreground line-clamp-1">
                  {clip.title}
                </h3>
                {clip.videoUrl && (
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {getPlatformIcon(clip.videoUrl)}
                  </Badge>
                )}
              </div>

              {clip.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {clip.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                {clip.timestamp && (
                  <span className="text-[10px] text-[oklch(0.6_0_0)] font-mono">
                    {clip.timestamp}
                  </span>
                )}
                {clip.videoUrl && (
                  <a
                    href={clip.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
                  >
                    Watch <ExternalLink size={8} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
