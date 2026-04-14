import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leaderboard - TopJester",
  description: "Live rankings of the biggest internet lolcows and jesters. Vote and see who's on top.",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-gradient-jester mb-4">
            ROYAL RANKINGS
          </h1>
          <p className="text-muted-foreground">
            The definitive list of streaming's biggest jesters
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">
              Leaderboard Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re migrating the full leaderboard with all 46 lolcows to Next.js.
              Check back soon for live voting and real-time rankings.
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#fbbf24] text-[#0f0f1a] px-6 py-3 rounded-lg font-bold hover:bg-[#f59e0b] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
