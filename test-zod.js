const { z } = require("zod");

const newsInsertSchema = z.object({
  title: z.string().min(10).max(200),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(50),
  category: z.enum(["Pengumuman", "Layanan", "Edukasi"]),
  published_at: z.string().datetime().optional(),
  is_published: z.boolean().default(false),
});

const rawInput = {
  title: "Ini adalah judul berita test yang cukup panjang",
  excerpt: "Ini adalah ringkasan berita test yang lebih dari 20 karakter.",
  content: "Ini adalah konten berita yang sangat panjang sehingga memenuhi syarat minimum 50 karakter yang ditetapkan oleh Zod.",
  category: "Pengumuman",
  published_at: "2026-06-30T13:36",
  is_published: true,
};

const parsed = newsInsertSchema.safeParse(rawInput);
if (!parsed.success) {
  console.error(parsed.error.flatten());
} else {
  console.log("Success:", parsed.data);
}
