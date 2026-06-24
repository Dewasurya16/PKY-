"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { SectionTag, Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { newsItems } from "@/lib/site";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function News() {
  return (
    <section id="berita" className="bg-surface-muted py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionTag>Berita & Informasi</SectionTag>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
              Informasi terkini seputar layanan kesehatan aparatur
            </h2>
          </div>
          <Link href="/berita" className="hidden sm:flex">
            <Button variant="outline">
              Lihat Semua Berita
            </Button>
          </Link>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3">
          {newsItems.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-50">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary-100 to-accent-soft/50">
                      <Calendar size={48} className="text-primary-200 opacity-50" />
                    </div>
                  )}
                  <div className="absolute left-4 top-4">
                    <Badge tone="teal" className="bg-white/90 backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium text-text-muted">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug text-navy transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/berita/${item.slug}`}
                    className="mt-6 flex w-fit items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        
        <Reveal className="mt-10 flex justify-center sm:hidden">
          <Link href="/berita" className="w-full">
            <Button variant="outline" className="w-full">
              Lihat Semua Berita
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
