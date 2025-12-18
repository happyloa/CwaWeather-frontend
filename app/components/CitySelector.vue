<template>
  <div class="w-full overflow-x-auto pb-4 px-2 sm:px-3 flex justify-start md:justify-center">
    <div class="inline-flex w-max gap-2 p-2 rounded-2xl glass-panel glow-border border border-white/10">
      <button
        v-for="city in cities"
        :key="city.id"
        @click="selectCity(city.id)"
        class="relative px-4 sm:px-5 md:px-6 py-2.5 rounded-full font-semibold transition-smooth text-sm md:text-base whitespace-nowrap tracking-wide"
        :class="[
          selectedCity === city.id
            ? 'bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 text-white neon-pill ring-1 ring-cyan-300/50 shadow-[0_10px_35px_rgba(91,240,255,0.25)]'
            : 'bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-cyan-400/30',
        ]">
        <span class="absolute inset-x-6 -top-[6px] h-[2px] rounded-full accent-bar opacity-70"></span>
        {{ city.name }}
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
