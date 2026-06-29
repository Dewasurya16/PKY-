# Pusat Kesehatan Yustisial (PKY) — Kejaksaan RI

Portal resmi Pusat Kesehatan Yustisial (PKY) Kejaksaan Republik Indonesia. Membina dan mengelola layanan kesehatan aparatur kejaksaan secara profesional, modern, dan terpercaya.

## 🚀 Teknologi Utama

Proyek ini dibangun menggunakan arsitektur frontend statis yang modern dan optimal:
- **Framework:** [Next.js 15.5](https://nextjs.org/) (App Router)
- **UI Library:** [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/)

## ⚡ Fitur Utama & Optimasi Performa

Beranda situs ini terdiri dari berbagai seksi interaktif (Hero, Statistik, Profil, Galeri Fasilitas, Berita, FAQ, dll). 
Untuk memastikan pengalaman *First Contentful Paint* (FCP) dan *Time to Interactive* (TTI) yang secepat kilat (terutama di perangkat mobile via Vercel), proyek ini telah dioptimasi secara khusus:

1. **Lazy Loading Komponen Cerdas (`next/dynamic`)**
   - Komponen berat (seperti Galeri Carousel) dan elemen *below the fold* (di bawah pandangan layar pertama) ditunda pemuatannya.
   - Komponen widget (*FloatingChat*, *ScrollToTop*) dan modal dinamis dieksekusi secara asinkron tanpa memblokir benang utama browser.
2. **Optimasi LCP (*Largest Contentful Paint*)**
   - Aset visual utama pada elemen Hero diload menggunakan komponen `<Image>` Next.js lengkap dengan artibut `priority` dan `sizes` untuk render instan.

## 🛠️ Cara Menjalankan Secara Lokal

1. **Clone repository ini** (jika belum) dan masuk ke dalam folder proyek.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Akses `http://localhost:3000` di browser Anda.

4. **Build untuk Production:**
   ```bash
   npm run build
   npm run start
   ```

## 📂 Struktur Direktori Utama

- `/app` - Rute aplikasi (Next.js App Router). Mengandung halaman Beranda (`page.tsx`) dan tata letak akar (`layout.tsx`).
- `/components/sections` - Bagian-bagian modular halaman utama (Hero, Profil, Galeri, dll).
- `/components/ui` - Komponen antarmuka dasar yang bisa digunakan kembali (Button, Badge, Modal, dsb).
- `/lib` - File utilitas, termasuk `site.ts` yang berisi konfigurasi data statis (informasi lembaga, FAQ, berita, fasilitas kesehatan).
- `/public` - Aset statis berupa gambar (`/image/`) dan logo.

---
*Portal ini dideploy secara berkesinambungan di infrastruktur Vercel untuk memberikan akses yang cepat dan reliabel dari seluruh wilayah Indonesia.*

