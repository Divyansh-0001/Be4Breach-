"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { clearSession, getSession, type AuthRole } from "../../lib/auth";

type RoleGuardProps = {
  role: AuthRole;
  children: React.ReactNode;
};

export default function RoleGuard({ role, children }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  const loginUrl = useMemo(() => {
    const params = new URLSearchParams({
      role,
      redirect: pathname,
    });
    return `/login?${params.toString()}`;
  }, [pathname, role]);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace(loginUrl);
      return;
    }

    if (session.role !== role) {
      clearSession();
      const params = new URLSearchParams({
        role,
        error: "unauthorized",
        redirect: pathname,
      });
      router.replace(`/login?${params.toString()}`);
      return;
    }

    setIsAllowed(true);
    setIsChecking(false);
  }, [loginUrl, pathname, role, router]);

  if (isChecking && !isAllowed) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-8 text-center text-sm text-slate-300">
          Verifying access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
