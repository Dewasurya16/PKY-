"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** ShinyCard: kartu modern dengan sapuan cahaya saat hover */
export function ShinyCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shiny-card hover-lift rounded-2xl border border-gray-100 bg-white p-6 shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

/** MagicCard: border gradient yang mengikuti kursor mouse */
export function MagicCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "magic-card hover-lift rounded-2xl border border-gray-100 bg-white p-6 shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

/** GlassCard: glassmorphism card */
export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/** ServiceCard: card untuk menampilkan layanan dengan icon berwarna */
export function ServiceCard({
  children,
  className,
  color = "teal",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn(
        "group hover-lift rounded-2xl border border-gray-100 bg-white p-7 shadow-card transition-all duration-300",
        "hover:border-primary/20",
        className
      )}
    >
      {children}
    </div>
  );
}
