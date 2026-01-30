"use client";

import { useCallback, useEffect, useState } from "react";

import { backendUrl } from "@/lib/config";

type InfoData = {
  name: string;
  description: string;
};

type LoadState = "idle" | "loading" | "success" | "error";

export default function InfoPanel() {
  const [state, setState] = useState<LoadState>("idle");
  const [data, setData] = useState<InfoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadInfo = useCallback(async (signal?: AbortSignal) => {
    setState("loading");
    setError(null);
    setData(null);

    try {
      const response = await fetch(new URL("/api/info", backendUrl), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = (await response.json()) as Partial<InfoData>;
      setData({
        name: payload.name ?? "Be4Breach",
        description: payload.description ?? "No description available.",
      });
      setState("success");
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") {
        return;
      }
      const message =
        caught instanceof Error
          ? caught.message
          : "Unable to reach the backend.";
      setError(message);
      setState("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadInfo(controller.signal);
    return () => controller.abort();
  }, [loadInfo]);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        Backend status
      </p>
      <div className="mt-2 space-y-2">
        {state === "loading" && <p>Loading backend info…</p>}
        {state === "error" && (
          <div className="space-y-2">
            <p className="text-rose-400">Backend unavailable.</p>
            <p className="text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => void loadInfo()}
              className="rounded border border-white/20 px-3 py-1 text-xs font-medium text-white"
            >
              Retry
            </button>
          </div>
        )}
        {state === "success" && data && (
          <div className="space-y-1">
            <p className="font-medium text-white">{data.name}</p>
            <p>{data.description}</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        API source: <span className="text-slate-300">{backendUrl}</span>
      </p>
    </div>
  );
}
