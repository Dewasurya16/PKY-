"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { formatNumberID } from "@/lib/utils";

/**
 * CountUp — animasi angka dari 0 ke target menggunakan requestAnimationFrame
 * murni (tanpa anime.js) saat elemen masuk viewport.
 */
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const wrapRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-60px" });
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!isInView || hasAnimated.current || !spanRef.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const el = spanRef.current;

    function easeOutExpo(t: number): number {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(easedProgress * target);

      if (el) {
        el.textContent = formatNumberID(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={wrapRef} className="inline-flex items-baseline tabular-nums">
      {prefix}
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  );
}
