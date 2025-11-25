<template>
  <div
    v-if="isVisible"
    ref="overlayRef"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
    <div ref="iconRef" class="text-6xl mb-6">☁️</div>
    <div ref="textRef" class="text-xl font-light text-black dark:text-white">
      載入天氣資料中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  hide: [];
}>();

const isVisible = ref(true);
const overlayRef = ref<HTMLElement>();
const iconRef = ref<HTMLElement>();
const textRef = ref<HTMLElement>();

const hideOverlay = () => {
  if (!overlayRef.value || !iconRef.value || !textRef.value) return;

  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false;
      emit("hide");
    },
  });

  tl.to(iconRef.value, {
    scale: 1.5,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
  })
    .to(
      textRef.value,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    )
    .to(
      overlayRef.value,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "-=0.2"
    );
};

onMounted(() => {
  if (iconRef.value && textRef.value) {
    gsap.from(iconRef.value, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    gsap.from(textRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.3,
      ease: "power2.out",
    });
  }
});

watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      hideOverlay();
    }
  }
);
</script>
