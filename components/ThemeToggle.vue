<template>
  <button
    @click="toggleTheme"
    class="fixed top-6 right-6 z-40 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-smooth shadow-lg"
    aria-label="Toggle theme">
    <div
      class="text-2xl transition-transform duration-300"
      :class="{ 'rotate-180': colorMode === 'dark' }">
      {{ colorMode === "dark" ? "🌙" : "☀️" }}
    </div>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
