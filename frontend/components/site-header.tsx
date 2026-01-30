import Link from "next/link";

import Logo from "./logo";
import AuthStatus from "./auth/auth-status";
import AnimatedButton from "./ui/animated-button";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const dashboardLinks = [
  { label: "User Dashboard", href: "/dashboard/user" },
  { label: "Admin Dashboard", href: "/dashboard/admin" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <span className="h-5 w-px bg-white/15" aria-hidden />
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <AnimatedButton href="/contact" variant="secondary">
            Book a consultation
          </AnimatedButton>
          <AuthStatus />
        </div>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl">
            <div className="flex flex-col gap-2">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex flex-col gap-2">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <AuthStatus className="w-full" fullWidth />
              <AnimatedButton
                href="/contact"
                variant="primary"
                className="w-full"
              >
                Book a consultation
              </AnimatedButton>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
