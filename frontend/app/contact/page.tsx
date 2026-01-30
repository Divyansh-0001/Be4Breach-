import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with the Be4Breach team to plan your cybersecurity readiness strategy.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Contact
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Speak with the Be4Breach team.
          </h1>
          <p className="text-base text-slate-300">
            Connect with security specialists to explore your readiness gaps,
            incident response maturity, and the fastest path to stronger
            defenses.
          </p>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Email
              </p>
              <p className="mt-1 text-white">security@be4breach.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Response time
              </p>
              <p className="mt-1 text-white">
                Within 1 business day for all inquiries.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Headquarters
              </p>
              <p className="mt-1 text-white">Remote-first, global coverage.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-white">
            Schedule a security consultation
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Share your goals and we will tailor a response plan for your team.
          </p>
          <form className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Full name
              <input
                type="text"
                name="name"
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="Alex Morgan"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Work email
              <input
                type="email"
                name="email"
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="alex@company.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Organization
              <input
                type="text"
                name="company"
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="Company name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              What are you looking to improve?
              <textarea
                name="message"
                rows={4}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="Briefly describe your priorities."
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Send request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
