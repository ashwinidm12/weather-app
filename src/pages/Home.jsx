import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import WeatherHistory from "../components/WeatherHistory";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useWeather } from "../hooks/useWeather";

function Home() {
  const {
    currentWeather,
    forecast,
    history,
    loading,
    error,
    searchWeather,
    clearHistory,
  } = useWeather("New York");

  const handleSearch = (city) => {
    if (!city) return;
    searchWeather(city);
  };

  const handleSelectHistory = (city) => {
    if (!city) return;
    searchWeather(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
              Weather Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Search for any city to see the current conditions and 5-day
              forecast.
            </p>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
          <div className="flex flex-col gap-4">
            <SearchBar onSearch={handleSearch} />
            {error && <ErrorMessage message={error} />}
            {loading && <Loader />}
            {!loading && <WeatherCard data={currentWeather} />}
          </div>

          <div className="flex flex-col gap-4">
            <WeatherHistory
              items={history}
              onSelect={handleSelectHistory}
              onClear={clearHistory}
            />
            <Forecast items={forecast} />
          </div>
        </section>

        <footer className="mt-4 text-[11px] text-slate-500">
          Data provided by{" "}
          <a
            href="https://openweathermap.org/"
            className="font-medium text-sky-400 hover:text-sky-300"
            target="_blank"
            rel="noreferrer"
          >
            OpenWeatherMap
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Home;

