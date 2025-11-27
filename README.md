# 台灣天氣預報前端

以 Nuxt 4 + TypeScript 打造的六都三天天氣查詢網站，進站時會先播放 2 秒蓋版動畫，並支援深淺色主題切換與平滑的滾動動效，方便快速掌握各城市天氣。版面基於 Tailwind CSS，並透過 AOS 在瀏覽器端套用滾動動畫。

## 功能亮點
- 進站或重新整理時先顯示 2 秒蓋版動畫，確保使用者感受一致
- 內建 Open Graph 標題與描述，方便社群分享
- 六都快速切換、三天預報卡片與即時顯示圖示
- 深淺色模式切換、AOS 動畫與 Tailwind UI 版型
- 全面採用 TypeScript 與 typed Tailwind 設定，避免隱性型別錯誤

## 專案結構與資料流
採用 Nuxt 4 的 `/app` 目錄作為專案根目錄，並以 `pages/index.vue` 作為單一入口頁：
- `app/pages/index.vue`：負責 URL query 與城市選擇同步、呼叫天氣 API、切換 loading overlay，以及動態注入 head meta。
- `app/components/`：
  - `CitySelector`：膠囊式按鈕列，透過 `v-model:selected-city` 反向通知父層。
  - `WeatherDisplay`：依 loading、error、資料狀態切換骨架、錯誤提示與資料展示。
  - `WeatherCard`：格式化單筆預報資料，附有降雨建議等 UI 提示。
  - `LoadingOverlay` / `LoadingSkeleton`：分別處理進站蓋版動畫與資料載入中的骨架畫面。
  - `ThemeToggle`、`AppFooter`：全域介面控制與頁尾資訊。
- `app/composables/useWeatherApi.ts`：集中管理 API base URL 與六都清單，提供 `fetchWeather` 方法給頁面使用。
- `app/plugins/aos.client.ts`：在瀏覽器端初始化 AOS 滾動動畫。
- `app/types/`：天氣資料、城市等 TypeScript 型別定義，供組件、Composable 共用。
- `app/assets/`：全域樣式與靜態資源（若有新增 icon 或背景可放於此）。
- `tailwind.config.ts`：typed Tailwind 設定，搭配 Nuxt 自動載入樣式。

### 狀態與資料流程
1. 首次進站會顯示 `LoadingOverlay`，並在 2 秒後隱藏，同時解鎖頁面滾動。
2. 城市切換透過 `CitySelector` 觸發，`pages/index.vue` 會同步 URL query（`currentCity`）並呼叫 `fetchWeather` 取得資料。
3. `WeatherDisplay` 接收 `loading`、`error` 與 `weatherData`，決定展示骨架、錯誤訊息或預報卡片。
4. `useHead` 依當前城市更新標題與 Open Graph meta，確保分享資訊同步。

## 環境需求
- Node.js 18 以上
- npm（或任一支援的套件管理器）

## 安裝與啟動
```bash
# 安裝依賴
npm install

# 啟動開發伺服器（http://localhost:3000）
npm run dev

# 建置正式版
npm run build

# 預覽正式版
npm run preview
```

## 開發者筆記
- 專案入口已全面轉向 Nuxt `app/pages/index.vue`，原有的 `index.html` 原型頁面已移除並改寫為 Nuxt 的 head 設定。
- 全域字體透過 `nuxt.config.ts` 預載 Noto Sans 與 Zen Maru Gothic，若需新增字體可直接於該檔案管理。
- 天氣 API 與城市清單集中在 `app/composables/useWeatherApi.ts`，新增城市時只需擴充 `CITIES` 清單即可。

## 部署
建置完成後，輸出內容可直接佈署至支援 Node 的環境或任何靜態主機（搭配 `nuxt generate`）。更多資訊可參考 [Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)。
