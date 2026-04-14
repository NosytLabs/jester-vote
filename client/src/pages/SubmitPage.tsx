import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLegacyLoginUrl } from "@/const";
import { toast } from "sonner";
import Header from "@/components/Header";
import NominationForm from "@/components/NominationForm";
import MyNominations from "@/components/MyNominations";
import { ArrowLeft, Send, History, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";

export default function SubmitPage() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <p className="text-sm text-muted-foreground mb-4">
              Gotta log in first if you want to nominate someone.
            </p>
            <a
              href={getLegacyLoginUrl()}
              className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              LOGIN
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
            <h2
              className="text-lg font-black text-[oklch(0.75_0.25_140)] mb-2"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              NOMINATION SENT!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nice one. Your clown is in the queue for review. Once approved, they'll show up on the leaderboard for everyone to judge.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/">
                <span className="inline-block px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer">
                  BACK TO THE COURT
                </span>
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-block px-4 py-2 text-xs font-bold border border-border hover:border-[oklch(0.75_0.25_140)] transition-colors"
              >
                SUBMIT ANOTHER
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main" className="container py-4">
        <Link href="/">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer mb-4 transition-colors">
            <ArrowLeft size={12} /> BACK TO RANKINGS
          </span>
        </Link>

        <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
          {/* Main Form */}
          <div className="jester-border bg-card p-6">
            <div className="flex items-center gap-3 mb-1">
              <Send size={18} className="text-[oklch(0.75_0.25_140)]" />
              <h1
                className="text-lg font-black text-[oklch(0.75_0.25_140)] tracking-widest"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                SUBMIT A NOMINEE
              </h1>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Nominate a streamer, lolcow, or internet jester for the community
              rankings. Submissions are reviewed by admins before appearing on
              the leaderboard.
            </p>

            <NominationForm onSuccess={() => setSubmitted(true)} />
          </div>

          {/* Sidebar - My Nominations */}
          <div className="space-y-4">
            <div className="jester-border-subtle bg-card">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <History size={16} className="text-muted-foreground" />
                  <span className="text-sm font-bold">My Nominations</span>
                </div>
                {showHistory ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </button>
              {showHistory && (
                <div className="p-4 pt-0 border-t border-border">
                  <MyNominations onClose={() => setShowHistory(false)} />
                </div>
              )}
            </div>

            {/* Guidelines */}
            <div className="jester-border-subtle bg-card p-4">
              <h3 className="text-xs font-bold text-muted-foreground mb-3 tracking-widest">
                SUBMISSION GUIDELINES
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.75_0.25_140)]">✓</span>
                  <span>Must be a public figure or streamer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[oklch(0.75_0.25_140)]">✓</span>
                  <span>Should have notable internet presence or "arc"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>No duplicates (checked automatically)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>No private individuals or doxxing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>No hate speech or harassment targets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
