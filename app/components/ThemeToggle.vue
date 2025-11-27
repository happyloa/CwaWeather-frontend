<template>
  <!-- 固定在右下的深淺色切換鈕 -->
  <button
    type="button"
    @click="toggleTheme"
    class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-smooth shadow-xl drop-shadow"
    aria-label="Toggle theme">
    <div class="text-2xl">
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
