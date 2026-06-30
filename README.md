# Portal Mahkamah Kesehatan (Pusat Kesehatan Yustisial / PKY)

Selamat datang di repositori modernisasi **Portal Pusat Kesehatan Yustisial (PKY)** Kejaksaan Republik Indonesia. Proyek ini dibangun untuk mendigitalisasi layanan kesehatan dan transparansi publik secara terintegrasi, aman, dan berkinerja tinggi.

## 🚀 Teknologi Utama (Tech Stack)

Sistem ini didukung oleh ekosistem modern yang kokoh dan disiapkan untuk skala produksi:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL & RLS Security)
- **Email Engine**: [Resend API](https://resend.com/)
- **PDF Engine**: [PDFKit](https://pdfkit.org/) terintegrasi via Edge/Node
- **Validation**: [Zod](https://zod.dev/) untuk validasi form end-to-end
- **Styling**: Tailwind CSS & Shadcn/UI (Framer Motion, Sonner Toasts)

## 📌 Fitur Utama Terintegrasi

1. **Layanan MCU Dinamis (End-to-End)**
   - Manajemen jadwal MCU dan pemantauan kuota oleh Admin.
   - Pendaftaran mandiri via publik dengan pencegahan kuota penuh (*real-time*).
   - Pengiriman Bukti Pendaftaran berformat PDF resmi otomatis ke email pendaftar.
2. **Whistleblowing System (WBS) & PPID**
   - Panel respon admin terpusat untuk membalas pelaporan (WBS) dan permohonan informasi publik (PPID).
   - Integrasi respons ke email pemohon menggunakan Resend API.
   - Ekstraksi PDF dari riwayat aduan dan respons (Unduh Laporan PDF).
3. **Optimasi Performa Ekstrim**
   - *Image & Font Lazy-Loading* (Skor LCP optimal).
   - Caching statis tingkat lanjut (`max-age=31536000`).
   - Eksekusi Server Actions tanpa blocking dengan status *loading spinner* dan proteksi duplikasi data (Zero Double-Submit).
4. **Chatbot AI Kenopia**
   - Terintegrasi dengan Grok AI untuk menjawab pertanyaan spesifik seputar layanan kesehatan yustisial.

## 🛠️ Cara Setup (Development)

Pastikan Anda memiliki Node.js v18+ dan NPM terinstal.

1. **Clone & Install Dependensi**:
   ```bash
   git clone <repository_url>
   cd "PKY-"
   npm install
   ```

2. **Konfigurasi Environment**:
   Buat file `.env.local` di root direktori dengan menyalin dari referensi:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role
   RESEND_API_KEY=your_resend_api_key
   GROK_API_KEY=gsk_your_groq_api_key
   ```

3. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

## 📦 Deployment (Production)

Proyek ini telah dikeraskan (*hardened*) untuk lolos *build* Vercel atau environment Node.js standar.
Eksekusi:
```bash
npm run build
npm start
```
*Catatan: Pastikan dependensi eksternal seperti `pdfkit` telah lolos pre-bundle (dikonfigurasi dalam `serverExternalPackages` di `next.config.mjs`).*

---
**Pusat Kesehatan Yustisial** - Kejaksaan Republik Indonesia
*Membangun kesehatan aparatur untuk penegakan hukum yang berintegritas.*
