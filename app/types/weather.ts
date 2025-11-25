// API 回傳的單筆天氣預報資料結構
export interface WeatherForecast {
  startTime: string;
  endTime: string;
  weather: string;
  rain: string;
  minTemp: string;
  maxTemp: string;
  comfort: string;
  windSpeed: string;
}

// 城市彙整的天氣資訊
export interface WeatherData {
  city: string;
  updateTime: string;
  forecasts: WeatherForecast[];
}

// API 的標準回應格式
export interface ApiResponse {
  success: boolean;
  data: WeatherData;
}

// 目前支援的六都城市代碼
export type City =
  | "taipei"
  | "newtaipei"
  | "taoyuan"
  | "taichung"
  | "tainan"
  | "kaohsiung";

// 城市選單顯示用的資料模型
export interface CityInfo {
  id: City;
  name: string;
  endpoint: string;
}
