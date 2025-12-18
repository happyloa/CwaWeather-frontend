<template>
  <div v-if="loading" class="py-8">
    <LoadingSkeleton />
  </div>

  <div v-else-if="error" class="text-center py-12">
    <div class="text-5xl mb-4">😔</div>
    <div class="text-slate-600 dark:text-slate-400">
      無法載入天氣資料，請稍後再試
    </div>
  </div>

  <div v-else-if="weatherData" class="space-y-10">
    <!-- 城市標題區 -->
    <div class="text-center py-6 space-y-3" data-aos="fade-down">
      <div class="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-400">
        <span class="h-px w-8 bg-cyan-400/60" />
        <span class="font-display">Sector Weather Feed</span>
        <span class="h-px w-8 bg-cyan-400/60" />
      </div>
      <h1
        class="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-slate-900 dark:text-white">
        {{ weatherData.city }}
      </h1>
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-sm text-cyan-800 dark:text-cyan-100">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        更新時間 {{ weatherData.updateTime }}
      </div>
    </div>

    <!-- 即時重點天氣區塊 -->
    <div
      v-if="weatherData.forecasts.length > 0"
      class="rounded-3xl p-6 sm:p-8 glass-panel neon-border overflow-hidden relative"
      data-aos="zoom-in"
      data-aos-delay="200">
      <div class="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.2),transparent_30%)]" />
      <div class="relative text-center space-y-3">
        <div class="text-5xl sm:text-6xl md:text-7xl mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          {{ getWeatherIcon(weatherData.forecasts[0].weather) }}
        </div>
        <div class="font-display text-xs uppercase tracking-[0.35em] text-cyan-400">
          Present Highlight
        </div>
        <div class="text-4xl sm:text-5xl font-bold mb-2 text-slate-900 dark:text-white">
          {{ weatherData.forecasts[0].minTemp }}° -
          {{ weatherData.forecasts[0].maxTemp }}°
        </div>
        <div class="text-xl sm:text-2xl text-slate-700 dark:text-slate-300">
          {{ weatherData.forecasts[0].weather }}
        </div>
      </div>
    </div>

    <!-- 三天預報卡片排列 -->
    <div>
      <h2
        class="text-2xl font-display font-semibold mb-4 text-slate-900 dark:text-white tracking-[0.18em] uppercase"
        data-aos="fade-right">
        三天預報
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCard
          v-for="(forecast, index) in weatherData.forecasts"
          :key="index"
          :forecast="forecast"
          :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData } from "~/types/weather";

// 由父層傳入資料與狀態，用於切換骨架、錯誤訊息或實際天氣內容
const props = defineProps<{
  weatherData: WeatherData | null;
  loading: boolean;
  error: boolean;
}>();

// 依當日天氣描述選擇最合適的 emoji
const getWeatherIcon = (weather: string): string => {
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("多雲")) return "⛅";
  if (weather.includes("陰")) return "☁️";
  if (weather.includes("雨")) return "🌧️";
  if (weather.includes("雷")) return "⛈️";
  return "🌤️";
};
</script>
