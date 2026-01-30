"use client";

import { RoleProvider } from "@/hooks/useRole";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>;
}
