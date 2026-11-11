import { normalize } from "@/lib/normalize";

// Fake data for now. Ticket #21 will replace this with real TMDB results.
const favorites = [
  { media_type: "movie", id: 438631, title: "Dune", release_date: "2021-09-15", genre_ids: [878, 12] },
  { media_type: "tv", id: 1399, name: "Game of Thrones", first_air_date: "2011-04-17", genre_ids: [10765, 18] },
  { media_type: "movie", id: 157336, title: "Interstellar", release_date: "2014-11-05", genre_ids: [878, 18] },
  { media_type: "tv", id: 66732, name: "Stranger Things", first_air_date: "2016-07-15", genre_ids: [10765, 9648] },]
  .map(normalize);

// ---------- Page ----------
export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <Hero />
        <SearchBar />

        <section>
          <h2 className="mb-4 text-xl font-semibold">Your favorites</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {favorites.map((item) => (
              <TitleCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ---------- Pieces of the page ----------
function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold">🍿 Taste Matcher</span>
        <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80">
          Create room
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Find something you&apos;ll <span className="text-indigo-500">both</span> love.
      </h1>
      <p className="mt-3 text-lg text-zinc-500">
        Add your favorite movies and shows, then match with a friend.
      </p>
    </header>
  );
}

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search movies and shows..."
      className="mb-10 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-indigo-500 dark:border-zinc-700"
    />
  );
}

function TitleCard({ item }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800">
      {/* Poster placeholder until real posters come from TMDB */}
      <div className="flex aspect-[2/3] items-center justify-center bg-zinc-100 text-4xl dark:bg-zinc-900">
        {item.type === "tv" ? "📺" : "🎬"}
      </div>
      <div className="p-3">
        <span className="text-xs font-medium uppercase text-indigo-500">
          {item.type === "tv" ? "Show" : "Movie"}
        </span>
        <h3 className="font-semibold leading-tight">{item.title}</h3>
        <p className="text-sm text-zinc-500">
          {item.year} · {item.genres.join(", ")}
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
      Data from TMDB
    </footer>
  );
}