"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "../../components/auth/AuthProvider";
import RoleGuard from "../../components/auth/RoleGuard";

type DashboardSummary = {
  role: string;
  welcome: string;
  highlights: string[];
};

type ServiceItem = {
  id: string;
  name: string;
  description: string;
};

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const hoverLift = { y: -6 };
const hoverTransition = { type: "spring", stiffness: 300, damping: 20 };

export default function UserDashboard() {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth?.token || auth.role !== "user") {
      return;
    }

    const fetchDashboard = async () => {
      try {
        setError(null);
        const [summaryResponse, servicesResponse] = await Promise.all([
          fetch(`${apiBase}/user/dashboard`, {
            headers: { Authorization: `Bearer ${auth.token}` },
            cache: "no-store",
          }),
          fetch(`${apiBase}/user/services`, {
            headers: { Authorization: `Bearer ${auth.token}` },
            cache: "no-store",
          }),
        ]);

        if (!summaryResponse.ok || !servicesResponse.ok) {
          if (
            summaryResponse.status === 401 ||
            summaryResponse.status === 403 ||
            servicesResponse.status === 401 ||
            servicesResponse.status === 403
          ) {
            logout();
            setError("Session expired. Please log in again.");
            return;
          }
          setError("Unable to load user data.");
          return;
        }

        const summaryData = (await summaryResponse.json()) as DashboardSummary;
        const servicesData = (await servicesResponse.json()) as ServiceItem[];
        setSummary(summaryData);
        setServices(servicesData);
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
    <RoleGuard role="user">
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
                User dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Secure services hub
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
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              whileHover={hoverLift}
              transition={hoverTransition}
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-red-400" />
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
            </motion.div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              whileHover={hoverLift}
              transition={hoverTransition}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-semibold text-white">
                  Your coverage
                </h2>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Stay informed on assessments, security posture, and training
                progress in one place.
              </p>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              whileHover={hoverLift}
              transition={hoverTransition}
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-semibold text-white">
                  Recommended services
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {services.length === 0 && (
                  <li>Loading service recommendations...</li>
                )}
                {services.map((service) => (
                  <li key={service.id}>
                    <p className="font-semibold text-white">{service.name}</p>
                    <p className="text-xs text-white/60">
                      {service.description}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
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
