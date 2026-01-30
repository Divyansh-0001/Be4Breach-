"use client";

import { motion } from "framer-motion";
import { Bell, Shield, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "../../components/auth/AuthProvider";
import RoleGuard from "../../components/auth/RoleGuard";

type DashboardSummary = {
  role: string;
  welcome: string;
  highlights: string[];
};

type MessageResponse = {
  message: string;
};

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function AdminDashboard() {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [alerts, setAlerts] = useState<MessageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth?.token || auth.role !== "admin") {
      return;
    }

    const fetchDashboard = async () => {
      try {
        setError(null);
        const [summaryResponse, alertsResponse] = await Promise.all([
          fetch(`${apiBase}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
          fetch(`${apiBase}/admin/alerts`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
        ]);

        if (!summaryResponse.ok || !alertsResponse.ok) {
          if (
            summaryResponse.status === 401 ||
            summaryResponse.status === 403 ||
            alertsResponse.status === 401 ||
            alertsResponse.status === 403
          ) {
            logout();
            setError("Session expired. Please log in again.");
            return;
          }
          setError("Unable to load admin data.");
          return;
        }

        const summaryData = (await summaryResponse.json()) as DashboardSummary;
        const alertsData = (await alertsResponse.json()) as MessageResponse;
        setSummary(summaryData);
        setAlerts(alertsData);
      } catch {
        setError("Unable to reach the backend.");
      }
    };

    fetchDashboard();
  }, [auth, logout]);

  const handleLogout = () => {
    logout();
    router.replace("/#login");
  };

  return (
    <RoleGuard role="admin">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Admin dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Security command center
              </h1>
            </div>
            <button
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {summary && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <UserCog className="h-5 w-5 text-red-400" />
                <p className="text-lg font-semibold text-white">
                  {summary.welcome}
                </p>
              </div>
              <ul className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-3">
                {summary.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-semibold text-white">
                  Operational focus
                </h2>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Manage compliance programs, review threat intelligence, and
                coordinate incident response across teams and partners.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 px-3 py-1">
                  GRC & Compliance
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  SOC Monitoring
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  Partner Oversight
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-semibold text-white">
                  Alerts & response
                </h2>
              </div>
              <p className="mt-3 text-sm text-white/70">
                {alerts?.message ?? "Loading alerts..."}
              </p>
              <p className="mt-4 text-xs text-white/50">
                All alerts are monitored by the Be4Breach SOC.
              </p>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-300" role="status">
              {error}
            </p>
          )}
        </motion.div>
      </div>
    </RoleGuard>
  );
}
