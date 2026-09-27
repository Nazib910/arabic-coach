import { lessons } from "./lessons";
import { foundationModelMeanings } from "./foundation";
import { modelMeanings } from "./modelMeanings";
import { phaseModelMeanings } from "./phaseModelMeanings";
import { phaseForDay } from "./phases";
import { phaseContent } from "./phaseContent";
export type LearningLine = { ar: string; bn: string; en: string };
export type LearningMaterial = { day: number; lines: LearningLine[]; question: {bn:string;en:string}; expected: string[]; explanation: {bn:string;en:string} };

export function getModelMeaning(day: number, index: number): {bn:string;en:string} | undefined {
  if (day <= 20) return foundationModelMeanings[day]?.[index];
  if (day <= 80) return modelMeanings[day]?.[index];
  const phase = phaseForDay(day), lesson = lessons[day-1];
  if (!lesson) return undefined;
  const sourceIndex = phaseContent[phase.key]?.models.indexOf(lesson.models[index]);
  return phaseModelMeanings[phase.key]?.[sourceIndex];
}
/** Supplied model-reading material; this is deliberately not labelled an unseen passage. */
export function getLearningMaterial(day: number): LearningMaterial | undefined {
  if (!Number.isInteger(day) || day < 1 || day > lessons.length) return undefined;
  const lesson = lessons[day-1];
  const lines = lesson.models.map((ar,index) => {
    const meaning = getModelMeaning(day,index);
    if (!meaning) throw new Error(`Missing model meaning: ${day}/${index}`);
    return {ar,...meaning};
  });
  const target = (day-1) % lines.length;
  return { day, lines, question: { bn: `কোন নমুনাটি এই অর্থ প্রকাশ করে: ${lines[target].bn}`, en: `Which model conveys this meaning: ${lines[target].en}` }, expected: [lines[target].ar], explanation: { bn: `নমুনা ${target+1}-এর অর্থের সঙ্গে মিলিয়ে দেখুন। এটি model recognition, স্বাধীন reading proficiency নয়।`, en: `Compare with model ${target+1}. This checks model recognition, not independent reading proficiency.` } };
}
