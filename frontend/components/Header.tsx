import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Be4Breach
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-xs text-slate-300 sm:text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-sky-400/40 px-4 py-2 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400 hover:text-white sm:text-sm"
        >
          Request demo
        </Link>
      </div>
    </header>
  );
}
