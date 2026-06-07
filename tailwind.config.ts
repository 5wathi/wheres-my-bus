import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(233 38% 56%)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // Transit-brand — a calm, muted slate-indigo
        brand: {
          50: "hsl(233 36% 96%)",
          100: "hsl(233 32% 91%)",
          500: "hsl(233 38% 56%)",
          600: "hsl(234 36% 49%)",
          700: "hsl(235 34% 41%)",
        },
        // Live-status semantic colors (muted)
        live: {
          moving: "hsl(152 36% 42%)",
          due: "hsl(233 38% 56%)",
          delayed: "hsl(38 60% 50%)",
          ended: "hsl(220 9% 60%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.08)",
        card: "0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
