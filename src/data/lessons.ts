import type { Lesson, Skill } from "@/types";
import { getLessonTranslation } from "@/data/lessonTranslations";
import { handcraftedRaw } from "@/data/handcraftedLessons";
import { phaseContent } from "@/data/phaseContent";
import {
  COURSE_LENGTH,
  phaseForDay,
  phaseSpecs,
  isCheckpointDay,
  isBenchmarkDay,
  isPhaseTaskDay,
} from "@/data/phases";

// -------- Phase 1 (Days 1–30): hand-tuned lessons preserved verbatim --------
const handcrafted: Lesson[] = handcraftedRaw.map((item, index) => ({
  day: index + 1,
  title: item[0],
  arabicTitle: item[1],
  phase: item[2],
  duration: "45–60 min",
  focus: item[3],
  vocabulary: item[4].split("،").map((word) => word.trim()),
  models: item[5].split("|"),
  grammar: item[3],
  goals: [item[6], "Use today’s vocabulary in original Arabic.", "Log errors and confidence before finishing."],
  exercises: item[7].split("|"),
  skill: item[8],
  checkpoint: item[9],
  ...getLessonTranslation(index, item[2]),
}));

// -------- Days 31–400: generated from the 20-phase roadmap spec --------
function rotate<T>(list: T[], offset: number, count: number): T[] {
  if (list.length === 0) return [];
  // Stride by a step coprime-ish to the length so consecutive days surface
  // different, non-overlapping slices instead of the same first N items.
  const step = list.length % 5 === 0 ? 3 : 5;
  return Array.from({ length: count }, (_, i) => list[(offset + i * step) % list.length]);
}

function skillForDay(day: number, focusSkills: Skill[]): Skill {
  return focusSkills[(day - 1) % focusSkills.length];
}

function generatedLesson(day: number): Lesson {
  const phase = phaseForDay(day);
  const content = phaseContent[phase.key];
  const dayInPhase = day - phase.startDay;          // 0-based position within phase
  const topic = phase.topics[dayInPhase % phase.topics.length];
  const benchmark = isBenchmarkDay(day);
  const phaseTask = isPhaseTaskDay(day);
  const checkpoint = isCheckpointDay(day);
  const skill: Skill = checkpoint ? "writing" : skillForDay(day, content ? phase.focusSkills : ["grammar"]);

  const vocabulary = content ? rotate(content.vocabulary, dayInPhase * 2, 6) : [];
  const models = content ? rotate(content.models, dayInPhase, 3) : [];
  const grammarPoint = content ? content.grammarPoints[dayInPhase % content.grammarPoints.length] : { en: topic, bn: topic };
  const exerciseSet = content ? content.exercises : [];

  const title = benchmark
    ? `Day ${day} cumulative benchmark`
    : phaseTask
      ? `Phase ${phase.index} performance task`
      : checkpoint
        ? `Checkpoint · ${phase.title}`
        : `${topic}`;

  const titleBn = benchmark
    ? `${day}তম দিন: সামগ্রিক মূল্যায়ন`
    : phaseTask
      ? `ধাপ ${phase.index}: পারদর্শিতা যাচাই`
      : checkpoint
        ? `যাচাই · ${phase.titleBn}`
        : topic;

  const focus = checkpoint ? `Integrated review of ${phase.title.toLowerCase()}` : `${topic} — ${phase.summary}`;
  const focusBn = checkpoint ? `${phase.titleBn} — সমন্বিত পুনরালোচনা` : `${topic} · ${phase.summaryBn}`;

  const goals = checkpoint
    ? [`Demonstrate retained control of ${phase.title.toLowerCase()} without notes.`, phase.exit, "Log errors and confidence before finishing."]
    : [grammarPoint.en, "Use today’s vocabulary in original Arabic.", "Log errors and confidence before finishing."];
  const goalsBn = checkpoint
    ? [`নোট ছাড়া ${phase.titleBn} বিষয়ে দক্ষতা দেখান।`, phase.exitBn, "শেষে ভুল ও আত্মবিশ্বাস লিখে রাখুন।"]
    : [grammarPoint.bn, "আজকের নতুন শব্দ দিয়ে নিজের কয়েকটি আরবি বাক্য বানান।", "শেষে কোথায় ভুল হলো ও কতটা স্বচ্ছন্দ লাগল, লিখে রাখুন।"];

  const exercises = checkpoint
    ? ["Complete a cumulative retrieval task without notes.", `Produce a piece that shows ${phase.exit.toLowerCase()}.`, "Record a short speaking sample for self-comparison."]
    : exerciseSet.map((item) => item.en);
  const exercisesBn = checkpoint
    ? ["নোট ছাড়া একটি সামগ্রিক পুনরুদ্ধার কাজ করুন।", `এমন কিছু তৈরি করুন যা দেখায়: ${phase.exitBn}`, "নিজের সঙ্গে তুলনার জন্য একটি ছোট কথন রেকর্ড করুন।"]
    : exerciseSet.map((item) => item.bn);

  return {
    day,
    title,
    titleBn,
    arabicTitle: phase.summary.split(";")[0] ? topicArabic(topic) : topic,
    phase: checkpoint ? "Checkpoint" : phase.title,
    phaseBn: checkpoint ? "নিজেকে যাচাই" : phase.titleBn,
    duration: "45–60 min",
    focus,
    focusBn,
    vocabulary,
    models,
    grammar: grammarPoint.en,
    grammarBn: grammarPoint.bn,
    goals,
    goalsBn,
    exercises,
    exercisesBn,
    skill,
    checkpoint: checkpoint || undefined,
  };
}

// A light Arabic label for generated day titles (kept simple and safe).
function topicArabic(topic: string): string {
  const map: Record<string, string> = {
    "Nominative case": "الرفع", "Accusative case": "النصب", "Genitive case": "الجر",
    "Kana & sisters": "كان وأخواتها", "Inna & sisters": "إنّ وأخواتها",
    "Passive voice": "المبني للمجهول", "Relative clauses": "الذي والتي",
    "Comparatives & superlatives": "اسم التفضيل", "Future markers": "المستقبل",
    "Present tense persons": "المضارع", "Past tense foundation": "الماضي",
    "Idafa chains": "الإضافة", "Conditional sentences": "الشرط",
  };
  return map[topic] ?? "درس اليوم";
}

const generated: Lesson[] = Array.from(
  { length: COURSE_LENGTH - handcrafted.length },
  (_, i) => generatedLesson(handcrafted.length + i + 1),
);

export const lessons: Lesson[] = [...handcrafted, ...generated];

// Legacy export kept for any existing imports.
export const phases = [
  ...phaseSpecs.map((p) => p.title),
  "Checkpoint",
];
