<template>
  <div class="w-full overflow-x-auto pb-4 px-3 sm:px-4 flex justify-start md:justify-center">
    <!-- 城市選單膠囊列，支援橫向卷軸避免擠壓 -->
    <div
      class="inline-flex w-max gap-3 p-3 glass-panel neon-border rounded-full grid-sheen">
      <button
        v-for="city in cities"
        :key="city.id"
        @click="selectCity(city.id)"
        class="relative px-4 sm:px-6 md:px-7 py-2.5 rounded-full font-display text-xs md:text-sm uppercase tracking-[0.28em] transition-smooth whitespace-nowrap overflow-hidden border border-slate-200/40 dark:border-slate-700/70"
        :class="[
          selectedCity === city.id
            ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-900 shadow-[0_10px_40px_rgba(14,165,233,0.35)]'
            : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/10 hover:dark:bg-white/5',
        ]">
        <span
          v-if="selectedCity === city.id"
          class="absolute inset-0 blur-3xl bg-cyan-300/40 animate-pulse pointer-events-none" />
        <span class="relative z-10">{{ city.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { City } from "~/types/weather";
import { CITIES } from "~/composables/useWeatherApi";

const props = defineProps<{
  selectedCity: City;
}>();

const emit = defineEmits<{
  "update:selectedCity": [city: City];
}>();

// 直接使用預先整理好的城市清單
const cities = CITIES;

// 將使用者選擇透過 v-model 往父層回傳，維持單一資料來源
const selectCity = (city: City) => {
  emit("update:selectedCity", city);
};
</script>
