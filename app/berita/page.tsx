import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { newsItems } from "@/lib/site";

export default function AllNewsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-soft dark:bg-navy-dark">
      <Navbar />
      
      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <Link 
              href="/#berita" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
            <h1 className="font-display text-4xl font-extrabold text-navy sm:text-5xl dark:text-white mb-4">
              Berita & Informasi
            </h1>
            <p className="text-lg text-text-secondary dark:text-white/70">
              Kumpulan informasi, pengumuman, dan berita terbaru seputar layanan kesehatan aparatur Kejaksaan.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <div key={item.slug} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 dark:bg-navy dark:border-white/10 border border-transparent">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-50">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary-100 to-accent-soft/50">
                      <Calendar size={48} className="text-primary-200 opacity-50" />
                    </div>
                  )}
                  <div className="absolute left-4 top-4">
                    <Badge tone="teal" className="bg-white/90 backdrop-blur-sm shadow-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium text-text-muted dark:text-white/50">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug text-navy transition-colors group-hover:text-primary dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3 dark:text-white/70">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/berita/${item.slug}`}
                    className="mt-6 flex w-fit items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark dark:text-primary-light"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
