function Forecast({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex h-full min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40">
        <p className="text-sm text-slate-500">
          5-day forecast will appear here.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 shadow-md">
      <h3 className="text-sm font-semibold text-slate-100">5-Day Forecast</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-100 sm:grid-cols-3 md:grid-cols-5">
        {items.map((day) => {
          const iconUrl = day.icon
            ? `https://openweathermap.org/img/wn/${day.icon}@2x.png`
            : null;
          return (
            <div
              key={day.date}
              className="flex flex-col items-center rounded-xl bg-slate-900/80 p-3"
            >
              <p className="text-xs text-slate-400">
                {formatDate(day.date)}
              </p>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={day.description}
                  className="mt-1 h-10 w-10"
                />
              )}
              <p className="mt-1 text-xs capitalize text-slate-300 text-center">
                {day.description}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {day.maxTemp}° /{" "}
                <span className="text-slate-400">{day.minTemp}°</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;

