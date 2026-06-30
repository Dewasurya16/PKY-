import { getAllDownloads } from "@/lib/queries/download.queries";
import { UnduhanPageClient } from "./UnduhanPageClient";

export const dynamic = "force-dynamic";

/**
 * Server Component: Halaman admin manajemen unduhan PPID.
 * Fetch data di server, delegasi interaktivitas ke Client Component.
 */
export default async function AdminUnduhanPage() {
  const downloads = await getAllDownloads();

  return <UnduhanPageClient initialData={downloads} />;
}
