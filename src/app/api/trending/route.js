import { normalize } from "@/lib/normalize";

// GET /api/trending -> this week's popular movies and shows, for "Curated for You section"
export async function GET(){
    const res = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}`}
    });

    if(!res.ok){
        return Response.json({ error: "TMDB request failed" }, { status: 502});
    }

    const data = await res.json();
    const results = data.results.filter((item) => item.media_type === "movie" || item.media_type === "tv").map(normalize);

    return Response.json({ results });
}