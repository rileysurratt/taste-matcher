import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize } from "./normalize.js";

// Fake TMDB results, shaped like what the real API sends back
const dune = {
  media_type: "movie", id: 438631, title: "Dune",
  release_date: "2021-09-15", genre_ids: [878, 12], poster_path: "/dune.jpg",
};
const got = {
  media_type: "tv", id: 1399, name: "Game of Thrones",
  first_air_date: "2011-04-17", genre_ids: [10765, 18], poster_path: "/got.jpg",
};

test("movie ids look like movie-438631", () => {
  assert.equal(normalize(dune).id, "movie-438631");
});

test("show ids look like tv-1399", () => {
  assert.equal(normalize(got).id, "tv-1399");
});

test("Sci-Fi & Fantasy splits into scifi and fantasy", () => {
  assert.deepEqual(normalize(got).genres, ["scifi", "fantasy", "drama"]);
});

test("every item has all six fields", () => {
  const keys = Object.keys(normalize(dune)).sort();
  assert.deepEqual(keys, ["genres", "id", "poster", "title", "type", "year"]);
});

test("missing date and poster become null instead of crashing", () => {
  const bare = normalize({ media_type: "tv", id: 5, name: "No Data" });
  assert.equal(bare.year, null);
  assert.equal(bare.poster, null);
  assert.deepEqual(bare.genres, []);
});