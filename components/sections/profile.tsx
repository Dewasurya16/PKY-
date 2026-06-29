"use client";

import { SectionTag } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Motion";
import { Tabs } from "@/components/ui/Motion";
import { profileTabs, site } from "@/lib/site";
import { Play, Shield, Award, Clock } from "lucide-react";

export function Profile() {
  return (
    <section id="tentang" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Left: Visual */}
          <Reveal direction="left">
            <div className="relative">
              {/* Main container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-8 lg:p-12">
                {/* Grid pattern overlay */}
                <div className="grid-pattern absolute inset-0 opacity-30" />

                <div className="relative text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Play size={28} className="ml-1 text-white" fill="white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Tentang {site.shortName}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    Pelayanan kesehatan profesional untuk aparatur kejaksaan
                  </p>
                </div>

                {/* Mini stats */}
                <div className="relative mt-10 grid grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: "Terpercaya", value: "Sejak 2010" },
                    { icon: Award, label: "Bersertifikat", value: "ISO 9001" },
                    { icon: Clock, label: "Responsif", value: "24 Jam" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-white/5 p-3 text-center backdrop-blur-sm"
                    >
                      <item.icon size={18} className="mx-auto text-primary-200" />
                      <p className="mt-2 text-xs font-bold text-white">{item.value}</p>
                      <p className="text-[10px] text-white/50">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-glow-accent">
                <Award size={24} className="text-white" />
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div>
            <Reveal>
              <SectionTag>Tentang Kami</SectionTag>
              <h2 className="mt-5 max-w-lg text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Dipercaya melayani kesehatan aparatur kejaksaan di seluruh Indonesia.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
                {site.fullName} ({site.shortName}) adalah unit pelaksana teknis di bawah{" "}
                {site.institution} yang bertanggung jawab menyelenggarakan
                pelayanan kesehatan menyeluruh — dari promotif, preventif, hingga
                kuratif dan rehabilitatif.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <Tabs
                tabs={profileTabs.map((tab) => ({
                  label: tab.label,
                  content: (
                    <ul className="space-y-4">
                      {tab.body.map((line, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[15px] leading-relaxed text-text-secondary"
                        >
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  ),
                }))}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
