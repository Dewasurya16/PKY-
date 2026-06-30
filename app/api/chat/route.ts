import { NextRequest, NextResponse } from "next/server";
import { getAvailableFacilities } from "@/lib/queries/facility.queries";
import { getMcuSchedulesToday } from "@/lib/queries/mcu.queries";
import { createRateLimiter, getClientIp } from "@/lib/utils/rate-limiter";
import { logError } from "@/lib/utils/logger";
import type { ChatMessage } from "@/lib/types/database";

/**
 * Rate limiter untuk endpoint chatbot.
 * Membatasi 10 pesan per menit per IP untuk mencegah abuse
 * tanpa mengganggu penggunaan normal aparatur internal.
 *
 * Singleton — dibuat sekali saat cold start, dipakai ulang antar request.
 */
const chatLimiter = createRateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 menit
});

/**
 * System prompt untuk chatbot PKY.
 * Mengonfigurasi persona AI sebagai Asisten Pintar PKY
 * dengan batasan topik dan gaya bicara profesional.
 */
const SYSTEM_PROMPT = `Kamu adalah **Asisten Pintar PKY** (Pusat Kesehatan Yustisial), chatbot resmi milik Kejaksaan Republik Indonesia.

## IDENTITAS
- Nama: Asisten PKY
- Peran: Asisten informasi kesehatan digital untuk aparatur Kejaksaan RI
- Nada bicara: Profesional, ramah, informatif, dan mengutamakan akurasi
- Bahasa: Bahasa Indonesia baku, ringkas tapi lengkap

## KEMAMPUAN
1. Memberikan informasi mengenai fasilitas kesehatan (Klinik & RS Adhyaksa) di jaringan PKY berdasarkan data terkini dari database.
2. Menginformasikan jadwal MCU (Medical Check-Up) hari ini.
3. Menjelaskan layanan PKY: telemedicine 24 jam, konsultasi spesialis, rujukan, farmasi.
4. Menjawab pertanyaan umum seputar prosedur administrasi kesehatan di lingkungan Kejaksaan RI.
5. Menginformasikan cara mengajukan permohonan PPID atau melaporkan pengaduan WBS.

## BATASAN
- JANGAN memberikan diagnosis medis atau saran pengobatan spesifik.
- JANGAN menjawab pertanyaan di luar konteks kesehatan aparatur kejaksaan.
- Jika tidak tahu, arahkan pengguna ke hotline PKY: 0800-1-500-600 atau email: pky@kejaksaan.go.id
- Selalu utamakan akurasi data. Jika data tidak tersedia di konteks, nyatakan dengan jujur.
- Jawab dalam maksimal 3 paragraf kecuali diminta detail.

## FORMAT
- Gunakan markdown ringan (bold, list) untuk keterbacaan.
- Sertakan nomor telepon/alamat jika relevan.`;

/**
 * Membangun konteks data real-time dari Supabase
 * untuk diinjeksikan ke dalam system prompt.
 *
 * @returns String konteks data fasilitas dan jadwal MCU
 */
async function buildDynamicContext(): Promise<string> {
  try {
    const [facilities, mcuToday] = await Promise.all([
      getAvailableFacilities(),
      getMcuSchedulesToday(),
    ]);

    const facilityContext =
      facilities.length > 0
        ? facilities
            .map(
              (f) =>
                `- **${f.name}** (${f.type}) | Alamat: ${f.address} | Tel: ${f.contact} | Status: ${f.status} | Layanan: ${f.services.join(", ") || "-"}`,
            )
            .join("\n")
        : "Belum ada data fasilitas yang terdaftar.";

    const todayStr = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const mcuContext =
      mcuToday.length > 0
        ? mcuToday
            .map(
              (m) =>
                `- **${m.facility_name}**: ${m.time_start}–${m.time_end} | Kuota: ${m.registered}/${m.quota} terdaftar | ${m.description ?? "MCU Berkala"}`,
            )
            .join("\n")
        : "Tidak ada jadwal MCU hari ini.";

    return `\n\n## DATA KONTEKS TERKINI\n\n### Daftar Fasilitas Kesehatan Aktif:\n${facilityContext}\n\n### Jadwal MCU Hari Ini (${todayStr}):\n${mcuContext}`;
  } catch (error) {
    await logError("buildDynamicContext", error);
    return "\n\n## DATA KONTEKS\nData tidak tersedia saat ini. Arahkan pengguna ke hotline PKY.";
  }
}

/**
 * POST /api/chat
 *
 * API Route untuk chatbot PKY berbasis Grok (xAI).
 * Menerima array pesan chat, membangun konteks dari Supabase,
 * dan mengembalikan streaming response dari Grok.
 */
export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ──────────────────────────────────────────────
    const clientIp = getClientIp(request.headers);
    const rateLimit = chatLimiter.check(clientIp);

    if (!rateLimit.allowed) {
      console.warn(
        `[POST /api/chat] Rate limit exceeded for IP: ${clientIp}`,
      );
      return NextResponse.json(
        {
          error:
            "Mohon maaf, Anda telah mencapai batas penggunaan chatbot " +
            "(maks. 10 pesan/menit). Silakan tunggu sebentar dan coba lagi, " +
            "atau hubungi hotline PKY di 0800-1-500-600 untuk bantuan langsung.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    // ── Parse Body ─────────────────────────────────────────────────
    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROK_API_KEY;
    
    // Perbaikan: Ternyata API Key yang Anda miliki adalah Groq Secret Key (diawali 'gsk_') bukan xAI.
    if (!apiKey || !apiKey.startsWith("gsk_")) {
      await logError("POST /api/chat", new Error("API Key is not set or invalid for Groq"));
      return NextResponse.json(
        { error: "Kunci API AI belum dikonfigurasi dengan benar atau salah format (harus diawali 'gsk_')." },
        { status: 500 },
      );
    }

    // Bangun konteks dinamis dari database
    const dynamicContext = await buildDynamicContext();
    const fullSystemPrompt = SYSTEM_PROMPT + dynamicContext;

    const grokPayload = {
      model: "llama-3.1-8b-instant", // Menggunakan model dari Groq
      stream: true,
      messages: [
        { role: "system", content: fullSystemPrompt },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
    };

    // AbortController untuk timeout 10 detik
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let grokResponse;
    try {
      grokResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(grokPayload),
          signal: controller.signal,
        },
      );
    } catch (fetchError) {
      clearTimeout(timeoutId);
      await logError("POST /api/chat", fetchError);
      return NextResponse.json(
        { error: "Koneksi ke AI terputus (Timeout 10s). Silakan coba lagi." },
        { status: 504 },
      );
    }
    
    clearTimeout(timeoutId);

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      await logError("POST /api/chat", new Error(`Grok API Error: ${grokResponse.status}`), { errorText });
      return NextResponse.json(
        { error: "Gagal menghubungi server AI. Silakan coba lagi." },
        { status: 502 },
      );
    }

    // Streaming: Transform Grok SSE → ReadableStream untuk client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = grokResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;

              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                controller.close();
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        } catch (error) {
          logError("POST /api/chat - Stream error", error);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
        "X-RateLimit-Limit": "10",
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    await logError("POST /api/chat", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 },
    );
  }
}
