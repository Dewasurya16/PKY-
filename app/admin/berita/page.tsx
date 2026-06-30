import { getAllNews } from "@/lib/queries/news.queries";
import { BeritaPageClient } from "./BeritaPageClient";

export const dynamic = "force-dynamic";

/**
 * Server Component: Halaman admin manajemen berita.
 * Fetch data di server, lalu delegasi interaktivitas ke Client Component.
 */
export default async function AdminBeritaPage() {
  const news = await getAllNews();

  return <BeritaPageClient initialData={news} />;
}
