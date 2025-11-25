<template>
  <Transition name="overlay-fade" appear>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
      <div class="text-6xl mb-6">
        ☁️
      </div>
      <div class="text-xl font-light text-black dark:text-white">
        載入天氣資料中...
      </div>
    </div>
  </Transition>
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

<style scoped>
/* 進場／退場皆使用淡入淡出，避免閃爍 */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
