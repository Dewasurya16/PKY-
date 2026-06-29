import { notFound } from "next/navigation";
import { newsItems } from "@/lib/site";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = newsItems.find((n) => n.slug === resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-navy-dark">
      <Navbar />
      
      <div className="flex-1 pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="mb-8">
            <Link 
              href="/#berita" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
          </div>

          <Badge tone="teal" className="mb-6">
            {item.category}
          </Badge>

          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl dark:text-white mb-6 leading-tight">
            {item.title}
          </h1>

          <div className="flex items-center gap-2 text-sm font-medium text-text-muted mb-8 border-b border-gray-100 pb-8 dark:border-white/10">
            <Calendar size={16} />
            <span>{item.date}</span>
          </div>

          {item.image && (
            <div className="mb-10 w-full overflow-hidden rounded-3xl bg-surface-soft">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary dark:text-white/80">
            {item.content?.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
