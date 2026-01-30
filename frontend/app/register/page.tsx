"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";
import Logo from "../../components/logo";
import { registerUser } from "../../lib/auth-api";
import { ApiError } from "../../lib/api";
import { setSession } from "../../lib/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formData.email || !emailPattern.test(formData.email)) {
      nextErrors.email = "Please enter a valid work email.";
    }

    if (!formData.password || formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
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
      setIsSubmitting(true);
      const session = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        company: formData.company.trim() || undefined,
      });
      setSession(session);
      router.push("/dashboard/user");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Registration failed. Please try again.";
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_50%)]" />
      <AnimatedSection className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
              New Account
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Join Be4Breach to stay ahead of cyber risk.
            </h1>
            <p className="mt-6 text-base text-slate-300">
              Create your user workspace and gain access to security insights,
              compliance tracking, and service updates as we connect backend
              data streams.
            </p>
          </motion.div>

          <AnimatedCard className="relative">
            <div className="flex flex-col items-center gap-2 text-center">
              <Logo className="justify-center" size={36} />
              <p className="text-sm text-slate-400">
                Register a Be4Breach user account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
                  placeholder="you@company.com"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.email ? (
                  <span className="text-xs text-rose-300">{errors.email}</span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  placeholder="Create a password"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.password ? (
                  <span className="text-xs text-rose-300">
                    {errors.password}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Company (optional)
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
              <AnimatedButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </AnimatedButton>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Already have access?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-sky-300 transition hover:text-sky-200"
              >
                Sign in
              </button>
              .
            </p>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    </div>
  );
}
