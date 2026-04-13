import { useState } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import Header from "@/components/Header";
import SocialShareButtons from "@/components/SocialShareButtons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ThumbsUp, ThumbsDown, ArrowLeft, Send, ExternalLink, AlertTriangle, Newspaper, Link as LinkIcon } from "lucide-react";

export default function NomineePage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { isAuthenticated, user } = useAuth();
  const [comment, setComment] = useState("");

  const { data: nominee, isLoading, error } = trpc.nominees.getById.useQuery({ id }, { enabled: !!id });
  const { data: comments, refetch: refetchComments } = trpc.comments.list.useQuery({ nomineeId: id }, { enabled: !!id });
  const { data: richData } = trpc.profile.getRichData.useQuery({ id }, { enabled: !!id });
  const { data: myVotes } = trpc.votes.myVotes.useQuery(undefined, { enabled: isAuthenticated });

  const castVote = trpc.votes.cast.useMutation({
    onError: (e) => toast.error(e.message),
  });

  const addComment = trpc.comments.add.useMutation({
    onSuccess: () => { setComment(""); refetchComments(); },
    onError: (e) => toast.error(e.message),
  });

  const handleVote = (voteType: "up" | "down") => {
    if (!isAuthenticated) {
      toast.error("Login with Kick to vote!", { action: { label: "Login", onClick: () => window.location.href = getLoginUrl() } });
      return;
    }
    castVote.mutate({ nomineeId: id, voteType });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center text-muted-foreground animate-pulse">Loading...</div>
        </main>
      </div>
    );
  }

  if (error || !nominee) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center text-destructive">Nominee not found.</div>
        </main>
      </div>
    );
  }

  const myVote = myVotes?.[id];
  const score = (nominee as any).voteHistory?.reduce((acc: number, w: any) => acc + w.upvotes - w.downvotes, 0) ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4">
        {/* Back */}
        <Link href="/">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer mb-4 transition-colors">
            <ArrowLeft size={12} /> BACK TO RANKINGS
          </span>
        </Link>

        {/* Social sharing */}
        <div className="jester-border-subtle bg-card p-2 mb-4">
          <SocialShareButtons nomineeName={nominee.name} nomineeId={id} description={nominee.description ?? undefined} />
        </div>

        {/* Profile card */}
        <div className="jester-border bg-card p-4 mb-4">
          <div className="flex items-start gap-4">
            {nominee.imageUrl ? (
              <img
                src={nominee.imageUrl}
                alt={nominee.name}
                className="w-20 h-20 object-cover shrink-0"
                style={{ border: "2px solid oklch(0.75 0.25 140)" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://i.pravatar.cc/80?u=${nominee.id}`; }}
              />
            ) : (
              <div className="w-20 h-20 bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground shrink-0" style={{ border: "2px solid oklch(0.22 0 0)" }}>
                {nominee.name[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-foreground mb-1" style={{ fontFamily: "'Orbitron', monospace" }}>
                {nominee.name}
              </h1>
              {nominee.description && (
                <p className="text-sm text-muted-foreground mb-3">{nominee.description}</p>
              )}
              {/* Vote buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVote("up")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border font-bold transition-all ${myVote === "up" ? "vote-up-active" : "border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)]"}`}
                >
                  <ThumbsUp size={14} /> UPVOTE
                </button>
                <button
                  onClick={() => handleVote("down")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border font-bold transition-all ${myVote === "down" ? "vote-down-active" : "border-border text-muted-foreground hover:border-[oklch(0.65_0.22_25)] hover:text-[oklch(0.65_0.22_25)]"}`}
                >
                  <ThumbsDown size={14} /> DOWNVOTE
                </button>
                {!isAuthenticated && (
                  <a href={getLoginUrl()} className="text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors">
                    Login to vote
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vote history chart */}
        {(nominee as any).voteHistory && (nominee as any).voteHistory.length > 0 && (
          <div className="jester-border-subtle bg-card p-4 mb-4">
            <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-3 tracking-widest">VOTE HISTORY (BY WEEK)</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={(nominee as any).voteHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="weekKey" tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
                <Tooltip
                  contentStyle={{ background: "oklch(0.12 0 0)", border: "1px dashed oklch(0.75 0.25 140)", fontSize: 11 }}
                  labelStyle={{ color: "oklch(0.92 0 0)" }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="upvotes" fill="oklch(0.75 0.25 140)" name="Upvotes" />
                <Bar dataKey="downvotes" fill="oklch(0.55 0.22 25)" name="Downvotes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Controversies */}
        {richData?.controversies && richData.controversies.length > 0 && (
          <div className="jester-border-subtle bg-card p-4 mb-4">
            <h2 className="text-xs font-bold text-destructive mb-3 tracking-widest flex items-center gap-2">
              <AlertTriangle size={12} /> CONTROVERSIES
            </h2>
            <div className="space-y-2">
              {richData.controversies.map((c) => (
                <div key={c.id} className="jester-border-subtle p-2 text-xs">
                  <div className="font-bold text-foreground mb-1">{c.title}</div>
                  <p className="text-muted-foreground mb-1">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{c.date}</span>
                    {c.sourceUrl && (
                      <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1">
                        Source <ExternalLink size={8} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notable Moments */}
        {richData?.moments && richData.moments.length > 0 && (
          <div className="jester-border-subtle bg-card p-4 mb-4">
            <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-3 tracking-widest">NOTABLE MOMENTS</h2>
            <div className="space-y-3">
              {richData.moments.map((m) => (
                <div key={m.id} className="jester-border-subtle p-2">
                  <div className="font-bold text-sm text-foreground mb-1">{m.title}</div>
                  {m.description && <p className="text-xs text-muted-foreground mb-2">{m.description}</p>}
                  {m.videoUrl && (
                    <div className="mb-2">
                      <iframe
                        width="100%"
                        height="180"
                        src={m.videoUrl}
                        title={m.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  )}
                  {m.timestamp && <div className="text-[10px] text-muted-foreground">{m.timestamp}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News */}
        {richData?.news && richData.news.length > 0 && (
          <div className="jester-border-subtle bg-card p-4 mb-4">
            <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-3 tracking-widest flex items-center gap-2">
              <Newspaper size={12} /> RECENT NEWS
            </h2>
            <div className="space-y-2">
              {richData.news.map((n) => (
                <div key={n.id} className="jester-border-subtle p-2 text-xs">
                  <div className="font-bold text-foreground mb-1">{n.title}</div>
                  <p className="text-muted-foreground mb-1">{n.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{n.date}</span>
                    {n.sourceUrl && (
                      <a href={n.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[oklch(0.75_0.25_140)] hover:underline flex items-center gap-1">
                        Source <ExternalLink size={8} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {richData?.links && richData.links.length > 0 && (
          <div className="jester-border-subtle bg-card p-4 mb-4">
            <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-3 tracking-widest flex items-center gap-2">
              <LinkIcon size={12} /> LEARN MORE
            </h2>
            <div className="space-y-1">
              {richData.links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-[oklch(0.75_0.25_140)] hover:underline p-1 jester-border-subtle"
                >
                  {l.label} <ExternalLink size={10} className="inline ml-1" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="jester-border-subtle bg-card p-4">
          <h2 className="text-xs font-bold text-[oklch(0.75_0.25_140)] mb-3 tracking-widest">COMMUNITY REACTIONS</h2>

          {/* Add comment */}
          {isAuthenticated ? (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && comment.trim()) addComment.mutate({ nomineeId: id, content: comment.trim() }); }}
                placeholder="Add a reaction..."
                maxLength={500}
                className="flex-1 bg-input border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)]"
              />
              <button
                onClick={() => { if (comment.trim()) addComment.mutate({ nomineeId: id, content: comment.trim() }); }}
                disabled={!comment.trim() || addComment.isPending}
                className="px-3 py-2 bg-primary text-primary-foreground text-xs disabled:opacity-50 hover:bg-primary/80 transition-colors"
              >
                <Send size={12} />
              </button>
            </div>
          ) : (
            <div className="mb-4 text-xs text-muted-foreground">
              <a href={getLoginUrl()} className="text-[oklch(0.75_0.25_140)] hover:underline">Login with Kick</a> to leave a reaction.
            </div>
          )}

          {/* Comment list */}
          {comments && comments.length > 0 ? (
            <div className="space-y-2">
              {comments.map((c) => (
                <div key={c.id} className="jester-border-subtle p-2">
                  <div className="flex items-center gap-2 mb-1">
                    {c.kickAvatarUrl ? (
                      <img src={c.kickAvatarUrl} alt="" className="w-4 h-4 rounded-full" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-primary-foreground font-bold">
                        {(c.kickUsername ?? c.userName ?? "?")[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-[oklch(0.75_0.25_140)]">{c.kickUsername ?? c.userName ?? "Anonymous"}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-foreground">{c.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">No reactions yet. Be the first!</p>
          )}
        </div>
      </main>
    </div>
  );
}
