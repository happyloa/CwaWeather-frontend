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
      // Open Graph 相關資訊
      title: "台灣天氣預報",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "台灣六都三天天氣預報" },
        { property: "og:title", content: "台灣天氣預報" },
        {
          property: "og:description",
          content: "快速掌握台灣六都三天天氣預報，支援深淺色主題切換",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/icon-v2.png" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap",
        },
      ],
    },
  },
});
