/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
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
};
