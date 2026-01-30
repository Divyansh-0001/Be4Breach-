import type { Metadata } from "next";

import LoginPage from "@/components/pages/LoginPage";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to Be4Breach with role-based credentials or Google SSO.",
};

export default function LoginPageRoute() {
  return <LoginPage />;
}
