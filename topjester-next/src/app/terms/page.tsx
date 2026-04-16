import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - TopJester",
  description: "Terms of service for TopJester - The Court of Fools.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-center" style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-400">
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TopJester, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">2. Description of Service</h2>
            <p>
              TopJester is a satirical entertainment platform that allows users to vote on 
              and discuss public figures in streaming culture. The site operates as 
              parody/commentary and is intended for entertainment purposes only.
            </p>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">3. User Conduct</h2>
            <p className="mb-4">Users agree not to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Harass or threaten private individuals</li>
              <li>Post doxxing information or personal details</li>
              <li>Use the platform for illegal activities</li>
              <li>Attempt to manipulate voting through bots or automation</li>
              <li>Upload malicious content or malware</li>
            </ul>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">4. Content Disclaimer</h2>
            <p>
              TopJester is a satire/parody site for entertainment purposes. User-generated 
              content and opinions expressed do not reflect the views of TopJester operators. 
              All content regarding public figures constitutes fair use commentary.
            </p>
          </section>

          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#fbbf24] mb-4">5. Modifications</h2>
            <p>
              We reserve the right to modify or replace these terms at any time. 
              Continued use of the service after changes constitutes acceptance.
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
