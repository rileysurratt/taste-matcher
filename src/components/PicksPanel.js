"use client";

import Image from "next/image";
import { useFavorites } from "./FavoritesProvider";
import { useRouter } from "next/navigation";

const WORDS = [
  "No",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
const MIN_PICKS = 3;

// "Your picks" panel is designed in Figma

export default function PicksPanel() {
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();
  const count = favorites.length;
  const countWord = WORDS[count] ?? count;

  return (
    <aside className="flex w-full flex-col rounded-[28px] bg-surface p-6 lg:sticky lg:top-6 lg:min-h-[690px] lg:w-[384px] lg:shrink-0">
      <div className="flex items-start justify-between">
        <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.04em]">
          Your Picks
        </h2>
        <span className="flex h-10 w-14 -rotate-5 items-center justify-center rounded-[20px] bg-lavender text-sm font-medium text-background">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-muted">
        {count === 0
          ? "Nothing yet. Tap + on anything you love!"
          : `${countWord} favorite${count === 1 ? "" : "s"}. A little. but of you.`}
      </p>

      <ul className="mt-6 flex max-h-[392px] flex-col gap-[26px] overflow-y-auto">
        {favorites.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <div className="relative h-[72px] w-12 shrink-0 overflow-hidden rounded-lg bg-elevated">
              {item.poster && (
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate">{item.title}</p>
              <p className="mt-1 text-xs font-medium text-muted">
                {item.year ?? "-"} · {item.type === "tv" ? "Show" : "Movie"}
              </p>
            </div>
            <button
              onClick={() => removeFavorite(item.id)}
              aria-label={`Remove ${item.title}`}
              className="px-2 text-muted hover:text-foreground"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <p className="text-xs font-medium text-lavender">
          GOOD TASTE TAKES A FEW PICKS
        </p>
        <p className="mt-2 text-sm font-medium text-muted">
          Add {MIN_PICKS} or more to find your people.
        </p>
        <button
          disabled={count < MIN_PICKS}
          onClick={() => router.push("/compare")}
          className="mt-6 h-12 w-full rounded-3xl bg-purple text-sm font-medium hover:bg-purple/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Find matches&nbsp;&nbsp;↗
        </button>
      </div>
    </aside>
  );
}
