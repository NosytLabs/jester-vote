import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Shield, Lock, Eye, Trash2 } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main role="main" className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🔒
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#fbbf24]">
              Your privacy is important to us
            </p>
          </div>

          {/* Last Updated */}
          <motion.p 
            className="text-sm text-muted-foreground text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Last Updated: April 14, 2026
          </motion.p>

          {/* Content Sections */}
          <div className="space-y-6">
            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Information We Collect</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect minimal information to provide our services:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Account information (username, email) when you register</li>
                <li>Voting history and preferences</li>
                <li>Technical data (IP address, browser type) for security</li>
                <li>Cookies for session management and preferences</li>
              </ul>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">How We Use Your Information</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>To provide and maintain our voting platform</li>
                <li>To authenticate users and prevent fraud</li>
                <li>To analyze usage patterns and improve our service</li>
                <li>To communicate important updates (if you opt-in)</li>
              </ul>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Information Sharing</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share anonymized, aggregated data for analytics purposes. We may 
                disclose information if required by law or to protect our rights.
              </p>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="w-6 h-6 text-[#fbbf24]" />
                <h2 className="text-xl font-bold text-[#fbbf24]">Your Rights</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </motion.div>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-[#fbbf24] mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:privacy@topjester.com" className="text-[#fbbf24] hover:underline">
                  privacy@topjester.com
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}