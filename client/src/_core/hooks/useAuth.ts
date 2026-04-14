import { getLoginUrl, type OAuthPlatform } from "@/const";
import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const utils = trpc.useUtils();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      throw error;
    } finally {
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  // Multi-platform login function
  const login = useCallback((platform: OAuthPlatform) => {
    window.location.href = getLoginUrl(platform);
  }, []);

  // Legacy login function (defaults to kick for backward compatibility)
  const loginWithKick = useCallback(() => {
    login("kick");
  }, [login]);

  const state = useMemo(() => {
    // Store user info in localStorage for client-side access
    if (meQuery.data) {
      localStorage.setItem(
        "topjester-user-info",
        JSON.stringify(meQuery.data)
      );
    }
    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(meQuery.data),
    };
  }, [
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    logoutMutation.error,
    logoutMutation.isPending,
  ]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    // Don't redirect if already on a login-related page
    if (currentPath === "/login" || currentPath.startsWith("/api/oauth")) return;

    // Use provided redirectPath or stay on current page
    if (redirectPath && currentPath !== redirectPath) {
      window.location.href = redirectPath;
    }
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
    login,
    loginWithKick,
  };
}

// Hook to get available OAuth providers
export function useOAuthProviders() {
  const [providers, setProviders] = React.useState<OAuthPlatform[]>(["twitch", "youtube", "kick"]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/oauth/providers")
      .then((res) => res.json())
      .then((data) => {
        if (data.providers && Array.isArray(data.providers)) {
          setProviders(data.providers);
        }
      })
      .catch((err) => {
        console.error("[useOAuthProviders] Failed to fetch providers:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { providers, isLoading };
}

// Need to import React for the hook above
import React from "react";
