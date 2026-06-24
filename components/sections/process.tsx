"use client";

import { SectionTag } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { ServiceCard } from "@/components/ui/cards";
import { services } from "@/lib/site";
import { Stethoscope, HeartPulse, Pill, Activity, ClipboardCheck, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  HeartPulse,
  Pill,
  Activity,
  ClipboardCheck,
  Ambulance,
};

export function Process() {
  return (
    <section id="layanan" className="bg-surface-muted py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag align="center">Layanan BPKY</SectionTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Layanan kesehatan komprehensif untuk aparatur kejaksaan
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <StaggerItem key={service.title}>
                <ServiceCard className="flex h-full flex-col">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl icon-container ${service.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </ServiceCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Lihat Semua Layanan
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
