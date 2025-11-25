import type { Config } from "tailwindcss";

// Keep Tailwind's dark mode controlled via the `.dark` class so `@nuxtjs/color-mode`
// can toggle themes without relying on the OS preference.
const config: Config = {
  darkMode: "class",
};

export default config;
