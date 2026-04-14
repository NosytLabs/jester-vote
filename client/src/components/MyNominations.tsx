import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Clock, CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";

interface MyNominationsProps {
  onClose?: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending Review",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  approved: {
    icon: CheckCircle,
    label: "Approved",
    color: "text-[oklch(0.75_0.25_140)]",
    bgColor: "bg-[oklch(0.75_0.25_140)]/10",
    borderColor: "border-[oklch(0.75_0.25_140)]/30",
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
  },
};

export default function MyNominations({ onClose }: MyNominationsProps) {
  const { data: nominations, isLoading } = trpc.nominees.myNominations.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={20} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!nominations || nominations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm mb-2">You haven't nominated anyone yet</p>
        <p className="text-xs">Find a clown and bring them to the Court!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {nominations.map((nominee) => {
        const status = statusConfig[nominee.status];
        const StatusIcon = status.icon;

        return (
          <div
            key={nominee.id}
            className={`jester-border-subtle bg-card p-3 ${status.bgColor}`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              {nominee.imageUrl ? (
                <img
                  src={nominee.imageUrl}
                  alt={nominee.name}
                  className="w-10 h-10 object-cover shrink-0"
                  style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-10 h-10 bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
                  {nominee.name[0]?.toUpperCase()}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground truncate">
                    {nominee.name}
                  </span>
                  {nominee.status === "approved" && (
                    <Link href={`/nominee/${nominee.id}`}>
                      <ExternalLink
                        size={12}
                        className="text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer"
                        onClick={onClose}
                      />
                    </Link>
                  )}
                </div>
                {nominee.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {nominee.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`flex items-center gap-1 text-[10px] px-2 py-0.5 border ${status.color} ${status.borderColor}`}
                  >
                    <StatusIcon size={10} />
                    {status.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Submitted {new Date(nominee.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
