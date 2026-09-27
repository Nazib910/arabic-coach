import { test } from "node:test";
import assert from "node:assert/strict";
import { applyFeedback, mergeProgress, nextLessonDay, parseProgress, submissionPassed } from "./progress";
import type { DayProgress, TutorFeedback } from "../types";
const feedback: TutorFeedback = { source: "ai", score: 80, headline: "Review", strengths: [], corrections: [], repairCodes: [], nextSteps: [], teacherNote: "" };
const item = (updatedAt = "2026-09-27T10:00:00.000Z"): DayProgress => ({ completed: true, answers: ["أهلاً"], confidence: 3, feedback, updatedAt });
test("out-of-order completions do not skip the first gap", () => {
  assert.equal(nextLessonDay({ 20: item() }, 400), 1);
  assert.equal(nextLessonDay({ 1: item(), 3: item() }, 400), 2);
  assert.equal(nextLessonDay({ 1: item() }, 1), 1);
});
test("low scores, demos, legacy scores and incomplete work cannot pass", () => {
  assert.equal(submissionPassed(feedback, ["one", "two"], 2), true);
  assert.equal(submissionPassed({ ...feedback, score: 69 }, ["one"], 1), false);
  assert.equal(submissionPassed({ ...feedback, source: "demo" }, ["one"], 1), false);
  assert.equal(submissionPassed({ ...feedback, source: undefined }, ["one"], 1), false);
  assert.equal(submissionPassed(feedback, ["one", " "], 2), false);
});
test("delayed feedback preserves newer answers", () => {
  const current = { ...item(), answers: ["new draft"], completed: false, feedback: undefined };
  const result = applyFeedback(current, ["old draft"], 2, feedback, 1, "2026-09-27T11:00:00.000Z");
  assert.deepEqual(result.answers, ["new draft"]);
  assert.equal(result.feedback, undefined);
  assert.equal(result.completed, false);
});
test("merge retains the newest draft independent of load order", () => {
  const newer = item("2026-09-27T12:00:00.000Z"), older = item();
  assert.equal(mergeProgress({ 1: newer }, { 1: older })[1], newer);
  assert.equal(mergeProgress({ 1: older }, { 1: newer })[1], newer);
});
test("Supabase timestamps with offsets survive hydration", () => {
  assert.equal(parseProgress({ 1: item("2026-09-27T10:00:00+00:00") }, 400)[1].completed, true);
});
test("invalid storage records are discarded and legacy work preserved unverified", () => {
  const legacy = { ...item(), feedback: { ...feedback, source: undefined } };
  const parsed = parseProgress({ 1: item(), 2: legacy, 3: null, 401: item(), bad: item() }, 400);
  assert.deepEqual(Object.keys(parsed), ["1", "2"]);
  assert.equal(parsed[1].completed, true);
  assert.equal(parsed[2].completed, false);
  assert.deepEqual(parsed[2].answers, legacy.answers);
});
