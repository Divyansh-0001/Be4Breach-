import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";

const servicePillars = [
  {
    title: "Identify",
    description: "Risk assessment, asset discovery, and vulnerability analysis.",
  },
  {
    title: "Protect",
    description:
      "Hardening, backup strategies, identity management, and policy controls.",
  },
  {
    title: "Detect",
    description:
      "SOC operations, intrusion detection, behavior monitoring, and DLP.",
  },
  {
    title: "Respond",
    description:
      "Incident response planning, digital forensics, and crisis management.",
  },
  {
    title: "Recover",
    description:
      "Disaster recovery, resilience planning, and ransomware negotiation.",
  },
];

const portfolios = [
  {
    title: "Next-Gen Security",
    description: "AI, cloud-native, and blockchain security programs.",
    items: [
      "AI Security & Adversarial Testing",
      "Kubernetes & Container Security",
      "Blockchain & Smart Contract Audits",
      "OT-IoT Security Assessments",
    ],
  },
  {
    title: "Proactive Assurance",
    description: "Preventive security built for regulated environments.",
    items: [
      "Penetration Testing / Red Teaming",
      "Risk Assessment & Management",
      "Security Architecture Design",
      "Security Awareness Training",
    ],
  },
  {
    title: "Active Defense",
    description: "Operational programs that keep threats contained.",
    items: [
      "SOC Monitoring & Threat Hunting",
      "DevSecOps Integrations",
      "Vulnerability Management",
      "Managed Security Services",
    ],
  },
  {
    title: "Reactive Response",
    description: "Rapid recovery and resilience services.",
    items: [
      "Incident Response & Digital Forensics",
      "Ransomware Negotiation & Data Recovery",
      "Disaster Recovery & Business Continuity",
      "Post-Incident Analysis",
    ],
  },
];

const stories = [
  {
    title: "Red Teaming Engagement",
    description:
      "Simulated advanced threat actor tactics for a global financial services firm, uncovering critical misconfigurations and patch gaps.",
    region: "Europe",
  },
  {
    title: "AI Penetration Testing",
    description:
      "Evaluated adversarial risks for an e-commerce AI recommendation engine, improving resilience to model inversion and data poisoning.",
    region: "Dubai",
  },
  {
    title: "GDPR Audit",
    description:
      "Delivered a compliance roadmap for a global SaaS provider with multi-cloud operations, improving visibility and control.",
    region: "Singapore",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Services
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Integrated cybersecurity services across the full threat lifecycle.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-slate-300">
          Be4Breach delivers a blend of proactive assessments, active defense,
          and rapid response services for enterprises, fintech, healthcare, and
          SaaS leaders.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {portfolios.map((portfolio) => (
            <AnimatedCard key={portfolio.title} className="h-full">
              <h2 className="text-lg font-semibold text-white">
                {portfolio.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {portfolio.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {portfolio.items.map((item) => (
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
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            How we help
          </p>
          <h2 className="text-3xl font-semibold text-white">
            A lifecycle approach designed for continuous assurance.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((pillar) => (
            <AnimatedCard key={pillar.title} className="h-full">
              <h3 className="text-lg font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                {pillar.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Success stories
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Proven impact across 100+ global engagements.
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <AnimatedCard key={story.title} className="h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
                {story.region}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {story.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                {story.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-12 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Build a security roadmap tailored to your business.
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Our teams are ready to scope an engagement aligned with your
            regulatory obligations and threat landscape.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <AnimatedButton href="/contact" variant="primary">
              Start a conversation
            </AnimatedButton>
            <AnimatedButton href="/about" variant="ghost">
              Meet Be4Breach
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
