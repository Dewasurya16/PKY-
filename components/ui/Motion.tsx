"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

/** Reveal: fade+slide-up saat elemen masuk viewport */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
  direction?: "up" | "left" | "right" | "scale";
}) {
  const Comp = motion[as];
  const variantsMap = {
    up: revealVariants,
    left: slideLeftVariants,
    right: slideRightVariants,
    scale: scaleVariants,
  };

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variantsMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Stagger: induk untuk animasi anak berurutan */
export function Stagger({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={revealVariants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** ParallaxFloat: komponen yang bergerak halus mengikuti scroll */
export function ParallaxFloat({
  children,
  className,
  offset = 20,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: -offset }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Tabs dengan animasi underline menggunakan layoutId */
export function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = React.useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-xl bg-surface-soft p-1.5">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative rounded-lg px-5 py-3 font-display text-sm font-semibold transition-colors",
              active === i
                ? "text-primary"
                : "text-text-secondary hover:text-text"
            )}
          >
            {tab.label}
            {active === i && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-white shadow-card"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-7"
      >
        {tabs[active].content}
      </motion.div>
    </div>
  );
}
