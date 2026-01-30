"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useRole } from "@/hooks/useRole";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { role, status, logout } = useRole();
  const isAuthed = status === "authenticated";

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
          {role === "admin" && (
            <Link
              href="/admin"
              className="transition-colors hover:text-white"
            >
              Admin
            </Link>
          )}
          {role === "user" && (
            <Link href="/user" className="transition-colors hover:text-white">
              User
            </Link>
          )}
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          {isAuthed && role && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
              {role}
            </span>
          )}
          {isAuthed ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={logout}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/40 sm:text-sm"
            >
              Log out
            </motion.button>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/login"
                className="rounded-full border border-sky-400/40 px-4 py-2 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400 hover:text-white sm:text-sm"
              >
                Log in
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
