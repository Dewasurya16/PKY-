import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./app/\\(auth\\)/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D9488",
          light: "#14B8A6",
          dark: "#0F766E",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        navy: {
          DEFAULT: "#1B3A5C",
          light: "#234B75",
          dark: "#0F2440",
          50: "#EFF6FF",
          100: "#DBEAFE",
          800: "#1E3A5F",
          900: "#0F2440",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
          soft: "#FEF3C7",
        },
        rose: {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          soft: "#FFF1F2",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFB",
          soft: "#F1F5F9",
          card: "#FFFFFF",
        },
        text: {
          DEFAULT: "#1A1A2E",
          secondary: "#64748B",
          muted: "#94A3B8",
          inverse: "#FFFFFF",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Plus Jakarta Sans",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at 50% 0%, var(--tw-gradient-stops))",
        "hero-pattern":
          "radial-gradient(circle at 20% 50%, rgba(13,148,136,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(27,58,92,0.06) 0%, transparent 50%)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, rgba(13,148,136,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(245,158,11,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(27,58,92,0.08) 0px, transparent 50%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08)",
        "card-hover":
          "0 4px 6px rgba(0,0,0,0.04), 0 20px 40px -16px rgba(13,148,136,0.20)",
        "card-lg":
          "0 4px 6px rgba(0,0,0,0.03), 0 24px 48px -16px rgba(0,0,0,0.12)",
        navbar:
          "0 1px 0 rgba(0,0,0,0.04), 0 4px 16px -4px rgba(0,0,0,0.08)",
        glow: "0 0 40px -8px rgba(13,148,136,0.35)",
        "glow-accent": "0 0 40px -8px rgba(245,158,11,0.35)",
        float:
          "0 8px 30px -6px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.02)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradient-shift 6s ease-in-out infinite",
        "wave": "wave 12s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-5px) translateY(-5px)" },
          "50%": { transform: "translateX(0) translateY(-10px)" },
          "75%": { transform: "translateX(5px) translateY(-5px)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
