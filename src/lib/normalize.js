// Turns one raw TMDB result (movie or TV) into the shape the rest of the app uses:
// { id, type, title, year, genres, poster }

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

// TMDB genre ids → our genre names. Movies and TV share some ids.
// TV has combined genres (like "Sci-Fi & Fantasy"), so those map to two names.
const GENRES = {
  // Movie + TV
  16: ["animation"],
  35: ["comedy"],
  80: ["crime"],
  99: ["documentary"],
  18: ["drama"],
  10751: ["family"],
  9648: ["mystery"],
  37: ["western"],

  // Movie only
  28: ["action"],
  12: ["adventure"],
  14: ["fantasy"],
  36: ["history"],
  27: ["horror"],
  10402: ["music"],
  10749: ["romance"],
  878: ["scifi"],
  53: ["thriller"],
  10752: ["war"],
  10770: ["tv-movie"],

  // TV only
  10759: ["action", "adventure"], // Action & Adventure
  10765: ["scifi", "fantasy"], // Sci-Fi & Fantasy
  10768: ["war", "politics"], // War & Politics
  10762: ["kids"],
  10763: ["news"],
  10764: ["reality"],
  10766: ["soap"],
  10767: ["talk"],
};

export function mapGenres(genreIds = []) {
  // Set removes duplicates, e.g. Action (28) + Action & Adventure (10759).
  return [...new Set(genreIds.flatMap((id) => GENRES[id] ?? []))];
}

export function normalize(item) {
  const type = item.media_type === "tv" ? "tv" : "movie";
  const title = type === "tv" ? item.name : item.title;
  const date = type === "tv" ? item.first_air_date : item.release_date;

  return {
    id: `${type}-${item.id}`,
    type,
    title,
    year: date ? Number(date.slice(0, 4)) : null,
    genres: mapGenres(item.genre_ids),
    poster: item.poster_path ? `${POSTER_BASE}${item.poster_path}` : null,
  };
}
