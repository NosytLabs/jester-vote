import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Link } from "wouter";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  BarChart3,
  Users,
  CheckSquare,
  XSquare,
  AlertCircle,
} from "lucide-react";

export default function AdminPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: pending, isLoading } = trpc.admin.pendingNominees.useQuery(
    undefined,
    {
      enabled: isAuthenticated && user?.role === "admin",
    }
  );

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const approve = trpc.admin.approve.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Nominee approved!");
      utils.admin.pendingNominees.invalidate();
      utils.admin.stats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const reject = trpc.admin.reject.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Nominee rejected.");
      setRejectingId(null);
      setRejectionReason("");
      utils.admin.pendingNominees.invalidate();
      utils.admin.stats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center text-muted-foreground animate-pulse">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center">
            <div className="text-4xl mb-4">🚫</div>
            <p className="text-sm text-destructive font-bold">ACCESS DENIED</p>
            <p className="text-xs text-muted-foreground mt-2">
              Admin access required.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4">
        <Link href="/">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer mb-4 transition-colors">
            <ArrowLeft size={12} /> BACK TO RANKINGS
          </span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <h1
            className="text-lg font-black text-[oklch(0.75_0.25_140)] tracking-widest"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            ADMIN PANEL
          </h1>
          <span className="flex items-center gap-1 text-xs text-muted-foreground jester-border-subtle px-2 py-0.5">
            <Clock size={10} />
            {pending?.length ?? 0} pending
          </span>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <div className="jester-border-subtle bg-card p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <BarChart3 size={14} />
                <span className="text-[10px] uppercase tracking-wider">
                  Total
                </span>
              </div>
              <div className="text-xl font-black">{stats.total}</div>
            </div>
            <div className="jester-border-subtle bg-card p-3">
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <Clock size={14} />
                <span className="text-[10px] uppercase tracking-wider">
                  Pending
                </span>
              </div>
              <div className="text-xl font-black text-yellow-500">
                {stats.pending}
              </div>
            </div>
            <div className="jester-border-subtle bg-card p-3">
              <div className="flex items-center gap-2 text-[oklch(0.75_0.25_140)] mb-1">
                <CheckSquare size={14} />
                <span className="text-[10px] uppercase tracking-wider">
                  Approved
                </span>
              </div>
              <div className="text-xl font-black text-[oklch(0.75_0.25_140)]">
                {stats.approved}
              </div>
            </div>
            <div className="jester-border-subtle bg-card p-3">
              <div className="flex items-center gap-2 text-destructive mb-1">
                <XSquare size={14} />
                <span className="text-[10px] uppercase tracking-wider">
                  Rejected
                </span>
              </div>
              <div className="text-xl font-black text-destructive">
                {stats.rejected}
              </div>
            </div>
          </div>
        )}

        {/* Pending Nominees */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-muted-foreground mb-3 tracking-widest flex items-center gap-2">
            <Users size={14} />
            PENDING REVIEW
          </h2>

          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="jester-border-subtle p-4 animate-pulse bg-card h-20"
                />
              ))}
            </div>
          ) : pending && pending.length > 0 ? (
            <div className="space-y-2">
              {pending.map((nominee) => (
                <div key={nominee.id} className="jester-border-subtle bg-card">
                  {rejectingId === nominee.id ? (
                    // Rejection Form
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {nominee.imageUrl ? (
                          <img
                            src={nominee.imageUrl}
                            alt={nominee.name}
                            className="w-12 h-12 object-cover shrink-0"
                            style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0">
                            {nominee.name[0]?.toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-sm text-foreground">
                            {nominee.name}
                          </div>
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle size={10} />
                            Rejecting this nomination
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-muted-foreground mb-1">
                            REASON FOR REJECTION (Required)
                          </label>
                          <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="e.g. Duplicate nominee, doesn't meet guidelines, insufficient notability..."
                            maxLength={500}
                            rows={3}
                            className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive transition-colors resize-none"
                          />
                          <div className="text-right text-[10px] text-muted-foreground">
                            {rejectionReason.length}/500
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              reject.mutate({
                                id: nominee.id,
                                reason: rejectionReason,
                              })
                            }
                            disabled={
                              reject.isPending || !rejectionReason.trim()
                            }
                            className="flex items-center gap-1 px-4 py-2 text-xs font-bold bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors disabled:opacity-50"
                          >
                            {reject.isPending ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                REJECTING...
                              </>
                            ) : (
                              <>
                                <XCircle size={12} />
                                CONFIRM REJECTION
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setRejectingId(null);
                              setRejectionReason("");
                            }}
                            disabled={reject.isPending}
                            className="px-4 py-2 text-xs font-bold border border-border hover:border-foreground transition-colors disabled:opacity-50"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Normal View
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {nominee.imageUrl ? (
                          <img
                            src={nominee.imageUrl}
                            alt={nominee.name}
                            className="w-12 h-12 object-cover shrink-0"
                            style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0">
                            {nominee.name[0]?.toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-foreground">
                            {nominee.name}
                          </div>
                          {nominee.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {nominee.description}
                            </p>
                          )}
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Submitted{" "}
                            {new Date(nominee.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() =>
                              approve.mutate({ id: nominee.id })
                            }
                            disabled={approve.isPending}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)] hover:bg-[oklch(0.75_0.25_140/0.15)] transition-colors disabled:opacity-50"
                          >
                            {approve.isPending ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <CheckCircle size={12} />
                            )}
                            APPROVE
                          </button>
                          <button
                            onClick={() => setRejectingId(nominee.id)}
                            disabled={reject.isPending}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-destructive text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                          >
                            <XCircle size={12} />
                            REJECT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="jester-border p-8 text-center text-muted-foreground text-sm">
              <div className="text-3xl mb-2">🎉</div>
              <p>No pending nominees. All clear!</p>
              <p className="text-xs mt-1">
                New submissions will appear here for review.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="jester-border-subtle bg-card p-4">
          <h3 className="text-xs font-bold text-muted-foreground mb-3 tracking-widest">
            QUICK ACTIONS
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-border hover:border-[oklch(0.75_0.25_140)] transition-colors cursor-pointer">
                <BarChart3 size={12} />
                VIEW RANKINGS
              </span>
            </Link>
            <Link href="/submit">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-border hover:border-[oklch(0.75_0.25_140)] transition-colors cursor-pointer">
                <Users size={12} />
                TEST SUBMISSION
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
