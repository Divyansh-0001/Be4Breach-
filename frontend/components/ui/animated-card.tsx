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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-be4-panel/80 p-6 shadow-card transition hover:border-be4-accent/40 hover:shadow-glow ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),_transparent_60%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
