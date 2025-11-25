<template>
  <div
    class="min-h-screen bg-white dark:bg-black transition-colors duration-300">
    <!-- 進站時的蓋版動畫，確保重新整理也會展示 -->
    <LoadingOverlay :show="showLoadingOverlay" @hide="onLoadingOverlayHide" />

    <!-- 主題切換按鈕 -->
    <ThemeToggle />

    <!-- 主體內容區 -->
    <div
      class="container mx-auto px-4 py-12 max-w-7xl transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none select-none': showLoadingOverlay }">
      <!-- 城市切換器 -->
      <div class="mb-12">
        <CitySelector v-model:selected-city="selectedCity" />
      </div>

      <!-- 天氣資訊展示區 -->
      <WeatherDisplay
        :weather-data="weatherData"
        :loading="isLoading"
        :error="hasError" />

      <!-- 網站頁尾 -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from "vue";
import type { City, WeatherData } from "~/types/weather";
import { useWeatherApi } from "~/composables/useWeatherApi";

const { fetchWeather } = useWeatherApi();

// 頁面狀態：城市、天氣資料與載入狀態
const selectedCity = ref<City>("taipei");
const weatherData = ref<WeatherData | null>(null);
const isLoading = ref(false);
const hasError = ref(false);

// 進站時的蓋版動畫控制
const showLoadingOverlay = ref(true);
const overlayTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const overlayDuration = 2000;

const loadWeatherData = async () => {
  isLoading.value = true;
  hasError.value = false;

  try {
    const response = await fetchWeather(selectedCity.value);
    if (response.success) {
      weatherData.value = response.data;
    } else {
      hasError.value = true;
    }
  } catch (error) {
    console.error("Failed to load weather data:", error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// 蓋版動畫在進站時播放兩秒，結束後隱藏
const startEntryOverlay = () => {
  overlayTimer.value = setTimeout(() => {
    showLoadingOverlay.value = false;
  }, overlayDuration);
};

const onLoadingOverlayHide = () => {
  showLoadingOverlay.value = false;
};

// 監聽城市切換，重新抓取資料
watch(selectedCity, () => {
  loadWeatherData();
});

// 初次載入：啟動蓋版動畫並抓取資料
onMounted(() => {
  startEntryOverlay();
  loadWeatherData();
});

// 卸載前清除計時器避免記憶體洩漏
onBeforeUnmount(() => {
  if (overlayTimer.value) {
    clearTimeout(overlayTimer.value);
  }
});
</script>
