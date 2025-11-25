import AOS from "aos";
import "aos/dist/aos.css";

// 初始化 AOS 滾動動畫，限定於瀏覽器端
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: false,
      offset: 50,
    });
  });
});
