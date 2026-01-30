import Link from "next/link";

import Logo from "./logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const dashboards = [
  { label: "User Dashboard", href: "/dashboard/user" },
  { label: "Admin Dashboard", href: "/dashboard/admin" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
  },
  {
    label: "GitHub",
    href: "https://github.com",
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-be4-bg">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-white" size={30} />
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            A proactive cybersecurity partner headquartered in Pune, India,
            delivering AI-driven defense, compliance assurance, and incident
            response for modern enterprises.
          </p>
          <div className="mt-4 text-sm text-slate-400">
            <p>www.be4breach.com</p>
            <p>contact@be4breach.com</p>
            <p>+91 9461915152</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Dashboards</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {dashboards.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Social</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {socials.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© 2026 Be4Breach. All rights reserved.</p>
          <p>Built for continuous defense and trusted incident response.</p>
        </div>
      </div>
    </footer>
  );
}
