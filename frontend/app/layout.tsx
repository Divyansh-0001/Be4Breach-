import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Be4Breach",
    template: "%s | Be4Breach",
  },
  description:
    "Be4Breach delivers AI-driven cybersecurity readiness, threat intelligence, and response automation.",
  openGraph: {
    title: "Be4Breach",
    description:
      "Be4Breach delivers AI-driven cybersecurity readiness, threat intelligence, and response automation.",
    siteName: "Be4Breach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be4Breach",
    description:
      "Be4Breach delivers AI-driven cybersecurity readiness, threat intelligence, and response automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
