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

export interface WeatherData {
  city: string;
  updateTime: string;
  forecasts: WeatherForecast[];
}

export interface ApiResponse {
  success: boolean;
  data: WeatherData;
}

export type City =
  | "taipei"
  | "newtaipei"
  | "taoyuan"
  | "taichung"
  | "tainan"
  | "kaohsiung";

export interface CityInfo {
  id: City;
  name: string;
  endpoint: string;
}
