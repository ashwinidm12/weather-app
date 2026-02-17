import axios from "axios";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// Axios instance with base configuration
const client = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: apiKey,
    units: "metric",
  },
});

// Fetch current weather for a given city
export const fetchCurrentWeather = async (city) => {
  if (!apiKey) {
    throw new Error("Missing OpenWeatherMap API key.");
  }

  const response = await client.get("/weather", {
    params: { q: city },
  });

  return response.data;
};

// Fetch 5-day / 3-hour forecast for a given city
export const fetchForecast = async (city) => {
  if (!apiKey) {
    throw new Error("Missing OpenWeatherMap API key.");
  }

  const response = await client.get("/forecast", {
    params: { q: city },
  });

  return response.data;
};

