"use client";

import Link from "next/link";
import PosterCard from "./PosterCard";
import { useFavorites } from "./FavoritesProvider";
import { SAMPLE_FRIEND } from "@/lib/sampleFriend";
import { sharedTitles, compatibility } from "@/lib/match";

// You vs. a sample friend: score, shared titles, both lists side by side

export default function CompareView() {
  const { favorites } = useFavorites();
  const friend = SAMPLE_FRIEND;

  if (favorites.length === 0) {
    return (
      <p className="text-muted">
        You have no picks yet.{" "}
        <Link href="/match" className="text-lavender underline">
          Add some first
        </Link>
        .
      </p>
    );
  }

  const score = compatibility(favorites, friend.picks);
  const shared = sharedTitles(favorites, friend.picks);

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-[28px] bg-surface p-8 text-center">
        <p className="text-xs font-medium text-lavender">
          YOU + {friend.name.toUpperCase()}
        </p>
        <p className="mt-3 text-7xl font-black tracking-[-0.04em]">{score}%</p>
        <p className="mt-2 text-sm font-medium text-muted">compatible</p>
      </section>

      <PosterSection
        title="You both love"
        items={shared}
        empty="No shared titles yet."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <PosterSection title="You" items={favorites} />
        <PosterSection title={friend.name} items={friend.picks} />
      </div>
    </div>
  );
}

function PosterSection({ title, items, empty }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.04em]">
        {title} <span className="text-muted">{items.length}</span>
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{empty}</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <PosterCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
