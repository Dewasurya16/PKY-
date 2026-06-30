"use client";

import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/site";
import { Users, ThumbsUp, Globe, UserCheck } from "lucide-react";

const icons = [Users, ThumbsUp, Globe, UserCheck];

export function StatsStrip() {
  return (
    <section className="relative bg-surface-muted py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem
                key={s.label}
                className="group relative rounded-2xl bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover lg:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </div>
                <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-text-secondary">
                  {s.label}
                </p>
                {/* Decorative corner */}
                <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
