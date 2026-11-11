"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PosterCard from "./PosterCard";
import PicksPanel from "./PicksPanel";

const CHIPS = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "Shows" },
];

// Search bar + chips + poster on left, "Your Picks panel on right"

export default function AddFavorites() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchedFor, setSearchedFor] = useState("");
  const [trending, setTrending] = useState(null);
  const [type, setType] = useState("all");
  const inputRef = useRef(null);

  // Load "curated for you" once the page opens
  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data.results ?? []))
      .catch(() => setTrending([]));
  }, []);

  // search 300ms after the user stops typing (debounce)
  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.results ?? []);
        setSearchedFor(q);
      } catch (err) {
        if (err.name === "AbortError") return; // cancelled because user kept typing
        setResults([]);
        setSearchedFor(q);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // ⌘K (or Ctrl+K) jumps to the search bar
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const q = query.trim();
  const searching = q !== "";
  const loading = searching ? q !== searchedFor : trending === null;
  const items = (searching ? results : (trending ?? [])).filter(
    (item) => type === "all" || item.type === type,
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        {/* Search bar */}
        <div className="relative flex h-16 items-center rounded-[32px] bg-elevated px-[26px]">
          <Image src="/icons/search-field.svg" alt="" width={24} height={24} />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search movies, shows, or a little obsession…"
            className="ml-4 h-full flex-1 bg-transparent outline-none placeholder:text-muted"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="px-2 text-muted hover:text-foreground"
            >
              ×
            </button>
          ) : (
            <span className="hidden text-xs font-medium text-muted sm:inline">
              ⌘ K
            </span>
          )}
        </div>

        {/* Chips: All / Movies / Shows */}
        <div className="mt-6 flex gap-3">
          {CHIPS.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setType(chip.value)}
              className={`h-10 rounded-[20px] px-7 text-sm font-medium transition ${
                type === chip.value
                  ? "bg-purple"
                  : "border border-line hover:border-muted"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Poster grid */}
        <p className="mb-4 mt-[26px] text-xs font-medium text-muted">
          {searching ? `RESULTS FOR “${q.toUpperCase()}”` : "CURATED FOR YOU"}
        </p>
        {loading ? (
          <p className="text-sm text-muted">
            {searching ? "Searching…" : "Loading…"}
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted">No results. Try another title.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-[23px] gap-y-3 sm:grid-cols-3 md:grid-cols-5">
            {items.map((item) => (
              <PosterCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <PicksPanel />
    </div>
  );
}
