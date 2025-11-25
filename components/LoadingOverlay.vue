<template>
  <div
    v-if="isVisible"
    ref="overlayRef"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black"
    data-aos="fade-out"
    data-aos-delay="1000"
    data-aos-duration="500">
    <div class="text-6xl mb-6" data-aos="zoom-in" data-aos-duration="600">
      ☁️
    </div>
    <div
      class="text-xl font-light text-black dark:text-white"
      data-aos="fade-up"
      data-aos-delay="300">
      載入天氣資料中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  hide: [];
}>();

const isVisible = ref(true);

// Prevent scrolling when overlay is visible
watch(
  isVisible,
  (visible) => {
    if (import.meta.client) {
      if (visible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        isVisible.value = false;
        emit("hide");
      }, 1500);
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});
</script>
