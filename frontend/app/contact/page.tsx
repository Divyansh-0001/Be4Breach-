import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";

const contactDetails = [
  { label: "Email", value: "contact@be4breach.com" },
  { label: "Phone", value: "+91 9461915152" },
  { label: "Location", value: "Pune, India" },
];

export default function ContactPage() {
  return (
    <div>
      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Let&apos;s connect and design your security roadmap.
        </h1>
        <p className="mt-6 max-w-3xl text-base text-slate-300">
          Share your priorities and our team will respond with a tailored plan
          across proactive defense, active monitoring, and incident response.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <AnimatedCard className="h-full">
            <h2 className="text-xl font-semibold text-white">Send a request</h2>
            <p className="mt-2 text-sm text-slate-400">
              This form is ready for backend API integration. We&apos;ll connect it
              to secure workflows in the next phase.
            </p>
            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Full name
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Work email
                <input
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Company
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                How can we help?
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your security goals."
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  required
                />
              </label>
              <AnimatedButton type="submit" variant="primary" className="w-full">
                Submit request
              </AnimatedButton>
            </form>
          </AnimatedCard>

          <div className="grid gap-4">
            {contactDetails.map((detail) => (
              <AnimatedCard key={detail.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {detail.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {detail.value}
                </p>
              </AnimatedCard>
            ))}
            <AnimatedCard>
              <h3 className="text-lg font-semibold text-white">
                Working hours
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Monday - Friday, 9:00 AM to 7:00 PM IST.
              </p>
              <p className="mt-3 text-sm text-slate-400">
                24/7 incident response available for retained clients.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
