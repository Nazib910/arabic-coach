import { NextRequest } from "next/server";

// Text-to-speech proxy for Arabic (PRD F1, layer 2).
// Tries an OpenAI-compatible /audio/speech endpoint on the configured base.
// If TTS is not configured or the provider has no speech support, returns 501
// so the client can gracefully fall back to browser TTS or the transliteration.

export const runtime = "nodejs";

const BASE = process.env.LLM_API_BASE ?? "";
const KEY = process.env.LLM_API_KEY ?? "";
const TTS_MODEL = process.env.TTS_MODEL ?? "";       // e.g. "tts-1" / "tts-1-hd" — only used if set
const TTS_VOICE = process.env.TTS_VOICE ?? "shimmer"; // softer, clearer default voice
// Default speaking speed (0.25–4.0). Beginners need it slow; env-tunable.
const TTS_SPEED = clampSpeed(Number(process.env.TTS_SPEED ?? "0.85"));
const TTS_SLOW_SPEED = clampSpeed(Number(process.env.TTS_SLOW_SPEED ?? "0.7"));

function clampSpeed(n: number): number {
  if (!Number.isFinite(n)) return 0.85;
  return Math.min(4, Math.max(0.25, n));
}

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text")?.slice(0, 600).trim();
  if (!text) return new Response("Missing text", { status: 400 });
  const slow = req.nextUrl.searchParams.get("slow") === "1";
  const speed = slow ? TTS_SLOW_SPEED : TTS_SPEED;

  // TTS is opt-in: only attempt if a model is explicitly configured.
  if (!BASE || !KEY || !TTS_MODEL) {
    return new Response("TTS not configured", { status: 501 });
  }

  try {
    const upstream = await fetch(`${BASE.replace(/\/$/, "")}/audio/speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify({ model: TTS_MODEL, voice: TTS_VOICE, input: text, response_format: "mp3", speed }),
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("TTS upstream error", { status: 502 });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        // Cache identical phrases aggressively — the same letter/word is replayed a lot.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("TTS request failed", { status: 502 });
  }
}
