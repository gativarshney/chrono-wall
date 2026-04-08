import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wall: "#0D0D0F",
        paper: "#F5F0E8",
        "paper-dark": "#E8E2D4",
        ink: "#1A1814",
        "ink-muted": "#6B6560",
        ring: "#8B8B8B",
        aurora: {
          start: "#4FACFE",
          mid: "#A78BFA",
          end: "#F472B6",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        calendar:
          "0 40px 120px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
        "date-hover":
          "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
        "inner-paper": "inset 0 2px 8px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "paper-texture": "url('/textures/paper.png')",
        "aurora-range":
          "linear-gradient(135deg, rgba(79,172,254,0.15), rgba(167,139,250,0.2), rgba(244,114,182,0.15))",
      },
    },
  },
  plugins: [],
};

export default config;
