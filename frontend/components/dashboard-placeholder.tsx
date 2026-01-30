import AnimatedButton from "./ui/animated-button";
import AnimatedCard from "./ui/animated-card";
import AnimatedSection from "./ui/animated-section";

type DashboardPlaceholderProps = {
  role: string;
  description: string;
};

export default function DashboardPlaceholder({
  role,
  description,
}: DashboardPlaceholderProps) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
        {role} Dashboard
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
        Role-based portal coming soon.
      </h1>
      <p className="mt-6 max-w-3xl text-base text-slate-300">{description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <AnimatedCard>
          <h3 className="text-lg font-semibold text-white">
            Secure access controls
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Access, permissions, and audit logs will be mapped to each role.
          </p>
        </AnimatedCard>
        <AnimatedCard>
          <h3 className="text-lg font-semibold text-white">
            API-ready integrations
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Dashboards will connect to the FastAPI backend for real-time data.
          </p>
        </AnimatedCard>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <AnimatedButton href="/contact" variant="primary">
          Request access
        </AnimatedButton>
        <AnimatedButton href="/services" variant="ghost">
          Explore services
        </AnimatedButton>
      </div>
    </AnimatedSection>
  );
}
