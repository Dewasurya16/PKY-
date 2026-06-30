"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Stethoscope, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Facility } from "@/lib/types/database";

const InfoRequestModal = dynamic(
  () =>
    import("@/components/ui/InfoRequestModal").then(
      (mod) => mod.InfoRequestModal,
    ),
  { ssr: false },
);

interface FacilitySearchResultsProps {
  /** Daftar fasilitas hasil pencarian. */
  facilities: Facility[];
  /** Tipe fasilitas yang dipilih sebagai filter. */
  selectedType: string;
}

/**
 * Komponen client untuk menampilkan hasil pencarian fasilitas.
 * Menangani interaksi "Minta Informasi Detail" dan modal sukses.
 */
export function FacilitySearchResults({
  facilities,
  selectedType,
}: FacilitySearchResultsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");

  /**
   * Handler untuk tombol "Minta Informasi Detail".
   * Membuka modal sukses dengan nama fasilitas terkait.
   */
  const handleRequestInfo = (facilityName: string) => {
    setSelectedFacility(facilityName);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Filter Badge */}
      {selectedType && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-text-muted dark:text-white/50">
            Filter:
          </span>
          <Badge tone="blue">{selectedType}</Badge>
          <span className="text-sm text-text-muted dark:text-white/50">
            — {facilities.length} hasil ditemukan
          </span>
        </div>
      )}

      {/* Results */}
      {facilities.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/50 text-center dark:border-white/10 dark:bg-navy/30">
          <Stethoscope
            size={48}
            className="mb-4 text-text-muted dark:text-white/20"
          />
          <h3 className="mb-2 text-xl font-bold text-navy dark:text-white">
            Tidak ada fasilitas ditemukan
          </h3>
          <p className="text-sm text-text-secondary dark:text-white/60">
            Belum ada data fasilitas dengan tipe &quot;{selectedType}&quot;
            yang terdaftar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {facilities.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md dark:border-white/10 dark:bg-navy dark:hover:border-primary/50 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Info */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{item.type}</Badge>
                  <Badge tone={item.is_available ? "emerald" : "amber"}>
                    {item.status}
                  </Badge>
                </div>

                <h3 className="font-display text-xl font-bold text-navy dark:text-white">
                  {item.name}
                </h3>

                <p className="text-sm text-text-secondary dark:text-white/70 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-5 text-sm text-text-secondary dark:text-white/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    <span>{item.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} className="text-primary" />
                    <span>{item.contact}</span>
                  </div>
                </div>

                {item.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.services.slice(0, 4).map((svc) => (
                      <span
                        key={svc}
                        className="rounded-lg bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-text-muted dark:bg-white/10 dark:text-white/50"
                      >
                        {svc}
                      </span>
                    ))}
                    {item.services.length > 4 && (
                      <span className="text-[11px] text-text-muted dark:text-white/40">
                        +{item.services.length - 4} lainnya
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-2 lg:items-end shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full lg:w-auto gap-2"
                  disabled={!item.is_available}
                  onClick={() => handleRequestInfo(item.name)}
                >
                  <Info size={16} />
                  Minta Informasi Detail
                </Button>
                {!item.is_available && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 text-center lg:text-right">
                    Fasilitas belum beroperasi
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Success Modal */}
      <InfoRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facilityName={selectedFacility}
      />
    </>
  );
}
