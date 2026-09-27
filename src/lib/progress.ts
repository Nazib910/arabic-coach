import { z } from "zod";
import type { DayProgress, ProgressMap, TutorFeedback } from "@/types";

export const PASS_SCORE = 70;
const feedbackSchema = z.object({
  source: z.enum(["ai", "demo"]).optional(),
  localized: z.object({ bn: z.object({ headline: z.string(), strengths: z.array(z.string()), correctionExplanations: z.array(z.string()), nextSteps: z.array(z.string()), teacherNote: z.string() }), en: z.object({ headline: z.string(), strengths: z.array(z.string()), correctionExplanations: z.array(z.string()), nextSteps: z.array(z.string()), teacherNote: z.string() }) }).optional(),
  score: z.number().finite().min(0).max(100), headline: z.string(),
  strengths: z.array(z.string()), corrections: z.array(z.object({ original: z.string(), corrected: z.string(), explanation: z.string() })),
  repairCodes: z.array(z.string()), nextSteps: z.array(z.string()), teacherNote: z.string(),
}).passthrough();
const daySchema = z.object({
  completed: z.boolean(), answers: z.array(z.string()).max(20), confidence: z.number().min(1).max(5),
  feedback: feedbackSchema.nullish(), updatedAt: z.string().datetime({ offset: true }),
}).passthrough();

/** Discard malformed records, never import another account's unscoped storage. */
export function parseProgress(value: unknown, courseLength: number): ProgressMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ProgressMap = {};
  for (const [key, item] of Object.entries(value)) {
    const day = Number(key), parsed = daySchema.safeParse(item);
    if (!Number.isInteger(day) || day < 1 || day > courseLength || !parsed.success) continue;
    const entry = parsed.data;
    // Old feedback is retained, but is not evidence under the new evaluation contract.
    const feedback = entry.feedback as TutorFeedback | undefined;
    result[day] = { ...entry, feedback: feedback ?? undefined, completed: entry.completed && feedback?.source === "ai" && feedback.score >= PASS_SCORE } as DayProgress;
  }
  return result;
}

export function mergeProgress(local: ProgressMap, remote: ProgressMap): ProgressMap {
  const merged = { ...remote };
  for (const [key, value] of Object.entries(local)) {
    const day = Number(key);
    if (!remote[day] || Date.parse(value.updatedAt) >= Date.parse(remote[day].updatedAt)) merged[day] = value;
  }
  return merged;
}

export function nextLessonDay(progress: ProgressMap, courseLength: number): number {
  for (let day = 1; day <= courseLength; day++) if (!progress[day]?.completed) return day;
  return courseLength;
}

export function submissionPassed(feedback: TutorFeedback, answers: string[], exerciseCount: number): boolean {
  return feedback.source === "ai" && feedback.score >= PASS_SCORE && exerciseCount > 0 &&
    answers.length >= exerciseCount && answers.slice(0, exerciseCount).every(answer => answer.trim().length > 0);
}

export function applyFeedback(current: DayProgress | undefined, submitted: string[], confidence: number, feedback: TutorFeedback, exerciseCount: number, updatedAt: string): DayProgress {
  // A delayed response must not replace work typed while the request was in flight.
  const changed = current && JSON.stringify(current.answers) !== JSON.stringify(submitted);
  return {
    ...current, answers: changed ? current.answers : [...submitted],
    confidence: changed ? current.confidence : confidence,
    feedback: changed ? current.feedback : feedback,
    completed: changed ? current.completed : submissionPassed(feedback, submitted, exerciseCount),
    updatedAt,
  };
}

export function progressStatus(item?: DayProgress): "new" | "draft" | "review" | "ready" {
  if (!item) return "new";
  if (item.completed) return "ready";
  if (item.feedback) return "review";
  return "draft";
}
