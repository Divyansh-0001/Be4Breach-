"use client";

import { useEffect, useState } from "react";

import AnimatedButton from "../../../components/ui/animated-button";
import AnimatedCard from "../../../components/ui/animated-card";
import AnimatedSection from "../../../components/ui/animated-section";
import RoleGuard from "../../../components/auth/role-guard";
import { fetchJson } from "../../../lib/api";

type UserDashboardSummary = {
  alerts?: number;
  complianceScore?: number;
  monitoringStatus?: string;
};

const quickLinks = [
  { title: "Incident status", detail: "Review open and resolved incidents." },
  { title: "Compliance readiness", detail: "Track GDPR, ISO, and NIST goals." },
  { title: "Security reports", detail: "Download executive summaries." },
];

export default function UserDashboardPage() {
  const [summary, setSummary] = useState<UserDashboardSummary | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");

  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    fetchJson<UserDashboardSummary>("/api/v1/dashboard/user/summary")
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (isMounted) {
          setSummary(null);
          setStatus("idle");
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RoleGuard role="User">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          User Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Welcome back to your Be4Breach security overview.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-slate-300">
          This workspace will surface risk insights, compliance progress, and
          proactive recommendations once the backend data feeds are connected.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <AnimatedButton href="/services" variant="ghost">
            Review services
          </AnimatedButton>
          <AnimatedButton href="/contact" variant="primary">
            Request an update
          </AnimatedButton>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedCard>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Open alerts
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {summary?.alerts ?? "--"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {status === "loading"
                ? "Syncing alert data..."
                : "Awaiting live feed integration."}
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
                : "Ready to ingest audit metrics."}
            </p>
          </AnimatedCard>
          <AnimatedCard>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Monitoring status
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {summary?.monitoringStatus ?? "Standby"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              SOC feed will populate when connected.
            </p>
          </AnimatedCard>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quickLinks.map((link) => (
            <AnimatedCard key={link.title} className="h-full">
              <h2 className="text-lg font-semibold text-white">{link.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{link.detail}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>
    </RoleGuard>
  );
}
