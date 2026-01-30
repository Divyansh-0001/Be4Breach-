import type { Metadata } from "next";

import UserPage from "@/components/pages/UserPage";

export const metadata: Metadata = {
  title: "User",
  description:
    "Be4Breach user workspace for readiness tasks and threat response.",
};

export default function UserPageRoute() {
  return <UserPage />;
}
