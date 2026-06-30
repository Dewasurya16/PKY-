import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Lakukan intersepsi untuk memperbarui sesi Supabase 
  // sekaligus melakukan validasi proteksi rute
  return await updateSession(request);
}

// Konfigurasi route-matcher agar middleware hanya dijalankan 
// pada halaman yang relevan (menghindari static assets & API routes eksternal)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (like images, robots.txt, dsb.)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf)$).*)",
  ],
};
