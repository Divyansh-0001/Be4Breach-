"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
          Access denied
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          You do not have permission to view this page.
        </h1>
        <p className="text-base text-slate-300">
          Please sign in with the correct role or return to the homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Go to login
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
