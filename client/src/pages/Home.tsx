import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
import { ThumbsUp, ThumbsDown, ChevronRight, Clock, Trophy } from "lucide-react";

type RankEntry = {
  nomineeId: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  upvotes: number;
  downvotes: number;
  score: number;
};

function VoteButtons({ nominee, userVote, onVote }: { nominee: RankEntry; userVote?: "up" | "down"; onVote: (type: "up" | "down") => void }) {
  const { isAuthenticated } = useAuth();

  const handleVote = (type: "up" | "down") => {
    if (!isAuthenticated) {
      toast.error("Login with Kick to vote!", { action: { label: "Login", onClick: () => window.location.href = getLoginUrl() } });
      return;
    }
    onVote(type);
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={() => handleVote("up")}
        className={`flex items-center gap-1 px-2 py-1 text-xs border transition-all ${userVote === "up" ? "vote-up-active" : "border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)]"}`}
      >
        <ThumbsUp size={11} />
        <span>{nominee.upvotes}</span>
      </button>
      <button
        onClick={() => handleVote("down")}
        className={`flex items-center gap-1 px-2 py-1 text-xs border transition-all ${userVote === "down" ? "vote-down-active" : "border-border text-muted-foreground hover:border-[oklch(0.65_0.22_25)] hover:text-[oklch(0.65_0.22_25)]"}`}
      >
        <ThumbsDown size={11} />
        <span>{nominee.downvotes}</span>
      </button>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const cls = rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : "text-muted-foreground";
  return (
    <span className={`text-sm font-black w-7 shrink-0 text-center ${cls}`} style={{ fontFamily: "'Orbitron', monospace" }}>
      #{rank}
    </span>
  );
}

export default function Home() {
  const [mode, setMode] = useState<"alltime" | "weekly">("alltime");
  const { isAuthenticated } = useAuth();

  const { data: nominees, isLoading, refetch } = trpc.nominees.list.useQuery({ mode });
  const { data: myVotes } = trpc.votes.myVotes.useQuery(undefined, { enabled: isAuthenticated });

  const castVote = trpc.votes.cast.useMutation({
    onSuccess: () => { refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const handleVote = (nomineeId: number, voteType: "up" | "down") => {
    castVote.mutate({ nomineeId, voteType });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-4">
        {/* Page title */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.75 0.25 140)", textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.4)" }}>
            TOP LOLCOW RANKINGS
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Community-voted leaderboard. Login with Kick to cast your vote.</p>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-0 jester-border p-0.5">
            <button
              onClick={() => setMode("alltime")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors ${mode === "alltime" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Trophy size={11} />
              ALL TIME
            </button>
            <button
              onClick={() => setMode("weekly")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors ${mode === "weekly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Clock size={11} />
              THIS WEEK
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            {nominees?.length ?? 0} nominees
          </span>
        </div>

        {/* Leaderboard */}
        {isLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="jester-border-subtle p-3 animate-pulse bg-card h-16" />
            ))}
          </div>
        ) : nominees && nominees.length > 0 ? (
          <div className="space-y-1">
            {nominees.map((nominee, idx) => (
              <div
                key={nominee.nomineeId}
                className={`jester-border-subtle bg-card hover:bg-secondary transition-colors group ${idx === 0 ? "jester-border" : ""}`}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Rank */}
                  <RankBadge rank={idx + 1} />

                  {/* Avatar */}
                  <div className="shrink-0">
                    {nominee.imageUrl ? (
                      <img
                        src={nominee.imageUrl}
                        alt={nominee.name}
                        className="w-10 h-10 object-cover"
                        style={{ border: idx === 0 ? "2px solid oklch(0.85 0.18 85)" : "1px solid oklch(0.22 0 0)" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://i.pravatar.cc/40?u=${nominee.nomineeId}`; }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground" style={{ border: "1px solid oklch(0.22 0 0)" }}>
                        {nominee.name[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name + description */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/nominee/${nominee.nomineeId}`}>
                      <span className="text-sm font-bold text-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer transition-colors truncate block">
                        {nominee.name}
                      </span>
                    </Link>
                    {nominee.description && (
                      <p className="text-xs text-muted-foreground truncate">{nominee.description}</p>
                    )}
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-center hidden sm:block">
                    <div className={`text-sm font-bold ${nominee.score > 0 ? "text-[oklch(0.75_0.25_140)]" : nominee.score < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                      {nominee.score > 0 ? "+" : ""}{nominee.score}
                    </div>
                    <div className="text-[10px] text-muted-foreground">score</div>
                  </div>

                  {/* Vote buttons */}
                  <VoteButtons
                    nominee={nominee}
                    userVote={myVotes?.[nominee.nomineeId]}
                    onVote={(type) => handleVote(nominee.nomineeId, type)}
                  />

                  {/* Profile link */}
                  <Link href={`/nominee/${nominee.nomineeId}`}>
                    <ChevronRight size={14} className="text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer transition-colors shrink-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="jester-border p-8 text-center text-muted-foreground text-sm">
            No nominees yet. Be the first to submit!
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-6 jester-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Know a lolcow or jester who deserves a spot?</p>
          {isAuthenticated ? (
            <Link href="/submit">
              <span className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer">
                + SUBMIT A NOMINEE
              </span>
            </Link>
          ) : (
            <a href={getLoginUrl()} className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
              LOGIN TO SUBMIT
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[10px] text-muted-foreground border-t border-border pt-4">
          JesterVote — Community Rankings &bull; Login with Kick to vote
        </div>
      </main>
    </div>
  );
}
