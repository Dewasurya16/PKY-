"use client";

import { useActionState, useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { FormField } from "@/components/admin/FormField";
import { FileUpload } from "@/components/admin/FileUpload";
import { ServiceTagsInput } from "@/components/admin/ServiceTagsInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { createFacility, updateFacility, deleteFacility } from "@/lib/actions/facility.actions";
import type { Facility, ActionState } from "@/lib/types/database";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { FACILITY_TYPES, FACILITY_STATUSES } from "@/lib/types/database";

// ──────────────────────────── Form Input Styles ────────────────────────────

const INPUT_CLASS =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-navy dark:text-white dark:focus:border-primary-light";

const SELECT_CLASS = INPUT_CLASS;

const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;

// ──────────────────────────── Facility Form ────────────────────────────

type FacilityFormProps = {
  editItem?: Facility | null;
  onClose: () => void;
  onSuccess?: () => void;
};

function FacilityForm({ editItem, onClose, onSuccess }: FacilityFormProps) {
  const isEditing = Boolean(editItem);

  const action = isEditing ? updateFacility : createFacility;
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    { success: false },
  );

  useEffect(() => {
    // Tutup form setelah sukses
    if (state.success && !isPending) {
      if (onSuccess) onSuccess();
      // Delay agar user melihat pesan sukses
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [state.success, isPending, onSuccess, onClose]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-navy">
      <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">
        {isEditing ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
      </h3>

      {state.error && (
        <div className="mb-4 rounded-xl bg-rose-soft p-3 text-sm font-medium text-rose-DEFAULT dark:bg-rose-DEFAULT/10">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          Fasilitas berhasil {isEditing ? "diperbarui" : "ditambahkan"}!
        </div>
      )}

      <form action={formAction} className="space-y-5">
        {isEditing && <input type="hidden" name="id" value={editItem?.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Nama Fasilitas"
            name="name"
            isRequired
            error={state.fieldErrors?.name}
          >
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={editItem?.name ?? ""}
              placeholder="Contoh: RSU Adhyaksa Ceger"
              className={INPUT_CLASS}
              required
            />
          </FormField>

          <FormField
            label="Tipe Fasilitas"
            name="type"
            isRequired
            error={state.fieldErrors?.type}
          >
            <select
              id="type"
              name="type"
              defaultValue={editItem?.type ?? ""}
              className={SELECT_CLASS}
              required
            >
              <option value="">Pilih tipe</option>
              {FACILITY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField
          label="Alamat Lengkap"
          name="address"
          isRequired
          error={state.fieldErrors?.address}
        >
          <textarea
            id="address"
            name="address"
            rows={2}
            defaultValue={editItem?.address ?? ""}
            placeholder="Masukkan alamat lengkap fasilitas"
            className={TEXTAREA_CLASS}
            required
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Status Akreditasi"
            name="status"
            isRequired
            error={state.fieldErrors?.status}
          >
            <select
              id="status"
              name="status"
              defaultValue={editItem?.status ?? ""}
              className={SELECT_CLASS}
              required
            >
              <option value="">Pilih status</option>
              {FACILITY_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Kontak"
            name="contact"
            error={state.fieldErrors?.contact}
          >
            <input
              id="contact"
              name="contact"
              type="text"
              defaultValue={editItem?.contact ?? "-"}
              placeholder="(021) XXXX-XXXX"
              className={INPUT_CLASS}
            />
          </FormField>
        </div>

        <FormField
          label="Deskripsi"
          name="description"
          isRequired
          error={state.fieldErrors?.description}
        >
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={editItem?.description ?? ""}
            placeholder="Deskripsi lengkap tentang fasilitas ini"
            className={TEXTAREA_CLASS}
            required
          />
        </FormField>

        <FormField
          label="Layanan Tersedia"
          name="services"
          error={state.fieldErrors?.services}
          hint="Ketik nama layanan dan tekan Enter untuk menambahkan"
        >
          <ServiceTagsInput
            name="services"
            defaultValue={editItem?.services ?? []}
          />
        </FormField>

        <FormField label="Foto Fasilitas" name="image">
          <FileUpload
            name="image"
            accept=".jpg,.jpeg,.png,.webp"
            maxSizeMb={10}
            currentUrl={editItem?.image_url}
            variant="image"
          />
        </FormField>

        <FormField label="Ketersediaan" name="is_available">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="hidden"
              name="is_available"
              value={editItem?.is_available !== false ? "true" : "false"}
            />
            <input
              type="checkbox"
              defaultChecked={editItem?.is_available !== false}
              onChange={(e) => {
                const hidden = e.target.previousElementSibling as HTMLInputElement;
                hidden.value = e.target.checked ? "true" : "false";
              }}
              className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
            />
            <span className="text-sm text-text-secondary dark:text-white/70">
              Fasilitas tersedia / beroperasi
            </span>
          </label>
        </FormField>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-muted dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <SubmitButton
            label={isEditing ? "Perbarui Fasilitas" : "Simpan Fasilitas"}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          />
        </div>
      </form>
    </div>
  );
}

// ──────────────────────────── Delete Button ────────────────────────────

function DeleteButton({ item }: { item: Facility }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    deleteFacility,
    { success: false },
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item.id} />
      {item.image_url && (
        <input
          type="hidden"
          name="image_path"
          value={item.image_url.split("/").pop() ?? ""}
        />
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-rose-soft hover:text-rose-DEFAULT dark:text-white/40 dark:hover:bg-rose-DEFAULT/10 disabled:opacity-50"
        title="Hapus"
      >
        <Trash2 size={16} />
      </button>
      {state.error && (
        <span className="text-xs text-rose-DEFAULT">{state.error}</span>
      )}
    </form>
  );
}

// ──────────────────────────── Main Page Client ────────────────────────────

type RumahSakitPageClientProps = {
  initialData: Facility[];
};

export function RumahSakitPageClient({ initialData }: RumahSakitPageClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Facility | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    setIsRefetching(false);
  }, [initialData]);

  const handleEdit = (item: Facility) => {
    setEditItem(item);
    setIsFormOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
    setEditItem(null);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsRefetching(true);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy dark:text-white">
            Fasilitas Kesehatan
          </h2>
          <p className="mt-1 text-sm text-text-secondary dark:text-white/60">
            Kelola data rumah sakit, klinik, dan fasilitas kesehatan
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Plus size={18} />
            Tambah Fasilitas
          </button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && (
        <FacilityForm editItem={editItem} onClose={handleClose} onSuccess={handleSuccess} />
      )}

      {/* Table */}
      <DataTable<Facility & Record<string, unknown>>
        isLoading={isRefetching}
        data={initialData as (Facility & Record<string, unknown>)[]}
        searchKey="name"
        searchPlaceholder="Cari nama fasilitas..."
        columns={[
          {
            key: "name",
            label: "Nama",
            render: (item) => (
              <div className="max-w-xs">
                <p className="font-semibold text-navy dark:text-white line-clamp-1">
                  {item.name as string}
                </p>
                <p className="mt-0.5 text-xs text-text-muted dark:text-white/40 line-clamp-1">
                  {item.address as string}
                </p>
              </div>
            ),
          },
          {
            key: "type",
            label: "Tipe",
            render: (item) => (
              <span className="rounded-lg bg-navy/10 px-2.5 py-1 text-xs font-semibold text-navy dark:bg-white/10 dark:text-white/80">
                {item.type as string}
              </span>
            ),
          },
          {
            key: "status",
            label: "Akreditasi",
            render: (item) => (
              <span className="text-sm text-text-secondary dark:text-white/60">
                {item.status as string}
              </span>
            ),
          },
          {
            key: "services",
            label: "Layanan",
            render: (item) => {
              const services = item.services as string[];
              return (
                <span className="text-xs text-text-muted dark:text-white/50">
                  {services.length > 0 ? `${services.length} layanan` : "-"}
                </span>
              );
            },
          },
          {
            key: "is_available",
            label: "Status",
            render: (item) => (
              <StatusBadge
                isActive={item.is_available as boolean}
                activeLabel="Tersedia"
                inactiveLabel="Tidak Tersedia"
              />
            ),
          },
        ]}
        onRowAction={(item) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleEdit(item as unknown as Facility)}
              className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary dark:text-white/40 dark:hover:bg-primary/20"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <DeleteButton item={item as unknown as Facility} />
          </div>
        )}
      />
    </div>
  );
}
