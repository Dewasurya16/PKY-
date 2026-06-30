import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "teal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "teal" | "amber" | "navy" | "rose" | "blue" | "purple" | "emerald";
}) {
  const toneClasses = {
    teal: "bg-primary-50 text-primary-700 border-primary-100",
    amber: "bg-accent-soft text-accent-dark border-amber-200",
    navy: "bg-navy-50 text-navy-800 border-blue-200",
    rose: "bg-rose-soft text-rose-DEFAULT border-rose-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionTag({
  children,
  align = "left",
  light = false,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-bold uppercase tracking-widest2",
        light ? "text-primary-200" : "text-primary",
        align === "center" && "justify-center"
      )}
    >
      <span
        className={cn(
          "flex h-2 w-2 rounded-full",
          light ? "bg-primary-200 animate-pulse-slow" : "bg-primary animate-pulse-slow"
        )}
      />
      {children}
      <span
        className={cn(
          "h-px w-10",
          light ? "bg-primary-200/40" : "bg-primary/30"
        )}
      />
    </div>
  );
}
