import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import Header from "@/components/Header";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "wouter";

export default function SubmitPage() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.nominees.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Nominee submitted! Pending admin review.");
    },
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">You must be logged in with Kick to submit a nominee.</p>
            <a href={getLoginUrl()} className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
              LOGIN WITH KICK
            </a>
          </div>
        </main>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center">
            <div className="text-4xl mb-4">🃏</div>
            <h2 className="text-lg font-black text-[oklch(0.75_0.25_140)] mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>SUBMITTED!</h2>
            <p className="text-sm text-muted-foreground mb-4">Your nominee is pending admin review. Once approved, they'll appear on the leaderboard.</p>
            <Link href="/">
              <span className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer">
                BACK TO RANKINGS
              </span>
            </Link>
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

        <div className="jester-border bg-card p-6 max-w-lg mx-auto">
          <h1 className="text-lg font-black text-[oklch(0.75_0.25_140)] mb-1 tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
            SUBMIT A NOMINEE
          </h1>
          <p className="text-xs text-muted-foreground mb-6">Submissions are reviewed by admins before appearing on the leaderboard.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">NAME *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DSP, Boogie2988..."
                maxLength={128}
                className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">DESCRIPTION</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Why are they a lolcow or jester? What's their arc?"
                maxLength={1000}
                rows={4}
                className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors resize-none"
              />
              <div className="text-right text-[10px] text-muted-foreground">{description.length}/1000</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">IMAGE URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors"
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-16 h-16 object-cover"
                    style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (!name.trim()) { toast.error("Name is required"); return; }
                submit.mutate({
                  name: name.trim(),
                  description: description.trim() || undefined,
                  imageUrl: imageUrl.trim() || undefined,
                });
              }}
              disabled={submit.isPending || !name.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {submit.isPending ? "SUBMITTING..." : "SUBMIT FOR REVIEW"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
