"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { backendUrl } from "@/lib/config";

export type Role = "user" | "admin" | null;

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error";

type AuthContextValue = {
  role: Role;
  token: string | null;
  status: AuthStatus;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: (credential: string) => Promise<boolean>;
  logout: () => void;
  refresh: () => Promise<void>;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type StoredAuth = {
  token: string;
  role: Role;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "be4breach_auth";

const getStoredAuth = (): StoredAuth | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as StoredAuth;
    if (!parsed?.token) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const setStoredAuth = (auth: StoredAuth | null) => {
  if (typeof window === "undefined") {
    return;
  }
  if (!auth) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
};

const buildHeaders = (token?: string | null) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const stored = getStoredAuth();
    if (!stored?.token) {
      setRole(null);
      setToken(null);
      setStatus("unauthenticated");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(new URL("/me", backendUrl), {
        method: "GET",
        headers: buildHeaders(stored.token),
      });

      if (!response.ok) {
        throw new Error("Unable to verify session.");
      }

      const payload = (await response.json()) as {
        role?: Role;
        token?: string;
        username?: string;
      };

      const resolvedToken = payload.token ?? stored.token;
      const resolvedRole = payload.role ?? stored.role ?? null;

      setRole(resolvedRole);
      setToken(resolvedToken);
      setStatus("authenticated");
      setStoredAuth({ token: resolvedToken, role: resolvedRole });
      setError(null);
    } catch (caught) {
      setRole(null);
      setToken(null);
      setStatus("unauthenticated");
      setStoredAuth(null);
      const message =
        caught instanceof Error ? caught.message : "Unable to verify session.";
      setError(message);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (username: string, password: string) => {
    setStatus("loading");
    setError(null);
    try {
      const response = await fetch(new URL("/login", backendUrl), {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Check your credentials.");
      }

      const payload = (await response.json()) as {
        access_token: string;
        role: Role;
      };

      setToken(payload.access_token);
      setRole(payload.role ?? null);
      setStatus("authenticated");
      setStoredAuth({ token: payload.access_token, role: payload.role ?? null });
      return true;
    } catch (caught) {
      setStatus("error");
      const message =
        caught instanceof Error ? caught.message : "Login failed.";
      setError(message);
      return false;
    }
  }, []);

  const loginWithGoogle = useCallback(async (credential: string) => {
    setStatus("loading");
    setError(null);
    try {
      const response = await fetch(new URL("/auth/google", backendUrl), {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        throw new Error("Google SSO failed. Try again.");
      }

      const payload = (await response.json()) as {
        access_token: string;
        role: Role;
      };

      setToken(payload.access_token);
      setRole(payload.role ?? null);
      setStatus("authenticated");
      setStoredAuth({ token: payload.access_token, role: payload.role ?? null });
      return true;
    } catch (caught) {
      setStatus("error");
      const message =
        caught instanceof Error ? caught.message : "Google SSO failed.";
      setError(message);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    setToken(null);
    setStatus("unauthenticated");
    setError(null);
    setStoredAuth(null);
  }, []);

  const authFetch = useCallback(
    (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      const storedToken = token ?? getStoredAuth()?.token ?? null;
      if (storedToken) {
        headers.set("Authorization", `Bearer ${storedToken}`);
      }
      return fetch(input, { ...init, headers });
    },
    [token]
  );

  const value = useMemo(
    () => ({
      role,
      token,
      status,
      error,
      login,
      loginWithGoogle,
      logout,
      refresh,
      authFetch,
    }),
    [role, token, status, error, login, loginWithGoogle, logout, refresh, authFetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useRole = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
};
