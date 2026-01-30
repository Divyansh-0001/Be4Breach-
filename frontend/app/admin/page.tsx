import type { Metadata } from "next";

import AdminPage from "@/components/pages/AdminPage";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Be4Breach admin dashboard for governance, incident oversight, and reporting.",
};

export default function AdminPageRoute() {
  return <AdminPage />;
}
