<template>
  <!-- 固定在右下的深淺色切換鈕 -->
  <button
    type="button"
    @click="toggleTheme"
    class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 px-4 py-3 rounded-full glass-panel neon-border hover:scale-105 transition-smooth shadow-xl drop-shadow backdrop-blur-2xl"
    aria-label="Toggle theme">
    <div class="flex items-center gap-2">
      <div
        class="h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-400 to-sky-500 text-slate-900 font-semibold shadow-[0_10px_35px_rgba(14,165,233,0.35)]">
        {{ colorMode.value === "dark" ? "☀️" : "🌙" }}
      </div>
      <div class="hidden sm:flex flex-col text-left leading-none">
        <span class="text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Mode
        </span>
        <span class="text-xs font-semibold text-slate-900 dark:text-white">
          {{ colorMode.value === "dark" ? "Light" : "Dark" }}
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
// 由 color-mode 模組取得當前主題設定（會自動寫入 localStorage）
const colorMode = useColorMode();

const toggleTheme = () => {
  // 依現況切換深色或淺色主題
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
