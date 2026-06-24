"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * FloatingParticles — partikel medis melayang halus di background
 * Menampilkan lingkaran-lingkaran kecil dan simbol plus (+) yang
 * bergerak naik turun secara random.
 */
export function FloatingParticles({
  count = 20,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.25 + 0.05,
      type: Math.random() > 0.6 ? "cross" : "circle",
    }));
  }, [count, isMounted]);

  if (!isMounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 8, -5, 3, 0],
            rotate: p.type === "cross" ? [0, 90, 180, 270, 360] : [0, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.type === "cross" ? (
            <svg
              width={p.size * 1.8}
              height={p.size * 1.8}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2v12M2 8h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary/30"
              />
            </svg>
          ) : (
            <div
              className="rounded-full bg-primary/20"
              style={{
                width: p.size,
                height: p.size,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * GlowOrbs — orb-orb besar berwarna yang blur untuk ambient lighting
 */
export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}>
      <motion.div
        className="orb bg-primary/15 w-[400px] h-[400px]"
        style={{ top: "10%", left: "5%" }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb bg-accent/10 w-[350px] h-[350px]"
        style={{ top: "20%", right: "10%" }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -25, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb bg-navy/8 w-[300px] h-[300px]"
        style={{ bottom: "10%", left: "30%" }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
