"use client";

import { motion } from "framer-motion";

import withRoleProtection from "@/hoc/withRoleProtection";

function AdminPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Admin control
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Security operations command center
          </h1>
          <p className="text-base text-slate-300">
            Oversee readiness metrics, response automation, and compliance
            alignment across the organization.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Incident oversight",
              description:
                "Track escalations, assign owners, and keep stakeholders informed.",
            },
            {
              title: "Risk governance",
              description:
                "Monitor enterprise posture and map risk to business impact.",
            },
            {
              title: "Compliance readiness",
              description:
                "Generate audit-ready reports with continuous evidence capture.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
            >
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{card.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default withRoleProtection(AdminPage, ["admin"]);
