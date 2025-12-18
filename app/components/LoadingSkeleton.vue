<template>
  <div class="space-y-8 animate-pulse" data-testid="loading-skeleton">
    <!-- 城市標題骨架 -->
    <div class="text-center py-6">
      <div class="mx-auto h-10 w-40 bg-white/60 dark:bg-slate-800/60 rounded-full glass-panel"></div>
      <div class="mt-3 mx-auto h-4 w-56 bg-white/50 dark:bg-slate-800/60 rounded-full glass-panel"></div>
    </div>

    <!-- 今日重點天氣骨架 -->
    <div class="rounded-3xl p-6 sm:p-8 glass-panel neon-border">
      <div class="flex flex-col items-center space-y-4">
        <div class="h-16 w-16 rounded-full bg-white/70 dark:bg-slate-800/70"></div>
        <div class="h-10 w-44 bg-white/70 dark:bg-slate-800/70 rounded-lg"></div>
        <div class="h-6 w-36 bg-white/70 dark:bg-slate-800/70 rounded-lg"></div>
      </div>
    </div>

    <!-- 三天預報骨架卡片 -->
    <div>
      <div class="h-6 w-28 bg-white/60 dark:bg-slate-800/60 rounded-full mb-4 glass-panel"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="index in 3"
          :key="index"
          class="p-5 rounded-2xl glass-panel">
          <div class="h-5 w-28 bg-white/60 dark:bg-slate-800/60 rounded-full mb-3"></div>
          <div class="h-10 w-20 bg-white/60 dark:bg-slate-800/60 rounded-lg mb-3"></div>
          <div class="space-y-2">
            <div class="h-4 w-full bg-white/60 dark:bg-slate-800/60 rounded"></div>
            <div class="h-4 w-3/4 bg-white/60 dark:bg-slate-800/60 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
