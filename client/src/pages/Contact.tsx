import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Mail, Twitter, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main role="main" className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              📜
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
              Contact the Court
            </h1>
            <p className="text-lg text-[#fbbf24]">
              Have questions or feedback? Reach out to us!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            <motion.a 
              href="mailto:contact@topjester.com"
              className="jester-card p-6 flex items-center gap-4 hover:border-[#fbbf24]/50 transition-colors block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#fbbf24]/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#fbbf24]">Email Us</h2>
                <p className="text-muted-foreground">contact@topjester.com</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://twitter.com/topjester"
              target="_blank"
              rel="noopener noreferrer"
              className="jester-card p-6 flex items-center gap-4 hover:border-[#fbbf24]/50 transition-colors block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#1da1f2]/20 flex items-center justify-center">
                <Twitter className="w-6 h-6 text-[#1da1f2]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#fbbf24]">Twitter / X</h2>
                <p className="text-muted-foreground">@topjester</p>
              </div>
            </motion.a>

            <motion.div 
              className="jester-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#fbbf24]/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#fbbf24]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#fbbf24]">Response Time</h2>
                  <p className="text-muted-foreground">Usually within 24-48 hours</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We read every message and appreciate your feedback. Whether it's 
                a bug report, feature request, or just saying hello, we'd love to hear from you!
              </p>
            </motion.div>
          </div>

          {/* FAQ Note */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground text-sm">
              For common questions, check our About page or Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}