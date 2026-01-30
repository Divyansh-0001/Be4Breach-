import Link from "next/link";

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

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-white">Be4Breach</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Predictive cybersecurity partner headquartered in Pune, India,
            delivering proactive, next-gen defense for modern enterprises.
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
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© 2026 Be4Breach. All rights reserved.</p>
          <p>Prepared for future API integrations and security workflows.</p>
        </div>
      </div>
    </footer>
  );
}
