// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 使用 Nuxt 4 推薦的 app/ 目錄作為專案根目錄
  srcDir: "app",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  // 全域引入 Tailwind 主樣式
  css: ["~/assets/css/tailwind.css"],

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant",
      },
      // Open Graph 相關資訊
      title: "台灣六都天氣預報",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "台灣六都三天天氣預報" },
        { property: "og:title", content: "台灣六都天氣預報" },
        {
          property: "og:description",
          content: "快速掌握台灣六都三天天氣預報，支援深淺色主題切換",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/ogImage.webp" },
        { name: "theme-color", content: "#7de1a9" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/ogImage.webp" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/ogImage.webp" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Zen+Maru+Gothic:wght@400;700;900&display=swap",
        },
      ],
    },
  },
});
