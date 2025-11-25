<template>
  <div
    v-if="isVisible"
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

// 控制蓋版動畫是否顯示的外部屬性
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  hide: [];
}>();

const isVisible = ref(props.show);
const overlayHideDelay = 400;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

// 依顯示狀態鎖定／解鎖頁面滾動
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

// 根據父層傳入的 show 控制顯示與隱藏
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;
      return;
    }

    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    hideTimer = setTimeout(() => {
      isVisible.value = false;
      emit("hide");
    }, overlayHideDelay);
  }
);

// 元件卸載時移除計時器並恢復滾動
onUnmounted(() => {
  if (hideTimer) {
    clearTimeout(hideTimer);
  }

  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});
</script>
