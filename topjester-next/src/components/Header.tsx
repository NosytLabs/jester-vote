"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedLogo } from "./icons";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/submit", label: "Submit" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#0f0f1a]/80 backdrop-blur-md border-b border-[#3f3f5f]/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <AnimatedLogo size="md" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
              TOPJESTER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-[#fbbf24] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block px-4 py-2 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold hover:bg-[#f59e0b] transition-colors"
            >
              Enter Court
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-[#fbbf24] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#3f3f5f]/50 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-[#fbbf24] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-2 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold hover:bg-[#f59e0b] transition-colors text-center"
              >
                Enter Court
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
