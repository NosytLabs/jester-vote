/**
 * Multi-Platform OAuth Provider SDK
 * Supports Twitch, YouTube (Google), and Kick OAuth 2.0 flows
 */

import axios, { type AxiosInstance } from "axios";
import { createHash, randomBytes } from "crypto";
import { ENV } from "./env";

// Types for OAuth responses
export interface OAuthTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken?: string;
  scope: string;
}

export interface OAuthUserInfo {
  id: string;
  name: string;
  email?: string | null;
  avatarUrl?: string | null;
  platform: "twitch" | "youtube" | "kick";
  username?: string | null;
}

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

// Generate PKCE code challenge
function generateCodeChallenge(verifier: string): string {
  return createHash("sha256")
    .update(verifier)
    .digest("base64url")
    .replace(/=/g, "");
}

// Generate random state
function generateState(): string {
  return randomBytes(32).toString("base64url");
}

// Base OAuth Provider class
abstract class OAuthProvider {
  protected httpClient: AxiosInstance;

  constructor(
    protected config: OAuthConfig,
    baseURL: string
  ) {
    this.httpClient = axios.create({
      baseURL,
      timeout: 30000,
    });
  }

  abstract getAuthorizationUrl(state: string, codeChallenge?: string): string;
  abstract exchangeCodeForToken(code: string, codeVerifier?: string): Promise<OAuthTokenResponse>;
  abstract getUserInfo(accessToken: string): Promise<OAuthUserInfo>;
}

// Twitch OAuth Provider
class TwitchProvider extends OAuthProvider {
  constructor(config: OAuthConfig) {
    super(config, "https://id.twitch.tv/oauth2");
  }

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
      scope: this.config.scopes.join(" "),
      state,
    });
    return `${this.httpClient.defaults.baseURL}/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.config.redirectUri,
    });

    const { data } = await this.httpClient.post("/token", params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      scope: data.scope,
    };
  }

  async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    // Twitch requires the Client-ID header for API calls
    const { data } = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": this.config.clientId,
      },
    });

    const user = data.data?.[0];
    if (!user) {
      throw new Error("Failed to get Twitch user info");
    }

    return {
      id: user.id,
      name: user.display_name || user.login,
      email: user.email || null,
      avatarUrl: user.profile_image_url || null,
      platform: "twitch",
      username: user.login,
    };
  }
}

// YouTube/Google OAuth Provider
class YouTubeProvider extends OAuthProvider {
  constructor(config: OAuthConfig) {
    super(config, "https://oauth2.googleapis.com");
  }

  getAuthorizationUrl(state: string, codeChallenge?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
      scope: this.config.scopes.join(" "),
      state,
      access_type: "offline",
      include_granted_scopes: "true",
    });

    if (codeChallenge) {
      params.set("code_challenge", codeChallenge);
      params.set("code_challenge_method", "S256");
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, codeVerifier?: string): Promise<OAuthTokenResponse> {
    const params: Record<string, string> = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.config.redirectUri,
    };

    if (codeVerifier) {
      params.code_verifier = codeVerifier;
    }

    const { data } = await this.httpClient.post("/token", new URLSearchParams(params).toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      scope: data.scope,
    };
  }

  async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    const { data } = await axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const channel = data.items?.[0];
    if (!channel) {
      // Fallback to Google userinfo if no YouTube channel
      const { data: googleUser } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email || null,
        avatarUrl: googleUser.picture || null,
        platform: "youtube",
        username: null,
      };
    }

    return {
      id: channel.id,
      name: channel.snippet?.title || "YouTube User",
      email: null,
      avatarUrl: channel.snippet?.thumbnails?.default?.url || null,
      platform: "youtube",
      username: channel.snippet?.customUrl?.replace("@", "") || null,
    };
  }
}

// Kick OAuth Provider (OAuth 2.1 with PKCE)
class KickProvider extends OAuthProvider {
  constructor(config: OAuthConfig) {
    super(config, "https://id.kick.com");
  }

  getAuthorizationUrl(state: string, codeChallenge: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
      scope: this.config.scopes.join(" "),
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    return `${this.httpClient.defaults.baseURL}/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, codeVerifier: string): Promise<OAuthTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.config.redirectUri,
      code_verifier: codeVerifier,
    });

    const { data } = await this.httpClient.post("/oauth/token", params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      scope: data.scope,
    };
  }

  async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    const { data } = await axios.get("https://api.kick.com/v1/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = data.data?.[0];
    if (!user) {
      throw new Error("Failed to get Kick user info");
    }

    return {
      id: String(user.user_id),
      name: user.name || user.username,
      email: user.email || null,
      avatarUrl: user.profile_picture || null,
      platform: "kick",
      username: user.username || null,
    };
  }
}

// OAuth Manager to handle all providers
export class OAuthManager {
  private providers: Map<string, OAuthProvider> = new Map();
  private codeVerifiers: Map<string, { verifier: string; platform: string }> = new Map();

  constructor() {
    // Initialize providers if credentials are available
    // In development, allow mock credentials for testing
    const isDev = !ENV.isProduction;
    
    if (ENV.twitchClientId && ENV.twitchClientSecret) {
      this.providers.set("twitch", new TwitchProvider({
        clientId: ENV.twitchClientId,
        clientSecret: ENV.twitchClientSecret,
        redirectUri: `${ENV.appUrl}/api/oauth/callback`,
        scopes: ["user:read:email"],
      }));
    }

    if (ENV.youtubeClientId && ENV.youtubeClientSecret) {
      this.providers.set("youtube", new YouTubeProvider({
        clientId: ENV.youtubeClientId,
        clientSecret: ENV.youtubeClientSecret,
        redirectUri: `${ENV.appUrl}/api/oauth/callback`,
        scopes: ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
      }));
    }

    // Kick OAuth - allow in dev mode with warning
    if (ENV.kickClientId && ENV.kickClientSecret) {
      if (isDev && ENV.kickClientId.startsWith("dev_")) {
        console.warn("[OAuth] Using development Kick credentials - real OAuth will fail. Register at https://kick.com/developer/apps for production.");
      }
      this.providers.set("kick", new KickProvider({
        clientId: ENV.kickClientId,
        clientSecret: ENV.kickClientSecret,
        redirectUri: `${ENV.appUrl}/api/oauth/callback`,
        scopes: ["user:read"],
      }));
    }
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  isProviderAvailable(platform: string): boolean {
    return this.providers.has(platform);
  }

  getLoginUrl(platform: string): { url: string; state: string; codeVerifier?: string } {
    const provider = this.providers.get(platform);
    if (!provider) {
      throw new Error(`OAuth provider "${platform}" is not configured`);
    }

    const state = generateState();
    let codeVerifier: string | undefined;

    // Kick requires PKCE
    if (platform === "kick") {
      codeVerifier = randomBytes(32).toString("base64url");
      const codeChallenge = generateCodeChallenge(codeVerifier);
      this.codeVerifiers.set(state, { verifier: codeVerifier, platform });
      return {
        url: provider.getAuthorizationUrl(state, codeChallenge),
        state,
        codeVerifier,
      };
    }

    return {
      url: provider.getAuthorizationUrl(state),
      state,
    };
  }

  async exchangeCodeForToken(
    platform: string,
    code: string,
    state: string
  ): Promise<{ token: OAuthTokenResponse; userInfo: OAuthUserInfo }> {
    const provider = this.providers.get(platform);
    if (!provider) {
      throw new Error(`OAuth provider "${platform}" is not configured`);
    }

    let codeVerifier: string | undefined;
    if (platform === "kick") {
      const stored = this.codeVerifiers.get(state);
      if (!stored || stored.platform !== platform) {
        throw new Error("Invalid or expired OAuth state");
      }
      codeVerifier = stored.verifier;
      this.codeVerifiers.delete(state);
    }

    const token = await provider.exchangeCodeForToken(code, codeVerifier);
    const userInfo = await provider.getUserInfo(token.accessToken);

    return { token, userInfo };
  }

  // Session management (JWT)
  async createSessionToken(
    userId: string,
    platform: string,
    options: { expiresInMs?: number; name?: string } = {}
  ): Promise<string> {
    const { SignJWT } = await import("jose");
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? 1000 * 60 * 60 * 24 * 365; // 1 year
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = new TextEncoder().encode(ENV.cookieSecret);

    return new SignJWT({
      userId,
      platform,
      name: options.name || "",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  async verifySession(cookieValue: string | undefined | null): Promise<{ userId: string; platform: string; name: string } | null> {
    if (!cookieValue) return null;

    try {
      const { jwtVerify } = await import("jose");
      const secretKey = new TextEncoder().encode(ENV.cookieSecret);
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"],
      });

      const { userId, platform, name } = payload as Record<string, unknown>;

      if (typeof userId !== "string" || typeof platform !== "string") {
        return null;
      }

      return {
        userId,
        platform,
        name: typeof name === "string" ? name : "",
      };
    } catch (error) {
      console.warn("[OAuth] Session verification failed", String(error));
      return null;
    }
  }
}

// Singleton instance
export const oauthManager = new OAuthManager();
