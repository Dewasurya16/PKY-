import { Metadata } from "next";
import { getAllInfoRequests } from "@/lib/queries/info-request.queries";
import { InfoRequestsClient } from "./InfoRequestsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Permintaan Informasi Detail - Admin PKY",
};

export default async function InfoRequestsPage() {
  const requests = await getAllInfoRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy dark:text-white mb-2">
          Permintaan Informasi Detail
        </h1>
        <p className="text-sm text-text-secondary dark:text-white/60">
          Kelola daftar permintaan informasi detail fasilitas kesehatan dari pegawai/masyarakat.
        </p>
      </div>

      <InfoRequestsClient initialData={requests} />
    </div>
  );
}
