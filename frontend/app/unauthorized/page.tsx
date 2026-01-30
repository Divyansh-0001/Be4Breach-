import type { Metadata } from "next";

import UnauthorizedPage from "@/components/pages/UnauthorizedPage";

export const metadata: Metadata = {
  title: "Access denied",
  description: "You do not have permission to access this Be4Breach page.",
};

export default function UnauthorizedPageRoute() {
  return <UnauthorizedPage />;
}
