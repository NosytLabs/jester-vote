import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { nominees } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Crown, TrendingUp, Filter } from "lucide-react";
import { TheaterIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Leaderboard - TopJester | Royal Rankings of Lolcows",
  description: "Live rankings of the biggest internet lolcows and jesters. Vote and see who's on top of the Court of Fools.",
};

async function getAllNominees() {
  try {
    const allNominees = await db.query.nominees.findMany({
      orderBy: desc(nominees.score),
      where: eq(nominees.status, 'approved'),
    });
    return allNominees;
  } catch (error) {
    console.warn('Database not available, using fallback data');
    // Return mock data for demonstration
    return [
      { id: 1, name: "DSP", score: 420, upvotes: 1337, downvotes: 69, platform: "twitch", category: "gaming", imageUrl: null, status: "approved" },
      { id: 2, name: "Wings of Redemption", score: 380, upvotes: 1200, downvotes: 85, platform: "youtube", category: "gaming", imageUrl: null, status: "approved" },
      { id: 3, name: "Boogie2988", score: 350, upvotes: 1100, downvotes: 95, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
      { id: 4, name: "Chris Chan", score: 9001, upvotes: 5000, downvotes: 50, platform: "youtube", category: "irl", imageUrl: null, status: "approved" },
      { id: 5, name: "Ice Poseidon", score: 320, upvotes: 1000, downvotes: 120, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 6, name: "Adin Ross", score: 290, upvotes: 950, downvotes: 140, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 7, name: "xQc", score: 280, upvotes: 900, downvotes: 150, platform: "kick", category: "gaming", imageUrl: null, status: "approved" },
      { id: 8, name: "N3on", score: 260, upvotes: 850, downvotes: 160, platform: "kick", category: "irl", imageUrl: null, status: "approved" },
      { id: 9, name: "Nikocado Avocado", score: 310, upvotes: 980, downvotes: 130, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
      { id: 10, name: "Keemstar", score: 240, upvotes: 800, downvotes: 180, platform: "youtube", category: "drama", imageUrl: null, status: "approved" },
    ];
  }
}

export default async function LeaderboardPage() {
  const allNominees = await getAllNominees();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <TheaterIcon className="w-12 h-12 text-[#fbbf24]" />
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            The definitive list of streaming&apos;s biggest jesters and lolcows. 
            Ranked by the community, updated in real-time.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm">
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-gray-400">
            <Crown className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-[#fbbf24] font-bold">{allNominees.length}</span> Jesters Ranked
          </span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-gray-400">
            <TrendingUp className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-[#fbbf24] font-bold">
              {allNominees.reduce((sum, n) => sum + n.upvotes + n.downvotes, 0).toLocaleString()}
            </span> Total Votes
          </span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-gray-400">
            <Filter className="w-4 h-4 text-[#fbbf24]" />
            Live Updates
          </span>
        </div>

        {/* Top 3 Podium */}
        {allNominees.length >= 3 && (
          <div className="mb-12">
            <div className="flex justify-center items-end gap-4 md:gap-8 mb-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-gray-400 overflow-hidden bg-[#27273a] shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl">
                      {allNominees[1].imageUrl ? (
                        <img src={allNominees[1].imageUrl} alt={allNominees[1].name} className="w-full h-full object-cover" />
                      ) : (
                        <span>🥈</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold">2</div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm md:text-base font-bold text-gray-300">{allNominees[1].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[1].platform} • {allNominees[1].category}</p>
                  <p className="text-[#fbbf24] font-bold mt-1">{allNominees[1].score > 0 ? '+' : ''}{allNominees[1].score}</p>
                </div>
                <div className="w-20 md:w-28 h-16 bg-gradient-to-t from-gray-400/20 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-4">
                <div className="text-3xl mb-2">👑</div>
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#fbbf24] overflow-hidden bg-[#27273a] shadow-xl shadow-[#fbbf24]/20">
                    <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl">
                      {allNominees[0].imageUrl ? (
                        <img src={allNominees[0].imageUrl} alt={allNominees[0].name} className="w-full h-full object-cover" />
                      ) : (
                        <span>🥇</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center text-black font-bold text-lg">1</div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-base md:text-lg font-bold text-[#fbbf24]">{allNominees[0].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[0].platform} • {allNominees[0].category}</p>
                  <p className="text-[#fbbf24] font-bold text-lg mt-1">{allNominees[0].score > 0 ? '+' : ''}{allNominees[0].score}</p>
                </div>
                <div className="w-24 md:w-32 h-24 bg-gradient-to-t from-[#fbbf24]/20 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-amber-700 overflow-hidden bg-[#27273a] shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl">
                      {allNominees[2].imageUrl ? (
                        <img src={allNominees[2].imageUrl} alt={allNominees[2].name} className="w-full h-full object-cover" />
                      ) : (
                        <span>🥉</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-black font-bold">3</div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm md:text-base font-bold text-amber-600">{allNominees[2].name}</p>
                  <p className="text-xs text-gray-500 capitalize">{allNominees[2].platform} • {allNominees[2].category}</p>
                  <p className="text-[#fbbf24] font-bold mt-1">{allNominees[2].score > 0 ? '+' : ''}{allNominees[2].score}</p>
                </div>
                <div className="w-20 md:w-28 h-12 bg-gradient-to-t from-amber-700/20 to-transparent rounded-t-lg mt-2" />
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-[#3f3f5f]">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TheaterIcon className="w-5 h-5 text-[#fbbf24]" />
                <span style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Complete Rankings</span>
              </h2>
            </div>

            <div className="divide-y divide-[#3f3f5f]/50">
              {allNominees.map((nominee, index) => (
                <Link key={nominee.id} href={`/nominee/${nominee.id}`}>
                  <div className="flex items-center gap-3 md:gap-4 p-4 hover:bg-[#27273a]/50 transition-colors cursor-pointer group">
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      index === 0 ? 'bg-[#fbbf24] text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-700 text-black' :
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

        {/* Voting Guide */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">👑</span> Upvote When...
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• They provide consistent entertainment</li>
                <li>• They're a textbook example of dysfunction</li>
                <li>• They've earned legendary status</li>
                <li>• They're unaware of their own absurdity</li>
                <li>• They never fail to deliver content</li>
              </ul>
            </div>
            <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">📉</span> Downvote When...
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• They're self-aware and playing it up</li>
                <li>• They're trying to leave the lolcow life</li>
                <li>• The content feels manufactured</li>
                <li>• They're a private individual</li>
                <li>• The situation involves real harm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#fbbf24] mb-4">Recent Court Activity</h3>
            <div className="space-y-3">
              {[
                { action: "upvoted", user: "Chris Chan", amount: 420, time: "2 hours ago" },
                { action: "downvoted", user: "DSP", amount: 15, time: "3 hours ago" },
                { action: "submitted", user: "New Lolcow: 'StreamerX'", time: "5 hours ago" },
                { action: "upvoted", user: "Wings of Redemption", amount: 69, time: "6 hours ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className={activity.action === "downvoted" ? "text-red-400" : activity.action === "upvoted" ? "text-green-400" : "text-[#fbbf24]"}>
                    {activity.action === "upvoted" ? "👑" : activity.action === "downvoted" ? "📉" : "📝"}
                  </span>
                  <span className="text-gray-400">
                    Someone {activity.action} <strong className="text-white">{activity.user}</strong>
                    {activity.amount && <span className="text-[#fbbf24]"> +{activity.amount}</span>}
                  </span>
                  <span className="text-gray-600 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
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
