"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import type { ChatMessage } from "@/lib/types/database";

/** Pesan pembuka default dari asisten. */
const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Halo! 👋 Saya **Asisten PKY**, siap membantu Anda mengenai:\n\n- 🏥 Informasi fasilitas kesehatan (Klinik & RS Adhyaksa)\n- 📅 Jadwal MCU hari ini\n- 📋 Layanan PPID & pengaduan\n- ❓ Pertanyaan umum lainnya\n\nAda yang bisa saya bantu?",
};

/**
 * Floating chatbot AI PKY dengan integrasi Grok API.
 * Menampilkan tombol chat melayang (FAB) di sudut kanan bawah
 * dan jendela chat dengan streaming response real-time.
 */
export function FloatingChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    WELCOME_MESSAGE,
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  /** Auto-scroll ke pesan terbaru saat messages berubah. */
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** Focus input saat chat dibuka. */
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /**
   * Mengirim pesan ke API route /api/chat dan memproses streaming response.
   * Parsing dilakukan secara incremental untuk efek typing real-time.
   */
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Tambahkan placeholder untuk respons AI
    const assistantPlaceholder: ChatMessage = {
      role: "assistant",
      content: "",
    };
    setMessages([...updatedMessages, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        console.error("[FloatingChat] API Error Status:", response.status, response.statusText);
        // Tangani rate limiting secara khusus agar pesan lebih informatif
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After") ?? "60";
          throw new Error(
            `Anda telah mencapai batas 10 pesan/menit. ` +
              `Silakan tunggu **${retryAfter} detik** lalu coba lagi. 🕐`,
          );
        }
        
        if (response.status === 500) {
          throw new Error("Maaf, asisten AI sedang mengalami kendala jaringan ke server. Mohon coba beberapa saat lagi.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as { error?: string }).error ?? "Gagal menghubungi AI",
        );
      }

      // Streaming: Baca response secara incremental
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("Stream tidak tersedia");

      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Update pesan terakhir (assistant) secara incremental
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return copy;
        });
      }
    } catch (error) {
      console.error("[FloatingChat] Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Maaf, terjadi gangguan koneksi. Silakan coba lagi atau hubungi **hotline PKY: 0800-1-500-600**.";
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: errorMessage,
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  /** Handler untuk submit via Enter key. */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Render markdown sederhana (bold, list) untuk pesan chat.
   * Tidak menggunakan library markdown lengkap untuk menjaga bundle kecil.
   */
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Bold: **text**
      const boldParsed = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold">$1</strong>',
      );

      // List items: - text
      if (line.trim().startsWith("- ")) {
        return (
          <div
            key={i}
            className="flex items-start gap-1.5 ml-1"
            dangerouslySetInnerHTML={{
              __html: `<span class="text-primary mt-0.5">•</span><span>${boldParsed.replace(/^-\s/, "")}</span>`,
            }}
          />
        );
      }

      // Empty line = paragraph break
      if (!line.trim()) return <div key={i} className="h-2" />;

      return (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: boldParsed }}
        />
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4 w-[340px] sm:w-[380px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(27,58,92,0.25)] border border-gray-100 dark:bg-navy-dark dark:border-white/10 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col"
            style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-4 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold">
                      Asisten Pintar PKY
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-[11px] text-primary-50">Online</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/10 p-1.5 hover:bg-white/20 transition-colors"
                  aria-label="Tutup chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-surface-muted/50 dark:bg-navy p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-end`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      msg.role === "user"
                        ? "bg-navy text-white dark:bg-white/20"
                        : "bg-primary text-white"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={12} />
                    ) : (
                      <Bot size={12} />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-none bg-primary text-white"
                        : "rounded-bl-none bg-white shadow-sm dark:bg-navy-dark dark:text-white/90 text-text-secondary border border-gray-50 dark:border-white/5"
                    }`}
                  >
                    {msg.content ? (
                      <div className="space-y-1">
                        {renderContent(msg.content)}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <Loader2
                          size={14}
                          className="animate-spin text-primary"
                        />
                        <span className="text-xs text-text-muted dark:text-white/40">
                          Sedang mengetik...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 border-t border-gray-100 dark:bg-navy-dark dark:border-white/10 shrink-0">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-surface-muted px-4 py-2 dark:border-white/10 dark:bg-navy">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan Anda..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-sm outline-none dark:text-white dark:placeholder-white/40 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Kirim pesan"
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} className="ml-0.5" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-text-muted dark:text-white/30">
                Didukung AI • Tidak menggantikan konsultasi medis
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-4 text-white shadow-lg transition-colors hover:bg-primary-dark"
        aria-label="Buka chat asisten PKY"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="whitespace-nowrap font-medium text-sm pr-2"
            >
              Tanya Asisten PKY
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
