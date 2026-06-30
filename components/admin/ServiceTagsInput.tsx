"use client";

import { useState, useRef } from "react";
import { X, Plus } from "lucide-react";

type ServiceTagsInputProps = {
  name: string;
  defaultValue?: string[];
  error?: string[];
};

/**
 * Komponen input tag layanan untuk field `services[]` di form fasilitas.
 * Menyimpan nilai sebagai hidden input berformat comma-separated.
 */
export function ServiceTagsInput({
  name,
  defaultValue = [],
  error,
}: ServiceTagsInputProps) {
  const [tags, setTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleRemove = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const hasError = error && error.length > 0;

  return (
    <div>
      {/* Hidden input untuk FormData */}
      <input type="hidden" name={name} value={tags.join(",")} />

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20 dark:text-primary-light"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemove(tag)}
                className="rounded-full p-0.5 transition-colors hover:bg-primary/20 hover:text-primary-dark dark:hover:bg-primary/30"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + Add Button */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tambah layanan (tekan Enter)"
          className={`flex-1 rounded-xl border bg-white px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:ring-2 dark:bg-navy dark:text-white ${
            hasError
              ? "border-rose-DEFAULT/50 focus:border-rose-DEFAULT focus:ring-rose-DEFAULT/20"
              : "border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-white/10 dark:focus:border-primary-light"
          }`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-dark"
        >
          <Plus size={18} />
        </button>
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
