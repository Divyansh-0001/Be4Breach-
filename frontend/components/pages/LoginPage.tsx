"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { motion } from "framer-motion";

import { useRole } from "@/hooks/useRole";

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: Record<string, string | number | boolean>
          ) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, role, status, error } = useRole();
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  useEffect(() => {
    if (status === "authenticated") {
      if (role === "admin") {
        router.replace("/admin");
      } else if (role === "user") {
        router.replace("/user");
      } else {
        router.replace("/");
      }
    }
  }, [status, role, router]);

  useEffect(() => {
    if (!googleClientId || !googleReady) {
      return;
    }
    if (!window.google?.accounts?.id) {
      return;
    }
    const container = document.getElementById("google-signin-button");
    if (!container) {
      return;
    }
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async (response) => {
        if (!response.credential) {
          setLocalError("Google login failed. No credential returned.");
          return;
        }
        const success = await loginWithGoogle(response.credential);
        if (!success) {
          setLocalError("Google login failed. Please try again.");
        }
      },
    });
    window.google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "pill",
      width: 320,
    });
  }, [googleClientId, googleReady, loginWithGoogle]);

  const helperText = useMemo(() => {
    return loginType === "admin"
      ? "Use admin credentials provided by your Be4Breach workspace."
      : "Use your assigned user credentials for secure access.";
  }, [loginType]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    if (!username || !password) {
      setLocalError("Enter both username and password.");
      return;
    }
    const success = await login(username, password);
    if (!success) {
      setLocalError("Login failed. Please verify your credentials.");
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => setGoogleReady(true)}
      />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              Secure access
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Sign in to Be4Breach
            </h1>
            <p className="text-base text-slate-300">
              Authenticate with your assigned role to access personalized
              dashboards and secure workflows.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Login type
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["user", "admin"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLoginType(type)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    loginType === type
                      ? "border-sky-400 text-white"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {type} login
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300">{helperText}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Google SSO
            </p>
            <div className="mt-4 space-y-3">
              <div id="google-signin-button" />
              {!googleClientId && (
                <p className="text-xs text-slate-400">
                  Set NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in.
                </p>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-white">
            Role-based login
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Sign in with your username and password to access role-specific
            dashboards.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="your.username"
                autoComplete="username"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>
            {(localError || error) && (
              <p className="text-sm text-rose-400">
                {localError ?? error}
              </p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950"
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
