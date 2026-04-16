import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - TopJester",
  description: "Learn about TopJester, the court of fools, and the definition of lolcows in internet culture.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
          }}>
            ABOUT THE COURT
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding the ancient tradition of the court jester, and how it applies to modern internet culture
          </p>
        </div>

        <div className="space-y-8">
          {/* What is a Lolcow */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">What is a Lolcow?</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                A <strong className="text-white">lolcow</strong> (also spelled &quot;lol cow&quot;) is a person who is exploited and mocked 
                by others online for their eccentric, foolish, or dysfunctional behavior. The term combines 
                &quot;LOL&quot; (laugh out loud) with &quot;cow&quot; (suggesting the person is &quot;milked&quot; for entertainment).
              </p>
              <div className="bg-[#27273a] rounded-lg p-4 border-l-4 border-[#fbbf24]">
                <p className="italic">
                  &ldquo;The lolcow is unaware of their own absurdity. They perform their dysfunction publicly, 
                  creating an endless source of entertainment for observers.&rdquo;
                </p>
              </div>
              <p>
                <strong className="text-white">Origin:</strong> Early 2000s on 4chan and Something Awful forums. 
                Popularized by Encyclopedia Dramatica and Kiwi Farms. The concept has evolved alongside internet culture.
              </p>
            </div>
          </section>

          {/* The Six Pillars */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">The Six Pillars of Lolcowdom</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Unawareness", desc: "They don't realize they're being laughed AT, not with. Complete lack of self-awareness.", icon: "😵" },
                { title: "Consistency", desc: "They consistently provide entertainment through dysfunction, never disappointing.", icon: "🔄" },
                { title: "Exploitability", desc: "Easy to provoke into reactions. Trolls can reliably get a response.", icon: "🎯" },
                { title: "Documentation", desc: "Extensive archives exist. Years of content documenting their behavior.", icon: "📁" },
                { title: "Community", desc: "Dedicated communities form around documenting them. They have 'farms'.", icon: "👥" },
                { title: "Resistance to Change", desc: "They never learn from mistakes. Patterns repeat endlessly.", icon: "♻️" },
              ].map((pillar) => (
                <div key={pillar.title} className="bg-[#27273a] rounded-lg p-4 flex gap-3">
                  <span className="text-2xl">{pillar.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{pillar.title}</h3>
                    <p className="text-sm text-gray-400">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Our Database</h2>
            <p className="text-gray-400 mb-6">
              TopJester tracks <strong className="text-white">46 TRUE lolcows</strong> across multiple platforms and categories:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { count: 12, name: "Gaming Lolcows", desc: "Rage quitters, skill issues, gaming drama", icon: "🎮" },
                { count: 15, name: "IRL Streamers", desc: "Chaotic real-life content, public freakouts", icon: "📹" },
                { count: 11, name: "YouTube Drama", desc: "Commentary, callouts, controversies", icon: "🎥" },
                { count: 8, name: "Legendary Status", desc: "Hall of fame, 10+ years documented", icon: "👑" },
              ].map((cat) => (
                <div key={cat.name} className="bg-[#27273a] rounded-lg p-4 text-center hover:bg-[#27273a]/80 transition-colors">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="text-[#fbbf24] font-bold text-2xl">{cat.count}</div>
                  <div className="text-white font-medium">{cat.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{cat.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Hall of Fame */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Hall of Fame</h2>
            <p className="text-gray-400 mb-6">
              The most documented and discussed lolcows in internet history:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "DSP (DarkSydePhil)", desc: "The original gaming lolcow. 15+ years of documented failure, excuses, and rage. Known for 'I did nothing wrong' and bankruptcy filings.", category: "Gaming Legend", years: "2008-Present" },
                { name: "Chris Chan", desc: "The most documented person on the internet. 15+ years of Sonichu, trolling sagas, and internet history.", category: "Legendary Status", years: "2007-Present" },
                { name: "Wings of Redemption", desc: "Rage quit pioneer. 'LOOK HERE LOOK LISTEN' and troll donation wars. The template for gaming lolcows.", category: "Gaming Legend", years: "2010-Present" },
                { name: "Boogie2988", desc: "Perpetual victim, constant crisis cycles. Weight loss surgery saga and 'throw me under the bus' moments.", category: "YouTube Drama", years: "2006-Present" },
                { name: "Ice Poseidon", desc: "IRL streaming pioneer who turned into a cautionary tale. Cx Network and endless controversies.", category: "IRL Streamer", years: "2015-Present" },
                { name: "Nikocado Avocado", desc: "Mukbang meltdowns and relationship drama. The king of YouTube food-related breakdowns.", category: "YouTube Drama", years: "2016-Present" },
              ].map((jester) => (
                <div key={jester.name} className="bg-[#27273a] rounded-lg p-4 border-l-4 border-[#fbbf24]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">{jester.name}</h3>
                    <span className="text-xs bg-[#fbbf24]/20 text-[#fbbf24] px-2 py-1 rounded">{jester.years}</span>
                  </div>
                  <p className="text-xs text-[#fbbf24] mb-2">{jester.category}</p>
                  <p className="text-sm text-gray-400">{jester.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Platform Coverage */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Platform Coverage</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { platform: "Twitch", count: 8, color: "#9146FF" },
                { platform: "YouTube", count: 18, color: "#FF0000" },
                { platform: "Kick", count: 12, color: "#53FC18" },
                { platform: "TikTok", count: 5, color: "#00f2ea" },
              ].map((p) => (
                <div key={p.platform} className="bg-[#27273a] rounded-lg p-4 text-center">
                  <div className="text-white font-bold text-lg">{p.platform}</div>
                  <div className="text-2xl font-black mt-1" style={{ color: p.color }}>{p.count}</div>
                  <div className="text-xs text-gray-500">lolcows</div>
                </div>
              ))}
            </div>
          </section>

          {/* Ethics Note */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Ethics & Disclaimers</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                TopJester operates as <strong className="text-white">satire and commentary</strong>. We document public figures 
                who have chosen to broadcast their lives to audiences. This constitutes fair use and transformative content.
              </p>
              <div className="bg-[#27273a] rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">Our Principles:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• We only cover public figures who broadcast their content willingly</li>
                  <li>• No doxxing or personal information beyond what's publicly shared</li>
                  <li>• No harassment or direct contact with subjects</li>
                  <li>• Documentation, not incitement</li>
                  <li>• Satire and commentary, not hate</li>
                </ul>
              </div>
              <p className="text-sm italic">
                This site is for entertainment and educational purposes only. All opinions expressed are those of the community, 
                not TopJester operators.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
