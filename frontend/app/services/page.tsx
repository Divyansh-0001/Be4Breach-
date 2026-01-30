import Link from "next/link";

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
          Services
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Security readiness built for modern teams.
        </h1>
        <p className="text-base text-slate-300">
          Be4Breach delivers end-to-end visibility, response automation, and
          compliance alignment so your team can move faster without sacrificing
          security.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Continuous threat monitoring",
            description:
              "Track risk across cloud, endpoint, and SaaS surfaces with always-on alerts.",
          },
          {
            title: "Breach simulation exercises",
            description:
              "Run tabletop drills with guided scenarios to align responders and leadership.",
          },
          {
            title: "Incident response coordination",
            description:
              "Centralize comms, timelines, and escalation steps in one control hub.",
          },
          {
            title: "Executive risk reporting",
            description:
              "Translate technical findings into clear executive and board reporting.",
          },
        ].map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <h2 className="text-xl font-semibold text-white">
          Need a tailored security plan?
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Schedule a consultation to map Be4Breach capabilities to your current
          security goals.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center text-sm font-semibold text-sky-400"
        >
          Talk to our team →
        </Link>
      </div>
    </section>
  );
}
