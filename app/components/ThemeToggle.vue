<template>
  <!-- 固定在右下的深淺色切換鈕 -->
  <button
    type="button"
    @click="toggleTheme"
    class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-white/10 border border-cyan-400/30 text-cyan-100 hover:border-fuchsia-300/50 hover:text-white transition-smooth shadow-[0_10px_40px_rgba(91,240,255,0.35)] backdrop-blur-xl"
    aria-label="Toggle theme">
    <div class="text-2xl drop-shadow-lg">
      {{ colorMode.value === "dark" ? "🌙" : "☀️" }}
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
