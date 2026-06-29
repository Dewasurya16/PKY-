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
  // Dinonaktifkan sementara untuk meningkatkan performa (mengurangi lag)
  return null;
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
