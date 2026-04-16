"use client";

import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { LogOut, Menu, X, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const isLoginPage = location === "/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "THE COURT", icon: "🏰" },
    { href: "/about", label: "ABOUT", icon: "📜" },
    { href: "/merch", label: "MERCH", icon: "🛒" },
    ...(isAuthenticated
      ? [
          { href: "/submit", label: "NOMINATE", icon: "👑" },
          { href: "/settings", label: "SETTINGS", icon: "⚙️" },
        ]
      : []),
    ...(user?.role === "admin"
      ? [{ href: "/admin", label: "ROYAL GUARD", icon: "⚔️" }]
      : []),
  ];

  return (
    <header className="header-bg sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Royal Court Badge */}
          <Link href="/">
            <motion.span
              className="text-lg sm:text-xl font-black tracking-widest cursor-pointer select-none flex items-center gap-1"
              style={{
                fontFamily: "'Orbitron', monospace",
                color: "oklch(0.92 0 0)",
                textShadow:
                  "0 0 20px oklch(0.75 0.25 140 / 0.6), 0 0 40px oklch(0.55 0.22 300 / 0.4)",
              }}
              whileHover={{ scale: 1.02 }}
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[oklch(0.85_0.18_85)]">👑</span>
              <span className="hidden sm:inline">
                [TOP<span style={{ color: "oklch(0.75 0.25 140)" }}>JESTER</span>]
              </span>
              <span className="sm:hidden">
                [TJ]
              </span>
              <span className="text-[oklch(0.85_0.18_85)]">🎭</span>
            </motion.span>
          </Link>

          {/* Desktop Nav - Royal Court Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 rounded ${
                    location === link.href
                      ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <span>{link.icon}</span> {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Auth + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 jester-border-subtle px-2 py-1">
                  {user.kickAvatarUrl ? (
                    <img
                      src={user.kickAvatarUrl}
                      alt={user.name ?? ""}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      {(user.name ?? "?")[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs text-foreground">
                    {user.kickUsername ?? user.name ?? "User"}
                  </span>
                </div>
                {/* Mobile avatar only */}
                <div className="sm:hidden">
                  {user.kickAvatarUrl ? (
                    <img
                      src={user.kickAvatarUrl}
                      alt={user.name ?? ""}
                      className="w-7 h-7 rounded-full border border-[oklch(0.75_0.25_140)]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {(user.name ?? "?")[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => logout()}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : !isLoginPage ? (
              <Link href="/login">
                <motion.span
                  className="hidden sm:flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all jester-border hover:bg-[oklch(0.75_0.25_140/0.1)] cursor-pointer honk-btn"
                  style={{ color: "oklch(0.75 0.25 140)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">🎭</span>
                  ENTER
                </motion.span>
                {/* Mobile login button */}
                <motion.span
                  className="sm:hidden flex items-center gap-1 px-2 py-1 text-xs font-bold transition-all jester-border hover:bg-[oklch(0.75_0.25_140/0.1)] cursor-pointer"
                  style={{ color: "oklch(0.75 0.25 140)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm">🎭</span>
                  LOGIN
                </motion.span>
              </Link>
            ) : null}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Green dashed bottom border line */}
      <div
        style={{
          height: "1px",
          background:
            "repeating-linear-gradient(90deg, oklch(0.75 0.25 140) 0, oklch(0.75 0.25 140) 8px, transparent 8px, transparent 16px)",
        }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0f0f1a] border-l border-[oklch(0.75_0.25_140)] z-50 md:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#3f3f5f]">
                <span
                  className="text-lg font-black tracking-wider"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: "oklch(0.75 0.25 140)",
                  }}
                >
                  👑 MENU
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <nav className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={link.href}>
                      <span
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                          location === link.href
                            ? "bg-[oklch(0.75_0.25_140/0.2)] border border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]"
                            : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-[#27273a]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-bold">{link.label}</span>
                        {location === link.href && (
                          <Crown className="ml-auto w-4 h-4 text-[oklch(0.75_0.25_140)]" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Section */}
                {!isAuthenticated && !isLoginPage && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 border-t border-[#3f3f5f] mt-4"
                  >
                    <Link href="/login">
                      <span className="flex items-center justify-center gap-2 px-4 py-3 bg-[oklch(0.75_0.25_140)] text-[#0f0f1a] rounded-lg font-bold cursor-pointer">
                        <span className="text-xl">🎭</span>
                        ENTER THE COURT
                      </span>
                    </Link>
                  </motion.div>
                )}

                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 border-t border-[#3f3f5f] mt-4"
                  >
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={20} />
                      <span className="font-bold">LOGOUT</span>
                    </button>
                  </motion.div>
                )}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3f3f5f]">
                <p className="text-xs text-muted-foreground text-center">
                  🎪 The Court of Fools 🎪
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
