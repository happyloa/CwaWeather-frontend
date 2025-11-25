<template>
  <!-- 內部載入指示器，顯示在內容區塊內 -->
  <div class="flex justify-center items-center h-32">
    <div class="relative w-16 h-16">
      <div
        class="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
      <div
        class="absolute inset-0 border-4 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
