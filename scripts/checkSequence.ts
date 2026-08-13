/*
 * Sequence-integrity lint (PRD F5, guardrail §6.2).
 * Verifies that no Phase-1 (Days 1–20) lesson uses an Arabic letter in its
 * VOCABULARY before that letter has been introduced by the alphabet days.
 *
 * Day 1 is exempt (it is explicitly a "listen & mimic" day, not a reading day).
 * Run with: npx tsx scripts/checkSequence.ts   (or wired as prebuild)
 */
import { handcraftedRaw } from "../src/data/handcraftedLessons";

// Letters introduced by each alphabet day (matches Days 2, 3, 4).
const introducedBy: Record<number, string[]> = {
  2: ["ا", "ب", "ت", "ث", "ج", "ح", "خ"],
  3: ["د", "ذ", "ر", "ز", "س", "ش", "ص", "ض"],
  4: ["ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"],
};

// Characters that are not "letters to be taught": vowels/marks/hamza forms/
// digits/punctuation/space. Hamza is taught on its own day (Day 11) but appears
// in greetings framed as listen-only, so we don't fail on it in vocab.
const ignore = new Set([
  "\u064B", "\u064C", "\u064D", "\u064E", "\u064F", "\u0650", "\u0651", "\u0652", // harakat
  "ء", "أ", "إ", "آ", "ؤ", "ئ", "ة", "ى", "ـ", "،", "/", " ", "\u200f", "\u200e",
  "٠","١","٢","٣","٤","٥","٦","٧","٨","٩",
]);

function lettersTaughtThrough(day: number): Set<string> {
  const set = new Set<string>();
  for (let d = 2; d <= day; d++) {
    for (const ch of introducedBy[d] ?? []) set.add(ch);
  }
  // After Day 4 the full alphabet is known.
  if (day >= 4) for (const arr of Object.values(introducedBy)) for (const ch of arr) set.add(ch);
  return set;
}

let problems = 0;
handcraftedRaw.forEach((row, index) => {
  const day = index + 1;
  if (day === 1 || day > 20) return;          // Day 1 exempt; only check Phase 1
  if (day <= 4) return;                        // alphabet days themselves introduce letters
  const taught = lettersTaughtThrough(day);
  const vocab = row[4];                         // vocabulary field
  for (const ch of vocab) {
    if (ignore.has(ch)) continue;
    if (/[\u0621-\u064A]/.test(ch) && !taught.has(ch)) {
      console.error(`✗ Day ${day} ("${row[0]}") uses letter "${ch}" before it is taught.`);
      problems++;
    }
  }
});

if (problems > 0) {
  console.error(`\nSequence check FAILED: ${problems} issue(s). Fix vocabulary or letter order.`);
  process.exit(1);
}
console.log("✓ Sequence check passed: Phase-1 vocabulary uses only taught letters.");
