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
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<NonNullable<AnimatedButtonProps["variant"]>, string> =
  {
    primary:
      "border-transparent bg-be4-accent text-white shadow-glow hover:bg-be4-accent-strong hover:shadow-glow-strong",
    secondary:
      "border-be4-border bg-be4-panel text-white hover:border-be4-accent/60 hover:text-white",
    ghost:
      "border-transparent bg-transparent text-white/80 hover:text-white hover:bg-white/5",
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
