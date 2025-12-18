<template>
  <!-- 固定在右下的深淺色切換鈕 -->
  <button
    type="button"
    @click="toggleTheme"
    class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 px-4 py-3 rounded-full bg-white/10 border border-white/15 shadow-glow backdrop-blur hover:border-aurora/60 hover:shadow-glow transition-smooth"
    aria-label="Toggle theme"
    :aria-pressed="colorMode.value === 'dark'">
    <div class="relative flex items-center gap-3 text-sm font-semibold tracking-wide text-white">
      <span
        class="h-2.5 w-2.5 rounded-full"
        :class="colorMode.value === 'dark' ? 'bg-aurora animate-pulse' : 'bg-yellow-300'" />
      <span class="font-display uppercase tracking-[0.22em] text-xs">Theme</span>
      <span class="text-xl">{{ colorMode.value === "dark" ? "🌙" : "☀️" }}</span>
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
