import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = value.trim();
    if (!city) return;
    onSearch?.(city);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 shadow-sm backdrop-blur"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city (e.g. London)"
        className="flex-1 bg-transparent text-sm text-slate-50 placeholder:text-slate-500 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

