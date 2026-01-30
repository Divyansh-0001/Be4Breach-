"use client";

import type { ComponentType } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRole } from "@/hooks/useRole";

type WithRoleProtectionProps = Record<string, unknown>;

export default function withRoleProtection<P extends WithRoleProtectionProps>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedComponent(props: P) {
    const { role, status } = useRole();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated" && role && !allowedRoles.includes(role)) {
        router.replace("/unauthorized");
      }
      if (status === "unauthenticated") {
        router.replace("/unauthorized");
      }
    }, [status, role, allowedRoles, router]);

    if (status === "loading" || status === "idle") {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-400">
          Verifying access...
        </div>
      );
    }

    if (status === "authenticated" && role && allowedRoles.includes(role)) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-400">
        Redirecting...
      </div>
    );
  };
}
