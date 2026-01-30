"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cloud,
  Cpu,
  Globe,
  Lock,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthProvider";

type LoginStatus = { type: "success" | "error"; message: string } | null;
type ServiceItem = { id: string; name: string; description: string };

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const hoverLift = { y: -6 };
const hoverTransition = { type: "spring", stiffness: 300, damping: 20 };

const stats = [
  { value: "25+", label: "Top security specialists" },
  { value: "50+", label: "Global clients" },
  { value: "100+", label: "Engagements delivered" },
  { value: "20+", label: "Countries served" },
  { value: "12+", label: "Partner ecosystem" },
];

const serviceHighlights = [
  {
    title: "Next-Gen Services",
    icon: Cpu,
    items: [
      "AI Security",
      "Cloud Security",
      "Kubernetes & Container Security",
      "Blockchain Security",
      "OT-IoT Security",
    ],
  },
  {
    title: "Proactive Services",
    icon: Shield,
    items: [
      "Penetration Testing & Red Teaming",
      "Risk Assessment & Management",
      "Security Awareness Training",
      "Security Architecture Design",
    ],
  },
  {
    title: "Active Services",
    icon: Activity,
    items: [
      "vCISO & SOC Monitoring",
      "DevSecOps Integrations",
      "Vulnerability Management",
      "Threat Hunting & SIEM",
    ],
  },
  {
    title: "Reactive Services",
    icon: Cloud,
    items: [
      "Incident Response",
      "Disaster Recovery",
      "Ransomware Negotiation",
      "Post-Incident Analysis",
    ],
  },
];

const journey = [
  {
    year: "2021",
    title: "Company inception",
    detail: "Initial services launch and first major client.",
  },
  {
    year: "2023",
    title: "CoE & SOC monitoring labs",
    detail: "Next-gen services and major projects.",
  },
  {
    year: "2024",
    title: "Global recognition",
    detail: "Strategic partnerships and community engagement.",
  },
  {
    year: "2025",
    title: "CERT-IN empanelled",
    detail: "Expansion to global markets and AI automation.",
  },
];

const successStories = [
  {
    title: "Red Teaming for global finance",
    detail:
      "Adversary simulations uncovered critical gaps and improved response readiness.",
  },
  {
    title: "AI penetration testing",
    detail:
      "Resilience improvements for a recommendation engine in Dubai.",
  },
  {
    title: "GDPR audit & cloud security",
    detail:
      "Compliance roadmap and multi-cloud hardening for healthcare and SaaS.",
  },
];

const fallbackPortfolio: ServiceItem[] = [
  {
    id: "vulnerability",
    name: "Vulnerability Management",
    description: "Continuous testing, remediation, and risk prioritization.",
  },
  {
    id: "incident",
    name: "Incident Response",
    description: "Rapid containment and recovery playbooks.",
  },
  {
    id: "privacy",
    name: "Privacy & Compliance",
    description: "Framework alignment across GDPR, DPDP, ISO27001.",
  },
];

const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [activeRole, setActiveRole] = useState<
    "user" | "admin" | "sso" | null
  >(null);
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [ssoToken, setSsoToken] = useState("");
  const [userStatus, setUserStatus] = useState<LoginStatus>(null);
  const [adminStatus, setAdminStatus] = useState<LoginStatus>(null);
  const [ssoStatus, setSsoStatus] = useState<LoginStatus>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [publicServices, setPublicServices] = useState<ServiceItem[]>([]);
  const [publicServicesError, setPublicServicesError] = useState<string | null>(
    null,
  );
  const [publicServicesLoading, setPublicServicesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadServices = async () => {
      try {
        const response = await fetch(`${apiBase}/services`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Service request failed");
        }
        const data = (await response.json()) as ServiceItem[];
        if (isMounted) {
          setPublicServices(data);
          setPublicServicesError(null);
        }
      } catch {
        if (isMounted) {
          setPublicServicesError(
            "Live service portfolio unavailable. Showing curated highlights.",
          );
        }
      } finally {
        if (isMounted) {
          setPublicServicesLoading(false);
        }
      }
    };

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const submitLogin = async (
    endpoint: string,
    payload: unknown,
    setStatus: (status: LoginStatus) => void,
    setLoading: (value: boolean) => void,
    successMessage: string,
    redirectPath: string,
  ) => {
    setStatus(null);
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus({
          type: "error",
          message: data?.detail || "Authentication failed. Check your details.",
        });
        return;
      }
      if (!data?.access_token || !data?.role) {
        setStatus({
          type: "error",
          message: "Unexpected response from the authentication service.",
        });
        return;
      }
      login(data.access_token, data.role);
      setStatus({ type: "success", message: successMessage });
      router.push(redirectPath);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to reach the backend. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(userForm.email)) {
      setUserStatus({ type: "error", message: "Enter a valid email." });
      return;
    }
    if (userForm.password.length < 8 || userForm.password.length > 72) {
      setUserStatus({
        type: "error",
        message: "Password must be 8-72 characters.",
      });
      return;
    }
    await submitLogin(
      "/login/user",
      userForm,
      setUserStatus,
      setUserLoading,
      "User token issued successfully.",
      "/user",
    );
  };

  const handleAdminSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(adminForm.email)) {
      setAdminStatus({ type: "error", message: "Enter a valid email." });
      return;
    }
    if (adminForm.password.length < 8 || adminForm.password.length > 72) {
      setAdminStatus({
        type: "error",
        message: "Password must be 8-72 characters.",
      });
      return;
    }
    await submitLogin(
      "/login/admin",
      adminForm,
      setAdminStatus,
      setAdminLoading,
      "Admin token issued successfully.",
      "/admin",
    );
  };

  const handleSsoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ssoToken.trim().length < 10) {
      setSsoStatus({
        type: "error",
        message: "Paste a valid Google ID token.",
      });
      return;
    }
    await submitLogin(
      "/login/sso",
      { id_token: ssoToken.trim() },
      setSsoStatus,
      setSsoLoading,
      "SSO token validated successfully.",
      "/user",
    );
  };

  return (
    <main className="bg-black">
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70"
            >
              <Shield className="h-4 w-4 text-red-400" />
              CERT-IN Empanelled • Pune, India
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold leading-tight text-white md:text-6xl"
            >
              Be4Breach — Prevent Breaches Before They Happen
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg text-white/70"
            >
              We predict threats and close security gaps ahead of time with AI-
              driven assessments, hands-on red teaming, and continuous
              monitoring. Trusted by 50+ global clients across 20+ countries.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
            >
              {[
                { label: "User Login", role: "user", variant: "primary" },
                { label: "Admin Login", role: "admin", variant: "outline" },
                { label: "Google SSO", role: "sso", variant: "ghost" },
              ].map((cta) => (
                <motion.a
                  key={cta.label}
                  href="#login"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setActiveRole(
                      cta.role as "user" | "admin" | "sso",
                    )
                  }
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                    cta.variant === "primary"
                      ? "bg-red-500 text-white hover:bg-red-400"
                      : cta.variant === "outline"
                        ? "border border-white/30 text-white hover:border-red-400"
                        : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {cta.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid gap-6 md:grid-cols-5"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={hoverLift}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-t border-white/10 bg-black/95"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold text-white"
            >
              Built for trust, resilience, and measurable outcomes
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70">
              Be4Breach is a young, ambitious cybersecurity company headquartered
              in Pune, India. Our differentiation comes from deep ecosystem
              understanding and the ability to predict threats before they
              materialize. We align with global frameworks such as GDPR, DPDP,
              ISO27001, NIST, and SEBI/RBI guidance.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="grid gap-4 md:grid-cols-2"
            >
              {journey.map((item) => (
                <motion.div
                  key={item.year}
                  whileHover={hoverLift}
                  transition={hoverTransition}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                    {item.year}
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-white/60">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                Why choose us
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Target className="mt-1 h-4 w-4 text-red-400" />
                  Tailored, personalized service for every engagement.
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-1 h-4 w-4 text-red-400" />
                  Dedicated, hands-on security support teams.
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="mt-1 h-4 w-4 text-red-400" />
                  Agile, scalable solutions backed by CoE & SOC labs.
                </li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                Trust signals
              </p>
              <div className="mt-4 grid gap-4 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <Lock className="mt-1 h-4 w-4 text-red-400" />
                  CERT-IN empanelled with a focus on regulated industries.
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-1 h-4 w-4 text-red-400" />
                  100+ clients served across 20+ countries with global delivery.
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-1 h-4 w-4 text-red-400" />
                  12+ partners across solution, community, and academic networks.
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 border-t border-white/10 bg-black"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-4"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold text-white"
            >
              Security services that cover the full lifecycle
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70">
              From identifying critical assets to responding and recovering from
              incidents, our teams deliver end-to-end cybersecurity consulting
              and managed services.
            </motion.p>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceHighlights.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  whileHover={hoverLift}
                  whileTap={{ scale: 0.98 }}
                  transition={hoverTransition}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20">
                      <Icon className="h-4 w-4 text-red-400" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-white/70 md:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2"
          >
            {successStories.map((story) => (
              <motion.div
                key={story.title}
                variants={fadeUp}
                whileHover={hoverLift}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold text-white">
                  {story.title}
                </p>
                <p className="mt-2 text-sm text-white/60">{story.detail}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-4"
          >
            <motion.h3
              variants={fadeUp}
              className="text-xl font-semibold text-white"
            >
              Live service portfolio
            </motion.h3>
            <motion.p variants={fadeUp} className="text-sm text-white/60">
              Pulled from the Be4Breach API to verify frontend-backend
              connectivity.
            </motion.p>
            {publicServicesError && (
              <motion.p variants={fadeUp} className="text-xs text-red-300">
                {publicServicesError}
              </motion.p>
            )}
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {(publicServicesLoading
              ? fallbackPortfolio
              : publicServices.length > 0
                ? publicServices
                : fallbackPortfolio
            ).map((service) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                whileHover={hoverLift}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold text-white">
                  {service.name}
                </p>
                <p className="mt-2 text-sm text-white/60">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="login"
        className="scroll-mt-24 border-t border-white/10 bg-black/95"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-3"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold text-white"
            >
              Secure access for every role
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70">
              Sign in securely to access services and dashboards. Use Google SSO
              for streamlined access or role-based credentials for secure
              control.
            </motion.p>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              onSubmit={handleUserSubmit}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${
                activeRole === "user" ? "ring-1 ring-red-400" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">User Login</h3>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Access services, training, and reports.
              </p>
              <div className="mt-5 space-y-4">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  type="email"
                  placeholder="Email address"
                  value={userForm.email}
                  onChange={(event) =>
                    setUserForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  onFocus={() => setActiveRole("user")}
                  required
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  type="password"
                  placeholder="Password"
                  minLength={8}
                  maxLength={72}
                  value={userForm.password}
                  onChange={(event) =>
                    setUserForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  onFocus={() => setActiveRole("user")}
                  required
                />
              </div>
              <motion.button
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={userLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
              >
                {userLoading ? "Signing in..." : "Sign in as user"}
              </motion.button>
              {userStatus && (
                <p
                  className={`mt-3 text-xs ${
                    userStatus.type === "success"
                      ? "text-emerald-400"
                      : "text-red-300"
                  }`}
                  role="status"
                >
                  {userStatus.message}
                </p>
              )}
            </motion.form>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              onSubmit={handleAdminSubmit}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${
                activeRole === "admin" ? "ring-1 ring-red-400" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">
                  Admin Login
                </h3>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Manage services, incidents, and compliance.
              </p>
              <div className="mt-5 space-y-4">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  type="email"
                  placeholder="Admin email"
                  value={adminForm.email}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  onFocus={() => setActiveRole("admin")}
                  required
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  type="password"
                  placeholder="Password"
                  minLength={8}
                  maxLength={72}
                  value={adminForm.password}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  onFocus={() => setActiveRole("admin")}
                  required
                />
              </div>
              <motion.button
                className="mt-5 flex w-full items-center justify-center rounded-xl border border-red-400 bg-transparent py-3 text-sm font-semibold text-white transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={adminLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
              >
                {adminLoading ? "Signing in..." : "Sign in as admin"}
              </motion.button>
              {adminStatus && (
                <p
                  className={`mt-3 text-xs ${
                    adminStatus.type === "success"
                      ? "text-emerald-400"
                      : "text-red-300"
                  }`}
                  role="status"
                >
                  {adminStatus.message}
                </p>
              )}
            </motion.form>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              onSubmit={handleSsoSubmit}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${
                activeRole === "sso" ? "ring-1 ring-red-400" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">
                  Google SSO
                </h3>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Paste a Google ID token or launch OAuth with the backend.
              </p>
              <div className="mt-5 space-y-4">
                <textarea
                  className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  placeholder="Paste Google ID token"
                  value={ssoToken}
                  onChange={(event) => setSsoToken(event.target.value)}
                  onFocus={() => setActiveRole("sso")}
                  required
                />
              </div>
              <motion.button
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={ssoLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
              >
                {ssoLoading ? "Verifying..." : "Verify token"}
              </motion.button>
              <motion.a
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/20 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-red-400 hover:text-white"
                href={`${apiBase}/google/login`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
              >
                Start Google OAuth
              </motion.a>
              {ssoStatus && (
                <p
                  className={`mt-3 text-xs ${
                    ssoStatus.type === "success"
                      ? "text-emerald-400"
                      : "text-red-300"
                  }`}
                  role="status"
                >
                  {ssoStatus.message}
                </p>
              )}
            </motion.form>
          </div>
          <p className="text-xs text-white/50">
            Use HTTPS in production and store tokens securely.
          </p>
        </div>
      </section>
    </main>
  );
}
