"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AnimatedButton from "../ui/animated-button";
import { clearSession, getSession, type AuthSession } from "../../lib/auth";

type AuthStatusProps = {
  className?: string;
  fullWidth?: boolean;
};

export default function AuthStatus({ className, fullWidth }: AuthStatusProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSession(getSession());
  }, [pathname]);

  useEffect(() => {
    const handler = () => setSession(getSession());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    router.push("/login");
  };

  if (!session) {
    return (
      <div className={className}>
        <AnimatedButton
          href="/login"
          variant="secondary"
          className={fullWidth ? "w-full justify-center" : undefined}
        >
          Login
        </AnimatedButton>
      </div>
    );
  }

  const dashboardHref =
    session.role === "Admin" ? "/dashboard/admin" : "/dashboard/user";

  return (
    <div
      className={`flex items-center gap-3 ${fullWidth ? "w-full" : ""} ${
        className ?? ""
      }`}
    >
      <Link
        href={dashboardHref}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
      >
        {session.role} Dashboard
      </Link>
      <AnimatedButton
        onClick={handleLogout}
        variant="ghost"
        className={fullWidth ? "w-full justify-center" : undefined}
      >
        Sign out
      </AnimatedButton>
    </div>
  );
}
