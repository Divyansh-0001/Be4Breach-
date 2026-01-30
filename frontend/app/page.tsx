"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Cloud,
  Cpu,
  Globe,
  Lock,
  Shield,
  Target,
  Users,
  ChartPie,
  Layers,
  Radar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthProvider";

type LoginRole = "user" | "admin" | "sso";
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

const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
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

const loginTabs: { key: LoginRole; label: string; subtitle: string }[] = [
  { key: "user", label: "User", subtitle: "Security programs & training" },
  { key: "admin", label: "Admin", subtitle: "Governance & SOC oversight" },
  { key: "sso", label: "Google SSO", subtitle: "Enterprise single sign-on" },
];

const serviceCards = [
  {
    icon: Shield,
    title: "Managed Security",
    description:
      "24/7 monitoring, response, and threat intelligence with SOC coverage.",
  },
  {
    icon: Cpu,
    title: "AI Security",
    description: "Protect AI pipelines from adversarial and data threats.",
  },
  {
    icon: Target,
    title: "Red Teaming",
    description: "Simulated attacks to expose weaknesses before adversaries do.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "Continuous posture management across multi-cloud estates.",
  },
  {
    icon: Lock,
    title: "Privacy & Compliance",
    description: "GDPR, DPDP, ISO27001, and sectoral regulatory alignment.",
  },
  {
    icon: Activity,
    title: "Incident Response",
    description: "Rapid containment, recovery, and post-incident analysis.",
  },
];

const portfolioIcons = [Shield, Cloud, Activity, Target, Lock, Cpu];

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
  const [activeRole, setActiveRole] = useState<LoginRole>("user");
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
  const [aboutSummary, setAboutSummary] = useState(
    "Be4Breach is a cybersecurity company headquartered in Pune, India, focused on predicting threats and closing security gaps before they impact business operations.",
  );
  const [contactSummary, setContactSummary] = useState(
    "Contact: +91 9461915152 • contact@be4breach.com",
  );

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

  useEffect(() => {
    let isMounted = true;
    const loadContent = async () => {
      try {
        const [aboutResponse, contactResponse] = await Promise.all([
          fetch(`${apiBase}/about`, { cache: "no-store" }),
          fetch(`${apiBase}/contact`, { cache: "no-store" }),
        ]);
        if (aboutResponse.ok) {
          const aboutData = (await aboutResponse.json()) as {
            message?: string;
          };
          if (isMounted && aboutData?.message) {
            setAboutSummary(aboutData.message);
          }
        }
        if (contactResponse.ok) {
          const contactData = (await contactResponse.json()) as {
            message?: string;
          };
          if (isMounted && contactData?.message) {
            setContactSummary(contactData.message);
          }
        }
      } catch {
        // Keep defaults on network failure.
      }
    };

    loadContent();
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
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.2),transparent_55%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                className="text-5xl font-semibold leading-[1.05] text-white sm:text-6xl xl:text-7xl"
              >
                Be4Breach — Prevent Breaches Before They Happen
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-lg text-white/70"
              >
                Predictive cybersecurity services spanning AI security, red
                teaming, cloud posture, and managed SOC monitoring. Trusted by
                50+ global clients across 20+ countries for proactive defense.
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
                    onClick={() => setActiveRole(cta.role as LoginRole)}
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-red-500/20 via-transparent to-red-500/5 blur-2xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-black/70 p-8 shadow-[0_30px_80px_-40px_rgba(239,68,68,0.6)]">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Threat pulse
                  </p>
                  <Radar className="h-5 w-5 text-red-400" />
                </div>
                <div className="mt-6 grid gap-4">
                  {[
                    {
                      label: "Identify",
                      value: "Asset & risk visibility",
                      icon: Layers,
                    },
                    {
                      label: "Detect",
                      value: "Continuous monitoring",
                      icon: Activity,
                    },
                    {
                      label: "Respond",
                      value: "SOC & incident response",
                      icon: ChartPie,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20">
                            <Icon className="h-4 w-4 text-red-400" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {item.label}
                            </p>
                            <p className="text-xs text-white/60">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  CoE & SOC monitoring labs operational since 2023 with
                  enterprise-grade coverage.
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
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
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
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
              {aboutSummary}
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/70">
              Our vision is to become the most trusted cybersecurity partner by
              predicting threats early, scaling secure operations, and delivering
              measurable risk reduction across global enterprises.
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
            <motion.div
              variants={fadeUp}
              className="grid gap-4 md:grid-cols-2"
            >
              {[
                {
                  title: "Tailored engagement",
                  detail: "Personalized service for every environment.",
                  icon: Target,
                },
                {
                  title: "Dedicated support",
                  detail: "Hands-on experts embedded with your teams.",
                  icon: Users,
                },
                {
                  title: "Agile & scalable",
                  detail: "Solutions that grow with your business.",
                  icon: Shield,
                },
                {
                  title: "Trusted compliance",
                  detail: "CERT-IN empanelled for regulated industries.",
                  icon: Lock,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={hoverLift}
                    transition={hoverTransition}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20">
                        <Icon className="h-4 w-4 text-red-400" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/60">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-black to-black p-8"
            >
              <div className="absolute -right-12 top-10 h-32 w-32 rounded-full bg-red-500/20 blur-2xl" />
              <div className="absolute -left-10 bottom-6 h-24 w-24 rounded-full bg-red-500/10 blur-2xl" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Trust & security
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Predict threats. Close gaps. Strengthen resilience.
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Our specialists blend threat intelligence, AI, and red teaming
                to surface exposures before attackers can exploit them.
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  "CERT-IN empanelled with regulated industry expertise.",
                  "100+ engagements delivered across global clients.",
                  "12+ ecosystem partners across solutions and academia.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <Globe className="mt-1 h-4 w-4 text-red-400" />
                    <p className="text-sm text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={hoverLift}
              transition={hoverTransition}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Security map
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                  <Radar className="h-5 w-5 text-red-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Multi-domain coverage
                  </p>
                  <p className="text-xs text-white/60">
                    Identify, Protect, Detect, Respond & Recover.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/70">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <span>Governance & Compliance</span>
                  <span className="text-white/50">98%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <span>Threat Monitoring</span>
                  <span className="text-white/50">94%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <span>Incident Readiness</span>
                  <span className="text-white/50">92%</span>
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => {
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
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-black/60 to-black p-6 shadow-[0_25px_60px_-45px_rgba(239,68,68,0.6)] transition hover:shadow-[0_35px_80px_-50px_rgba(239,68,68,0.7)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                      <Icon className="h-5 w-5 text-red-400" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white/70">
                    {service.description}
                  </p>
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
            ).map((service, index) => {
              const Icon = portfolioIcons[index % portfolioIcons.length];
              return (
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
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20">
                      <Icon className="h-4 w-4 text-red-400" />
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {service.name}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
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
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Login portal
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Choose your role to continue
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loginTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveRole(tab.key)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        activeRole === tab.key
                          ? "bg-red-500 text-white"
                          : "border border-white/20 text-white/70 hover:border-red-400"
                      }`}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/60">
                {loginTabs.find((tab) => tab.key === activeRole)?.subtitle}
              </div>
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {activeRole === "user" && (
                    <motion.form
                      key="user"
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onSubmit={handleUserSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-red-400" />
                        <h3 className="text-lg font-semibold text-white">
                          User Login
                        </h3>
                      </div>
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
                        required
                      />
                      <motion.button
                        className="flex w-full items-center justify-center rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                          className={`text-xs ${
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
                  )}
                  {activeRole === "admin" && (
                    <motion.form
                      key="admin"
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onSubmit={handleAdminSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-red-400" />
                        <h3 className="text-lg font-semibold text-white">
                          Admin Login
                        </h3>
                      </div>
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
                        required
                      />
                      <motion.button
                        className="flex w-full items-center justify-center rounded-xl border border-red-400 bg-transparent py-3 text-sm font-semibold text-white transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                          className={`text-xs ${
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
                  )}
                  {activeRole === "sso" && (
                    <motion.form
                      key="sso"
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onSubmit={handleSsoSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-red-400" />
                        <h3 className="text-lg font-semibold text-white">
                          Google SSO
                        </h3>
                      </div>
                      <textarea
                        className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                        placeholder="Paste Google ID token"
                        value={ssoToken}
                        onChange={(event) => setSsoToken(event.target.value)}
                        required
                      />
                      <motion.button
                        className="flex w-full items-center justify-center rounded-xl bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={ssoLoading}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={hoverTransition}
                      >
                        {ssoLoading ? "Verifying..." : "Verify token"}
                      </motion.button>
                      <motion.a
                        className="flex w-full items-center justify-center rounded-xl border border-white/20 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-red-400 hover:text-white"
                        href={`${apiBase}/google/login`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={hoverTransition}
                      >
                        Start Google OAuth
                      </motion.a>
                      {ssoStatus && (
                        <p
                          className={`text-xs ${
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
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="rounded-[32px] border border-white/10 bg-gradient-to-br from-black via-black/70 to-red-500/10 p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Secure access
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Modern authentication with role-based protection
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Shield className="mt-1 h-4 w-4 text-red-400" />
                  JWT-secured sessions with strict role enforcement.
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-4 w-4 text-red-400" />
                  Google SSO integration for enterprise-ready access.
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="mt-1 h-4 w-4 text-red-400" />
                  Continuous monitoring and SOC escalation.
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                {contactSummary}
              </div>
            </motion.div>
          </div>
          <p className="text-xs text-white/50">
            Use HTTPS in production and store tokens securely.
          </p>
        </div>
      </section>
    </main>
  );
}
