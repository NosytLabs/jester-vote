import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TopJester - The Court of LOLCOWS",
  description: "Vote for the biggest internet lolcows and jesters. Documenting the downfalls, drama, and dysfunction of online personalities.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gradient-jester mb-4">
            THE COURT OF FOOLS
          </h1>
          <p className="text-lg text-[#fbbf24] italic">
            Where the biggest jesters of streaming are crowned by the people
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
          <span><span className="text-[#fbbf24] font-bold">46</span> Jesters</span>
          <span>|</span>
          <span><span className="text-[#fbbf24] font-bold">Live</span> Voting</span>
          <span>|</span>
          <span>Real-time Rankings</span>
        </div>

        {/* Coming Soon */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-8">
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">
              Next.js Migration in Progress
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re upgrading to Next.js for better SEO, SSR, and performance.
              The full leaderboard with all 46 lolcows will be available soon.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-[#27273a] rounded-lg p-3">
                <div className="text-[#fbbf24] font-bold">46</div>
                <div className="text-muted-foreground">Lolcows</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3">
                <div className="text-[#fbbf24] font-bold">5</div>
                <div className="text-muted-foreground">Platforms</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3">
                <div className="text-[#fbbf24] font-bold">SSR</div>
                <div className="text-muted-foreground">Enabled</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3">
                <div className="text-[#fbbf24] font-bold">75+</div>
                <div className="text-muted-foreground">Audit Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Lolcows Preview */}
        <div className="mt-12">
          <h3 className="text-center text-xl font-bold text-[#fbbf24] mb-6">
            Featured Jesters
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["DSP", "Chris Chan", "Wings", "Boogie", "Ice Poseidon", "Andrew Tate"].map((name, i) => (
              <div key={name} className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-lg p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#27273a] rounded-full flex items-center justify-center text-xl">
                  {["🎮", "⚠️", "🎮", "📹", "📱", "💼"][i]}
                </div>
                <p className="text-sm font-medium text-foreground">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>🎪 The Court of Fools — Coming Soon with Full SSR 🎪</p>
          <p className="mt-2">
            <Link href="/about" className="hover:text-foreground">About</Link>
            {" | "}
            <Link href="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
            {" | "}
            <Link href="/login" className="hover:text-foreground">Login</Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
