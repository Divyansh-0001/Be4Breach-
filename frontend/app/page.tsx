import AnimatedButton from "../components/ui/animated-button";
import AnimatedCard from "../components/ui/animated-card";
import AnimatedSection from "../components/ui/animated-section";

const stats = [
  { value: "25+", label: "Security specialists and researchers" },
  { value: "50+", label: "Global clients across regulated industries" },
  { value: "100+", label: "Engagements delivered in 20+ countries" },
];

const serviceGroups = [
  {
    title: "Next-Gen Services",
    items: [
      "AI Security",
      "Privacy Audits",
      "Cloud Security",
      "Kubernetes & Container Security",
      "Blockchain Security",
      "OT-IoT Security",
    ],
  },
  {
    title: "Proactive Services",
    items: [
      "Penetration Testing & Red Teaming",
      "Risk Assessment & Management",
      "Security Awareness Training",
      "Security Architecture Design",
      "Security Policy Development",
    ],
  },
  {
    title: "Active Services",
    items: [
      "vCISO Leadership",
      "SOC Monitoring",
      "DevSecOps Integrations",
      "Vulnerability Management",
      "Threat Hunting & SIEM Deployment",
    ],
  },
  {
    title: "Reactive Services",
    items: [
      "Incident Response",
      "Ransomware Negotiation & Data Recovery",
      "Disaster Recovery & Business Continuity",
      "Post-Incident Analysis",
      "Crisis Management",
    ],
  },
];

const lifecycle = [
  {
    title: "Identify",
    description:
      "Assess what needs protection through risk, asset, and vulnerability analysis.",
  },
  {
    title: "Protect",
    description:
      "Deploy layered defenses including hardening, backup, and identity controls.",
  },
  {
    title: "Detect",
    description:
      "Monitor threats with SOC, behavior analytics, and continuous intelligence.",
  },
  {
    title: "Respond & Recover",
    description:
      "Coordinate incident response, forensic analysis, and resilient recovery.",
  },
];

const reasons = [
  {
    title: "Tailored, Personalized Service",
    description:
      "Every engagement is aligned to your compliance, threat profile, and business priorities.",
  },
  {
    title: "Dedicated, Hands-On Support",
    description:
      "Senior security teams stay embedded from assessment through remediation.",
  },
  {
    title: "Agile and Scalable Solutions",
    description:
      "Programs evolve with your growth, from early protection to global expansion.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
              Predictive Cybersecurity
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Be4Breach equips modern organizations to stay ahead of evolving
              cyber threats.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300">
              From AI security to compliance-driven response, we build programs
              that anticipate breaches and harden operations before attackers
              strike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatedButton href="/contact" variant="primary">
                Request a security review
              </AnimatedButton>
              <AnimatedButton href="/services" variant="ghost">
                Explore services
              </AnimatedButton>
            </div>
          </div>
          <div className="grid gap-4">
            {stats.map((stat) => (
              <AnimatedCard key={stat.label}>
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Our Portfolio
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Comprehensive coverage across the security lifecycle.
          </h2>
          <p className="text-base text-slate-400">
            Structured offerings from proactive defense to incident recovery
            allow us to build resilient programs for every maturity level.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <AnimatedCard key={group.title}>
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Identify. Protect. Detect. Respond.
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              A lifecycle approach built for regulated industries.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Governance, risk, and compliance requirements are embedded into
              every engagement to meet frameworks like GDPR, ISO 27001, and
              NIST.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {lifecycle.map((item) => (
              <AnimatedCard key={item.title} className="min-h-[170px]">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  {item.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Trusted partner for high-stakes cybersecurity programs.
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-8 py-12 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Ready to modernize your security posture?
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Connect with Be4Breach to map out your next security roadmap and
            align it with business growth.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <AnimatedButton href="/contact" variant="primary">
              Let&apos;s connect
            </AnimatedButton>
            <AnimatedButton href="/about" variant="ghost">
              Learn our story
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
