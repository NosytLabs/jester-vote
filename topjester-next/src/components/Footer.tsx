import Link from "next/link";
import { AnimatedLogo } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] border-t border-[#3f3f5f]/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AnimatedLogo size="sm" />
              <span className="text-lg font-bold text-[#fbbf24]">TOPJESTER</span>
            </div>
            <p className="text-gray-400 text-sm">
              The Court of Fools - Documenting the biggest jesters and lolcows in streaming culture.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Submit a Jester
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3f3f5f]/50 mt-8 pt-8 text-center text-gray-500 text-sm">
          © 2026 TopJester. All rights reserved. Satire/Parody site for entertainment purposes.
        </div>
      </div>
    </footer>
  );
}
