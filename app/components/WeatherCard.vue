<template>
  <!-- 單一卡片呈現某時段的天氣資訊 -->
  <div
    class="panel p-6 transition-smooth hover:shadow-glow hover:border-aurora/40"
    data-aos="fade-up"
    :data-aos-delay="index * 100">
    <div class="flex justify-between items-start mb-4">
      <div class="space-y-1">
        <div class="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          {{ weekdayLabel }} · {{ formatDate(forecast.startTime) }}
        </div>
        <div class="text-sm text-slate-300">
          {{ formatTime(forecast.startTime) }} - {{ formatTime(forecast.endTime) }}
        </div>
      </div>
      <div class="text-3xl">
        {{ getWeatherIcon(forecast.weather) }}
      </div>
    </div>

    <div class="mb-4 flex items-start justify-between gap-3">
      <div>
        <div class="text-lg font-semibold text-white mb-2">
          {{ forecast.weather }}
        </div>
        <div class="text-3xl font-bold text-white">
          {{ forecast.minTemp }}° - {{ forecast.maxTemp }}°
        </div>
      </div>
      <div class="flex flex-col items-end gap-2 text-xs text-slate-400">
        <span class="px-2 py-1 rounded-full border border-white/15 bg-white/5">
          降雨 {{ rainValue }}%
        </span>
        <span class="px-2 py-1 rounded-full border border-white/15 bg-white/5">
          {{ forecast.comfort }}
        </span>
      </div>
    </div>

    <div class="space-y-4 text-sm text-slate-300">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
          <span>Temperature Band</span>
          <span class="text-slate-200">{{ forecast.minTemp }}° / {{ forecast.maxTemp }}°</span>
        </div>
        <div class="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-aurora to-nebula"
            :style="{ width: tempRangeWidth, marginLeft: tempRangeOffset }"></div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
          <span>Rainfall</span>
          <span class="text-slate-200">{{ rainValue }}%</span>
        </div>
        <div class="h-2 rounded-full bg-white/5 overflow-hidden">
          <div class="h-full bg-aurora/70" :style="{ width: `${rainValue}%` }"></div>
        </div>
        <p class="text-xs text-slate-400">{{ getRainAdvice(forecast.rain) }}</p>
      </div>

      <div class="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
        <div class="flex items-center gap-2">
          <span class="text-xl">{{ getRainIcon(forecast.rain) }}</span>
          <span class="text-sm text-slate-300">降雨率 {{ forecast.rain }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xl">🌡️</span>
          <span class="text-sm text-slate-300">{{ forecast.comfort }}</span>
        </div>
        <div v-if="forecast.windSpeed" class="flex items-center gap-2">
          <span class="text-xl">💨</span>
          <span class="text-sm text-slate-300">{{ forecast.windSpeed }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xl">🛰️</span>
          <span class="text-sm text-slate-300">結合卡片進度條，快速巡覽各時段趨勢。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { WeatherForecast } from "~/types/weather";

const props = defineProps<{
  forecast: WeatherForecast;
  index: number;
}>();

const weekdayLabel = computed(() => {
  const date = new Date(props.forecast.startTime);
  return new Intl.DateTimeFormat("zh-TW", { weekday: "short" }).format(date);
});

const rainValue = computed(() => {
  const numeric = parseInt(props.forecast.rain, 10);
  if (Number.isNaN(numeric)) return 0;
  return Math.min(100, Math.max(0, numeric));
});

const normalizedTemperature = (value: number) => {
  const clamped = Math.max(-5, Math.min(45, value));
  return (clamped + 5) / 50;
};

const tempRangeOffset = computed(() => {
  const min = Number.parseFloat(props.forecast.minTemp);
  if (Number.isNaN(min)) return "0%";
  return `${normalizedTemperature(min) * 100}%`;
});

const tempRangeWidth = computed(() => {
  const min = Number.parseFloat(props.forecast.minTemp);
  const max = Number.parseFloat(props.forecast.maxTemp);
  if (Number.isNaN(min) || Number.isNaN(max)) return "0%";
  const width = (normalizedTemperature(max) - normalizedTemperature(min)) * 100;
  return `${Math.max(8, width)}%`;
});

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
