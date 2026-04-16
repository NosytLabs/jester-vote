import { Metadata } from "next";
import Link from "next/link";
import { Crown, Upload, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit a Jester - TopJester | Nominate a New Lolcow",
  description: "Submit a new lolcow or jester for community review and voting on TopJester. Help us document the biggest jesters in streaming culture.",
  authors: [{ name: "TopJester Team" }],
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-[#fbbf24]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4" style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            SUBMIT A JESTER
          </h1>
          <p className="text-gray-400">
            Nominate a new lolcow for the Court of Fools
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6 md:p-8">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Jester Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., DSP, Wings of Redemption, etc."
                className="w-full px-4 py-3 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] transition-colors"
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">
                Primary Platform *
              </label>
              <select
                id="platform"
                name="platform"
                required
                className="w-full px-4 py-3 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
              >
                <option value="">Select platform...</option>
                <option value="twitch">Twitch</option>
                <option value="youtube">YouTube</option>
                <option value="kick">Kick</option>
                <option value="tiktok">TikTok</option>
                <option value="rumble">Rumble</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-3 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
              >
                <option value="">Select category...</option>
                <option value="gaming">Gaming Lolcow</option>
                <option value="irl">IRL Streamer</option>
                <option value="drama">Drama/Commentary</option>
                <option value="mental">Mental Health Case</option>
                <option value="legend">Legendary Status</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Why are they a lolcow? *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Explain what makes this person a true lolcow. Include notable incidents, patterns of behavior, and why they deserve a spot in the Court of Fools."
                className="w-full px-4 py-3 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] transition-colors resize-none"
              />
            </div>

            {/* Links */}
            <div>
              <label htmlFor="links" className="block text-sm font-medium text-gray-300 mb-2">
                Links (Optional)
              </label>
              <input
                type="url"
                id="links"
                name="links"
                placeholder="https://..."
                className="w-full px-4 py-3 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Link to their main channel or a notable video
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold text-lg hover:bg-[#f59e0b] transition-colors"
            >
              <Upload className="w-5 h-5" />
              Submit for Review
            </button>
          </form>

          {/* Info Boxes */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-[#27273a] rounded-lg border border-[#3f3f5f]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-1">Submission Guidelines</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• All submissions are reviewed before appearing on the site</li>
                    <li>• Include specific examples of lolcow behavior</li>
                    <li>• Public figures only - no private individuals</li>
                    <li>• Satire/parody submissions are welcome</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#27273a] rounded-lg border border-[#3f3f5f]">
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-1">What Makes a Good Submission?</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Clear examples of unawareness or dysfunction</li>
                    <li>• Links to documented incidents or archives</li>
                    <li>• Explanation of why they're "milkable"</li>
                    <li>• Evidence of community interest (subreddits, forums)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#27273a] rounded-lg border border-[#3f3f5f]">
              <div className="flex items-start gap-3">
                <Upload className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-1">What We Reject</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Private individuals without public presence</li>
                    <li>• Minors or vulnerable protected persons</li>
                    <li>• Submissions with doxxing or personal info</li>
                    <li>• Pure hate speech without documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="text-[#fbbf24] hover:text-[#f59e0b] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
