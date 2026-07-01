/**
 * Tipe data sentral yang di-share antara frontend dan backend.
 * Setiap tipe merepresentasikan satu baris dari tabel database.
 * Tipe ini TIDAK di-infer dari Zod karena juga dikonsumsi oleh
 * Server Components yang tidak memerlukan validasi runtime.
 */

// ──────────────────────────── News ────────────────────────────

export type News = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

// ──────────────────────────── Downloads ────────────────────────────

export type Download = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: string;
  file_type: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

// ──────────────────────────── Facilities ────────────────────────────

export type Facility = {
  id: string;
  slug: string;
  name: string;
  type: string;
  address: string;
  status: string;
  contact: string;
  is_available: boolean;
  description: string;
  services: string[];
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
};

// ──────────────────────────── Info Requests ────────────────────────────

export type InfoRequest = {
  id: string;
  facility_name: string;
  user_name: string;
  email_kejaksaan: string;
  status: "pending" | "selesai";
  created_at: string;
  updated_at: string;
};

// ──────────────────────────── Action State ────────────────────────────

/**
 * Format respons konsisten untuk semua Server Actions.
 * Mengikuti SOP ECC API Response Format.
 */
export type ActionState = {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  warning?: string;
};

// ──────────────────────────── Constants ────────────────────────────

export const NEWS_CATEGORIES = [
  "Pengumuman",
  "Layanan",
  "Edukasi",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const DOWNLOAD_CATEGORIES = [
  "Regulasi",
  "SOP",
  "Panduan",
  "Formulir",
] as const;

export type DownloadCategory = (typeof DOWNLOAD_CATEGORIES)[number];

export const FACILITY_TYPES = [
  "Rumah Sakit Umum",
  "Rumah Sakit Khusus",
  "Klinik Pratama",
  "Klinik Utama",
] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number];

export const FACILITY_STATUSES = [
  "Akreditasi Paripurna",
  "Akreditasi Utama",
  "Akreditasi Madya",
  "Dalam Pembangunan",
  "Beroperasi",
] as const;

export type FacilityStatus = (typeof FACILITY_STATUSES)[number];

// ──────────────────────────── Storage ────────────────────────────

export const STORAGE_BUCKETS = {
  NEWS_IMAGES: "news-images",
  DOCUMENTS: "documents",
  FACILITY_IMAGES: "facility-images",
} as const;

export const MAX_FILE_SIZES = {
  IMAGE: 10 * 1024 * 1024,      // 10 MB
  DOCUMENT: 25 * 1024 * 1024,  // 25 MB
} as const;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

// ──────────────────────────── MCU Schedules ────────────────────────────

/**
 * Representasi satu baris dari tabel `mcu_schedules`.
 * Digunakan untuk menyuplai konteks jadwal MCU ke chatbot AI.
 */
export type McuSchedule = {
  id: string;
  facility_id: string;
  facility_name?: string;
  schedule_date: string;
  time_start: string;
  time_end: string;
  description: string | null;
  quota: number;
  registered: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type McuRegistration = {
  id: string;
  schedule_id: string;
  nama_pegawai: string;
  nip_nrp: string;
  email_pegawai: string;
  schedule_date?: string; // from join
  facility_name?: string; // from join
  created_at: string;
  updated_at: string;
};

// ──────────────────────────── Chat ────────────────────────────

/**
 * Format pesan chat untuk komunikasi client ↔ API route chatbot.
 */
export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

