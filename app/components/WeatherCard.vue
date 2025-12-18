<template>
  <!-- 單一卡片呈現某時段的天氣資訊 -->
  <div
    class="rounded-2xl p-6 glass-panel transition-smooth hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] neon-border"
    data-aos="fade-up"
    :data-aos-delay="index * 100">
    <div class="flex justify-between items-start mb-4">
      <div class="space-y-1">
        <div class="text-[11px] uppercase tracking-[0.28em] text-cyan-400 font-display">
          {{ formatDate(forecast.startTime) }}
        </div>
        <div class="text-sm text-slate-500 dark:text-slate-400">
          {{ formatTime(forecast.startTime) }} -
          {{ formatTime(forecast.endTime) }}
        </div>
      </div>
      <div class="text-3xl">
        {{ getWeatherIcon(forecast.weather) }}
      </div>
    </div>

    <div class="mb-4">
      <div class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {{ forecast.weather }}
      </div>
      <div class="text-3xl font-bold text-slate-900 dark:text-white">
        {{ forecast.minTemp }}° - {{ forecast.maxTemp }}°
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-700/80">
      <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="text-xl">💧</span>
        <span>降雨率 {{ forecast.rain }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="text-xl">{{ getRainIcon(forecast.rain) }}</span>
        <span>{{ getRainAdvice(forecast.rain) }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="text-xl">🌡️</span>
        <span>{{ forecast.comfort }}</span>
      </div>
      <div v-if="forecast.windSpeed" class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="text-xl">💨</span>
        <span>{{ forecast.windSpeed }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherForecast } from "~/types/weather";

const props = defineProps<{
  forecast: WeatherForecast;
  index: number;
}>();

// 依天氣描述對應 emoji，讓畫面更直覺
const getWeatherIcon = (weather: string): string => {
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("多雲")) return "⛅";
  if (weather.includes("陰")) return "☁️";
  if (weather.includes("雨")) return "🌧️";
  if (weather.includes("雷")) return "⛈️";
  return "🌤️";
};

const getRainIcon = (rain: string): string => {
  const rainProb = parseInt(rain);
  return rainProb > 30 ? "☂️" : "🌂";
};

const getRainAdvice = (rain: string): string => {
  const rainProb = parseInt(rain);
  return rainProb > 30 ? "雨要來囉，記得帶傘☂️" : "放心出門啦😄";
};

// 將時間字串轉為可讀日期
const formatDate = (timeStr: string): string => {
  const date = new Date(timeStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

// 取出小時資訊，顯示為 24 小時制
const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  const hours = date.getHours();
  return `${hours.toString().padStart(2, "0")}:00`;
};
</script>
