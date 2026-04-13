import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();

  const { data: pending, isLoading } = trpc.admin.pendingNominees.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const approve = trpc.admin.approve.useMutation({
    onSuccess: () => { toast.success("Nominee approved!"); utils.admin.pendingNominees.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const reject = trpc.admin.reject.useMutation({
    onSuccess: () => { toast.success("Nominee rejected."); utils.admin.pendingNominees.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center text-muted-foreground animate-pulse">Loading...</div>
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
            <p className="text-sm text-destructive font-bold">ACCESS DENIED</p>
            <p className="text-xs text-muted-foreground mt-2">Admin access required.</p>
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

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-lg font-black text-[oklch(0.75_0.25_140)] tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
            ADMIN PANEL
          </h1>
          <span className="flex items-center gap-1 text-xs text-muted-foreground jester-border-subtle px-2 py-0.5">
            <Clock size={10} />
            {pending?.length ?? 0} pending
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="jester-border-subtle p-4 animate-pulse bg-card h-20" />
            ))}
          </div>
        ) : pending && pending.length > 0 ? (
          <div className="space-y-2">
            {pending.map((nominee) => (
              <div key={nominee.id} className="jester-border-subtle bg-card p-4">
                <div className="flex items-start gap-3">
                  {nominee.imageUrl ? (
                    <img
                      src={nominee.imageUrl}
                      alt={nominee.name}
                      className="w-12 h-12 object-cover shrink-0"
                      style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0" style={{ border: "1px solid oklch(0.22 0 0)" }}>
                      {nominee.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground">{nominee.name}</div>
                    {nominee.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{nominee.description}</p>
                    )}
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Submitted {new Date(nominee.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approve.mutate({ id: nominee.id })}
                      disabled={approve.isPending}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)] hover:bg-[oklch(0.75_0.25_140/0.15)] transition-colors disabled:opacity-50"
                    >
                      <CheckCircle size={12} /> APPROVE
                    </button>
                    <button
                      onClick={() => reject.mutate({ id: nominee.id })}
                      disabled={reject.isPending}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-destructive text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                    >
                      <XCircle size={12} /> REJECT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="jester-border p-8 text-center text-muted-foreground text-sm">
            No pending nominees. All clear! 🃏
          </div>
        )}
      </main>
    </div>
  );
}
