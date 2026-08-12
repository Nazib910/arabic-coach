import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const MODEL_ID = process.env.LLM_MODEL ?? "gpt";
const MAX_REQUEST_BYTES = 6_000_000;
const MAX_IMAGE_BYTES = 1_300_000;
const MAX_TOTAL_IMAGE_BYTES = 3_300_000;
const REPAIR_CATEGORIES: Record<string, string> = { P: "pronunciation", S: "script and spelling", M: "morphology", G: "grammar", V: "vocabulary", C: "comprehension", F: "fluency" };

const FeedbackCopySchema = z.object({
  headline: z.string().min(1).max(180),
  strengths: z.array(z.string()).min(1).max(5),
  correctionExplanations: z.array(z.string()).max(6),
  nextSteps: z.array(z.string()).length(3),
  teacherNote: z.string().min(1).max(1200),
});

const FeedbackSchema = z.object({
  score: z.number().int().min(0).max(100),
  headline: z.string().min(1).max(180),
  strengths: z.array(z.string()).min(1).max(5),
  corrections: z.array(z.object({ original: z.string(), corrected: z.string(), explanation: z.string() })).max(6),
  repairCodes: z.array(z.enum(["P","S","M","G","V","C","F"])).max(4),
  nextSteps: z.array(z.string()).length(3),
  teacherNote: z.string().min(1).max(1200),
  localized: z.object({ bn: FeedbackCopySchema, en: FeedbackCopySchema }),
});

const SubmissionImageSchema = z.object({
  name: z.string().min(1).max(160),
  mimeType: z.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]),
  dataUrl: z.string().min(32).max(1_800_000),
  byteSize: z.number().int().positive().max(MAX_IMAGE_BYTES),
});

const RequestSchema = z.object({
  lesson: z.object({ day: z.number().int().min(1), title: z.string(), skill: z.string(), focus: z.string(), grammar: z.string(), vocabulary: z.array(z.string()), models: z.array(z.string()), exercises: z.array(z.string()), checkpoint: z.boolean().optional() }).passthrough(),
  answers: z.array(z.unknown()).max(20),
  confidence: z.coerce.number().min(1).max(5).optional(),
  previousFeedback: z.unknown().optional(),
  images: z.array(SubmissionImageSchema).max(3).default([]),
});

const SYSTEM_PROMPT = `You are Ustadh, a rigorous but encouraging professional teacher of Modern Standard Arabic. Evaluate the submitted work against the lesson and the learner's longitudinal evidence. Prioritize recurring weaknesses without repeating already-mastered explanations. Be linguistically exact, concise, honest, respectful, and warm. Preserve intended meaning when correcting Arabic. Repair codes: P pronunciation, S script/spelling, M morphology, G grammar, V vocabulary, C comprehension, F fluency.
When images are attached, carefully inspect all visible handwritten or printed Arabic. Treat the images as learner evidence alongside typed answers. Mention useful visual evidence, spelling, connected letter forms, diacritics, and legibility where relevant. Never claim to see text that is unclear or outside the image.
Reply ONLY as JSON matching:
{"score":0,"headline":"English string","strengths":["English string"],"corrections":[{"original":"string","corrected":"string","explanation":"English string"}],"repairCodes":["G"],"nextSteps":["English string","English string","English string"],"teacherNote":"English string","localized":{"bn":{"headline":"বাংলা","strengths":["বাংলা"],"correctionExplanations":["বাংলা"],"nextSteps":["বাংলা","বাংলা","বাংলা"],"teacherNote":"বাংলা"},"en":{"headline":"English","strengths":["English"],"correctionExplanations":["English"],"nextSteps":["English","English","English"],"teacherNote":"English"}}}
Score 0–100. Give 2–4 evidence-based strengths, at most 6 high-value corrections, 1–4 repair codes, and exactly 3 actionable next steps. Corrected Arabic must use Arabic script. The bn copy must sound like a kind Bangladeshi teacher speaking naturally to one learner. Use short sentences, familiar everyday Bangla, and address the learner as “আপনি”. Keep necessary Arabic grammar terms, but explain them simply. Avoid bureaucratic or literary words when an easier phrase works. Be friendly and encouraging without hiding mistakes. The en copy must be equally warm and clear. correctionExplanations must align by index with corrections. Keep the legacy top-level English fields identical in meaning to localized.en. Penalize incomplete work appropriately.`;

type TutorMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string; detail: "high" } }> };

function openAIBaseUrl() {
  const value = (process.env.LLM_API_BASE ?? "https://api.nazib.mvp.bd/v1").replace(/\/+$/, "");
  return value.endsWith("/v1") ? value : `${value}/v1`;
}

function dataUrlBytes(dataUrl: string) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.floor((base64.length * 3) / 4) - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
}

function validateImages(images: z.infer<typeof SubmissionImageSchema>[]) {
  let total = 0;
  for (const image of images) {
    if (!image.dataUrl.startsWith(`data:${image.mimeType};base64,`)) throw new Error("Invalid image data.");
    const actualBytes = dataUrlBytes(image.dataUrl);
    if (actualBytes > MAX_IMAGE_BYTES || Math.abs(actualBytes - image.byteSize) > 2048) throw new Error("Image size validation failed.");
    total += actualBytes;
  }
  if (total > MAX_TOTAL_IMAGE_BYTES) throw new Error("The combined images are too large.");
}

async function callTutorWithRetry(client: OpenAI, messages: TutorMessage[]) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await client.chat.completions.create({ model: MODEL_ID, temperature: 0, max_tokens: 1800, messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[] });
    } catch (error) {
      lastError = error;
      const status = (error as { status?: number }).status;
      if (![429, 502, 503, 504].includes(status ?? 0) || attempt === 3) throw error;
      const retryAfter = Number((error as { headers?: Headers }).headers?.get?.("retry-after"));
      await new Promise((resolve) => setTimeout(resolve, Number.isFinite(retryAfter) ? retryAfter * 1000 : 1000 * 2 ** attempt));
    }
  }
  throw lastError;
}

// Mirrors the roadmap's "observed result → instructional response" table.
function adaptationPlan(overallScore: number, skillScores: Record<string, number>) {
  const entries = Object.entries(skillScores).filter(([, v]) => Number.isFinite(v));
  const weakest = entries.sort((a, b) => a[1] - b[1]).slice(0, 2).map(([skill]) => skill);
  let pace: string;
  const methods: string[] = [];
  if (overallScore < 70) {
    pace = "repair"; methods.push("Pause new grammar", "Reteach in smaller steps with more examples", "Add 2 spaced repair days");
  } else if (overallScore < 85) {
    pace = "steady"; methods.push("Continue at planned pace", `Add targeted retrieval for weakest: ${weakest.join(", ") || "n/a"}`);
  } else if (overallScore < 95) {
    pace = "stretch"; methods.push("Reduce repetitive drills", "Increase open-ended speaking and writing");
  } else {
    pace = "accelerate"; methods.push("Compact review", "Add authentic input, faster listening, richer production");
  }
  const reading = Number(skillScores.reading ?? 0);
  const speaking = Number(skillScores.speaking ?? 0);
  if (speaking && reading && speaking + 10 < reading) methods.push("Speaking lags reading: shadowing, timed retells, frequent short recordings");
  else if (reading && speaking && reading + 10 < speaking) methods.push("Reading lags speaking: vowel-pattern work, graded reading, phrase chunking");
  return { pace, weakestSkills: weakest, effectiveMethods: methods };
}

function nextReviewISO(score: number) {
  // Simple spaced-repetition spacing based on demonstrated performance.
  const days = score >= 90 ? 14 : score >= 75 ? 7 : score >= 60 ? 3 : 1;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function parseModelJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("Tutor returned invalid output");
  return FeedbackSchema.parse(JSON.parse(cleaned.slice(start, end + 1)));
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) return NextResponse.json({ error: "The attached images are too large." }, { status: 413 });

    const supabase = await getSupabaseServerClient(request.headers.get("authorization"));
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return NextResponse.json({ error: "Please sign in before submitting work." }, { status: 401 });
    if (authData.user.user_metadata?.is_demo) return NextResponse.json({ error: "Demo sessions use sample feedback and cannot call the private AI teacher." }, { status: 403 });

    const parsed = RequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid lesson submission.", details: parsed.error.flatten() }, { status: 400 });
    const { lesson, answers, confidence, previousFeedback, images } = parsed.data;
    validateImages(images);
    const normalized = answers.map((answer) => String(answer ?? "").slice(0, 6000));
    if (normalized.every((answer) => !answer.trim()) && images.length === 0) return NextResponse.json({ error: "Write an answer or attach a photo before submitting." }, { status: 400 });

    const [attemptsResult, skillsResult, errorsResult, memoryResult] = await Promise.all([
      supabase.from("lesson_attempts").select("day,lesson_title,answers,confidence,score,feedback,updated_at").eq("user_id", authData.user.id).order("updated_at", { ascending: false }).limit(7),
      supabase.from("skill_mastery").select("skill,score,sample_count,trend").eq("user_id", authData.user.id),
      supabase.from("error_ledger").select("id,repair_code,category,error_pattern,occurrences,status,last_seen_day").eq("user_id", authData.user.id).neq("status", "mastered").order("occurrences", { ascending: false }).limit(20),
      supabase.from("memory_snapshots").select("through_day,summary,strengths,weaknesses,effective_methods,next_targets").eq("user_id", authData.user.id).order("through_day", { ascending: false }).limit(1).maybeSingle(),
    ]);

    const submission = {
      learnerProfile: { email: authData.user.email, recentAttempts: attemptsResult.data ?? [], skillMastery: skillsResult.data ?? [], activeErrors: errorsResult.data ?? [], latestMemory: memoryResult.data ?? null },
      lesson: { day: lesson.day, title: lesson.title, skill: lesson.skill, focus: lesson.focus, grammar: lesson.grammar, vocabulary: lesson.vocabulary, models: lesson.models, exercises: lesson.exercises, checkpoint: Boolean(lesson.checkpoint) },
      learnerAnswers: normalized,
      visualEvidence: images.map(({ name, mimeType, byteSize }, index) => ({ image: index + 1, name, mimeType, byteSize })),
      selfRatedConfidence: Number(confidence) || 3,
      previousTeacherFeedback: previousFeedback ?? null,
    };

    const apiKey = process.env.LLM_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "LLM_API_KEY is not configured on the server." }, { status: 503 });
    const client = new OpenAI({ apiKey, baseURL: openAIBaseUrl(), timeout: 120_000, maxRetries: 0 });
    const prompt = `Evaluate this Arabic lesson submission. ${images.length ? `There are ${images.length} attached image(s); inspect each one before scoring.` : "There are no attached images."}\n${JSON.stringify(submission)}`;
    const userContent: Extract<TutorMessage, { role: "user" }>["content"] = images.length ? [{ type: "text", text: prompt }, ...images.map((image) => ({ type: "image_url" as const, image_url: { url: image.dataUrl, detail: "high" as const } }))] : prompt;
    const completion = await callTutorWithRetry(client, [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userContent }]);
    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Tutor returned an empty response");
    const feedback = parseModelJson(text);
    const now = new Date().toISOString();

    const currentSkill = (skillsResult.data ?? []).find((item) => item.skill === lesson.skill);
    const oldScore = Number(currentSkill?.score ?? 0);
    const oldCount = Number(currentSkill?.sample_count ?? 0);
    const nextSkillScore = Number(((oldScore * oldCount + feedback.score) / (oldCount + 1)).toFixed(2));
    await Promise.all([
      supabase.from("lesson_attempts").upsert({ user_id: authData.user.id, day: lesson.day, lesson_title: lesson.title, answers: normalized, confidence: Number(confidence) || 3, completed: true, feedback, score: feedback.score, model_id: MODEL_ID, attempt_number: 1, updated_at: now }, { onConflict: "user_id,day,attempt_number" }),
      supabase.from("skill_mastery").upsert({ user_id: authData.user.id, skill: lesson.skill, score: nextSkillScore, sample_count: oldCount + 1, trend: Number((feedback.score - oldScore).toFixed(2)), last_assessed_at: now, updated_at: now }, { onConflict: "user_id,skill" }),
      supabase.from("learner_profiles").update({ current_day: Math.min(Number(lesson.day) + 1, 400), updated_at: now }).eq("id", authData.user.id),
    ]);

    // Spaced-repetition vocabulary mastery: record every word practised today.
    const words = (Array.isArray(lesson.vocabulary) ? lesson.vocabulary : []).map((w) => String(w).trim()).filter(Boolean).slice(0, 20);
    if (words.length) {
      const correct = feedback.score >= 70;
      const status = feedback.score >= 90 ? "stable" : feedback.score >= 60 ? "learning" : "unstable";
      await supabase.from("vocabulary_mastery").upsert(
        words.map((word) => ({
          user_id: authData.user.id,
          word,
          recognition_score: feedback.score,
          production_score: Math.max(0, feedback.score - 10),
          correct_count: correct ? 1 : 0,
          incorrect_count: correct ? 0 : 1,
          status,
          last_reviewed_at: now,
          next_review_at: nextReviewISO(feedback.score),
          updated_at: now,
        })),
        { onConflict: "user_id,word" },
      );
    }

    for (const code of feedback.repairCodes) {
      const category = REPAIR_CATEGORIES[code];
      const pattern = `Recurring ${category} control issue`;
      const existing = (errorsResult.data ?? []).find((item) => item.repair_code === code && item.error_pattern === pattern);
      if (existing) await supabase.from("error_ledger").update({ occurrences: existing.occurrences + 1, last_seen_day: lesson.day, next_review_day: Math.min(400, Number(lesson.day) + 2), status: "unstable", updated_at: now }).eq("id", existing.id);
      else await supabase.from("error_ledger").insert({ user_id: authData.user.id, repair_code: code, category, error_pattern: pattern, occurrences: 1, status: "learning", first_seen_day: lesson.day, last_seen_day: lesson.day, next_review_day: Math.min(400, Number(lesson.day) + 2), examples: feedback.corrections.slice(0, 3) });
    }

    if (lesson.checkpoint) {
      const skillScores = Object.fromEntries((skillsResult.data ?? []).map((item) => [item.skill, Number(item.score)]));
      skillScores[lesson.skill] = nextSkillScore;
      const plan = adaptationPlan(feedback.score, skillScores);
      await Promise.all([
        supabase.from("checkpoint_reports").upsert({ user_id: authData.user.id, day: lesson.day, overall_score: feedback.score, skill_scores: skillScores, teacher_report: feedback, next_block_plan: { pace: plan.pace, weakestSkills: plan.weakestSkills, effectiveMethods: plan.effectiveMethods, repairCodes: feedback.repairCodes, nextSteps: feedback.nextSteps }, model_id: MODEL_ID }, { onConflict: "user_id,day" }),
        supabase.from("memory_snapshots").upsert({ user_id: authData.user.id, through_day: lesson.day, summary: feedback.teacherNote, strengths: feedback.strengths, weaknesses: feedback.corrections.map((item) => item.explanation), effective_methods: plan.effectiveMethods, next_targets: feedback.nextSteps }, { onConflict: "user_id,through_day" }),
      ]);
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Tutor API error", error);
    const status = (error as { status?: number }).status;
    const message = error instanceof Error ? error.message : "Unable to evaluate this lesson.";
    return NextResponse.json({ error: message }, { status: status && status >= 400 && status < 600 ? status : 500 });
  }
}
