"use client";

import { useState } from "react";

import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";
import { ApiError, fetchJson } from "../../lib/api";

const contactDetails = [
  { label: "Email", value: "contact@be4breach.com" },
  { label: "Phone", value: "+91 9461915152" },
  { label: "Location", value: "Pune, India" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    form?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const nextErrors: typeof errors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = "Please share at least 10 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      setStatus("loading");
      await fetchJson("/api/v1/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          message: formData.message.trim(),
        }),
      });
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to submit your request right now.";
      setErrors({ form: message });
      setStatus("idle");
    }
  };

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
              Submit a request and we&apos;ll respond with the right engagement
              plan.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              {status === "success" ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Thanks for reaching out. We&apos;ll be in touch shortly.
                </div>
              ) : null}
              {errors.form ? (
                <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  {errors.form}
                </div>
              ) : null}
              <label className="grid gap-2 text-sm text-slate-300">
                Full name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="Jane Doe"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.name ? (
                  <span className="text-xs text-rose-300">{errors.name}</span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Work email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  placeholder="jane@company.com"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.email ? (
                  <span className="text-xs text-rose-300">{errors.email}</span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Company
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(event) =>
                    handleChange("company", event.target.value)
                  }
                  placeholder="Company name"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                How can we help?
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  placeholder="Tell us about your security goals."
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.message ? (
                  <span className="text-xs text-rose-300">
                    {errors.message}
                  </span>
                ) : null}
              </label>
              <AnimatedButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Submit request"}
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
