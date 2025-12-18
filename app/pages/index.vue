<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 進站時的蓋版動畫，確保重新整理也會展示 -->
    <LoadingOverlay :show="showLoadingOverlay" @hide="onLoadingOverlayHide" />

    <!-- 主題切換按鈕 -->
    <ThemeToggle />

    <!-- 背景裝飾 -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-aurora/30 blur-3xl"></div>
      <div class="absolute right-10 -bottom-24 h-80 w-80 rounded-full bg-nebula/25 blur-[120px]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_30%)]"></div>
    </div>

    <!-- 主體內容區 -->
    <main
      class="relative z-10 container mx-auto max-w-6xl px-4 py-12 space-y-10 transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none select-none': showLoadingOverlay }">
      <section class="panel panel-grid p-6 md:p-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-wrap items-start justify-between gap-6">
            <div class="space-y-2">
              <p class="text-xs uppercase tracking-[0.38em] text-aurora font-display">
                Starfleet Weather Relay
              </p>
              <h1 class="text-3xl md:text-4xl font-bold gradient-text">
                台灣六都天氣預報
              </h1>
              <p class="text-sm text-slate-300 max-w-2xl leading-relaxed">
                以星際艦隊控制台重新詮釋的天氣介面，快速巡覽六都三天天氣走勢，支援深色模式、動態動畫與觸控友好的城市切換。
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <span class="chip">Live Sync</span>
              <span class="chip border-nebula/40 bg-nebula/10 text-slate-100">
                多城市即時切換
              </span>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-3 items-stretch">
            <div class="md:col-span-2">
              <CitySelector v-model:selected-city="selectedCity" />
            </div>
            <div class="panel bg-white/5 border-white/10 glass-outline p-4 flex flex-col justify-between">
              <div class="space-y-3">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-400">
                  目前目標城市
                </p>
                <p class="text-lg font-semibold text-white">
                  {{ selectedCityName || "尚未選擇" }}
                </p>
                <p class="text-xs text-slate-400">
                  更新時間：{{ weatherData?.updateTime || "等待資料同步" }}
                </p>
              </div>
              <div class="holo-line mt-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Mission Status</p>
            <div class="holo-line mt-2"></div>
          </div>
          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span class="chip">深淺色一鍵切換</span>
            <span class="chip border-nebula/40 bg-nebula/10 text-slate-100">觸控友好手勢</span>
            <span class="chip">無障礙色彩對比</span>
          </div>
        </div>

        <WeatherDisplay
          :weather-data="weatherData"
          :loading="isLoading"
          :error="hasError" />
      </section>

      <!-- 網站頁尾 -->
      <AppFooter />
    </main>
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
