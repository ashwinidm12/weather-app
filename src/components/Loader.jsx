function Loader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      <p className="ml-3 text-sm text-slate-300">Loading weather data...</p>
    </div>
  );
}

export default Loader;

