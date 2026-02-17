function formatTime(timestamp, locale = navigator.language) {
  if (!timestamp) return "-";
  return new Date(timestamp * 1000).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function WeatherCard({ data }) {
  if (!data) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40">
        <p className="text-sm text-slate-500">
          Search for a city to see the weather.
        </p>
      </div>
    );
  }

  const iconUrl = data.icon
    ? `https://openweathermap.org/img/wn/${data.icon}@4x.png`
    : null;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/60 p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            {data.city}, {data.country}
          </h2>
          <p className="mt-1 text-sm capitalize text-slate-300">
            {data.description}
          </p>
        </div>
        {iconUrl && (
          <img
            src={iconUrl}
            alt={data.description}
            className="h-20 w-20 drop-shadow-lg"
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-200 md:grid-cols-4">
        <div>
          <p className="text-xs text-slate-400">Temperature</p>
          <p className="text-2xl font-semibold">
            {data.temperature}
            <span className="text-base align-top">°C</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Feels like {data.feelsLike}°C
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Humidity</p>
          <p className="mt-1 text-base">{data.humidity}%</p>
          <p className="mt-2 text-xs text-slate-400">Pressure</p>
          <p className="mt-1 text-base">{data.pressure} hPa</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Wind</p>
          <p className="mt-1 text-base">{data.windSpeed} m/s</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Sunrise / Sunset</p>
          <p className="mt-1 text-base">
            {formatTime(data.sunrise)} / {formatTime(data.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

