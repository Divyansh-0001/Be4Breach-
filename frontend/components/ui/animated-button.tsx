"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type AnimatedButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<NonNullable<AnimatedButtonProps["variant"]>, string> =
  {
    primary: "border-transparent bg-sky-400 text-slate-950 hover:bg-sky-300",
    secondary: "border-white/10 bg-slate-900 text-white hover:bg-slate-800",
    ghost: "border-white/10 text-white hover:bg-white/5",
  };

export default function AnimatedButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  disabled,
  onClick,
}: AnimatedButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={styles}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={styles}
    >
      {children}
    </motion.button>
  );
}
