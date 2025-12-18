import type { Config } from "tailwindcss";

// Keep Tailwind's dark mode controlled via the `.dark` class so `@nuxtjs/color-mode`
// can toggle themes without relying on the OS preference.
const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Space Grotesk",
          "Noto Sans TC",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Orbitron",
          "Space Grotesk",
          "Noto Sans TC",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        aurora: "#24e0d1",
        nebula: "#5d7bff",
        midnight: "#050910",
        "midnight-glow": "#0f1629",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(36, 224, 209, 0.35), 0 18px 80px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "slow-float": "slow-float 10s ease-in-out infinite",
        scanline: "scanline 6s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(36, 224, 209, 0.3)" },
          "50%": {
            boxShadow: "0 0 0 12px rgba(36, 224, 209, 0.04)",
          },
          "100%": { boxShadow: "0 0 0 0 rgba(36, 224, 209, 0.0)" },
        },
        "slow-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
};

export default config;
