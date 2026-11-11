import { normalize } from "@/lib/normalize";

export async function GET(request) {
    const query = new URL(request.url).searchParams.get("q")?.trim();


    if(!query){
        return Response.json({ results: [] });
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
    });

    // check for errors
    if(!res.ok)
{
    return Response.json({ error: "TMDB request failed" }, { status: 502 }) ;
}

    const data = await res.json();

    const results = data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map(normalize);

    return Response.json({ results });

}

