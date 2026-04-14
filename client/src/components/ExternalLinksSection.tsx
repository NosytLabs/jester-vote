import { ExternalLink, Link2 } from "lucide-react";

interface ExternalLink {
  id: number;
  label: string;
  url: string;
}

interface ExternalLinksSectionProps {
  links: ExternalLink[];
}

const getPlatformIcon = (label: string): string => {
  const lower = label.toLowerCase();
  if (lower.includes("know your meme") || lower.includes("kym")) return "🎭";
  if (lower.includes("wikipedia") || lower.includes("wiki")) return "📚";
  if (lower.includes("twitter") || lower.includes("x")) return "🐦";
  if (lower.includes("youtube")) return "📺";
  if (lower.includes("twitch")) return "🎮";
  if (lower.includes("reddit")) return "🔴";
  if (lower.includes("discord")) return "💬";
  if (lower.includes("instagram")) return "📷";
  if (lower.includes("tiktok")) return "🎵";
  return "🔗";
};

export function ExternalLinksSection({ links }: ExternalLinksSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="jester-border-subtle bg-card p-4 mb-4">
      <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-4 tracking-widest flex items-center gap-2">
        <Link2 size={12} /> LEARN MORE
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 jester-border-subtle text-xs text-foreground hover:text-[oklch(0.75_0.25_140)] hover:border-[oklch(0.75_0.25_140)] transition-colors group"
          >
            <span className="text-sm">{getPlatformIcon(link.label)}</span>
            <span className="flex-1 truncate">{link.label}</span>
            <ExternalLink size={10} className="text-muted-foreground group-hover:text-[oklch(0.75_0.25_140)]" />
          </a>
        ))}
      </div>
    </div>
  );
}
