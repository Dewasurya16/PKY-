import { getAllFacilities } from "@/lib/queries/facility.queries";
import { RumahSakitPageClient } from "./RumahSakitPageClient";

export const dynamic = "force-dynamic";

/**
 * Server Component: Halaman admin manajemen fasilitas kesehatan.
 * Fetch data di server, delegasi interaktivitas ke Client Component.
 */
export default async function AdminRumahSakitPage() {
  const facilities = await getAllFacilities();

  return <RumahSakitPageClient initialData={facilities} />;
}
