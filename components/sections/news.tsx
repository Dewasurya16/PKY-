"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { SectionTag, Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { News as NewsType } from "@/lib/types/database";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

function FeaturedNewsCard({ item }: { item: NewsType }) {
  return (
    <Reveal className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 dark:bg-navy dark:shadow-none dark:border dark:border-white/10 dark:hover:border-primary/50">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-50 dark:bg-white/5">
          {item.image_url ? (
            <Image 
              src={item.image_url} 
              alt={item.title} 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary-100 to-accent-soft/50 dark:from-navy-dark dark:to-navy">
              <Calendar size={48} className="text-primary-200 opacity-50 dark:text-white/20" aria-hidden="true" />
            </div>
          )}
          <div className="absolute left-5 top-5">
            <Badge tone="teal" className="bg-white/90 backdrop-blur-sm shadow-sm dark:bg-navy/90 dark:text-primary-light">
              {item.category}
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-text-muted dark:text-white/50">
            <Calendar size={16} aria-hidden="true" />
            <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-navy transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 text-sm sm:text-base leading-relaxed text-text-secondary line-clamp-3 dark:text-white/70">
            {item.excerpt}
          </p>
          <Link
            href={`/berita/${item.slug}`}
            aria-label={`Baca selengkapnya tentang ${item.title}`}
            className="mt-5 flex w-fit items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark dark:text-primary-light dark:hover:text-white"
          >
            Baca Selengkapnya <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function CompactNewsCard({ item }: { item: NewsType }) {
  return (
    <StaggerItem>
      <div className="group flex flex-col sm:flex-row overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 dark:bg-navy dark:shadow-none dark:border dark:border-white/10 dark:hover:border-primary/50">
        <div className="relative h-48 sm:h-auto sm:w-48 shrink-0 overflow-hidden bg-primary-50 dark:bg-white/5">
          {item.image_url ? (
            <Image 
              src={item.image_url} 
              alt={item.title} 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary-100 to-accent-soft/50 dark:from-navy-dark dark:to-navy">
              <Calendar size={32} className="text-primary-200 opacity-50 dark:text-white/20" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge tone="teal" className="bg-primary-50 dark:bg-primary/20 dark:text-primary-light">
              {item.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted dark:text-white/50">
              <Calendar size={12} aria-hidden="true" />
              <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <h3 className="font-display text-xl font-bold leading-snug text-navy transition-colors group-hover:text-primary line-clamp-2 dark:text-white dark:group-hover:text-primary-light">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary line-clamp-2 dark:text-white/70 text-justify">
            {item.excerpt}
          </p>
          <Link
            href={`/berita/${item.slug}`}
            aria-label={`Baca lebih lanjut tentang ${item.title}`}
            className="mt-4 flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark dark:text-primary-light dark:hover:text-white"
          >
            Baca Selengkapnya <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </StaggerItem>
  );
}

export function News({ newsItems = [] }: { newsItems?: NewsType[] }) {
  return (
    <section 
      id="berita" 
      aria-labelledby="news-heading"
      className="bg-surface-muted py-24 lg:py-28 dark:bg-navy-dark"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionTag>Berita & Informasi</SectionTag>
            <h2 
              id="news-heading"
              className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl dark:text-white"
            >
              Informasi terkini seputar layanan kesehatan aparatur
            </h2>
          </div>
          <Link href="/berita" className="hidden sm:flex">
            <Button variant="outline" className="dark:border-white/20 dark:text-white dark:hover:bg-white/10">
              Lihat Semua Berita
            </Button>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Featured News (Left) */}
          {newsItems.length > 0 ? (
            <div className="flex flex-col">
              <FeaturedNewsCard item={newsItems[0]} />
            </div>
          ) : (
            <div className="py-10 text-center text-text-muted">
              Belum ada berita yang diterbitkan.
            </div>
          )}

          {/* Other News List (Right) */}
          <div className="flex flex-col justify-start gap-5">
            <Stagger className="flex flex-col gap-6">
              {newsItems.slice(1, 3).map((item) => (
                <CompactNewsCard key={item.slug} item={item} />
              ))}
            </Stagger>
          </div>
        </div>
        
        <Reveal className="mt-10 flex justify-center sm:hidden">
          <Link href="/berita" className="w-full">
            <Button variant="outline" className="w-full dark:border-white/20 dark:text-white dark:hover:bg-white/10">
              Lihat Semua Berita
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
