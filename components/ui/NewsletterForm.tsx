"use client";

import * as React from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
});

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = newsletterSchema.safeParse({ email });
    
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error.issues[0].message);
      return;
    }

    // Simulate API call
    setStatus("success");
    setErrorMessage("");
    setEmail("");
    
    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input 
          type="email" 
          placeholder="Alamat email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={`w-full rounded-xl border bg-surface-muted px-4 py-2.5 text-sm outline-none transition-colors focus:ring-1 focus:ring-primary dark:bg-white/5 dark:text-white ${
            status === "error" 
              ? "border-red-500 focus:border-red-500" 
              : "border-gray-200 focus:border-primary dark:border-white/10"
          }`}
        />
        <Button variant="primary" type="submit" className="px-4 shrink-0 rounded-xl">
          <ArrowRight size={16} />
        </Button>
      </div>
      
      {status === "error" && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {errorMessage}
        </p>
      )}
      
      {status === "success" && (
        <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <CheckCircle2 size={12} /> Berlangganan berhasil!
        </p>
      )}
    </form>
  );
}
