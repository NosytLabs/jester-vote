import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { LogOut, Shield, PlusCircle } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const isLoginPage = location === "/login";

  return (
    <header className="header-bg sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <span
              className="text-xl font-black tracking-widest cursor-pointer select-none"
              style={{ fontFamily: "'Orbitron', monospace", color: "oklch(0.92 0 0)", textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.6), 0 0 40px oklch(0.55 0.22 300 / 0.4)" }}
            >
              [TOP<span style={{ color: "oklch(0.75 0.25 140)" }}>JESTER</span>]
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1 text-xs">
            <Link href="/">
              <span className={`px-3 py-1 border cursor-pointer transition-colors ${location === "/" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                THE COURT
              </span>
            </Link>
            {isAuthenticated && (
              <Link href="/submit">
                <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/submit" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                  <PlusCircle size={12} />
                  NOMINATE
                </span>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/admin">
                <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/admin" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                  <Shield size={12} />
                  ADMIN
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
                <span
                  className="flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all jester-border hover:bg-[oklch(0.75_0.25_140/0.1)] cursor-pointer"
                  style={{ color: "oklch(0.75 0.25 140)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  LOGIN
                </span>
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
