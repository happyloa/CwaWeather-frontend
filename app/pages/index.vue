<template>
  <div class="relative min-h-screen overflow-hidden transition-colors duration-300">
    <div
      class="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-fuchsia-500/10 blur-3xl pointer-events-none" />
    <div
      class="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent_25%),linear-gradient(120deg,rgba(14,165,233,0.08),rgba(99,102,241,0.05))]" />

    <!-- 進站時的蓋版動畫，確保重新整理也會展示 -->
    <LoadingOverlay :show="showLoadingOverlay" @hide="onLoadingOverlayHide" />

    <!-- 主題切換按鈕 -->
    <ThemeToggle />

    <!-- 主體內容區 -->
    <div
      class="relative z-10 container mx-auto px-4 py-12 max-w-6xl transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none select-none': showLoadingOverlay }">
      <div class="flex flex-col items-center text-center space-y-4 mb-10">
        <span class="accent-pill font-display">Starfleet Weather Bridge</span>
        <h1
          class="font-display text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
          Galactic Forecast Console
        </h1>
        <p class="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
          即刻掌握台灣六都的三日預報，帶著星艦艙橋般的科技感介面，伴你穿梭日夜與風雨。
        </p>
      </div>

      <!-- 城市切換器 -->
      <div class="mb-10">
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useHead, useRoute, useRouter } from "#imports";
import type { City, WeatherData } from "~/types/weather";
import { CITIES, useWeatherApi } from "~/composables/useWeatherApi";

const { fetchWeather } = useWeatherApi();
const route = useRoute();
const router = useRouter();
const baseTitle = "台灣六都天氣預報";

// 頁面狀態：城市、天氣資料與載入狀態
const selectedCity = ref<City>("taipei");
const weatherData = ref<WeatherData | null>(null);
const isLoading = ref(false);
const hasError = ref(false);

// 進站時的蓋版動畫控制
const showLoadingOverlay = ref(true);
const overlayTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const overlayDuration = 2000;

const selectedCityName = computed(() => CITIES.find((city) => city.id === selectedCity.value)?.name ?? "");

// 解析網址參數（例如分享連結）並在初次載入時套用到城市狀態
const setInitialCityFromQuery = () => {
  const queryCity = route.query.currentCity;
  if (typeof queryCity === "string" && CITIES.some((city) => city.id === queryCity)) {
    selectedCity.value = queryCity as City;
  }
};

// 依目前城市動態組合標題／OG 資訊，避免 Meta 與畫面不同步
const applyHeadMeta = () => {
  useHead(() => {
    const title = selectedCityName.value
      ? `${baseTitle} | ${selectedCityName.value}`
      : baseTitle;
    const description = selectedCityName.value
      ? `${selectedCityName.value}三天天氣預報`
      : "快速掌握台灣六都三天天氣預報，支援深淺色主題切換";

    return {
      title,
      meta: [
        { key: "description", name: "description", content: description },
        { key: "og:title", property: "og:title", content: title },
        { key: "og:description", property: "og:description", content: description },
      ],
    };
  });
};

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

// 將選取的城市寫回網址，確保重新整理或分享時能保持同一城市
const syncQueryWithCity = (city: City) => {
  if (!import.meta.client) return;

  if (route.query.currentCity === city) {
    return;
  }

  router.replace({
    query: {
      ...route.query,
      currentCity: city,
    },
  });
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

setInitialCityFromQuery();
applyHeadMeta();

watch(
  () => route.query.currentCity,
  (queryCity) => {
    if (typeof queryCity === "string" && CITIES.some((city) => city.id === queryCity)) {
      selectedCity.value = queryCity as City;
    }
  }
);

// 監聽城市切換，更新網址參數並重新抓取資料
watch(
  selectedCity,
  (city) => {
    syncQueryWithCity(city);
    loadWeatherData();
  },
  { immediate: true }
);

// 初次載入：啟動蓋版動畫
onMounted(() => {
  startEntryOverlay();
});

// 卸載前清除計時器避免記憶體洩漏
onBeforeUnmount(() => {
  if (overlayTimer.value) {
    clearTimeout(overlayTimer.value);
  }
});
</script>
