<template>
  <div v-if="loading" class="py-8">
    <LoadingSpinner />
  </div>

  <div v-else-if="error" class="text-center py-12">
    <div class="text-4xl mb-4">😔</div>
    <div class="text-gray-600 dark:text-gray-400">
      無法載入天氣資料，請稍後再試
    </div>
  </div>

  <div v-else-if="weatherData" class="space-y-8">
    <!-- City Header -->
    <div class="text-center py-6">
      <h1
        class="text-4xl md:text-5xl font-bold mb-2 text-black dark:text-white">
        {{ weatherData.city }}
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        更新時間：{{ formatUpdateTime(weatherData.updateTime) }}
      </p>
    </div>

    <!-- Current Weather Highlight -->
    <div
      v-if="weatherData.forecasts.length > 0"
      ref="currentWeatherRef"
      class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
      <div class="text-center">
        <div class="text-7xl mb-4">
          {{ getWeatherIcon(weatherData.forecasts[0].weather) }}
        </div>
        <div class="text-5xl font-bold mb-2 text-black dark:text-white">
          {{ weatherData.forecasts[0].minTemp }}° -
          {{ weatherData.forecasts[0].maxTemp }}°
        </div>
        <div class="text-2xl text-gray-700 dark:text-gray-300">
          {{ weatherData.forecasts[0].weather }}
        </div>
      </div>
    </div>

    <!-- 3-Day Forecast Grid -->
    <div>
      <h2 class="text-2xl font-bold mb-4 text-black dark:text-white">
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
import { ref, watch } from "vue";
import { gsap } from "gsap";
import type { WeatherData } from "~/types/weather";

const props = defineProps<{
  weatherData: WeatherData | null;
  loading: boolean;
  error: boolean;
}>();

const currentWeatherRef = ref<HTMLElement>();

const getWeatherIcon = (weather: string): string => {
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("多雲")) return "⛅";
  if (weather.includes("陰")) return "☁️";
  if (weather.includes("雨")) return "🌧️";
  if (weather.includes("雷")) return "⛈️";
  return "🌤️";
};

const formatUpdateTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${month}月${day}日 ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

watch(
  () => props.weatherData,
  (newData) => {
    if (newData && currentWeatherRef.value) {
      gsap.from(currentWeatherRef.value, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      });
    }
  }
);
</script>
