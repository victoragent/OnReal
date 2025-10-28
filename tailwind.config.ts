import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#7C5CFC",
          subtle: "#C8B8FF",
          accent: "#2F2E7C"
        }
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at top, rgba(124,92,252,0.25), transparent 60%)",
        "grid": "linear-gradient(to right, rgba(124,92,252,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,252,0.08) 1px, transparent 1px)"
      }
    }
  }
} satisfies Config;

export default config;
