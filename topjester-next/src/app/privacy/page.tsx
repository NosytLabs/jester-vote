import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - TopJester",
  description: "Privacy policy for TopJester - The Court of Fools.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-center" style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-400">
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              TopJester collects minimal information to provide our services:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Account information (username, email) if you choose to register</li>
              <li>Voting history and preferences</li>
              <li>Basic analytics (page views, device type)</li>
              <li>Cookies for session management</li>
            </ul>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">2. How We Use Information</h2>
            <p className="mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and maintain the voting platform</li>
              <li>Prevent fraud and abuse</li>
              <li>Improve user experience</li>
              <li>Generate anonymous aggregate statistics</li>
            </ul>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">3. Data Sharing</h2>
            <p>
              We do not sell or share personal information with third parties. 
              Public voting data (vote counts, rankings) is displayed on the site 
              but is not linked to individual users.
            </p>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">4. Contact</h2>
            <p>
              For privacy-related questions, contact us at: privacy@topjester.com
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
