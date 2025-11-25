<template>
  <!-- 單一卡片呈現某時段的天氣資訊 -->
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 transition-smooth"
    data-aos="fade-up"
    :data-aos-delay="index * 100">
    <div class="flex justify-between items-start mb-4">
      <div class="space-y-1">
        <div class="text-xs text-gray-400 dark:text-gray-500">
          {{ formatDate(forecast.startTime) }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatTime(forecast.startTime) }} -
          {{ formatTime(forecast.endTime) }}
        </div>
      </div>
      <div class="text-3xl">
        {{ getWeatherIcon(forecast.weather) }}
      </div>
    </div>

    <div class="mb-4">
      <div class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ forecast.weather }}
      </div>
      <div class="text-3xl font-bold text-black dark:text-white">
        {{ forecast.minTemp }}° - {{ forecast.maxTemp }}°
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-2">
        <span class="text-xl">💧</span>
        <span class="text-sm text-gray-600 dark:text-gray-400"
          >降雨率 {{ forecast.rain }}</span
        >
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">{{ getRainIcon(forecast.rain) }}</span>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{
          getRainAdvice(forecast.rain)
        }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">🌡️</span>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{
          forecast.comfort
        }}</span>
      </div>
      <div v-if="forecast.windSpeed" class="flex items-center gap-2">
        <span class="text-xl">💨</span>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{
          forecast.windSpeed
        }}</span>
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
  return rainProb > 30 ? "記得帶傘" : "不用帶傘";
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
