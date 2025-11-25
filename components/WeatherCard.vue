<template>
  <div
    ref="cardRef"
    class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 transition-smooth">
    <div class="flex justify-between items-start mb-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatTime(forecast.startTime) }} -
        {{ formatTime(forecast.endTime) }}
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
      <div class="flex items-center gap-2">
        <span class="text-xl">💨</span>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{
          forecast.windSpeed
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import type { WeatherForecast } from "~/types/weather";

const props = defineProps<{
  forecast: WeatherForecast;
  index: number;
}>();

const cardRef = ref<HTMLElement>();

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

const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  const hours = date.getHours();
  return `${hours.toString().padStart(2, "0")}:00`;
};

onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: props.index * 0.1,
      ease: "power2.out",
    });
  }
});
</script>
