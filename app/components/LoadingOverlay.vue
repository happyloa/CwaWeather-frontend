<template>
  <Transition name="overlay-fade" appear>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-2xl" />
      <div
        class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.16),transparent_25%),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div class="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        <div class="loader-core">
          <span class="orbit-ring orbit-ring-1" />
          <span class="orbit-ring orbit-ring-2" />
          <span class="orbit-ring orbit-ring-3" />
          <div class="core-glow">☁️</div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-display text-lg tracking-[0.3em] text-cyan-200 uppercase">
            Initializing
          </p>
          <p class="text-sm text-slate-300">
            啟動艙橋介面，正在連線最新天氣資料...
          </p>
        </div>
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

.loader-core {
  position: relative;
  width: 160px;
  height: 160px;
  display: grid;
  place-items: center;
}

.core-glow {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, #e0f2fe, #22d3ee);
  box-shadow: 0 0 0 10px rgba(14, 165, 233, 0.15), 0 20px 60px rgba(34, 211, 238, 0.35);
  font-size: 2rem;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1px solid rgba(34, 211, 238, 0.35);
  box-shadow: 0 0 24px rgba(34, 211, 238, 0.35);
  animation: rotate 6s linear infinite;
}

.orbit-ring-2 {
  inset: 12px;
  animation-duration: 9s;
  border-color: rgba(236, 72, 153, 0.35);
  box-shadow: 0 0 24px rgba(236, 72, 153, 0.3);
}

.orbit-ring-3 {
  inset: 24px;
  animation-duration: 12s;
  border-color: rgba(125, 211, 252, 0.4);
  box-shadow: 0 0 24px rgba(125, 211, 252, 0.3);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
