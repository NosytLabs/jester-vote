import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function makeUser(overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser {
  return {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    kickUsername: null,
    kickAvatarUrl: null,
    ...overrides,
  };
}

function makeCtx(user?: AuthenticatedUser): TrpcContext {
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
  return {
    user: user ?? null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };
}

// ─── Auth tests ───────────────────────────────────────────────────────────────

describe("auth.logout", () => {
  it("clears the session cookie and returns success", async () => {
    const ctx = makeCtx(makeUser());
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    (ctx.res as any).clearCookie = (name: string, options: Record<string, unknown>) => {
      clearedCookies.push({ name, options });
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({ maxAge: -1 });
  });
});

// ─── Admin guard tests ────────────────────────────────────────────────────────

describe("admin procedures", () => {
  it("rejects non-admin users with FORBIDDEN", async () => {
    const ctx = makeCtx(makeUser({ role: "user" }));
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.pendingNominees()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("rejects unauthenticated users", async () => {
    const ctx = makeCtx(undefined);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.pendingNominees()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});

// ─── Vote procedure tests ─────────────────────────────────────────────────────

describe("votes.cast", () => {
  it("requires authentication", async () => {
    const ctx = makeCtx(undefined);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.votes.cast({ nomineeId: 1, voteType: "up" })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });

  it("rejects invalid voteType", async () => {
    const ctx = makeCtx(makeUser());
    const caller = appRouter.createCaller(ctx);
    // @ts-expect-error intentional bad input
    await expect(caller.votes.cast({ nomineeId: 1, voteType: "sideways" })).rejects.toBeDefined();
  });
});

// ─── Nominees procedure tests ─────────────────────────────────────────────────

describe("nominees.submit", () => {
  it("requires authentication", async () => {
    const ctx = makeCtx(undefined);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.nominees.submit({ name: "Test" })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });

  it("rejects names shorter than 2 characters", async () => {
    const ctx = makeCtx(makeUser());
    const caller = appRouter.createCaller(ctx);
    await expect(caller.nominees.submit({ name: "X" })).rejects.toBeDefined();
  });
});

// ─── Comments procedure tests ──────────────────────────────────────────────────

describe("comments.add", () => {
  it("requires authentication", async () => {
    const ctx = makeCtx(undefined);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.comments.add({ nomineeId: 1, content: "test" })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });

  it("rejects empty content", async () => {
    const ctx = makeCtx(makeUser());
    const caller = appRouter.createCaller(ctx);
    await expect(caller.comments.add({ nomineeId: 1, content: "" })).rejects.toBeDefined();
  });
});
