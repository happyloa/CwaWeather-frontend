import type { City, ApiResponse, CityInfo } from "~/types/weather";

// API 網址與城市清單集中管理，便於後續維護
const API_BASE_URL = "https://hex2025-vibe-coding-week4.zeabur.app/api/weather";

export const CITIES: CityInfo[] = [
  { id: "taipei", name: "台北市", endpoint: "/taipei" },
  { id: "newtaipei", name: "新北市", endpoint: "/newtaipei" },
  { id: "taoyuan", name: "桃園市", endpoint: "/taoyuan" },
  { id: "taichung", name: "台中市", endpoint: "/taichung" },
  { id: "tainan", name: "台南市", endpoint: "/tainan" },
  { id: "kaohsiung", name: "高雄市", endpoint: "/kaohsiung" },
];

export const useWeatherApi = () => {
  const fetchWeather = async (city: City): Promise<ApiResponse> => {
    const cityInfo = CITIES.find((c) => c.id === city);
    if (!cityInfo) {
      throw new Error(`Invalid city: ${city}`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${cityInfo.endpoint}`);
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      // 紀錄錯誤以利除錯
      console.error(`Failed to fetch weather for ${city}:`, error);
      throw error;
    }
  };

  return {
    fetchWeather,
    CITIES,
  };
};
