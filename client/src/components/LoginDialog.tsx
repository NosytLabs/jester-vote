import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OAUTH_PLATFORMS, type OAuthPlatform } from "@/const";
import { useAuth, useOAuthProviders } from "@/_core/hooks/useAuth";

interface LoginDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function LoginDialog({
  open = false,
  onOpenChange,
  title = "Sign in to TopJester",
  description = "Choose a platform to continue",
}: LoginDialogProps) {
  const { login } = useAuth();
  const { providers, isLoading } = useOAuthProviders();
  const [selectedPlatform, setSelectedPlatform] = useState<OAuthPlatform | null>(null);

  const handleLogin = (platform: OAuthPlatform) => {
    setSelectedPlatform(platform);
    login(platform);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <span
              className="text-2xl font-black tracking-widest"
              style={{
                fontFamily: "'Orbitron', monospace",
                color: "oklch(0.92 0 0)",
                textShadow:
                  "0 0 20px oklch(0.75 0.25 140 / 0.6), 0 0 40px oklch(0.55 0.22 300 / 0.4)",
              }}
            >
              [TOP<span style={{ color: "oklch(0.75 0.25 140)" }}>JESTER</span>]
            </span>
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            providers.map((platform) => {
              const config = OAUTH_PLATFORMS[platform];
              const isSelected = selectedPlatform === platform;

              return (
                <Button
                  key={platform}
                  onClick={() => handleLogin(platform)}
                  disabled={!!selectedPlatform}
                  className="w-full h-12 justify-center gap-3 font-semibold transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: config.bgColor,
                    border: `1px solid ${config.color}`,
                    color: config.color,
                    opacity: selectedPlatform && !isSelected ? 0.5 : 1,
                  }}
                >
                  {isSelected ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{ __html: config.icon }}
                      className="w-5 h-5"
                    />
                  )}
                  {isSelected ? "Redirecting..." : `Continue with ${config.name}`}
                </Button>
              );
            })
          )}
        </div>

        <DialogFooter className="text-center">
          <p className="text-xs text-muted-foreground w-full">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
