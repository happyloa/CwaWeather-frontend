<template>
  <Transition name="overlay-fade" appear>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <div class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(91,240,255,0.15),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,126,252,0.15),transparent_30%)]"></div>
      <div class="relative flex flex-col items-center gap-4">
        <div class="h-16 w-16 rounded-full border-2 border-cyan-300 border-t-transparent animate-spin-slow shadow-[0_0_35px_rgba(91,240,255,0.25)]"></div>
        <div class="text-xl font-semibold tracking-[0.3em] uppercase">Initializing</div>
        <div class="text-sm text-slate-300">載入天氣資料中...</div>
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
