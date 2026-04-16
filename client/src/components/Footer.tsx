"use client";

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Crown, Github, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "The Court", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Submit Jester", href: "/submit" },
      { label: "Merch", href: "/merch" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
    social: [
      { label: "Twitter", href: "https://twitter.com", icon: Twitter },
      { label: "GitHub", href: "https://github.com", icon: Github },
      { label: "Discord", href: "#", icon: MessageCircle },
    ],
  };

  return (
    <footer className="bg-[#0a0a14] border-t border-[#3f3f5f] mt-auto">
      <div className="container py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 mb-4 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl">👑</span>
                <span
                  className="text-xl font-black tracking-wider"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: "oklch(0.92 0 0)",
                  }}
                >
                  TOP<span style={{ color: "oklch(0.75 0.25 140)" }}>JESTER</span>
                </span>
                <span className="text-2xl">🎭</span>
              </motion.div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The premier destination for tracking the biggest jesters and lolcows 
              in streaming culture. Community-driven rankings.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {footerLinks.social.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#1a1a2e] text-muted-foreground hover:text-[oklch(0.75_0.25_140)] hover:bg-[oklch(0.75_0.25_140/0.1)] transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[oklch(0.75_0.25_140)]" />
              PLATFORM
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-[oklch(0.75_0.25_140)]">⚖️</span>
              LEGAL
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-[oklch(0.75_0.25_140)]">📜</span>
              JOIN THE COURT
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Login with your favorite platform to vote and track your favorite jesters.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-[#53FC18]/20 text-[#53FC18]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#53FC18]" />
                Kick
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-[#9146FF]/20 text-[#9146FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9146FF]" />
                Twitch
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-[#FF0000]/20 text-[#FF0000]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
                YouTube
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#3f3f5f] to-transparent mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} TopJester. All rights reserved. Not affiliated with ip2.network.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.25_140)] animate-pulse" />
              Platform Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
