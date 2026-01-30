"use client";

import { useEffect, useState } from "react";

import AnimatedButton from "../../../components/ui/animated-button";
import AnimatedCard from "../../../components/ui/animated-card";
import AnimatedSection from "../../../components/ui/animated-section";
import RoleGuard from "../../../components/auth/role-guard";
import { ApiError, fetchJson } from "../../../lib/api";
import { clearSession } from "../../../lib/auth";

type AdminDashboardSummary = {
  incidents?: number;
  complianceScore?: number;
  activeClients?: number;
};

const adminActions = [
  {
    title: "Governance workflows",
    detail: "Manage compliance, audits, and policy updates.",
  },
  {
    title: "SOC operations",
    detail: "Review real-time monitoring and escalation paths.",
  },
  {
    title: "Client portfolio",
    detail: "Track engagement health and service delivery metrics.",
  },
];

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    fetchJson<AdminDashboardSummary>("/api/v1/dashboard/admin/summary")
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setStatus("ready");
          setErrorMessage("");
        }
      })
      .catch((error) => {
        if (isMounted) {
          if (error instanceof ApiError && error.status >= 401) {
            clearSession();
            setErrorMessage(
              "Your admin session has expired. Please sign in again."
            );
          } else {
            setErrorMessage("Unable to load dashboard data at the moment.");
          }
          setSummary(null);
          setStatus("idle");
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RoleGuard role="Admin">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Admin Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Security leadership command center.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-slate-300">
          Monitor enterprise-wide risk posture, compliance readiness, and SOC
          operations. This dashboard is prepared to connect with live backend
          insights once authentication and data services are enabled.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <AnimatedButton href="/services" variant="ghost">
            Review service catalog
          </AnimatedButton>
          <AnimatedButton href="/contact" variant="primary">
            Schedule leadership briefing
          </AnimatedButton>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        {errorMessage ? (
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            {errorMessage}
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedCard>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Active incidents
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {summary?.incidents ?? "--"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {status === "loading"
                ? "Syncing incident data..."
                : "Awaiting SOC telemetry integration."}
            </p>
          </AnimatedCard>
          <AnimatedCard>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Compliance score
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {summary?.complianceScore ? `${summary.complianceScore}%` : "--"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {status === "ready"
                ? "Updated from backend API."
                : "Awaiting governance metrics."}
            </p>
          </AnimatedCard>
          <AnimatedCard>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Active clients
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {summary?.activeClients ?? "--"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Real-time client insights queued.
            </p>
          </AnimatedCard>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {adminActions.map((action) => (
            <AnimatedCard key={action.title} className="h-full">
              <h2 className="text-lg font-semibold text-white">
                {action.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{action.detail}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </RoleGuard>
  );
}
