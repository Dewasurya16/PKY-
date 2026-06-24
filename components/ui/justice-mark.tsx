"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * JusticeHeartbeatMark — Logo visual PKY: garis EKG (denyut kesehatan)
 * yang menyatu menjadi timbangan keadilan (yudikatif).
 * Menggunakan CSS animation untuk draw-in agar menghindari dependency animejs.
 */
export function JusticeHeartbeatMark({
  className,
  strokeWidth = 2.5,
  size = 260,
}: {
  className?: string;
  strokeWidth?: number;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 250 120"
      width={size}
      height={(size * 120) / 250}
      fill="none"
      className={cn("overflow-visible", className)}
      aria-label="Lambang denyut kesehatan menyatu dengan timbangan keadilan"
      role="img"
    >
      {/* Garis EKG menyatu menjadi tiang timbangan */}
      <path
        d="M5,70 H45 L55,35 L68,100 L80,45 L92,70 H115 V26"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
        style={{
          strokeDasharray: 340,
          strokeDashoffset: 340,
          animation: "draw-line 1.2s ease-in-out 0.3s forwards",
        }}
      />

      {/* Timbangan keadilan */}
      <path
        d="M60,26 H170 M115,26 V102 M91,102 H139
           M60,26 L44,58 M60,26 L76,58 M44,58 Q60,74 76,58
           M170,26 L154,58 M170,26 L186,58 M154,58 Q170,74 186,58"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        style={{
          strokeDasharray: 550,
          strokeDashoffset: 550,
          animation: "draw-line 1.4s ease-in-out 1.2s forwards",
        }}
      />

      <circle
        cx="115"
        cy="26"
        r="4.5"
        fill="currentColor"
        className="text-accent"
        style={{
          opacity: 0,
          animation: "fade-scale-in 0.4s ease-out 2.3s forwards",
        }}
      />

      <style>{`
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-scale-in {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </svg>
  );
}
