<template>
  <div class="space-y-8 animate-pulse" data-testid="loading-skeleton">
    <!-- 城市標題骨架 -->
    <div class="text-center py-6">
      <div class="mx-auto h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      <div class="mt-3 mx-auto h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
    </div>

    <!-- 今日重點天氣骨架 -->
    <div
      class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col items-center space-y-4">
        <div class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        <div class="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        <div class="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      </div>
    </div>

    <!-- 三天預報骨架卡片 -->
    <div>
      <div class="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full mb-4"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="index in 3"
          :key="index"
          class="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900">
          <div class="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-full mb-3"></div>
          <div class="h-10 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg mb-3"></div>
          <div class="space-y-2">
            <div class="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
