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
          <SectionTag align="center">Tim Medis BPKY</SectionTag>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            Tenaga profesional kesehatan di lingkungan yudikatif
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Tim dokter spesialis dan tenaga medis berpengalaman yang berdedikasi menjaga kesehatan aparatur kejaksaan.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orgMembers.map((member, i) => (
            <StaggerItem key={member.name}>
              <div className="group relative overflow-hidden rounded-3xl bg-surface-muted p-1 hover-lift">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-200 relative">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-100 to-primary-50 flex items-center justify-center text-primary-200">
                    <UserCheck size={64} className="opacity-20" />
                  </div>
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
