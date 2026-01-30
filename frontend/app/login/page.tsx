"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Logo from "../../components/logo";
import AnimatedButton from "../../components/ui/animated-button";
import AnimatedCard from "../../components/ui/animated-card";
import AnimatedSection from "../../components/ui/animated-section";
import {
  getGoogleOAuthFallbackUrl,
  getGoogleOAuthUrl,
  loginWithRole,
} from "../../lib/auth-api";
import { setSession, type AuthRole } from "../../lib/auth";

const roleOptions: Array<{
  role: AuthRole;
  label: string;
  description: string;
}> = [
  {
    role: "User",
    label: "User login",
    description: "Access your security posture, reports, and service insights.",
  },
  {
    role: "Admin",
    label: "Admin login",
    description: "Manage governance, teams, and compliance workflows.",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRole = searchParams.get("role");
  const initialRole: AuthRole = queryRole === "Admin" ? "Admin" : "User";

  const [role, setRole] = useState<AuthRole>(initialRole);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTarget = useMemo(() => {
    const redirect = searchParams.get("redirect");
    const defaultRedirect =
      role === "Admin" ? "/dashboard/admin" : "/dashboard/user";

    if (queryRole && queryRole !== role) {
      return defaultRedirect;
    }

    return redirect ?? defaultRedirect;
  }, [queryRole, role, searchParams]);

  const errorMessage =
    searchParams.get("error") === "unauthorized"
      ? "Your session does not have access to that dashboard. Please sign in with the correct role."
      : "";

  const handleChange = (field: "email" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const nextErrors: typeof errors = {};

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
      const session = await loginWithRole(role, formData);
      setSession(session);
      router.push(redirectTarget);
    } catch (error) {
      setErrors({
        form: "Login failed. Please verify your credentials or try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      const url = await getGoogleOAuthUrl(role);
      window.location.href = url;
    } catch (error) {
      window.location.href = getGoogleOAuthFallbackUrl(role);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRoleCopy = roleOptions.find((option) => option.role === role);

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
              Secure Access
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Sign in to Be4Breach
            </h1>
            <p className="mt-6 text-base text-slate-300">
              Role-based access ensures every stakeholder gets the right
              visibility and actions across proactive defense, active monitoring,
              and response workflows.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {roleOptions.map((option) => (
                <AnimatedCard key={option.role} className="h-full">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {option.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {option.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>

          <AnimatedCard className="relative">
            <div className="flex flex-col items-center gap-2 text-center">
              <Logo className="justify-center" size={36} />
              <p className="text-sm text-slate-400">
                {activeRoleCopy?.description}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-slate-950/70 p-1">
              {roleOptions.map((option) => {
                const isActive = role === option.role;
                return (
                  <motion.button
                    key={option.role}
                    type="button"
                    onClick={() => setRole(option.role)}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      isActive
                        ? "bg-sky-400 text-slate-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {option.role}
                  </motion.button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              {errorMessage ? (
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                  {errorMessage}
                </div>
              ) : null}
              {errors.form ? (
                <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  {errors.form}
                </div>
              ) : null}
              <label className="grid gap-2 text-sm text-slate-300">
                Email address
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
                  placeholder="Enter your password"
                  className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                />
                {errors.password ? (
                  <span className="text-xs text-rose-300">
                    {errors.password}
                  </span>
                ) : null}
              </label>
              <AnimatedButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </AnimatedButton>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
              <span className="h-px flex-1 bg-white/10" />
              or continue with
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <AnimatedButton
              onClick={handleGoogleLogin}
              variant="secondary"
              disabled={isSubmitting}
              className="w-full"
            >
              Continue with Google SSO
            </AnimatedButton>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    </div>
  );
}
