"use client";

import { useFavorites } from "./FavoritesProvider";

// Round button for any movie/show cards
// "+" = not in favs, "✓" in favs (turn in "x" on hover, to remove)

export default function FavoriteToggle({ item, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const added = isFavorite(item.id);

  return (
    <button
      onClick={() => toggleFavorite(item)}
      aria-pressed={added}
      aria-label={
        added
          ? `Remove ${item.title} from favorites`
          : `Add ${item.title} to favorites`
      }
      title={added ? "Remove from favorites" : "Add to favorites"}
      className={`group/toggle flex size-[29px] items-center justify-center rounded-full text-sm font-medium transition ${
        added ? "bg-purple hover:bg-deep" : "bg-elevated hover:bg-purple"
      } ${className}`}
    >
      {added ? (
        <>
          <span className="group-hover/toggle:hidden">✓</span>
          <span className="hidden group-hover/toggle:inline">×</span>
        </>
      ) : (
        <span className="text-base leading-none">+</span>
      )}
    </button>
  );
}
