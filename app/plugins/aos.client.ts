import AOS from "aos";
import "aos/dist/aos.css";

// 初始化 AOS 滾動動畫，限定於瀏覽器端
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    // 掛載後再啟動，避免 SSR 階段存取 window 物件
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: false,
      offset: 50,
    });
  });
});
