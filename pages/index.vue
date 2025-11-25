<template>
  <div
    class="min-h-screen bg-white dark:bg-black transition-colors duration-300">
    <!-- Loading Overlay -->
    <LoadingOverlay :show="showLoadingOverlay" @hide="onLoadingOverlayHide" />

    <!-- Theme Toggle -->
    <ThemeToggle />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <!-- City Selector -->
      <div class="mb-12">
        <CitySelector v-model:selected-city="selectedCity" />
      </div>

      <!-- Weather Display -->
      <WeatherDisplay
        :weather-data="weatherData"
        :loading="isLoading"
        :error="hasError" />

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { City, WeatherData } from "~/types/weather";
import { useWeatherApi } from "~/composables/useWeatherApi";

const { fetchWeather } = useWeatherApi();

const selectedCity = ref<City>("taipei");
const weatherData = ref<WeatherData | null>(null);
const isLoading = ref(false);
const hasError = ref(false);
const showLoadingOverlay = ref(true);
const isInitialLoad = ref(true);

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

    // Hide loading overlay after initial load
    if (isInitialLoad.value) {
      setTimeout(() => {
        showLoadingOverlay.value = false;
        isInitialLoad.value = false;
      }, 1500);
    }
  }
};

const onLoadingOverlayHide = () => {
  showLoadingOverlay.value = false;
};

// Watch for city changes
watch(selectedCity, () => {
  loadWeatherData();
});

// Initial load
onMounted(() => {
  loadWeatherData();
});
</script>
