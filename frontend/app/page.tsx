import HomePage from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be4Breach",
  description:
    "Premium cybersecurity readiness platform blending AI intelligence with response automation.",
};

export default function Home() {
  return <HomePage />;
}
