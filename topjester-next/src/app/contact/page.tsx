import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - TopJester",
  description: "Get in touch with the TopJester team. Questions, feedback, or partnership inquiries.",
  authors: [{ name: "TopJester Team" }],
};

export default function ContactPage() {
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
            CONTACT THE COURT
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or inquiries? Reach out to the TopJester team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <section className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="nomination">Nomination Question</option>
                  <option value="report">Report Content</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-[#27273a] border border-[#3f3f5f] rounded-lg text-white focus:outline-none focus:border-[#fbbf24] transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black font-bold rounded-lg hover:from-[#f59e0b] hover:to-[#d97706] transition-[background,transform] duration-200"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <section className="space-y-6">
            <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#fbbf24] mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#27273a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#fbbf24] text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Email</h3>
                    <p className="text-gray-400">contact@topjester.com</p>
                    <p className="text-sm text-gray-500">For general inquiries and support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#27273a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#fbbf24] text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Discord</h3>
                    <p className="text-gray-400">discord.gg/topjester</p>
                    <p className="text-sm text-gray-500">Join our community server</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#27273a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#fbbf24] text-xl">🐦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Twitter/X</h3>
                    <p className="text-gray-400">@TopJester</p>
                    <p className="text-sm text-gray-500">Follow for updates and announcements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#fbbf24] mb-3">Response Time</h2>
              <p className="text-gray-400">
                We typically respond to inquiries within 24-48 hours. For urgent matters, 
                please reach out via Discord for faster assistance.
              </p>
            </div>

            <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#fbbf24] mb-3">Legal Inquiries</h2>
              <p className="text-gray-400">
                For DMCA takedown requests or legal matters, please email{' '}
                <a href="mailto:legal@topjester.com" className="text-[#fbbf24] hover:underline">
                  legal@topjester.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}