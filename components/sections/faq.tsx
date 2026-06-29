"use client";

import { SectionTag } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Motion";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/site";
import { MessageCircleQuestion } from "lucide-react";

export function Faq() {
  return (
    <section id="faq" className="bg-surface-soft py-24 lg:py-28 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal direction="left">
            <div className="sticky top-32">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-card mb-6">
                <MessageCircleQuestion size={24} className="text-primary" />
              </div>
              <SectionTag>FAQ</SectionTag>
              <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Pertanyaan yang sering diajukan
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                Temukan jawaban cepat untuk pertanyaan umum seputar layanan, fasilitas, dan prosedur pendaftaran di Pusat Kesehatan Yustisial.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative z-10">
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
