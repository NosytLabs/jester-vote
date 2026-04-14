import { Newspaper, ExternalLink, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string | null;
  sourceUrl: string | null;
  approved: boolean | null;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  // Filter to only show approved news
  const approvedNews = news.filter((n) => n.approved === true);

  if (approvedNews.length === 0) {
    return null;
  }

  // Sort by date (newest first)
  const sortedNews = [...approvedNews].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="jester-border-subtle bg-card p-4 mb-4">
      <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-4 tracking-widest flex items-center gap-2">
        <Newspaper size={12} /> RECENT NEWS
      </h2>

      <div className="space-y-3">
        {sortedNews.map((item) => (
          <div key={item.id} className="jester-border-subtle p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <Badge variant="outline" className="text-[10px] shrink-0 bg-green-500/20 text-green-400 border-green-500/50">
                <Check size={8} className="mr-1" /> Verified
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
              {item.content}
            </p>

            <div className="flex items-center justify-between">
              {item.date && (
                <span className="text-[10px] text-[oklch(0.6_0_0)] font-mono flex items-center gap-1">
                  <Clock size={8} /> {item.date}
                </span>
              )}
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
                >
                  Source <ExternalLink size={8} />
                </a>
              ) : (
                <span className="text-[10px] text-muted-foreground">No source</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
