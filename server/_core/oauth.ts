/**
 * OAuth Routes - Multi-platform OAuth callback handlers
 * Supports Twitch, YouTube (Google), and Kick OAuth 2.0 flows
 */

import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { oauthManager } from "./oauth-providers";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  // Get available OAuth providers
  app.get("/api/oauth/providers", (_req: Request, res: Response) => {
    const providers = oauthManager.getAvailableProviders();
    res.json({ providers });
  });

  // Initiate OAuth login for a specific platform
  app.get("/api/oauth/login/:platform", (req: Request, res: Response) => {
    const platform = req.params.platform;

    if (!oauthManager.isProviderAvailable(platform)) {
      res.status(400).json({ error: `OAuth provider "${platform}" is not configured` });
      return;
    }

    try {
      const { url, state } = oauthManager.getLoginUrl(platform);
      // Store state in cookie for validation
      res.cookie("oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000, // 10 minutes
      });
      // Store platform in cookie
      res.cookie("oauth_platform", platform, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
      });
      res.redirect(302, url);
    } catch (error) {
      console.error(`[OAuth] Failed to initiate ${platform} login:`, error);
      res.status(500).json({ error: "Failed to initiate OAuth login" });
    }
  });

  // OAuth callback handler (universal for all platforms)
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    const error = getQueryParam(req, "error");
    const errorDescription = getQueryParam(req, "error_description");

    // Get stored state and platform from cookies
    const storedState = req.cookies?.oauth_state;
    const platform = req.cookies?.oauth_platform;

    // Clear OAuth cookies
    res.clearCookie("oauth_state");
    res.clearCookie("oauth_platform");

    // Handle OAuth errors from provider
    if (error) {
      console.error(`[OAuth] Provider error: ${error} - ${errorDescription}`);
      res.redirect(302, "/?error=oauth_denied");
      return;
    }

    // Validate required parameters
    if (!code || !state) {
      res.status(400).json({ error: "Missing code or state parameter" });
      return;
    }

    // Validate state to prevent CSRF
    if (!storedState || state !== storedState) {
      console.error("[OAuth] State mismatch - possible CSRF attack");
      res.status(400).json({ error: "Invalid state parameter" });
      return;
    }

    // Validate platform
    if (!platform || !oauthManager.isProviderAvailable(platform)) {
      res.status(400).json({ error: "Invalid or missing platform" });
      return;
    }

    try {
      // Exchange code for token and get user info
      const { userInfo } = await oauthManager.exchangeCodeForToken(platform, code, state);

      if (!userInfo.id) {
        res.status(400).json({ error: "User ID missing from OAuth response" });
        return;
      }

      // Create a unique openId that includes platform prefix
      const openId = `${platform}:${userInfo.id}`;

      // Upsert user in database
      await db.upsertUser({
        openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: platform,
        lastSignedIn: new Date(),
        // Store platform-specific profile data
        ...(platform === "kick" && {
          kickUsername: userInfo.username || null,
          kickAvatarUrl: userInfo.avatarUrl || null,
        }),
        ...(platform === "twitch" && {
          kickUsername: userInfo.username || null,
          kickAvatarUrl: userInfo.avatarUrl || null,
        }),
        ...(platform === "youtube" && {
          kickUsername: userInfo.username || null,
          kickAvatarUrl: userInfo.avatarUrl || null,
        }),
      });

      // Create session token
      const sessionToken = await oauthManager.createSessionToken(openId, platform, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      // Set session cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Redirect to home page
      res.redirect(302, "/");
    } catch (error) {
      console.error(`[OAuth] ${platform} callback failed:`, error);
      res.redirect(302, "/?error=oauth_failed");
    }
  });

  // Legacy Manus OAuth callback (for backward compatibility during transition)
  // TODO: Remove this after all users have migrated
  app.get("/api/oauth/callback/manus", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    // Import legacy SDK for backward compatibility
    const { sdk } = await import("./sdk");

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? "manus",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Legacy Manus callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
