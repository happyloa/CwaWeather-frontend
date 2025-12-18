<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/70 p-6 shadow-2xl backdrop-blur-xl transition-smooth"
    data-aos="fade-up"
    :data-aos-delay="index * 100">
    <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl"></div>
    <div class="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-2xl"></div>
    <div class="flex justify-between items-start mb-5 relative">
      <div class="space-y-1">
        <div class="text-xs uppercase tracking-[0.25em] text-cyan-200">
          {{ formatDate(forecast.startTime) }}
        </div>
        <div class="text-sm text-slate-300">
          {{ formatTime(forecast.startTime) }} -
          {{ formatTime(forecast.endTime) }}
        </div>
      </div>
      <div class="text-3xl drop-shadow-lg">
        {{ getWeatherIcon(forecast.weather) }}
      </div>
    </div>

    <div class="mb-4 space-y-1 relative">
      <div class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="inline-block h-6 w-1 rounded-full accent-bar"></span>
        {{ forecast.weather }}
      </div>
      <div class="text-3xl font-extrabold text-white tracking-tight">
        {{ forecast.minTemp }}° - {{ forecast.maxTemp }}°
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-sm text-slate-200">
      <div class="flex items-center gap-2">
        <span class="text-xl">💧</span>
        <span class="text-sm text-slate-200">降雨率 {{ forecast.rain }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">{{ getRainIcon(forecast.rain) }}</span>
        <span class="text-sm text-slate-200">
          {{ getRainAdvice(forecast.rain) }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">🌡️</span>
        <span class="text-sm text-slate-200">{{ forecast.comfort }}</span>
      </div>
      <div v-if="forecast.windSpeed" class="flex items-center gap-2">
        <span class="text-xl">💨</span>
        <span class="text-sm text-slate-200">{{ forecast.windSpeed }}</span>
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
