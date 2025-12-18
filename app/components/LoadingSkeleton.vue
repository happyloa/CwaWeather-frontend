<template>
  <div class="space-y-8" data-testid="loading-skeleton">
    <!-- 城市標題骨架 -->
    <div class="panel p-6 md:p-8 animate-pulse">
      <div class="flex flex-col gap-3">
        <div class="h-3 w-28 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
        <div class="h-7 w-56 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
        <div class="h-4 w-36 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
      </div>
    </div>

    <!-- 今日重點天氣骨架 -->
    <div class="panel p-6 md:p-8 animate-pulse">
      <div class="flex flex-col items-center gap-4">
        <div class="h-16 w-16 rounded-full bg-gradient-to-br from-aurora/20 to-nebula/20"></div>
        <div class="h-10 w-40 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
        <div class="h-5 w-28 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
      </div>
    </div>

    <!-- 三天預報骨架卡片 -->
    <div class="space-y-3">
      <div class="h-4 w-24 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="index in 3"
          :key="index"
          class="panel p-5 animate-pulse">
          <div class="h-3 w-24 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-3"></div>
          <div class="h-10 w-20 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-4"></div>
          <div class="space-y-2">
            <div class="h-3 w-full rounded bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
            <div class="h-3 w-3/4 rounded bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
