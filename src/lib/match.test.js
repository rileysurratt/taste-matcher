import { test } from "node:test";
import assert from "node:assert/strict";
import { sharedTitles, genreProfile, cosineSimilarity, compatibility } from "./match.js";


const dune = { id: "movie-438631", title: "Dune", genres: ["scifi", "adventure"] };
const arrival = { id: "movie-329865", title: "Arrival", genres: ["scifi", "drama"] };
const interstellar = { id: "movie-157336", title: "Interstellar", genres: ["scifi", "drama"] };
const notebook = { id: "movie-11036", title: "The Notebook", genres: ["romance", "drama"] };
const proposal = { id: "movie-18240", title: "The Proposal", genres: ["comedy", "romance"] };
const hangover = { id: "movie-18785", title: "The Hangover", genres: ["comedy"] };

test("sharedTitles finds titles on both lists", () => {
  const shared = sharedTitles([dune, arrival, notebook], [arrival, notebook, hangover]);
  assert.deepEqual(shared.map((t) => t.title), ["Arrival", "The Notebook"]);
});

test("genreProfile counts each genre", () => {
  assert.deepEqual(genreProfile([dune, arrival]), { scifi: 2, adventure: 1, drama: 1 });
});

test("cosineSimilarity is 1 for the same mix and 0 for nothing in common", () => {
  assert.equal(cosineSimilarity({ scifi: 2 }, { scifi: 5 }), 1);
  assert.equal(cosineSimilarity({ scifi: 2 }, { romance: 3 }), 0);
});

test("identical lists are 100%", () => {
  const list = [dune, arrival, interstellar];
  assert.equal(compatibility(list, list), 100);
});

test("no shared titles and different genres is low", () => {
  const scifiFan = [dune, arrival, interstellar];
  const romcomFan = [proposal, hangover];
  assert.ok(compatibility(scifiFan, romcomFan) < 20);
});

test("no shared titles but similar genres lands in the middle", () => {
  const score = compatibility([dune, arrival], [interstellar]);
  assert.ok(score > 40 && score < 70, `got ${score}`);
});

test("adding a shared favorite raises the score", () => {
  const before = compatibility([dune, notebook], [arrival, hangover]);
  const after = compatibility([dune, notebook, arrival], [arrival, hangover]);
  assert.ok(after > before, `${before} → ${after}`);
});

test("an empty list scores 0", () => {
  assert.equal(compatibility([], [dune]), 0);
});