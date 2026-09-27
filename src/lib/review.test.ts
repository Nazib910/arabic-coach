import { test } from "node:test";
import assert from "node:assert/strict";
import { parseReviews, recallCards, reviewCards, sameSpelling, scheduleReview } from "./review";
import { lessons } from "../data/lessons";
const now = new Date("2026-09-27T12:00:00Z");
test("correct and incorrect evidence accumulates per word", () => {
  const first = scheduleReview(undefined, true, now);
  assert.equal(first.due, "2026-09-28T12:00:00.000Z");
  const second = scheduleReview(first, true, new Date("2026-09-28T12:00:00Z"));
  assert.equal(second.due, "2026-10-01T12:00:00.000Z");
  const missed = scheduleReview(second, false, new Date("2026-10-01T12:00:00Z"));
  assert.equal(missed.streak, 0); assert.equal(missed.correct, 2); assert.equal(missed.incorrect, 1);
});
test("same-day clicks cannot inflate spaced retention", () => {
  const first = scheduleReview(undefined, true, now);
  const again = scheduleReview(first, true, now);
  assert.equal(again.streak, 1); assert.equal(again.due, first.due);
});
test("spelling ignores vowels not meaningful letter differences", () => {
  assert.ok(sameSpelling(" كِتَاب ", "كتاب"));
  assert.equal(sameSpelling("قلم", "كلم"), false);
  assert.equal(sameSpelling("اب", "أب"), false);
});
test("only glossed material is quizzed; review is due-date ordered", () => {
  assert.ok(recallCards(lessons[1]).every(card => "ابتثجحخ".includes(card.word)));
  const reviews = { "كتاب": scheduleReview(undefined, false, new Date("2026-09-25T12:00:00Z")) };
  assert.equal(reviewCards(recallCards(lessons[0]), reviews, now)[0].word, "كتاب");
  assert.deepEqual(parseReviews({ x: null, y: { correct: -1 } }), {});
});
