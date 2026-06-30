"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, KeyRound } from "lucide-react";
import { login } from "@/lib/actions/auth.actions";
import type { ActionState } from "@/lib/types/database";

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all hover:bg-white/10 focus:border-primary-light focus:bg-white/10 focus:ring-2 focus:ring-primary/20";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    login,
    { success: false },
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-dark px-6 py-12">
      {/* Background Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Kembali ke Portal
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Admin Panel
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Pusat Kesehatan Yustisial - Kejaksaan RI
              </p>
            </div>

            {/* Error Message */}
            {state.error && (
              <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-center text-sm font-medium text-rose-300">
                {state.error}
              </div>
            )}

            {/* Form */}
            <form action={formAction} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-white/70"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nama@kejaksaan.go.id"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-white/70"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <KeyRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none"
              >
                {isPending ? "Membuka Panel..." : "Masuk ke Panel Admin"}
              </button>
            </form>
          </div>

          {/* Footer Card */}
          <div className="bg-white/5 px-8 py-5 text-center">
            <p className="text-xs text-white/40">
              Area terbatas. Hak cipta © {new Date().getFullYear()} PKY Kejaksaan RI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
