"use client";

import { useEffect, useRef, useState } from "react";

import type { AuthRole, AuthSession } from "../../lib/auth";
import { loginWithGoogleIdToken } from "../../lib/auth-api";

type GoogleSSOButtonProps = {
  role: AuthRole;
  onSuccess: (session: AuthSession) => void;
  onError: (message: string) => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: string;
              size: string;
              text: string;
              shape: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export default function GoogleSSOButton({
  role,
  onSuccess,
  onError,
}: GoogleSSOButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      setStatus("error");
      return;
    }

    let isMounted = true;
    const renderButton = () => {
      if (!window.google || !containerRef.current) {
        return;
      }

      containerRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            const session = await loginWithGoogleIdToken(
              response.credential,
              role
            );
            onSuccess(session);
          } catch (error) {
            onError("Google sign-in failed. Please try again.");
          }
        },
      });
      window.google.accounts.id.renderButton(containerRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
      });
      setStatus("ready");
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existingScript?.dataset.loaded === "true") {
      renderButton();
      return;
    }

    setStatus("loading");
    const script = existingScript ?? document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.loaded = "false";
    script.onload = () => {
      script.dataset.loaded = "true";
      if (isMounted) {
        renderButton();
      }
    };
    script.onerror = () => {
      if (isMounted) {
        setStatus("error");
      }
    };

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
  }, [clientId, role, onError, onSuccess]);

  if (!clientId) {
    return (
      <div className="rounded-full border border-white/10 px-4 py-3 text-center text-xs text-slate-400">
        Google SSO is not configured yet.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div ref={containerRef} className="flex justify-center" />
      {status === "loading" ? (
        <p className="text-xs text-slate-500">Loading Google sign-in...</p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-rose-300">
          Unable to load Google SSO at the moment.
        </p>
      ) : null}
    </div>
  );
}
