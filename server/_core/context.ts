import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { oauthManager } from "./oauth-providers";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Get session cookie
    const cookieHeader = opts.req.headers.cookie;
    if (cookieHeader) {
      const cookies = parseCookies(cookieHeader);
      const sessionCookie = cookies.get("app_session_id");

      if (sessionCookie) {
        const session = await oauthManager.verifySession(sessionCookie);

        if (session) {
          // Look up user in database
          const dbUser = await db.getUserByOpenId(session.userId);

          if (dbUser) {
            user = dbUser;
            // Update last signed in time
            await db.upsertUser({
              openId: session.userId,
              lastSignedIn: new Date(),
            });
          }
        }
      }
    }
  } catch {
    // Authentication is optional for public procedures
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}

function parseCookies(cookieHeader: string): Map<string, string> {
  const cookies = new Map<string, string>();
  const pairs = cookieHeader.split(";");

  for (const pair of pairs) {
    const [key, value] = pair.trim().split("=");
    if (key && value !== undefined) {
      cookies.set(key, decodeURIComponent(value));
    }
  }

  return cookies;
}
