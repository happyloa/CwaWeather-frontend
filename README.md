# 台灣天氣預報前端

以 Nuxt 4 + TypeScript 打造的六都三天天氣查詢網站，進站時會先播放 2 秒蓋版動畫，並支援深淺色主題切換與平滑的滾動動效，方便快速掌握各城市天氣。

## 功能亮點
- 進站或重新整理時先顯示 2 秒蓋版動畫，確保使用者感受一致
- 內建 Open Graph 標題與描述，方便社群分享
- 六都快速切換、三天預報卡片與即時顯示圖示
- 深淺色模式切換、AOS 動畫與 Tailwind UI 版型
- 全面採用 TypeScript 與 typed Tailwind 設定，避免隱性型別錯誤

## 專案結構
採用 Nuxt 4 的 `/app` 目錄作為專案根目錄：
- `app/app.vue`：應用程式入口
- `app/pages/`：路由頁面
- `app/components/`：共用元件
- `app/composables/`：資料存取與邏輯抽象
- `app/plugins/`：外掛（例如 AOS 動畫）
- `app/assets/`：全域樣式與靜態資源
- `app/types/`：型別定義
- `tailwind.config.ts`：typed Tailwind 設定，對應 Nuxt 自動載入

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
