<template>
  <div v-if="loading" class="py-8">
    <LoadingSkeleton />
  </div>

  <div v-else-if="error" class="text-center py-12 glass-panel rounded-3xl border border-white/10">
    <div class="text-5xl mb-4">😔</div>
    <div class="text-slate-300">
      無法載入天氣資料，請稍後再試
    </div>
  </div>

  <div v-else-if="weatherData" class="space-y-8">
    <div
      class="glass-panel glow-border rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
      data-aos="fade-down">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-cyan-200">City</p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {{ weatherData.city }}
          </h1>
          <p class="text-sm text-slate-300">
            Last sync · {{ weatherData.updateTime }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
          <span class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-cyan-400/30 text-cyan-100">
            <span class="h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            Sensors nominal
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-fuchsia-400/30 text-fuchsia-100">
            <span class="h-2 w-2 rounded-full bg-fuchsia-300"></span>
            Atmosphere stable
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="weatherData.forecasts.length > 0"
      class="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-cyan-500/60 via-blue-700/40 to-fuchsia-500/50 shadow-2xl"
      data-aos="zoom-in"
      data-aos-delay="200">
      <div class="relative bg-slate-900/70 dark:bg-slate-900/70 rounded-[22px] p-6 sm:p-8 backdrop-blur-xl">
        <div class="absolute inset-x-8 top-6 h-px accent-bar opacity-60"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div class="text-left sm:text-center space-y-2">
            <div class="text-5xl sm:text-6xl md:text-7xl">
              {{ getWeatherIcon(weatherData.forecasts[0].weather) }}
            </div>
            <div class="text-xl sm:text-2xl text-cyan-100 font-semibold tracking-wide">
              {{ weatherData.forecasts[0].weather }}
            </div>
          </div>
          <div class="flex flex-col items-start sm:items-end gap-2">
            <div class="text-sm uppercase tracking-[0.35em] text-slate-300">Current Window</div>
            <div class="text-4xl sm:text-5xl font-extrabold text-white">
              {{ weatherData.forecasts[0].minTemp }}° -
              {{ weatherData.forecasts[0].maxTemp }}°
            </div>
            <div class="text-sm text-slate-300">Thermal variance monitored</div>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
      <div class="flex items-center justify-between mb-6" data-aos="fade-right">
        <h2 class="text-2xl font-bold text-white">三天預報</h2>
        <div class="h-px flex-1 ml-4 bg-gradient-to-r from-white/30 via-cyan-400/40 to-transparent"></div>
      </div>
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
