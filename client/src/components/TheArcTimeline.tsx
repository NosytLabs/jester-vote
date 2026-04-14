import { Clock, AlertTriangle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: number;
  title: string;
  description: string | null;
  date: string | null;
  type: "moment" | "controversy";
  severity?: "minor" | "moderate" | "major" | null;
}

interface TheArcTimelineProps {
  moments: Array<{
    id: number;
    title: string;
    description: string | null;
    timestamp: string | null;
  }>;
  controversies: Array<{
    id: number;
    title: string;
    description: string;
    date: string | null;
    severity: "minor" | "moderate" | "major";
  }>;
}

const severityConfig = {
  minor: {
    label: "MINOR",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  },
  moderate: {
    label: "MODERATE",
    className: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  },
  major: {
    label: "MAJOR",
    className: "bg-red-500/20 text-red-400 border-red-500/50",
  },
};

export function TheArcTimeline({ moments, controversies }: TheArcTimelineProps) {
  // Combine and sort items by date
  const timelineItems: TimelineItem[] = [
    ...moments.map((m) => ({
      ...m,
      type: "moment" as const,
      date: m.timestamp,
      severity: null,
    })),
    ...controversies.map((c) => ({
      ...c,
      type: "controversy" as const,
    })),
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (timelineItems.length === 0) {
    return null;
  }

  return (
    <div className="jester-border-subtle bg-card p-4 mb-4">
      <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-4 tracking-widest flex items-center gap-2">
        <Clock size={12} /> THE ARC TIMELINE
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-[oklch(0.35_0.15_300)]" />

        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <div key={`${item.type}-${item.id}`} className="relative flex gap-4">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  item.type === "controversy"
                    ? "bg-[oklch(0.55_0.22_25)]"
                    : "bg-[oklch(0.75_0.25_140)]"
                }`}
              >
                {item.type === "controversy" ? (
                  <AlertTriangle size={16} className="text-white" />
                ) : (
                  <Sparkles size={16} className="text-black" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  {item.type === "controversy" && item.severity && (
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-1.5 py-0 ${severityConfig[item.severity].className}`}
                    >
                      {severityConfig[item.severity].label}
                    </Badge>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {item.date && (
                  <div className="text-[10px] text-[oklch(0.6_0_0)] font-mono">
                    {item.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
