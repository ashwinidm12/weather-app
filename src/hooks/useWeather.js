import { useCallback, useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
} from "../services/weatherService";

const HISTORY_STORAGE_KEY = "weather-app-history";

const loadHistoryFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persistHistory = (history) => {
  try {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors
  }
};

export const useWeather = (initialCity = "New York") => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize history from localStorage
  useEffect(() => {
    setHistory(loadHistoryFromStorage());
  }, []);

  const addToHistory = useCallback((city) => {
    setHistory((previous) => {
      const filtered = previous.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
      );
      const updated = [city, ...filtered].slice(0, 5);
      persistHistory(updated);
      return updated;
    });
  }, []);

  const normalizeCurrentWeather = (data) => ({
    id: data.id,
    city: data.name,
    country: data.sys?.country,
    temperature: Math.round(data.main?.temp),
    feelsLike: Math.round(data.main?.feels_like),
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    windSpeed: data.wind?.speed,
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
  });

  const normalizeForecast = (data) => {
    if (!data?.list) return [];

    const byDate = data.list.reduce((accumulator, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!accumulator[date]) accumulator[date] = [];
      accumulator[date].push(item);
      return accumulator;
    }, {});

    const days = Object.entries(byDate)
      .slice(0, 5)
      .map(([date, items]) => {
        const temperatures = items.map((entry) => entry.main.temp);
        const minTemp = Math.round(Math.min(...temperatures));
        const maxTemp = Math.round(Math.max(...temperatures));

        const target =
          items.find((entry) => entry.dt_txt.includes("12:00:00")) ?? items[0];

        const description = target.weather?.[0]?.description;
        const icon = target.weather?.[0]?.icon;

        return {
          date,
          minTemp,
          maxTemp,
          description,
          icon,
        };
      });

    return days;
  };

  const searchWeather = useCallback(
    async (city) => {
      if (!city) return;

      setLoading(true);
      setError("");

      try {
        const [current, forecastData] = await Promise.all([
          fetchCurrentWeather(city),
          fetchForecast(city),
        ]);

        setCurrentWeather(normalizeCurrentWeather(current));
        setForecast(normalizeForecast(forecastData));
        addToHistory(city.trim());
      } catch (errorInstance) {
        console.error(errorInstance);
        let message = "Unable to fetch weather data.";
        if (errorInstance.response?.data?.message) {
          message = errorInstance.response.data.message;
        } else if (errorInstance.message) {
          message = errorInstance.message;
        }
        setError(message);
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    persistHistory([]);
  }, []);

  // Optionally load an initial city on mount
  useEffect(() => {
    if (initialCity) {
      searchWeather(initialCity);
    }
  }, [initialCity, searchWeather]);

  return {
    currentWeather,
    forecast,
    history,
    loading,
    error,
    searchWeather,
    clearHistory,
  };
};

