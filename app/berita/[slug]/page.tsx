import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/queries/news.queries";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = await getNewsBySlug(resolvedParams.slug);

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
            <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>

          {item.image_url && (
            <div className="mb-10 relative w-full overflow-hidden rounded-3xl bg-surface-soft aspect-[21/9]">
              <Image 
                fill
                src={item.image_url} 
                alt={item.title} 
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-4 prose-p:leading-relaxed whitespace-pre-wrap text-justify">
            {parse(DOMPurify.sanitize(item.content))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
