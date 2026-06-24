"use client";

import { SectionTag } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { orgMembers } from "@/lib/site";
import { UserCheck } from "lucide-react";
import Image from "next/image"; // In a real app we'd use Next Image, here we'll use a placeholder div or img

export function Organization() {
  return (
    <section id="tim" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag align="center">Struktural PKY</SectionTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Pusat Pengelola Fasilitas Kesehatan Yustisial
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Biro yang berdedikasi membina dan mengawasi Klinik serta Rumah Sakit Adhyaksa untuk menjamin kualitas layanan kesehatan aparatur.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orgMembers.map((member, i) => (
            <StaggerItem key={member.name}>
              <div className="group relative overflow-hidden rounded-3xl bg-surface-muted p-1 hover-lift">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 relative">
                  <Image
                    src={member.image || "/image/placeholder.png"}
                    alt={member.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
