import type { Config } from "tailwindcss";

export default {
  // 掃描 app 目錄下的 Vue、TS 檔案以生成對應樣式
  content: [
    "./app/components/**/*.{vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.ts",
    "./app/composables/**/*.ts",
    "./app/app.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#FFFFFF",
          surface: "#F5F5F5",
          text: "#000000",
          textSecondary: "#666666",
          border: "#E0E0E0",
        },
        dark: {
          bg: "#000000",
          surface: "#1A1A1A",
          text: "#FFFFFF",
          textSecondary: "#999999",
          border: "#333333",
        },
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
