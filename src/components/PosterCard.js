import Image from "next/image";
import FavoriteToggle from "./FavoriteToggle";

// Card / Selectable poster - Designed in Figma w/ add favs or remove feature

export default function PosterCard({ item }) {
  return (
    <div className="group relative">
      <div className="relative aspect-[35/48] overflow-hidden rounded-[14px] bg-elevated ring-purple transition group-hover:ring-1 group-hover:shadow-[0_0_7px_rgba(139,92,246,0.18)]">
        {item.poster ? (
          <Image
            src={item.poster}
            alt={`${item.title} poster`}
            fill
            sizes="(min-width: 1024px) 140px, 45vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">
            {item.type === "tv" ? "📺" : "🎬"}
          </div>
        )}
        <FavoriteToggle
          item={item}
          className="absolute right-[10px] top-[10px]"
        />
      </div>
      <p className="mt-3 truncate text-xs font-medium">{item.title}</p>
      <p className="mt-[7px] text-xs font-medium text-muted">
        {item.year ?? "-"} · {item.type === "tv" ? "Show" : "Movie"}
      </p>
    </div>
    
  );
}
