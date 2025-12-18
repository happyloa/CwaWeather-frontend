<template>
  <div class="min-h-screen relative overflow-hidden text-slate-100">
    <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-60"></div>
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(91,240,255,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(255,126,252,0.12),transparent_22%),radial-gradient(circle_at_60%_90%,rgba(247,208,70,0.12),transparent_30%)]"></div>

    <LoadingOverlay :show="showLoadingOverlay" @hide="onLoadingOverlayHide" />
    <ThemeToggle />

    <div
      class="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-6xl transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none select-none': showLoadingOverlay }">
      <div class="glass-panel glow-border rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl border border-white/10">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div class="space-y-2">
              <p class="text-xs uppercase tracking-[0.35em] text-cyan-200/90">
                Stellar Weather Console
              </p>
              <h1 class="text-3xl sm:text-4xl font-bold text-white">Taiwan Sector</h1>
              <p class="text-sm text-slate-300">
                Stardate {{ stardate }} ・ {{ selectedCityName }}
              </p>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-300">
              <span
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-pill bg-white/5 border border-cyan-500/30">
                <span class="h-2 w-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_0_6px_rgba(91,240,255,0.2)]"></span>
                Live uplink
              </span>
            </div>
          </div>

          <CitySelector v-model:selected-city="selectedCity" />
        </div>
      </div>

      <WeatherDisplay
        :weather-data="weatherData"
        :loading="isLoading"
        :error="hasError" />

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
const stardate = computed(() => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const stardateValue = 1000 + (now.getFullYear() - 2020) * 100 + dayOfYear / 3.65;
  return stardateValue.toFixed(1);
});

const buildFallbackWeather = (): WeatherData => {
  const now = new Date();
  const windows = [0, 12, 24];
  const format = (date: Date) => date.toISOString();

  return {
    city: selectedCityName.value || baseTitle,
    updateTime: `模擬資料 · ${now.toLocaleString("zh-TW")}`,
    forecasts: windows.map((offset, idx) => {
      const start = new Date(now.getTime() + offset * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 12 * 60 * 60 * 1000);
      return {
        startTime: format(start),
        endTime: format(end),
        weather: ["高空晴朗", "薄霧微風", "夜間雲層"][idx] ?? "觀測中",
        rain: `${10 + idx * 5}%`,
        minTemp: `${18 + idx}`,
        maxTemp: `${24 + idx}`,
        comfort: "舒適",
        windSpeed: `${6 + idx * 2} km/h`,
      };
    }),
  };
};

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
    weatherData.value = buildFallbackWeather();
    hasError.value = false;
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
