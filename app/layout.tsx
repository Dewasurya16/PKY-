import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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

import { ThemeProvider } from "@/components/theme-provider";
import { FloatingChat } from "@/components/ui/floating-chat";

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
        </ThemeProvider>
      </body>
    </html>
  );
}
