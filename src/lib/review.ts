import { getGloss } from "@/data/glossary";
import { letters } from "@/data/letters";
import { alphabetIntroductions } from "@/data/foundation";
import type { Lesson } from "@/types";

export type ReviewItem = { correct: number; incorrect: number; streak: number; lastReviewed: string; due: string };
export type ReviewMap = Record<string, ReviewItem>;
export type RecallCard = { word: string; bn: string; en: string };
const DAY = 86_400_000;
export function scheduleReview(previous: ReviewItem | undefined, correct: boolean, now: Date): ReviewItem {
  const delayed = !previous || now.getTime() - Date.parse(previous.lastReviewed) >= DAY;
  const streak = correct ? (previous?.streak ?? 0) + (delayed ? 1 : 0) : 0;
  const interval = correct ? [1, 3, 7, 14, 30][Math.max(0, Math.min(streak - 1, 4))] : 1;
  // Repeated clicking today cannot postpone an already-scheduled review.
  const due = correct && previous && !delayed ? previous.due : new Date(now.getTime() + interval * DAY).toISOString();
  return { correct: (previous?.correct ?? 0) + Number(correct), incorrect: (previous?.incorrect ?? 0) + Number(!correct), streak, lastReviewed: now.toISOString(), due };
}
export function parseReviews(input: unknown): ReviewMap {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const result: ReviewMap = {};
  for (const [word, value] of Object.entries(input)) {
    if (!value || typeof value !== "object") continue;
    const item = value as ReviewItem;
    if ([item.correct, item.incorrect, item.streak].every(n => Number.isInteger(n) && n >= 0) && Number.isFinite(Date.parse(item.due)) && Number.isFinite(Date.parse(item.lastReviewed))) result[word] = item;
  }
  return result;
}
export function recallCards(lesson: Lesson): RecallCard[] {
  if (alphabetIntroductions[lesson.day]) return letters.filter(letter => alphabetIntroductions[lesson.day].includes(letter.ar)).map(letter => ({ word: letter.ar, bn: letter.nameBn, en: letter.name }));
  return lesson.vocabulary.filter(word => !/مراجعة|الحروف|الحركات|المدّ|السكون|الشدّة|التنوين|الهمزة|الجملة/.test(word)).map(word => ({ word, ...getGloss(word) })).filter(card => card.bn && card.en);
}
export function reviewCards(cards: RecallCard[], reviews: ReviewMap, now: Date): RecallCard[] {
  const due = Object.entries(reviews).filter(([, item]) => Date.parse(item.due) <= now.getTime()).sort((a, b) => Date.parse(a[1].due) - Date.parse(b[1].due)).map(([word]) => {
    const letter = letters.find(letter => letter.ar === word);
    return letter ? { word, bn: letter.nameBn, en: letter.name } : { word, ...getGloss(word) };
  }).filter(card => card.bn && card.en);
  return [...new Map([...due, ...cards].map(card => [card.word, card])).values()].slice(0, 5);
}
/** Spelling-only check. Harakat are not graded; distinct letter/hamza shapes are. */
export function sameSpelling(answer: string, expected: string): boolean {
  const normalize = (text: string) => text.normalize("NFC").replace(/[\u064B-\u0652\u0670ـ]/g, "").replace(/\s+/g, " ").trim();
  return normalize(answer) === normalize(expected);
}
