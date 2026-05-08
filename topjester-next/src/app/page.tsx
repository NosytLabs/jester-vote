import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { nominees } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { Crown, TrendingUp } from "lucide-react";
import { TheaterIcon, JesterHatIcon, AnimatedLogo } from "@/components/icons";

export const metadata: Metadata = {
  title: "TopJester - The Court of FOOLS | Streamer Rankings",
  description: "Vote for the biggest internet lolcows and jesters. Documenting the downfalls, drama, and dysfunction of online personalities. Community-driven rankings.",
  authors: [{ name: "TopJester Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TopJester",
  },
};

async function getData() {
  try {
    // Check if db is available
    if (!db || !db.query) {
      throw new Error('Database not available');
    }
    
    // Query 1: Get top 10 approved nominees with SQL LIMIT
    const topNominees = await db.query.nominees.findMany({
      limit: 10,
      orderBy: desc(nominees.score),
      where: eq(nominees.status, 'approved'),
    });
    
    // Query 2: Get stats using aggregation (not full table fetch)
    const allApproved = await db.select({ 
      count: sql<number>`COUNT(*)`,
      totalUpvotes: sql<number>`SUM(${nominees.upvotes})`,
      totalDownvotes: sql<number>`SUM(${nominees.downvotes})`
    }).from(nominees).where(eq(nominees.status, 'approved'));
    
    const stats = {
      totalNominees: Number(allApproved[0]?.count) || 0,
      totalVotes: (Number(allApproved[0]?.totalUpvotes) || 0) + (Number(allApproved[0]?.totalDownvotes) || 0),
    };
    
    return { topNominees, stats };
  } catch (error) {
    console.warn('Database query failed:', error);
    return {
      topNominees: [],
      stats: {
        totalNominees: 46,
        totalVotes: 0,
      }
    };
  }
}

export default async function Home() {
  const { topNominees, stats } = await getData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <AnimatedLogo size="lg" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          }}>
            THE COURT OF FOOLS
          </h1>
          <p className="text-base md:text-lg text-[#fbbf24] italic max-w-2xl mx-auto px-4">
            &ldquo;Where the biggest jesters of streaming are crowned by the people&rdquo;
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm text-gray-400">
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            <JesterHatIcon className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-[#fbbf24] font-bold">{stats.totalNominees}</span> Jesters
          </span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            <Crown className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-[#fbbf24] font-bold">{stats.totalVotes.toLocaleString()}</span> Votes Cast
          </span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Rankings
          </span>
        </div>

        {/* Top 3 Podium */}
        {topNominees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-xl font-bold text-[#fbbf24] mb-2">The Court is Assembling</h2>
            <p className="text-gray-400">Database connection unavailable. The jesters will appear soon.</p>
          </div>
        ) : topNominees.length >= 3 && (
          <div className="mb-8 md:mb-12">
            <div className="flex justify-center items-end gap-2 md:gap-4">
              {/* 2nd Place */}
              <Link href={`/nominee/${topNominees[1].id}`}>
                <div className="flex flex-col items-center cursor-pointer hover:scale-105 hover:-translate-y-1 transition-transform">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-400 overflow-hidden bg-[#27273a]">
                      {topNominees[1].imageUrl ? (
                        <img 
                          src={topNominees[1].imageUrl} 
                          alt={topNominees[1].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🎭</div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold text-xs">2</div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs md:text-sm font-bold text-gray-400 truncate max-w-[80px]">{topNominees[1].name}</p>
                    <p className="text-[10px] text-gray-500">{topNominees[1].score > 0 ? '+' : ''}{topNominees[1].score}</p>
                  </div>
                  <div className="w-16 md:w-20 h-12 bg-gradient-to-t from-gray-400/30 to-transparent rounded-t-lg mt-1" />
                </div>
              </Link>
              
              {/* 1st Place */}
              <Link href={`/nominee/${topNominees[0].id}`}>
                <div className="flex flex-col items-center cursor-pointer -mt-4 hover:scale-108 hover:-translate-y-2 transition-transform">
                  <div className="text-2xl md:text-3xl mb-1">
                    <AnimatedLogo size="md" />
                  </div>
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#fbbf24] overflow-hidden bg-[#27273a] shadow-lg shadow-[#fbbf24]/20">
                      {topNominees[0].imageUrl ? (
                        <img 
                          src={topNominees[0].imageUrl} 
                          alt={topNominees[0].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🃏</div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#fbbf24] rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm md:text-base font-bold text-[#fbbf24] truncate max-w-[100px]">{topNominees[0].name}</p>
                    <p className="text-xs text-[#fbbf24]/80">{topNominees[0].score > 0 ? '+' : ''}{topNominees[0].score}</p>
                  </div>
                  <div className="w-20 md:w-24 h-20 bg-gradient-to-t from-[#fbbf24]/30 to-transparent rounded-t-lg mt-1" />
                </div>
              </Link>
              
              {/* 3rd Place */}
              <Link href={`/nominee/${topNominees[2].id}`}>
                <div className="flex flex-col items-center cursor-pointer hover:scale-105 hover:-translate-y-1 transition-transform">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-amber-700 overflow-hidden bg-[#27273a]">
                      {topNominees[2].imageUrl ? (
                        <img 
                          src={topNominees[2].imageUrl} 
                          alt={topNominees[2].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🎪</div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-black font-bold text-xs">3</div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs md:text-sm font-bold text-amber-700 truncate max-w-[80px]">{topNominees[2].name}</p>
                    <p className="text-[10px] text-gray-500">{topNominees[2].score > 0 ? '+' : ''}{topNominees[2].score}</p>
                  </div>
                  <div className="w-16 md:w-20 h-10 bg-gradient-to-t from-amber-700/30 to-transparent rounded-t-lg mt-1" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Leaderboard Section */}
        {topNominees.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TheaterIcon className="w-5 h-5 text-[#fbbf24]" />
                <span style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>The Royal Rankings</span>
              </h2>
              <Link 
                href="/leaderboard"
                className="text-sm text-[#fbbf24] hover:text-[#f59e0b] transition-colors flex items-center gap-1"
              >
                View All <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-2">
              {topNominees.map((nominee: any, index: number) => (
                <Link key={nominee.id} href={`/nominee/${nominee.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#27273a]/50 hover:bg-[#27273a] transition-colors cursor-pointer group">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-[#fbbf24] text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-700 text-black' :
                      'bg-[#3f3f5f] text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#3f3f5f] overflow-hidden flex-shrink-0">
                      {nominee.imageUrl ? (
                        <img 
                          src={nominee.imageUrl} 
                          alt={nominee.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">🎭</div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate group-hover:text-[#fbbf24] transition-colors">
                        {nominee.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{nominee.platform} • {nominee.category}</p>
                    </div>
                    
                    {/* Score */}
                    <div className="text-right">
                      <p className={`font-bold ${
                        nominee.score > 0 ? 'text-green-400' : 
                        nominee.score < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {nominee.score > 0 ? '+' : ''}{nominee.score}
                      </p>
                      <p className="text-xs text-gray-500">
                        {nominee.upvotes.toLocaleString()} 👑
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Categories Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Jester Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🎮", name: "Gaming", desc: "Rage quitters & skill issues", count: 12 },
              { icon: "📹", name: "IRL Streamers", desc: "Chaotic real-life content", count: 15 },
              { icon: "🎥", name: "YouTube Drama", desc: "Commentary & controversies", count: 11 },
              { icon: "👑", name: "Legendary", desc: "Hall of fame lolcows", count: 8 },
            ].map((cat) => (
              <Link key={cat.name} href={`/leaderboard?category=${cat.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-4 text-center hover:border-[#fbbf24]/50 transition-colors cursor-pointer group">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-white group-hover:text-[#fbbf24] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                  <p className="text-sm text-[#fbbf24] font-bold mt-2">{cat.count} jesters</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            How The Court Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Discover", desc: "Browse our database of 46+ documented lolcows from streaming history" },
              { step: "2", title: "Vote", desc: "Cast your judgment with upvotes and downvotes on each jester" },
              { step: "3", title: "Crown", desc: "Watch the rankings update in real-time as the community decides" },
            ].map((item) => (
              <div key={item.step} className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-full flex items-center justify-center text-[#0f0f1a] font-black text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Quote */}
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#fbbf24]/5 to-transparent border-l-4 border-[#fbbf24] rounded-r-xl p-6">
            <blockquote className="text-lg md:text-xl italic text-gray-300 mb-4">
              &ldquo;A lolcow is someone who is endlessly entertaining due to their complete lack of self-awareness. They are the jesters of the internet age.&rdquo;
            </blockquote>
            <cite className="text-[#fbbf24] font-bold">— The Court of Fools Doctrine</cite>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-[#fbbf24]/10 via-[#fbbf24]/5 to-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="text-4xl md:text-5xl mb-4">🎭</div>
            <h3 className="text-xl md:text-2xl font-bold text-[#fbbf24] mb-3">
              Join the Court
            </h3>
            <p className="text-gray-400 mb-6">
              Login to cast your votes and help crown the biggest fool in streaming history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold hover:bg-[#f59e0b] transition-colors"
              >
                <Crown className="w-5 h-5" />
                Enter the Court
              </Link>
              <Link 
                href="/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#fbbf24] text-[#fbbf24] rounded-lg font-bold hover:bg-[#fbbf24]/10 transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
                Submit a Jester
              </Link>
            </div>
          </div>
        </div>

        {/* SEO Content - Hidden visually but available to crawlers */}
        <section className="sr-only" aria-label="About TopJester">
          <h2>TopJester - The Court of Fools: Streamer Rankings and Lolcow Voting</h2>
          <p>
            TopJester is the premier destination for tracking the biggest jesters, lolcows, and controversial figures 
            in streaming culture. Our community-driven platform allows users to vote on streamers from Twitch, Kick, 
            YouTube, and other platforms who have become infamous for their dramatic content, controversial behavior, 
            or entertaining mishaps.
          </p>
          <p>
            The term &ldquo;lolcow&rdquo; originated from internet culture to describe individuals who are endlessly entertaining 
            due to their lack of self-awareness, dramatic behavior, or constant controversies. From DSP&apos;s gaming rage 
            to Wings of Redemption&apos;s legendary trolling saga, from Ice Poseidon&apos;s IRL pioneering to modern Kick streamers 
            like Adin Ross and N3on, we track them all.
          </p>
          <h3>Featured Categories</h3>
          <ul>
            <li>Gaming Lolcows - Streamers known for gaming rage and skill issues</li>
            <li>IRL Streamers - In-real-life content creators and their chaotic adventures</li>
            <li>YouTube Drama - Content creators and their controversies</li>
            <li>Modern Streamers - Current generation of controversial figures</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
