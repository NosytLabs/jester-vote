import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - TopJester",
  description: "Learn about TopJester, the court of fools, and the definition of lolcows in internet culture.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black text-gradient-jester mb-8 text-center">
          ABOUT THE COURT
        </h1>

        <div className="space-y-8">
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">What is a Lolcow?</h2>
            <p className="text-muted-foreground mb-4">
              A <strong>lolcow</strong> (also spelled &quot;lol cow&quot;) is a person who is exploited and mocked 
              by others online for their eccentric, foolish, or dysfunctional behavior. The term combines 
              &quot;LOL&quot; (laugh out loud) with &quot;cow&quot; (suggesting the person is &quot;milked&quot; for entertainment).
            </p>
            <p className="text-muted-foreground">
              <strong>Origin:</strong> Early 2000s on 4chan and Something Awful forums. Popularized by 
              Encyclopedia Dramatica and Kiwi Farms.
            </p>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">What Makes a TRUE Lolcow?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Unawareness</strong> - They don&apos;t realize they&apos;re being laughed AT, not with</li>
              <li>• <strong>Consistency</strong> - They consistently provide entertainment through dysfunction</li>
              <li>• <strong>Exploitability</strong> - Easy to provoke into reactions</li>
              <li>• <strong>Documentation</strong> - Extensive archives of their behavior exist</li>
              <li>• <strong>Community</strong> - Dedicated communities form around documenting them</li>
              <li>• <strong>Resistance to Change</strong> - They never learn from mistakes</li>
            </ul>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">Our Database</h2>
            <p className="text-muted-foreground mb-4">
              TopJester tracks <strong>46 TRUE lolcows</strong> across multiple platforms:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">5</div>
                <div className="text-muted-foreground">Legendary Gaming</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">7</div>
                <div className="text-muted-foreground">Mental Health Cases</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">11</div>
                <div className="text-muted-foreground">Cx Network</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">15</div>
                <div className="text-muted-foreground">YouTube Drama</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">8</div>
                <div className="text-muted-foreground">Modern Streamers</div>
              </div>
              <div className="bg-[#27273a] rounded-lg p-3 text-center">
                <div className="text-[#fbbf24] font-bold text-lg">46</div>
                <div className="text-muted-foreground">Total Lolcows</div>
              </div>
            </div>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">Featured Jesters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "DSP", desc: "The original gaming lolcow, 15+ years of documented failure" },
                { name: "Chris Chan", desc: "Most documented person on the internet" },
                { name: "Wings of Redemption", desc: "Rage quit pioneer, 'LOOK HERE LOOK LISTEN'" },
                { name: "Boogie2988", desc: "Perpetual victim, constant crisis cycles" },
              ].map((jester) => (
                <div key={jester.name} className="bg-[#27273a] rounded-lg p-4">
                  <h3 className="font-bold text-foreground">{jester.name}</h3>
                  <p className="text-sm text-muted-foreground">{jester.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
