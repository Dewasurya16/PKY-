"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/types/database";

/**
 * Server Action: Melakukan otentikasi login menggunakan email & password.
 */
export async function login(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email dan sandi wajib diisi" };
  }

  // Menggunakan instance Server Client (membawa proxy cookies dari route)
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let errorMessage = "Gagal masuk. Silakan coba lagi.";
    if (error.message.includes("Invalid login credentials")) {
      errorMessage = "Email atau sandi salah.";
    }
    return { success: false, error: errorMessage };
  }

  // Setelah sukses, kita segarkan semua cache rute admin agar tampilan
  // mencerminkan state login, lalu arahkan user ke dasbor.
  revalidatePath("/", "layout");
  redirect("/admin");
}

/**
 * Server Action: Melakukan logout sesi admin aktif.
 */
export async function logout(): Promise<void> {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  // Bersihkan cache dan arahkan kembali ke homepage publik
  revalidatePath("/", "layout");
  redirect("/");
}
