"use client";

import * as React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { McuResponseModal } from "@/components/admin/McuResponseModal";
import type { McuRegistration } from "@/lib/types/database";

export function McuRegistrationsClient({ initialData }: { initialData: McuRegistration[] }) {
  const columns = React.useMemo(() => [
    {
      key: "id",
      label: "No. Registrasi",
      render: (item: McuRegistration) => (
        <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-navy dark:text-white">
          {item.id.substring(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Tgl Daftar",
      render: (item: McuRegistration) => new Date(item.created_at).toLocaleDateString("id-ID"),
    },
    {
      key: "schedule_date",
      label: "Jadwal & Fasilitas",
      render: (item: McuRegistration) => (
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">{item.schedule_date}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.facility_name}</div>
        </div>
      ),
    },
    {
      key: "nama_pegawai",
      label: "Pegawai",
      render: (item: McuRegistration) => (
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.nama_pegawai}</div>
          <div className="inline-block mt-1 font-mono text-[10px] bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">
            NIP/NRP: {item.nip_nrp}
          </div>
        </div>
      ),
    },
    {
      key: "email_pegawai",
      label: "Email",
      render: (item: McuRegistration) => item.email_pegawai,
    },
    {
      key: "aksi",
      label: "Aksi",
      render: (item: McuRegistration) => (
        <McuResponseModal
          registrationId={item.id}
          name={item.nama_pegawai}
          email={item.email_pegawai}
          scheduleDate={item.schedule_date || "-"}
          facilityName={item.facility_name || "-"}
        />
      ),
    },
  ], []);

  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy dark:text-white">Pendaftar MCU</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Kelola data pegawai yang telah mendaftar Medical Check-Up dan kirim email pemberitahuan.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy">
        <DataTable
          data={initialData}
          columns={columns}
          searchPlaceholder="Cari pendaftar..."
          searchKey="nama_pegawai"
        />
      </div>
    </main>
  );
}
