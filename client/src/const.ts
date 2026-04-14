export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export type OAuthPlatform = "twitch" | "youtube" | "kick";

// Platform configuration
export const OAUTH_PLATFORMS: Record<OAuthPlatform, {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}> = {
  twitch: {
    name: "Twitch",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`,
    color: "#9146FF",
    bgColor: "rgba(145, 70, 255, 0.1)",
  },
  youtube: {
    name: "YouTube",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    color: "#FF0000",
    bgColor: "rgba(255, 0, 0, 0.1)",
  },
  kick: {
    name: "Kick",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.333 0h8v5.333H12V0h8v8h-2.667v2.667H24V24h-8v-5.333h-2.667V24h-8V16h2.667V8H1.333V0z"/></svg>`,
    color: "#53FC18",
    bgColor: "rgba(83, 252, 24, 0.1)",
  },
};

// Generate login URL for a specific platform
export function getLoginUrl(platform: OAuthPlatform): string {
  return `/api/oauth/login/${platform}`;
}

// Legacy function for backward compatibility (defaults to kick)
export function getLegacyLoginUrl(): string {
  return getLoginUrl("kick");
}

// Get all available platforms
export function getAvailablePlatforms(): OAuthPlatform[] {
  return ["twitch", "youtube", "kick"];
}
