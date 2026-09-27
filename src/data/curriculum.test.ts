import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { lessons } from "./lessons";
import { foundationModelMeanings } from "./foundation";

test("all foundation models have aligned bilingual meaning", () => {
  for (const lesson of lessons.slice(0, 20)) {
    assert.equal(foundationModelMeanings[lesson.day]?.length, lesson.models.length);
    assert.ok(foundationModelMeanings[lesson.day].every(meaning => meaning.bn && meaning.en));
  }
});
test("audio manifest never promises missing bundled assets", () => {
  const manifest = readFileSync("src/data/audioManifest.ts", "utf8");
  const assets = [...new Set(manifest.match(/\/audio\/[^"\s]+\.m4a/g) ?? [])];
  assert.deepEqual(assets.filter(asset => !existsSync(`public${asset}`)), []);
});
test("vocabulary commas are parsed and every day remains addressable", () => {
  assert.equal(lessons.length, 400);
  assert.ok(lessons.every((lesson, index) => lesson.day === index + 1));
  assert.equal(lessons[67].vocabulary.length, 6);
  assert.ok(lessons.every(lesson => lesson.vocabulary.every(word => !/[,،]/.test(word))));
});
