<template>
  <div v-if="loading" class="py-8">
    <LoadingSkeleton />
  </div>

  <div v-else-if="error" class="text-center py-12 panel">
    <div class="text-4xl mb-4">😔</div>
    <div class="text-slate-300">
      無法載入天氣資料，請稍後再試或切換其他城市
    </div>
  </div>

  <div v-else-if="weatherData" class="space-y-10">
    <!-- 城市標題區 -->
    <section class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div class="panel p-6 md:p-8" data-aos="fade-down">
        <div class="flex flex-col gap-4">
          <div class="flex items-start justify-between gap-6">
            <div>
              <p class="text-xs uppercase tracking-[0.34em] text-aurora">City / Update</p>
              <h1 class="text-3xl sm:text-4xl font-bold text-white">
                {{ weatherData.city }}
              </h1>
              <p class="text-sm text-slate-300">
                {{ weatherData.updateTime }}
              </p>
            </div>
            <div class="text-right space-y-2">
              <span class="chip">三日預報</span>
              <p class="text-xs text-slate-400">
                {{ primaryForecast?.weather || "正在同步" }}
              </p>
            </div>
          </div>

          <div class="divider-glow"></div>

          <div class="grid gap-4 md:grid-cols-3 items-stretch">
            <div class="md:col-span-2 panel bg-white/5 border-white/10 glass-outline p-5 md:p-6 scanline">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="text-5xl sm:text-6xl">
                    {{ getWeatherIcon(primaryForecast?.weather || "") }}
                  </div>
                  <div>
                    <p class="text-3xl sm:text-4xl font-bold text-white">
                      <span v-if="primaryForecast">{{ primaryForecast.minTemp }}° - {{ primaryForecast.maxTemp }}°</span>
                      <span v-else>—</span>
                    </p>
                    <p class="text-sm text-slate-300">{{ primaryForecast?.weather || "資料準備中" }}</p>
                  </div>
                </div>
                <div class="text-sm text-slate-300 space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-aurora animate-pulse"></span>
                    <span>{{ comfortHint }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-nebula"></span>
                    <span>降雨率 {{ primaryForecast?.rain || "--" }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-aurora to-nebula"
                  :style="{ width: rainBarWidth }"></div>
              </div>
              <p class="text-[11px] text-slate-400 mt-2 uppercase tracking-[0.18em]">Precipitation probability</p>
            </div>

            <div class="panel bg-midnight-glow/40 border-white/10 glass-outline p-5 flex flex-col gap-4">
              <div class="flex items-center justify-between text-sm text-slate-300">
                <span>體感</span>
                <span class="font-semibold text-white">{{ primaryForecast?.comfort || "--" }}</span>
              </div>
              <div class="flex items-center justify-between text-sm text-slate-300">
                <span>風速</span>
                <span class="font-semibold text-white">{{ primaryForecast?.windSpeed || "穩定" }}</span>
              </div>
              <div class="text-xs text-slate-400 leading-relaxed">
                透過色塊對比強化資訊層次，三秒內即可判讀當前溫度區間、降雨機率與穿著建議。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel p-6 md:p-7 flex flex-col gap-4" data-aos="fade-left" data-aos-delay="120">
        <p class="text-xs uppercase tracking-[0.32em] text-aurora">Mission Brief</p>
        <p class="text-lg font-semibold text-white">操作提示與 UX 強化</p>
        <ul class="space-y-3 text-sm text-slate-300 leading-relaxed">
          <li class="flex gap-3">
            <span class="text-aurora">◆</span>
            <span>城市選單支援滑動、點擊，選取後自動儲存於網址參數，重新整理仍保留選擇。</span>
          </li>
          <li class="flex gap-3">
            <span class="text-aurora">◆</span>
            <span>主卡片突出當下溫度範圍與降雨率，右下角夜間模式能在低光環境維持閱讀清晰度。</span>
          </li>
          <li class="flex gap-3">
            <span class="text-aurora">◆</span>
            <span>下方預報卡顯示雨量、舒適度、風速，並以進度條提示變化幅度，快速掌握趨勢。</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 三天預報卡片排列 -->
    <section class="space-y-4">
      <div class="flex items-center justify-between" data-aos="fade-right">
        <h2 class="text-2xl font-bold text-white">三天預報</h2>
        <p class="text-xs text-slate-400 uppercase tracking-[0.24em]">Forecast Cards</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCard
          v-for="(forecast, index) in weatherData.forecasts"
          :key="index"
          :forecast="forecast"
          :index="index" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { WeatherData } from "~/types/weather";

// 由父層傳入資料與狀態，用於切換骨架、錯誤訊息或實際天氣內容
const props = defineProps<{
  weatherData: WeatherData | null;
  loading: boolean;
  error: boolean;
}>();

const primaryForecast = computed(() => props.weatherData?.forecasts?.[0]);
const rainValue = computed(() => {
  const value = parseInt(primaryForecast.value?.rain ?? "0", 10);
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
});

const rainBarWidth = computed(() => `${rainValue.value}%`);

const comfortHint = computed(() => {
  const comfort = primaryForecast.value?.comfort ?? "";
  if (comfort.includes("舒適")) return "舒適度良好，適合外出";
  if (comfort.includes("熱") || comfort.includes("悶")) return "補充水分並留意遮陽";
  if (comfort.includes("涼") || comfort.includes("冷")) return "氣溫稍低，記得加件外套";
  return "根據即時舒適度調整穿著";
});

// 依當日天氣描述選擇最合適的 emoji
const getWeatherIcon = (weather: string): string => {
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("多雲")) return "⛅";
  if (weather.includes("陰")) return "☁️";
  if (weather.includes("雨")) return "🌧️";
  if (weather.includes("雷")) return "⛈️";
  return "🌤️";
};
</script>
