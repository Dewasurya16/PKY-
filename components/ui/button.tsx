"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "outline" | "ghost" | "accent" | "white";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
  outline:
    "bg-transparent text-navy border-2 border-gray-200 hover:border-primary hover:text-primary dark:text-white dark:border-white/20 dark:hover:border-primary-light dark:hover:text-primary-light",
  ghost: "bg-transparent text-navy hover:bg-primary-50 dark:text-white dark:hover:bg-white/10",
  accent:
    "bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-glow-accent",
  white:
    "bg-white text-navy hover:bg-gray-50 shadow-md",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
  xl: "px-9 py-4 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-300",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
