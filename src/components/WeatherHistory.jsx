function WeatherHistory({ items, onSelect, onClear }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-500">
        No recent searches yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Recent searches
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] font-medium text-slate-500 hover:text-slate-300"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onSelect?.(city)}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherHistory;

