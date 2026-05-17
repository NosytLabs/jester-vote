import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { nominees } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Crown, TrendingUp, Flame, Award, Target, Zap, ChevronRight } from "lucide-react";
import { TheaterIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Rankings - TopJester | The Court of Fools",
  description: "Explore the complete rankings of the biggest jesters and lolcows in streaming. See who's on top and who deserves the crown.",
  authors: [{ name: "TopJester Team" }],
};

async function getRankedNominees() {
  try {
    if (!db || !db.query) {
      throw new Error('Database not available');
    }
    
    const allNominees = await db.query.nominees.findMany({
      orderBy: desc(nominees.score),
      where: eq(nominees.status, 'approved'),
      limit: 50,
    });
    return allNominees;
  } catch (error) {
    console.warn('Database not available, using fallback data');
    return [
      { id: 1, name: "DSP (DarkSydePhil)", score: 4200, upvotes: 3500, downvotes: 200, platform: "twitch", category: "gaming", imageUrl: null, status: "approved" },
      { id: 2, name: "Wings of Redemption", score: 3850, upvotes: 3200, downvotes: 250, platform: "youtube", category: "gaming", imageUrl: null, status: "approved" },
      { id: 3, name: "Chris Chan", score: 9001, upvotes: 8000, downvotes: 999, platform: "youtube", category: "irl", imageUrl: null, status: "approved" },
      { id: 4, name: "Boogie2988", score: 2100, upvotes: 1800, downvotes: 300, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
      { id: 5, name: "Ice Poseidon", score: 1950, upvotes: 1600, downvotes: 350, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 6, name: "Adin Ross", score: 1800, upvotes: 1500, downvotes: 300, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 7, name: "xQc", score: 1650, upvotes: 1400, downvotes: 250, platform: "kick", category: "gaming", imageUrl: null, status: "approved" },
      { id: 8, name: "N3on", score: 1500, upvotes: 1250, downvotes: 250, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 9, name: "Nikocado Avocado", score: 1420, upvotes: 1200, downvotes: 180, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
      { id: 10, name: "Keemstar", score: 1380, upvotes: 1100, downvotes: 280, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
    ];
  }
}

export default async function RankingsPage() {
  const allNominees = await getRankedNominees();
  
  const totalVotes = allNominees.reduce(
    (sum: number, n: any) => sum + n.upvotes + n.downvotes, 
    0
  );
  const totalUpvotes = allNominees.reduce((sum: number, n: any) => sum + n.upvotes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-[#fbbf24]" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          }}>
            ROYAL RANKINGS
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto italic">
            "Where the biggest jesters earn their crowns through the verdict of the Court"
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-[#27273a] px-4 py-2 rounded-full">
            <Crown className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-[#fbbf24] font-bold">{allNominees.length}</span>
            <span className="text-gray-400">Jesters Ranked</span>
          </div>
          <div className="flex items-center gap-2 bg-[#27273a] px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-bold">{totalVotes.toLocaleString()}</span>
            <span className="text-gray-400">Total Votes</span>
          </div>
          <div className="flex items-center gap-2 bg-[#27273a] px-4 py-2 rounded-full">
            <Flame className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-bold">24/7</span>
            <span className="text-gray-400">Live Updates</span>
          </div>
        </div>

        {/* How Rankings Work */}
        <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-[#fbbf24] mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            How the Court Determines Rankings
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#27273a] rounded-lg">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="font-bold text-white mb-2">Crown Score</h3>
              <p className="text-sm text-gray-400">
                Score = Upvotes - Downvotes. Higher scores mean the Court has spoken.
              </p>
            </div>
            <div className="text-center p-4 bg-[#27273a] rounded-lg">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-white mb-2">Real-Time Updates</h3>
              <p className="text-sm text-gray-400">
                Rankings update instantly as the community votes. No algorithms.
              </p>
            </div>
            <div className="text-center p-4 bg-[#27273a] rounded-lg">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-bold text-white mb-2">Community Driven</h3>
              <p className="text-sm text-gray-400">
                Every vote counts. The people decide who wears the jester's crown.
              </p>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {allNominees.length >= 3 && (
          <div className="mb-12">
            <div className="flex justify-center items-end gap-4 md:gap-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🥈</div>
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-gray-400 overflow-hidden bg-[#27273a] flex items-center justify-center text-3xl md:text-4xl">
                    {allNominees[1].imageUrl ? (
                      <img src={allNominees[1].imageUrl} alt={allNominees[1].name} className="w-full h-full object-cover" />
                    ) : (
                      <span>🎭</span>
                    )}
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm md:text-base font-bold text-gray-300">{allNominees[1].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[1].platform} • {allNominees[1].category}</p>
                  <p className="text-[#fbbf24] font-bold mt-1">+{allNominees[1].score.toLocaleString()}</p>
                </div>
                <div className="w-20 md:w-28 h-16 bg-gradient-to-t from-gray-400/20 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-4">
                <div className="text-3xl mb-2">👑</div>
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#fbbf24] overflow-hidden bg-[#27273a] shadow-xl shadow-[#fbbf24]/20 flex items-center justify-center text-4xl md:text-5xl">
                    {allNominees[0].imageUrl ? (
                      <img src={allNominees[0].imageUrl} alt={allNominees[0].name} className="w-full h-full object-cover" />
                    ) : (
                      <span>👑</span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center text-black font-bold text-lg">1</div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-base md:text-lg font-bold text-[#fbbf24]">{allNominees[0].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[0].platform} • {allNominees[0].category}</p>
                  <p className="text-[#fbbf24] font-bold text-lg mt-1">+{allNominees[0].score.toLocaleString()}</p>
                </div>
                <div className="w-24 md:w-32 h-24 bg-gradient-to-t from-[#fbbf24]/20 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🥉</div>
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-amber-600 overflow-hidden bg-[#27273a] flex items-center justify-center text-3xl md:text-4xl">
                    {allNominees[2].imageUrl ? (
                      <img src={allNominees[2].imageUrl} alt={allNominees[2].name} className="w-full h-full object-cover" />
                    ) : (
                      <span>🎭</span>
                    )}
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm md:text-base font-bold text-amber-600">{allNominees[2].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[2].platform} • {allNominees[2].category}</p>
                  <p className="text-[#fbbf24] font-bold mt-1">+{allNominees[2].score.toLocaleString()}</p>
                </div>
                <div className="w-20 md:w-28 h-12 bg-gradient-to-t from-amber-600/20 to-transparent rounded-t-lg mt-2" />
              </div>
            </div>
          </div>
        )}

        {/* Complete Rankings */}
        <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-[#3f3f5f]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TheaterIcon className="w-5 h-5 text-[#fbbf24]" />
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Complete Court Rankings</span>
            </h2>
          </div>

          <div className="divide-y divide-[#3f3f5f]/50">
            {allNominees.map((nominee: any, index: number) => (
              <Link key={nominee.id} href={`/nominee/${nominee.id}`}>
                <div className="flex items-center gap-3 md:gap-4 p-4 hover:bg-[#27273a]/50 transition-colors cursor-pointer group animate-fadeSlideIn" style={{ animationDelay: `${index * 40}ms` }}>
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    index === 0 ? 'bg-[#fbbf24] text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-amber-600 text-black' :
                    'bg-[#3f3f5f] text-gray-400'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#3f3f5f] overflow-hidden flex-shrink-0 flex items-center justify-center text-xl">
                    {nominee.imageUrl ? (
                      <img src={nominee.imageUrl} alt={nominee.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>🎭</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate group-hover:text-[#fbbf24] transition-colors">
                      {nominee.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{nominee.platform} • {nominee.category}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold ${
                      nominee.score > 0 ? 'text-green-400' : 
                      nominee.score < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {nominee.score > 0 ? '+' : ''}{nominee.score.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {nominee.upvotes.toLocaleString()} 👑
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#fbbf24] transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#fbbf24]/10 via-[#fbbf24]/5 to-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-[#fbbf24] mb-3">
              Think Someone Deserves a Spot?
            </h3>
            <p className="text-gray-400 mb-6">
              Submit a new lolcow for community review and voting.
            </p>
            <Link 
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold hover:bg-[#f59e0b] transition-colors"
            >
              <Crown className="w-5 h-5" />
              Submit a Jester
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}