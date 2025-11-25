// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },

  app: {
    head: {
      title: "台灣天氣預報",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "台灣六都三天天氣預報" },
      ],
    },
  },
});
