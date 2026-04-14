import { AlertTriangle, ExternalLink, Flame, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Controversy {
  id: number;
  title: string;
  description: string;
  date: string | null;
  severity: "minor" | "moderate" | "major" | null;
  sourceUrl: string | null;
}

interface ControversiesSectionProps {
  controversies: Controversy[];
}

const severityConfig: Record<string, { label: string; icon: typeof Info; className: string; badgeClass: string; iconColor: string }> = {
  minor: {
    label: "MINOR",
    icon: Info,
    className: "border-yellow-500/50 bg-yellow-500/10",
    badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    iconColor: "text-yellow-500",
  },
  moderate: {
    label: "MODERATE",
    icon: AlertCircle,
    className: "border-orange-500/50 bg-orange-500/10",
    badgeClass: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    iconColor: "text-orange-500",
  },
  major: {
    label: "MAJOR",
    icon: Flame,
    className: "border-red-500/50 bg-red-500/10",
    badgeClass: "bg-red-500/20 text-red-400 border-red-500/50",
    iconColor: "text-red-500",
  },
};

export function ControversiesSection({ controversies }: ControversiesSectionProps) {
  if (controversies.length === 0) {
    return null;
  }

  // Sort by severity (major first) then by date
  const sortedControversies = [...controversies].sort((a, b) => {
    const severityOrder: Record<string, number> = { major: 3, moderate: 2, minor: 1 };
    const aSev = a.severity ?? "moderate";
    const bSev = b.severity ?? "moderate";
    const severityDiff = severityOrder[bSev] - severityOrder[aSev];
    if (severityDiff !== 0) return severityDiff;
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="jester-border-subtle bg-card p-4 mb-4">
      <h2 className="text-xs font-bold text-destructive mb-4 tracking-widest flex items-center gap-2">
        <AlertTriangle size={12} /> CONTROVERSIES
      </h2>

      <div className="space-y-3">
        {sortedControversies.map((controversy) => {
          const severity = controversy.severity ?? "moderate";
          const config = severityConfig[severity];
          const Icon = config.icon;

          return (
            <Card
              key={controversy.id}
              className={`${config.className} border-dashed`}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  {/* Severity Icon */}
                  <div className={`shrink-0 mt-0.5 ${config.iconColor}`}>
                    <Icon size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-foreground">
                        {controversy.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-[10px] shrink-0 ${config.badgeClass}`}
                      >
                        {config.label}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground mb-2">
                      {controversy.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {controversy.date && (
                        <span className="text-[10px] text-[oklch(0.6_0_0)] font-mono">
                          {controversy.date}
                        </span>
                      )}
                      {controversy.sourceUrl ? (
                        <a
                          href={controversy.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1"
                        >
                          Source <ExternalLink size={8} />
                        </a>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">
                          No source
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
