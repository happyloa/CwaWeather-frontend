<template>
  <div
    class="w-full overflow-x-auto pb-3 px-3 sm:px-4 flex justify-start md:justify-center">
    <!-- 城市選單膠囊列，支援橫向卷軸避免擠壓 -->
    <div
      class="inline-flex w-max gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-full shadow-lg">
      <button
        v-for="city in cities"
        :key="city.id"
        @click="selectCity(city.id)"
        class="px-3 sm:px-4 md:px-6 py-2 rounded-full font-medium transition-smooth text-sm md:text-base whitespace-nowrap"
        :class="[
          selectedCity === city.id
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
            : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800',
        ]">
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

const selectCity = (city: City) => {
  emit("update:selectedCity", city);
};
</script>
