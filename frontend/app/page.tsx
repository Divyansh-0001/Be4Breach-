import { motion } from "framer-motion";

import AnimatedButton from "../components/ui/animated-button";
import AnimatedCard from "../components/ui/animated-card";
import AnimatedSection from "../components/ui/animated-section";

const heroStats = [
  { value: "25+", label: "Security specialists" },
  { value: "50+", label: "Global enterprise clients" },
  { value: "99.9%", label: "Incident response SLA" },
];

const services = [
  {
    title: "Threat Simulation",
    description: "Red teaming, adversary emulation, and breach readiness drills.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path
          d="M12 2.5L19.5 5.6V11.9C19.5 16.4 16.5 20.2 12 21.9C7.5 20.2 4.5 16.4 4.5 11.9V5.6L12 2.5Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M12 2.5L19.5 5.6V11.9C19.5 16.4 16.5 20.2 12 21.9C7.5 20.2 4.5 16.4 4.5 11.9V5.6L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M8.5 11.8L11 14.3L15.8 9.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "AI Security",
    description: "Adversarial AI testing, model hardening, and secure ML ops.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 4V7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 17V20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 12H7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M17 12H20" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "SOC Monitoring",
    description: "24/7 threat monitoring, SIEM tuning, and incident triage.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path d="M4 12H8L10.5 6L13.5 18L16 12H20" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Compliance Readiness",
    description: "GDPR, ISO 27001, NIST, SEBI/RBI, and DPDP advisory.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path d="M7 4H17V20H7V4Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 8H14.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 12H14.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 16H12.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Cloud & OT Defense",
    description: "Secure cloud, OT, IoT, and critical infrastructure environments.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path
          d="M7 15.5H17.5C19.4 15.5 21 14 21 12.1C21 10.3 19.5 8.8 17.7 8.7C17.1 6.8 15.3 5.5 13.2 5.5C10.9 5.5 8.9 7 8.4 9C6.3 9.2 4.7 10.9 4.7 13C4.7 14.5 5.8 15.5 7 15.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M10 18.5H14" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Incident Response",
    description: "Rapid containment, forensic analysis, and recovery support.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-be4-accent">
        <path d="M12 3.5L20 7.5V12.5C20 16.7 16.8 20.3 12 22C7.2 20.3 4 16.7 4 12.5V7.5L12 3.5Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 8V13" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const reasons = [
  {
    title: "Threat-first intelligence",
    description:
      "We model adversary behavior to anticipate attacks before they become incidents.",
  },
  {
    title: "Proactive defense",
    description:
      "Integrated red teaming, AI security, and SOC operations to reduce exposure.",
  },
  {
    title: "Regulatory confidence",
    description:
      "Built for compliance across global frameworks with audit-ready evidence.",
  },
];

const steps = [
  {
    title: "Assess",
    description: "Map assets, risks, and vulnerabilities across your ecosystem.",
  },
  {
    title: "Harden",
    description: "Deploy layered controls, architecture, and policy updates.",
  },
  {
    title: "Monitor",
    description: "Continuous SOC visibility, threat hunting, and alert tuning.",
  },
  {
    title: "Respond",
    description: "Contain threats, investigate, and recover with precision.",
  },
];

const focusAreas = [
  {
    title: "AI Security Programs",
    description: "Defend data models with adversarial testing and monitoring.",
  },
  {
    title: "Proactive Defense",
    description: "Continuous risk reduction with red team and vCISO support.",
  },
  {
    title: "SOC Monitoring",
    description: "24/7 detection, triage, and escalation workflows.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid-fade bg-[length:120px_120px] opacity-20" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.4em] text-be4-accent"
            >
              Cybersecurity Intelligence
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Stay ahead of breaches with Be4Breach&apos;s proactive defense
              platform.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-6 text-base leading-relaxed text-slate-300"
            >
              We combine AI security, red teaming, and always-on SOC monitoring to
              protect high-growth companies from modern threat actors.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <AnimatedButton href="/contact" variant="primary">
                Get Started
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="secondary">
                Request Assessment
              </AnimatedButton>
            </motion.div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em] text-slate-500">
              <span>Trusted by fintech</span>
              <span>Healthcare</span>
              <span>Global SaaS</span>
            </div>
          </div>
          <div className="grid gap-4">
            <AnimatedCard className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-be4-accent">
                Threat Radar
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Continuous visibility into emerging attacker tactics.
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                Our analysts model adversary behavior, validate controls, and
                keep security teams ahead of real-world breaches.
              </p>
            </AnimatedCard>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {heroStats.map((stat) => (
                <AnimatedCard key={stat.label}>
                  <p className="text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-be4-accent">
            Services
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Premium cybersecurity coverage across every layer.
          </h2>
          <p className="text-base text-slate-400">
            Be4Breach delivers threat modeling, AI security, SOC monitoring, and
            compliance programs tailored for mission-critical operations.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <AnimatedCard key={service.title} className="h-full">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-be4-accent/10">
                  {service.icon}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                {service.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-be4-accent">
              Why Be4Breach
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Expert-led defense with proactive, measurable outcomes.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              We align offensive expertise, governance, and AI security into a
              single engagement model that strengthens your posture and reduces
              time-to-detect.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {reasons.map((reason) => (
              <AnimatedCard key={reason.title} className="h-full">
                <h3 className="text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  {reason.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-be4-accent">
            How it works
          </p>
          <h2 className="text-3xl font-semibold text-white">
            A guided lifecycle from assessment to recovery.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <AnimatedCard key={step.title} className="h-full">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-be4-accent/40 text-sm font-semibold text-be4-accent">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-slate-400">{step.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-be4-accent">
            Security Focus
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Focused programs for high-risk, high-growth teams.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <AnimatedCard key={area.title} className="h-full">
              <h3 className="text-lg font-semibold text-white">{area.title}</h3>
              <p className="mt-3 text-sm text-slate-400">
                {area.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-be4-accent/30 bg-be4-panel-strong px-8 py-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.18),_transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl font-semibold text-white">
              Secure your next growth phase with Be4Breach.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Book a strategic assessment and receive an actionable security
              roadmap aligned to your business goals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <AnimatedButton href="/contact" variant="primary">
                Request Assessment
              </AnimatedButton>
              <AnimatedButton href="/services" variant="secondary">
                View Services
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
