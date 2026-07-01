import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";

// Lazy load widgets
const FloatingChat = dynamic(() => import("@/components/ui/FloatingChat").then(mod => mod.FloatingChat));
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop").then(mod => mod.ScrollToTop));
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.shortName} — ${site.fullName} | ${site.institution}`,
  description: site.tagline,
  keywords: [
    "kejaksaan",
    "kesehatan",
    "pusat kesehatan yustisial",
    "PKY",
    "layanan kesehatan kejaksaan",
    "medical check up",
    "kesehatan aparatur",
  ],
  authors: [{ name: site.institution }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-navy dark:bg-navy-dark dark:text-white transition-colors duration-300 min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <FloatingChat />
          <ScrollToTop />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
