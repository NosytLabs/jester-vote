import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { LogOut, Shield, PlusCircle } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

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
              [JESTER<span style={{ color: "oklch(0.75 0.25 140)" }}>VOTE</span>]
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1 text-xs">
            <Link href="/">
              <span className={`px-3 py-1 border cursor-pointer transition-colors ${location === "/" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                RANKINGS
              </span>
            </Link>
            {isAuthenticated && (
              <Link href="/submit">
                <span className={`px-3 py-1 border cursor-pointer transition-colors flex items-center gap-1 ${location === "/submit" ? "border-[oklch(0.75_0.25_140)] text-[oklch(0.75_0.25_140)]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>
                  <PlusCircle size={12} />
                  SUBMIT
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
            ) : (
              <a
                href={getLoginUrl()}
                className="flex items-center gap-2 px-3 py-1 text-xs font-bold transition-all jester-border hover:bg-[oklch(0.75_0.25_140/0.1)]"
                style={{ color: "oklch(0.75 0.25 140)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 4l1.5 15.5L12 22l8.5-2.5L22 4H2zm15.5 5h-5v2h4l-.5 5-4 1.5-4-1.5-.25-3h2l.25 1.75 2 .5 2-.5.25-2.25H8.5L8 9h9.5l-.5 5.5z"/>
                </svg>
                LOGIN WITH KICK
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Green dashed bottom border line */}
      <div style={{ height: "1px", background: "repeating-linear-gradient(90deg, oklch(0.75 0.25 140) 0, oklch(0.75 0.25 140) 8px, transparent 8px, transparent 16px)" }} />
    </header>
  );
}
