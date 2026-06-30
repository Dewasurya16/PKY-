"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

type FileUploadProps = {
  name: string;
  accept: string;
  maxSizeMb: number;
  currentUrl?: string | null;
  variant?: "image" | "document";
  error?: string[];
};

/**
 * Komponen upload file dengan preview dan drag-and-drop.
 * Mendukung 2 variant: gambar (dengan preview) dan dokumen (dengan ikon).
 */
export function FileUpload({
  name,
  accept,
  maxSizeMb,
  currentUrl,
  variant = "image",
  error,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }

    setFileName(file.name);

    if (variant === "image" && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file && inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasError = error && error.length > 0;
  const displayPreview = preview ?? (variant === "image" ? currentUrl : null);
  const displayName = fileName ?? (currentUrl ? "File saat ini" : null);

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : hasError
            ? "border-rose-DEFAULT/50 bg-rose-soft/30"
            : "border-gray-200 bg-surface-muted hover:border-primary/50 dark:border-white/10 dark:bg-navy dark:hover:border-primary/30"
        }`}
      >
        {/* Preview Area */}
        {displayPreview && variant === "image" ? (
          <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg">
            <img
              src={displayPreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
            >
              <X size={14} />
            </button>
          </div>
        ) : displayName && variant === "document" ? (
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-white px-4 py-2 dark:bg-white/5">
            <FileText size={20} className="text-primary" />
            <span className="text-sm font-medium text-navy dark:text-white">
              {displayName}
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="ml-auto rounded-full p-1 text-text-muted transition-colors hover:text-rose-DEFAULT"
            >
              <X size={14} />
            </button>
          </div>
        ) : null}

        {/* Upload Prompt */}
        <div className="flex flex-col items-center gap-2 text-center">
          {variant === "image" ? (
            <ImageIcon size={24} className="text-text-muted dark:text-white/30" />
          ) : (
            <Upload size={24} className="text-text-muted dark:text-white/30" />
          )}
          <p className="text-sm text-text-muted dark:text-white/50">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="font-semibold text-primary hover:underline dark:text-primary-light"
            >
              Pilih file
            </button>{" "}
            atau seret ke sini
          </p>
          <p className="text-xs text-text-muted dark:text-white/40">
            Maks {maxSizeMb} MB • {accept.replace(/\./g, "").toUpperCase()}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {hasError && (
        <div className="mt-1.5 space-y-0.5">
          {error.map((msg) => (
            <p key={msg} className="text-xs font-medium text-rose-DEFAULT">
              {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
