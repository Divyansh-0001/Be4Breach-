"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./AuthProvider";

type Role = "user" | "admin";

type RoleGuardProps = {
  role: Role;
  children: ReactNode;
};

export default function RoleGuard({ role, children }: RoleGuardProps) {
  const router = useRouter();
  const { auth, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!auth || auth.role !== role)) {
      router.replace("/#login");
    }
  }, [auth, isLoading, role, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        Checking access...
      </div>
    );
  }

  if (!auth || auth.role !== role) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        Redirecting to login...
      </div>
    );
  }

  return <>{children}</>;
}
