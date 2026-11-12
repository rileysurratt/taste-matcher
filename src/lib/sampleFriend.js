// a pretend Friend to test matching before real account integration

const POSTER = "https://image.tmdb.org/t/p/w342";

export const SAMPLE_FRIEND = {
  name: "Sam",
  picks: [
    {
      id: "movie-438631",
      type: "movie",
      title: "Dune",
      year: 2021,
      genres: ["scifi", "adventure"],
      poster: `${POSTER}/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg`,
    },
    {
      id: "movie-157336",
      type: "movie",
      title: "Interstellar",
      year: 2014,
      genres: ["adventure", "drama", "scifi"],
      poster: `${POSTER}/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg`,
    },
    {
      id: "movie-329865",
      type: "movie",
      title: "Arrival",
      year: 2016,
      genres: ["drama", "scifi", "mystery"],
      poster: `${POSTER}/pEzNVQfdzYDzVK0XqxERIw2x2se.jpg`,
    },
    {
      id: "movie-545611",
      type: "movie",
      title: "Everything Everywhere All at Once",
      year: 2022,
      genres: ["action", "adventure", "scifi"],
      poster: `${POSTER}/u68AjlvlutfEIcpmbYpKcdi09ut.jpg`,
    },
    {
      id: "tv-1396",
      type: "tv",
      title: "Breaking Bad",
      year: 2008,
      genres: ["drama", "crime"],
      poster: `${POSTER}/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg`,
    },
    {
      id: "tv-66732",
      type: "tv",
      title: "Stranger Things",
      year: 2016,
      genres: ["action", "adventure", "mystery", "scifi", "fantasy"],
      poster: `${POSTER}/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg`,
    },
  ],
};
