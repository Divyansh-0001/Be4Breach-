"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AnimatedButton from "./ui/animated-button";
import AnimatedCard from "./ui/animated-card";
import GoogleSSOButton from "./auth/google-sso-button";
import { loginWithRole } from "../lib/auth-api";
import { ApiError } from "../lib/api";
import { setSession, type AuthRole, type AuthSession } from "../lib/auth";

type LoginPortalProps = {
  initialRole?: AuthRole;
};

const roleOptions: Array<{
  role: AuthRole;
  label: string;
  description: string;
}> = [
  {
    role: "User",
    label: "User Login",
    description: "Access security posture, reports, and remediation insights.",
  },
  {
    role: "Admin",
    label: "Admin Login",
    description: "Manage governance, SOC operations, and compliance controls.",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPortal({ initialRole = "User" }: LoginPortalProps) {
  const router = useRouter();
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

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
      router.push(role === "Admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to sign in. Please verify your credentials.";
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = (session: AuthSession) => {
    setSession(session);
    router.push(session.role === "Admin" ? "/dashboard/admin" : "/dashboard/user");
  };

  const handleGoogleError = (message: string) => {
    setErrors({ form: message });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-be4-accent">
          Secure Login Portal
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-white">
          Role-based access built for zero-trust security.
        </h3>
        <p className="mt-4 text-base text-slate-400">
          Authenticate with user or admin credentials, or use Google SSO for a
          secure, streamlined sign-in experience.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {roleOptions.map((option) => (
            <AnimatedCard key={option.role} className="h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {option.label}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {option.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </motion.div>

      <AnimatedCard className="h-full">
        <div className="grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-be4-panel-strong p-1">
          {roleOptions.map((option) => {
            const isActive = role === option.role;
            return (
              <motion.button
                key={option.role}
                type="button"
                onClick={() => setRole(option.role)}
                whileTap={{ scale: 0.98 }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  isActive
                    ? "bg-be4-accent text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {option.role}
              </motion.button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
              className="rounded-xl border border-be4-border bg-be4-panel px-4 py-3 text-sm text-white outline-none transition focus:border-be4-accent"
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
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Enter your password"
              className="rounded-xl border border-be4-border bg-be4-panel px-4 py-3 text-sm text-white outline-none transition focus:border-be4-accent"
            />
            {errors.password ? (
              <span className="text-xs text-rose-300">{errors.password}</span>
            ) : null}
          </label>
          <AnimatedButton
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Signing in..." : `Sign in as ${role}`}
          </AnimatedButton>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px flex-1 bg-white/10" />
          or continue with
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleSSOButton
          role={role}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </AnimatedCard>
    </div>
  );
}
