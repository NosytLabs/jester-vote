import { Metadata } from "next";
import Link from "next/link";
import { Crown, Gamepad2, Video, Radio, Star, Drama, Heart, Skull } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories - TopJester | Browse Lolcows by Type",
  description: "Browse lolcows and jesters by category - Gaming, IRL, YouTube Drama, Legendary, and more.",
};

const categories = [
  {
    id: "gaming",
    name: "Gaming Lolcows",
    icon: Gamepad2,
    count: 12,
    description: "Streamers known for gaming rage, skill issues, and epic failures. The original lolcow category.",
    examples: ["DSP", "Wings of Redemption", "xQc"],
    color: "#9146FF",
    gradient: "from-purple-500/20 to-purple-600/10",
  },
  {
    id: "irl",
    name: "IRL Streamers",
    icon: Radio,
    count: 15,
    description: "In-real-life content creators whose chaotic adventures and public freakouts entertain millions.",
    examples: ["Ice Poseidon", "Adin Ross", "N3on"],
    color: "#53FC18",
    gradient: "from-green-500/20 to-green-600/10",
  },
  {
    id: "youtube",
    name: "YouTube Drama",
    icon: Video,
    count: 11,
    description: "Commentary channels, callout artists, and content creators embroiled in endless controversies.",
    examples: ["Boogie2988", "Nikocado", "Keemstar"],
    color: "#FF0000",
    gradient: "from-red-500/20 to-red-600/10",
  },
  {
    id: "legendary",
    name: "Legendary Status",
    icon: Crown,
    count: 8,
    description: "The hall of fame. Lolcows with 10+ years of documented history and internet immortality.",
    examples: ["Chris Chan", "DSP", "Wings"],
    color: "#fbbf24",
    gradient: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    id: "mental",
    name: "Mental Health Cases",
    icon: Heart,
    count: 7,
    description: "Streamers whose struggles with mental health have become public spectacle. Handle with care.",
    examples: ["Various documented cases"],
    color: "#ec4899",
    gradient: "from-pink-500/20 to-pink-600/10",
  },
  {
    id: "cx",
    name: "Cx Network",
    icon: Drama,
    count: 11,
    description: "The Ice Poseidon extended universe. IRL streamers who followed in his chaotic footsteps.",
    examples: ["Ice Poseidon", "Bjorn", "Tracksuit Andy"],
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "deceased",
    name: "Fallen Jesters",
    icon: Skull,
    count: 3,
    description: "Those who have passed on but left behind legendary documentation of their lives.",
    examples: ["Respectful documentation"],
    color: "#6b7280",
    gradient: "from-gray-500/20 to-gray-600/10",
  },
  {
    id: "reformed",
    name: "Reformed Lolcows",
    icon: Star,
    count: 4,
    description: "Those who escaped the lolcow life through genuine self-improvement and awareness.",
    examples: ["Success stories"],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-600/10",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          }}>
            JESTER CATEGORIES
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse the Court of Fools by category. Each type of lolcow brings their own unique flavor of dysfunction.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 text-sm">
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-gray-400">
            <span className="text-[#fbbf24] font-bold">{categories.length}</span> Categories
          </span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-gray-400">
            <span className="text-[#fbbf24] font-bold">{categories.reduce((a, c) => a + c.count, 0)}</span> Total Lolcows
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={`/leaderboard?category=${cat.id}`}>
                <div className={`bg-gradient-to-br ${cat.gradient} border border-[#3f3f5f] rounded-xl p-6 hover:border-[#fbbf24]/50 transition-all cursor-pointer group h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: cat.color }}>{cat.count}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fbbf24] transition-colors">{cat.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex) => (
                      <span key={ex} className="text-xs bg-[#27273a] text-gray-400 px-2 py-1 rounded">{ex}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Category Guide */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Understanding the Categories
          </h2>
          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-bold text-white mb-2">Gaming vs IRL Lolcows</h3>
              <p className="text-gray-400 text-sm">
                Gaming lolcows are defined by their inability to perform in video games despite claiming expertise. 
                IRL lolcows create chaos in real-world situations, often involving the public and law enforcement.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Legendary Status</h3>
              <p className="text-gray-400 text-sm">
                To achieve legendary status, a lolcow must have 10+ years of documented history, 
                multiple dedicated communities tracking them, and cultural impact beyond their immediate audience.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">The Cx Network</h3>
              <p className="text-gray-400 text-sm">
                Named after Ice Poseidon's streaming network, this category encompasses the IRL streaming 
                culture he pioneered - chaotic, often illegal, always entertaining content.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Reformed Lolcows</h3>
              <p className="text-gray-400 text-sm">
                Rare but documented cases of lolcows who achieved genuine self-awareness and changed their behavior. 
                These are celebrated as success stories of personal growth.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
