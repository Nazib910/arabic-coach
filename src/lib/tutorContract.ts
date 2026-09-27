import { z } from "zod";
import { lessons } from "@/data/lessons";

const CopySchema = z.object({
  headline: z.string().min(1), strengths: z.array(z.string()).max(5),
  correctionExplanations: z.array(z.string()).max(6), nextSteps: z.array(z.string()).length(3), teacherNote: z.string().min(1),
});
export const TutorFeedbackSchema = z.object({
  score: z.number().int().min(0).max(100), headline: z.string().min(1).max(180),
  strengths: z.array(z.string()).max(5),
  corrections: z.array(z.object({ original: z.string(), corrected: z.string(), explanation: z.string() })).max(6),
  repairCodes: z.array(z.enum(["S", "M", "G", "V", "C"])).max(4),
  nextSteps: z.array(z.string()).length(3), teacherNote: z.string().min(1).max(1600),
  localized: z.object({ bn: CopySchema, en: CopySchema }),
}).refine(value => [value.localized.bn, value.localized.en].every(copy => copy.correctionExplanations.length === value.corrections.length), "Correction explanations must align");
export const SubmissionSchema = z.object({
  lesson: z.object({ day: z.number().int().min(1).max(lessons.length) }),
  answers: z.array(z.string().max(6000)).min(1).max(20),
  confidence: z.number().int().min(1).max(5).default(3),
  images: z.array(z.object({ name: z.string().min(1).max(160), mimeType: z.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]), dataUrl: z.string().min(32).max(1_800_000), byteSize: z.number().int().positive().max(1_300_000) })).max(3).default([]),
});
export function canonicalSubmission(input: unknown) {
  const parsed = SubmissionSchema.parse(input);
  const lesson = lessons[parsed.lesson.day - 1];
  if (parsed.answers.length > lesson.exercises.length) throw new Error("Too many answers for this lesson");
  if (parsed.answers.every(answer => !answer.trim()) && !parsed.images.length) throw new Error("No learner evidence");
  return { ...parsed, lesson };
}

export async function readBoundedJson(request: Request, maxBytes: number): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Empty request");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) { await reader.cancel(); throw new Error("Request too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
