# 台灣天氣預報前端

以 Nuxt 4 打造的六都三天天氣查詢網站，進站時會先播放 2 秒蓋版動畫，並支援深淺色主題切換與平滑的滾動動效，方便快速掌握各城市天氣。

## 功能亮點
- 進站或重新整理時先顯示 2 秒蓋版動畫，確保使用者感受一致
- 內建 Open Graph 標題與描述，方便社群分享
- 六都快速切換、三天預報卡片與即時顯示圖示
- 深淺色模式切換、AOS 動畫與 Tailwind UI 版型

## 專案結構
採用 Nuxt 4 的 `/app` 目錄作為專案根目錄：
- `app/app.vue`：應用程式入口
- `app/pages/`：路由頁面
- `app/components/`：共用元件
- `app/composables/`：資料存取與邏輯抽象
- `app/plugins/`：外掛（例如 AOS 動畫）
- `app/assets/`：全域樣式與靜態資源
- `app/types/`：型別定義

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

## 部署
建置完成後，輸出內容可直接佈署至支援 Node 的環境或任何靜態主機（搭配 `nuxt generate`）。更多資訊可參考 [Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)。
