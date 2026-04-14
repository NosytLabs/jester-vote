import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { LogOut, Shield, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const isLoginPage = location === "/login";

  return (
    <header className="header-bg sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Royal Court Badge */}
          <Link href="/">
            <motion.span
              className="text-xl font-black tracking-widest cursor-pointer select-none flex items-center gap-1"
              style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)", textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.6), 0 0 40px oklch(0.55 0.22 300 / 0.4)" }}
              whileHover={{ scale: 1.02 }}
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[oklch(0.85_0.18_85)]">👑</span>
              [TOP<span style={{ color: "oklch(0.75 0.25 140)" }}>JESTER</span>]
              <span className="text-[oklch(0.85_0.18_85)]">🎭</span>
            </motion.span>
          </Link>

          {/* Nav - Royal Court Navigation */}
          <nav className="hidden sm:flex items-center gap-1 text-xs">
            <Link href="/">
              <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                <span>🏰</span> THE COURT
              </span>
            </Link>
            <Link href="/about">
              <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/about" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                <span>📜</span> ABOUT
              </span>
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/submit">
                  <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/submit" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                    <span>👑</span> NOMINATE
                  </span>
                </Link>
                <Link href="/settings">
                  <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/settings" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                    <span>⚙️</span> SETTINGS
                  </span>
                </Link>
              </>
            )}
            {user?.role === "admin" && (
              <Link href="/admin">
                <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/admin" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                  <span>⚔️</span> ROYAL GUARD
                </span>
              </Link>
            )}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 jester-border-subtle px-2 py-1">
                  {user.kickAvatarUrl ? (
                    <img src={user.kickAvatarUrl} alt={user.name ?? ""} className="w-5 h-5 rounded-full" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      {(user.name ?? "?")[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs text-foreground hidden sm:block">{user.kickUsername ?? user.name ?? "User"}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : !isLoginPage ? (
              <Link href="/login">
                <motion.span
                  className="flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all jester-border hover:bg-[oklch(0.75_0.25_140/0.1)] cursor-pointer honk-btn"
                  style={{ color: "oklch(0.75 0.25 140)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">🎭</span>
                  ENTER THE COURT
                </motion.span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Green dashed bottom border line */}
      <div style={{ height: "1px", background: "repeating-linear-gradient(90deg, oklch(0.75 0.25 140) 0, oklch(0.75 0.25 140) 8px, transparent 8px, transparent 16px)" }} />
    </header>
  );
}
