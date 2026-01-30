"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import AnimatedSection from "@/components/AnimatedSection";
import InfoPanel from "@/components/InfoPanel";

const heroStats = [
  { label: "Automated playbooks", value: "45+" },
  { label: "Mean time to respond", value: "< 30 min" },
  { label: "Visibility coverage", value: "Cloud + endpoint" },
];

const services = [
  {
    title: "Threat surface intelligence",
    description:
      "Map your exposed assets, prioritize critical risks, and track change in real time.",
    highlights: [
      "Asset discovery",
      "Exposure scoring",
      "Continuous alerts",
    ],
  },
  {
    title: "Breach readiness drills",
    description:
      "Simulate real attack paths so teams can rehearse decisions before it matters.",
    highlights: ["Scenario library", "Role-based runbooks", "Action reviews"],
  },
  {
    title: "Incident response automation",
    description:
      "Streamline triage and containment with guided workflows and rapid evidence capture.",
    highlights: ["Unified timelines", "Automated escalation", "Audit trails"],
  },
  {
    title: "Compliance reporting",
    description:
      "Turn security controls into board-ready reporting without manual overhead.",
    highlights: ["Policy mapping", "Risk dashboards", "Export-ready reports"],
  },
];

const aiCapabilities = [
  {
    title: "Signal fusion engine",
    description:
      "Consolidate telemetry across your stack to surface the threats that matter.",
  },
  {
    title: "Adaptive risk scoring",
    description:
      "Prioritize vulnerabilities based on exploit likelihood and business impact.",
  },
  {
    title: "Response copilot",
    description:
      "Guided remediation with recommended containment steps and stakeholder updates.",
  },
  {
    title: "Predictive drift detection",
    description:
      "Detect configuration drift and policy violations before they escalate.",
  },
];

const trustSignals = [
  {
    title: "Built for regulated teams",
    description:
      "Designed to align with SOC 2, ISO 27001, and modern privacy frameworks.",
  },
  {
    title: "Always-on protection",
    description:
      "24/7 monitoring with escalations that keep leadership informed in real time.",
  },
  {
    title: "Secure by design",
    description:
      "Zero-trust principles with least-privilege access and encrypted workflows.",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.18),_transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Cybersecurity readiness platform
              </motion.p>
              <motion.h1
                className="text-4xl font-semibold leading-tight text-white sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              >
                Be ready before the breach arrives.
              </motion.h1>
              <motion.p
                className="text-base text-slate-300 sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                Be4Breach combines AI-driven intelligence with hands-on response
                workflows so your teams can detect, contain, and recover faster.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20"
                >
                  Request a demo
                </motion.a>
                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90"
                >
                  Explore services
                </motion.a>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3"
                  >
                    <p className="text-lg font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-sky-500/10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Security operations overview
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Unified command center for threat readiness.
                  </p>
                </div>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Coverage
                    </p>
                    <p className="mt-1 text-white">
                      Cloud infrastructure, endpoints, and SaaS exposure mapped
                      in one view.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Response
                    </p>
                    <p className="mt-1 text-white">
                      Coordinated playbooks with stakeholder updates built in.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-sky-500/30 bg-slate-950/60 p-4 text-sm text-slate-200">
                  <p className="font-semibold text-white">
                    AI-driven readiness score
                  </p>
                  <p className="mt-1 text-slate-300">
                    Continuously adapts based on new signals and team activity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Services
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Defense layers built to scale with your business.
          </h2>
          <p className="text-base text-slate-300">
            Combine continuous intelligence with guided response so teams stay
            ahead of emerging threats.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{
                y: -10,
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.35)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              AI + Cybersecurity
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Intelligence that keeps your security posture ahead.
            </h2>
            <p className="text-base text-slate-300">
              Be4Breach pairs machine learning with analyst workflows to
              surface the highest-impact risks and guide teams through
              remediation.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Key outcomes:</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Faster decisions with contextualized alerts.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Reduced noise through adaptive scoring.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Clear next steps for every incident.
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-sky-400"
            >
              Talk to an expert →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiCapabilities.map((capability) => (
              <motion.div
                key={capability.title}
                whileHover={{
                  y: -8,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              Trust and credibility
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Built to earn trust from security and leadership teams.
            </h2>
            <p className="text-base text-slate-300">
              From governance to response, Be4Breach keeps your organization
              aligned and audit-ready without slowing your teams down.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
                >
                  <h3 className="text-base font-semibold text-white">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Operational visibility
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Unified reporting for leadership and security teams.
              </p>
              <p className="mt-2">
                Deliver weekly posture updates, executive dashboards, and
                compliance-ready evidence from a single control plane.
              </p>
            </div>
            <InfoPanel />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10">
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-20 -translate-y-20 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold text-white">
                Ready to strengthen your breach readiness?
              </h2>
              <p className="text-base text-slate-300">
                Get a personalized walkthrough of Be4Breach and see how your
                security operations can move faster with confidence.
              </p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20"
            >
              Schedule a demo
            </motion.a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
