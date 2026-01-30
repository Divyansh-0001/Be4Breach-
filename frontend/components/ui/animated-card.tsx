"use client";

import { motion } from "framer-motion";

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
