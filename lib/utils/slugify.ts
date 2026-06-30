/**
 * Mengubah string judul menjadi URL-safe slug.
 * Menangani karakter Indonesia (diakritik) dan tanda baca.
 *
 * @example slugify("Jadwal MCU Semester II 2026") → "jadwal-mcu-semester-ii-2026"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Hapus diakritik
    .replace(/[^a-z0-9\s-]/g, "")   // Hanya alfanumerik, spasi, dan hyphen
    .replace(/\s+/g, "-")           // Spasi → hyphen
    .replace(/-+/g, "-")            // Hapus hyphen ganda
    .replace(/^-|-$/g, "");         // Hapus hyphen di awal/akhir
}
