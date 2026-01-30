"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "user" | "admin";

type AuthState = {
  token: string;
  role: Role;
  subject?: string;
  expiresAt?: number;
} | null;

type AuthContextValue = {
  auth: AuthState;
  isLoading: boolean;
  login: (token: string, role: Role) => void;
  logout: () => void;
};

const STORAGE_KEY = "be4breach.auth";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type JwtPayload = {
  sub?: string;
  role?: Role;
  exp?: number;
};

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    return decoded;
  } catch {
    return null;
  }
};

const readStoredAuth = (): AuthState => {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    const parsed = JSON.parse(stored) as AuthState;
    if (!parsed?.token || !parsed?.role) {
      return null;
    }
    const payload = decodeJwt(parsed.token);
    if (payload?.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    return {
      token: parsed.token,
      role: parsed.role,
      subject: payload?.sub,
      expiresAt: payload?.exp ? payload.exp * 1000 : undefined,
    };
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existing = readStoredAuth();
    if (!existing) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setAuth(existing);
    setIsLoading(false);
  }, []);

  const login = (token: string, role: Role) => {
    const payload = decodeJwt(token);
    const nextAuth: AuthState = {
      token,
      role,
      subject: payload?.sub,
      expiresAt: payload?.exp ? payload.exp * 1000 : undefined,
    };
    setAuth(nextAuth);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    }
  };

  const logout = () => {
    setAuth(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      auth,
      isLoading,
      login,
      logout,
    }),
    [auth, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
