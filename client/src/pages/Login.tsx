import { useAuth, useOAuthProviders } from "@/_core/hooks/useAuth";
import { OAUTH_PLATFORMS, type OAuthPlatform } from "@/const";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { providers, isLoading } = useOAuthProviders();
  const [location, navigate] = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Check for OAuth errors in URL
  const urlParams = new URLSearchParams(window.location.search);
  const oauthError = urlParams.get("error");

  const handleLogin = (platform: OAuthPlatform) => {
    login(platform);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🃏</div>
              <span
                className="text-3xl font-black tracking-tight"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: "linear-gradient(135deg, oklch(0.85 0.18 85) 0%, oklch(0.75 0.25 140) 50%, oklch(0.55 0.22 300) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TOPJESTER
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <span>👑</span> Enter the Court <span>👑</span>
          </CardTitle>
          <CardDescription className="text-center">
            Join the Royal Court of Fools to nominate jesters,
            <br />cast your votes, and crown the clowns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {oauthError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
              {oauthError === "oauth_denied"
                ? "Login was cancelled. Please try again."
                : "Login failed. Please try again."}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {providers.map((platform) => {
                const config = OAUTH_PLATFORMS[platform];
                return (
                  <Button
                    key={platform}
                    onClick={() => handleLogin(platform)}
                    className="w-full h-12 justify-center gap-3 font-semibold transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: config.bgColor,
                      border: `1px solid ${config.color}`,
                      color: config.color,
                    }}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: config.icon }}
                      className="w-5 h-5"
                    />
                    Continue with {config.name}
                  </Button>
                );
              })}
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground pt-4">
            By entering the Court, you swear allegiance to chaos. <span className="text-[oklch(0.75_0.25_140)]">🤡</span>
            <br />
            We only access your public jester profile.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
