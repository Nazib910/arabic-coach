import assert from "node:assert/strict";
import { lessons } from "../src/data/lessons";
import { alphabetIntroductions } from "../src/data/foundation";
import { getGloss } from "../src/data/glossary";

assert.equal(lessons.length, 400);
const taught = new Set<string>();
for (const lesson of lessons) {
  assert.equal(lesson.day, lessons.indexOf(lesson) + 1);
  assert.equal(lesson.exercises.length, lesson.exercisesBn.length, `Day ${lesson.day}: exercise translation mismatch`);
  assert.ok(lesson.vocabulary.every(word => word.trim() && !/[,،]/.test(word)), `Day ${lesson.day}: vocabulary parsing`);
  for (const letter of alphabetIntroductions[lesson.day] ?? []) taught.add(letter);
  // Day 1 is explicitly oral imitation; letter names on alphabet days are labels,
  // not decoding targets. Models and actual task glyphs are checked from Day 2.
  if (lesson.day >= 2 && lesson.day <= 4) {
    for (const text of [...lesson.models, ...lesson.exercises]) {
      const used = text.replace(/ـ/g, "").match(/[\u0621-\u064A]/g) ?? [];
      for (const letter of used) assert.ok(taught.has(letter), `Day ${lesson.day}: untaught ${letter} in ${text}`);
    }
  }
  if (lesson.day <= 20) {
    for (const word of lesson.vocabulary) assert.ok(getGloss(word).bn && getGloss(word).en, `Day ${lesson.day}: missing meaning ${word}`);
  }
}
console.log("✓ 400 lesson IDs, exercise alignment and vocabulary parsing; foundation meanings and alphabet-day prerequisites verified.");
console.log("Note: this structural check does not certify all Arabic grammar, audio quality, or later-phase prerequisites.");
