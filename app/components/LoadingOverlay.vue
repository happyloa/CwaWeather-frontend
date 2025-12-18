<template>
  <Transition name="overlay-fade" appear>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-midnight">
      <div class="panel panel-grid px-10 py-8 text-center max-w-md">
        <div class="relative flex items-center justify-center mx-auto h-28 w-28 mb-6">
          <div class="absolute inset-0 rounded-full border border-aurora/40 animate-pulse-glow"></div>
          <div class="absolute inset-4 rounded-full border border-aurora/40 animate-spin-slow"></div>
          <div class="absolute inset-0 rounded-full bg-aurora/10 blur-3xl"></div>
          <div class="relative text-4xl text-aurora">☄️</div>
        </div>
        <p class="text-xs uppercase tracking-[0.38em] text-aurora mb-2">Initializing</p>
        <p class="text-2xl font-semibold text-white">同步星際氣象資料中</p>
        <p class="mt-3 text-sm text-slate-400">
          最佳化動畫、無感載入，請稍候數秒完成連線。
        </p>
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
// 與 Transition 時間同步，避免卸載時畫面跳動
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
