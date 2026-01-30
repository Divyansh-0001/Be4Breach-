import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";

const journey = [
  {
    year: "2021",
    title: "Ideation & Foundation",
    points: ["Company inception", "Initial services launch", "First major client"],
  },
  {
    year: "2022",
    title: "Early Traction",
    points: [
      "Service portfolio expansion",
      "Global recognition",
      "Strategic partnerships",
    ],
  },
  {
    year: "2023",
    title: "CoE & SOC Monitoring",
    points: [
      "Next-gen services introduced",
      "Major projects delivered",
      "Client base expansion",
    ],
  },
  {
    year: "2024",
    title: "Growth & Scaling",
    points: [
      "Industry leadership",
      "Innovative solutions",
      "Community engagement",
    ],
  },
  {
    year: "2025",
    title: "Expansion & Future Vision",
    points: [
      "CERT-IN empanelment",
      "Global market expansion",
      "Advanced AI and automation",
    ],
  },
];

const highlights = [
  { value: "25+", label: "Top-tier security specialists" },
  { value: "50+", label: "Global clients across sectors" },
  { value: "12+", label: "Solutions partners worldwide" },
];

const values = [
  {
    title: "Predictive defense",
    description:
      "We anticipate threat actors and close gaps before risk becomes incident.",
  },
  {
    title: "Client-centered execution",
    description:
      "Every engagement is tailored to the customer ecosystem and governance needs.",
  },
  {
    title: "Continuous innovation",
    description:
      "Our labs focus on AI, cloud, and emerging tech to stay ahead of adversaries.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          About Be4Breach
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          A young, ambitious, and creative cybersecurity company headquartered
          in Pune, India.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-slate-300">
          Be4Breach differentiates itself with the ability to predict threats
          and close gaps ahead of time. Our team blends deep research with
          hands-on delivery from countless client engagements across the globe.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <AnimatedButton href="/contact" variant="primary">
            Talk with our team
          </AnimatedButton>
          <AnimatedButton href="/services" variant="ghost">
            View service catalog
          </AnimatedButton>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Our Journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Growing from early traction to global expansion.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              From founding in 2021 to scaling advanced AI-driven security
              programs in 2025, Be4Breach has steadily expanded its capabilities
              and global footprint.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {journey.map((item) => (
              <AnimatedCard key={item.year} className="h-full">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                  {item.year}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Team Profile
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Specialist-led teams with global experience.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Our experts cover offensive security, governance, AI defense, and
              managed services. We operate as an extension of your security
              leadership.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <AnimatedCard key={value.title} className="h-full">
                <h3 className="text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  {value.description}
                </p>
              </AnimatedCard>
            ))}
            <AnimatedCard className="h-full">
              <h3 className="text-lg font-semibold text-white">
                Partner ecosystem
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                Our partner network spans solution providers, community groups,
                and academic institutions to deliver global reach and innovation.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
