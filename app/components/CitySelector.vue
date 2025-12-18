<template>
  <div class="w-full">
    <div class="flex items-center justify-between px-1 mb-2 text-[11px] uppercase tracking-[0.22em] text-slate-400">
      <span>City Uplink</span>
      <span class="text-aurora">觸控／滑動支援</span>
    </div>
    <div class="w-full overflow-x-auto pb-3 flex justify-start md:justify-center">
      <!-- 城市選單膠囊列，支援橫向卷軸避免擠壓 -->
      <div
        class="inline-flex w-max gap-3 p-2 bg-white/5 border border-white/10 rounded-full shadow-glow backdrop-blur">
        <button
          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city.id)"
          class="relative group px-4 sm:px-5 md:px-6 py-2 rounded-full font-semibold transition-smooth text-sm md:text-base whitespace-nowrap tracking-wide text-slate-200 border"
          :class="[
            selectedCity === city.id
              ? 'bg-aurora/20 border-aurora/60 text-white shadow-glow'
              : 'bg-white/5 border-white/10 hover:border-aurora/40 hover:text-white',
          ]"
          :aria-pressed="selectedCity === city.id"
          type="button">
          <span class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-aurora/20 to-nebula/15 blur-xl transition-smooth"></span>
          <span class="relative flex items-center gap-2">
            <span
              class="h-2 w-2 rounded-full"
              :class="selectedCity === city.id ? 'bg-aurora animate-pulse' : 'bg-slate-500'" />
            {{ city.name }}
          </span>
        </button>
      </div>
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
