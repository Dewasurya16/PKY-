# Portal MYKN — Majelis yustisial kesehatan Nasional

Landing page profil instansi pemerintah bertema **yustisial kesehatan**
(lembaga penegak etik & disiplin profesi kesehatan), dibangun dari nol dengan:

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** dengan token desain kustom (warna navy/teal/gold bertema
  kesehatan + kewibawaan hukum)
- **Framer Motion** — animasi scroll-reveal, stagger, hover, transisi tab/menu
- **anime.js** — animasi angka statistik (count-up) dan goresan SVG "draw-in"
  pada lambang denyut-kesehatan + timbangan keadilan di Hero
- Komponen UI bergaya **Nyxhora UI** (ShinyCard, MagicCard, Badge, Accordion,
  Tabs, Button) yang ditulis ulang sendiri dengan Tailwind + Radix-style
  pattern agar tidak menyalin source proprietary apa pun

> **Catatan:** "MYKN" dan seluruh data (nama pejabat, statistik, alamat)
> adalah **contoh/placeholder** untuk keperluan template — silakan ganti
> sesuai instansi Anda yang sebenarnya.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur proyek

```
app/
  layout.tsx        # root layout + metadata
  page.tsx           # merangkai seluruh section
  globals.css        # base style + utilitas (shiny-card, magic-card, dst)
components/
  ui/                # primitives ala Nyxhora UI (button, badge, cards, dst)
  sections/          # navbar, hero, stats, profil, proses, organisasi,
                      # berita, cta, faq, footer
lib/
  site.ts            # SEMUA konten teks & data — edit di sini untuk ganti
                      # nama instansi, statistik, anggota majelis, dst.
  utils.ts           # helper cn() dan formatNumberID()
```

## Mengubah konten

Hampir seluruh teks (nama instansi, alamat, statistik, tahapan sidang,
anggota majelis, berita, FAQ) terpusat di **`lib/site.ts`** — cukup edit
file itu tanpa menyentuh komponen.

## Mengganti font (opsional, untuk produksi)

Proyek ini memakai font-stack sistem secara default agar bisa langsung
di-build tanpa koneksi internet. Untuk tampilan final yang lebih khas,
tambahkan font asli via `next/font/google` di `app/layout.tsx`, misalnya:

```tsx
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
```

Lalu tambahkan `variable` tersebut ke `fontFamily` pada `tailwind.config.ts`.

## Menghubungkan formulir pengaduan ke backend

Tombol "Ajukan Pengaduan" dan kartu kanal pengaduan saat ini bersifat UI
saja (scroll ke section kontak). Untuk produksi, hubungkan ke:
- API/Endpoint pengaduan instansi Anda, atau
- Form builder (Google Forms/Tally) yang di-embed, atau
- Integrasi WhatsApp Business API untuk kanal WhatsApp resmi.

## Deploy

Proyek ini bisa dideploy ke Vercel, atau platform Node.js apa pun yang
mendukung Next.js (jalankan `npm run build` lalu `npm run start`).
