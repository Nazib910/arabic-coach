// Reliable Arabic audio playback for beginners (PRD F1).
//
// Strategy, in order:
//   1. Pre-recorded asset if one exists for this text (gold path, needed for
//      true isolated-letter sounds).
//   2. Server TTS route (/api/tts) that streams natural MSA audio.
//   3. Browser speechSynthesis — ONLY if an Arabic voice is actually installed.
//   4. Otherwise: report "unavailable" so the UI can show the transliteration
//      instead of failing silently.

import { getAudioAsset } from "@/data/audioManifest";

export type AudioResult = "asset" | "tts" | "browser" | "unavailable";

let cachedArabicVoice: SpeechSynthesisVoice | null | undefined;
const assetCache = new Map<string, HTMLAudioElement>();
let currentAudio: HTMLAudioElement | null = null;
const ttsFailed = { value: false }; // once the server route 404/errors, stop hammering it

// Pick the best-quality Arabic voice available, not just the first one.
// Prefer known natural/enhanced voices and "local" (on-device, higher quality)
// over network/robotic ones.
function pickBestArabicVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const arabic = voices.filter((v) => v.lang?.toLowerCase().startsWith("ar"));
  if (!arabic.length) return null;
  const preferredNames = ["majed", "tarik", "maged", "laila", "hala", "google", "microsoft", "enhanced", "premium", "natural"];
  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    let s = 0;
    if (v.localService) s += 3;                       // on-device voices sound better
    if (preferredNames.some((p) => name.includes(p))) s += 4;
    if (v.lang.toLowerCase() === "ar-sa") s += 1;     // MSA-leaning
    return s;
  };
  return [...arabic].sort((a, b) => score(b) - score(a))[0] ?? arabic[0];
}

function hasArabicVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  if (cachedArabicVoice !== undefined) return Boolean(cachedArabicVoice);
  cachedArabicVoice = pickBestArabicVoice(window.speechSynthesis.getVoices());
  return Boolean(cachedArabicVoice);
}

// Voice list can load async on some browsers.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedArabicVoice = pickBestArabicVoice(window.speechSynthesis.getVoices());
    };
  } catch {
    /* ignore */
  }
}

function stopAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function playAsset(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (ok: boolean) => { if (!settled) { settled = true; resolve(ok); } };
    let audio = assetCache.get(src);
    if (!audio) {
      audio = new Audio(src);
      assetCache.set(src, audio);
    }
    currentAudio = audio;
    audio.currentTime = 0;
    audio.onerror = () => done(false);
    // Consider it a success once playback actually starts.
    audio.play().then(() => done(true)).catch(() => done(false));
  });
}

async function playTts(text: string, slow: boolean): Promise<boolean> {
  if (ttsFailed.value) return false;
  try {
    const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}&slow=${slow ? "1" : "0"}`);
    if (!res.ok) {
      if (res.status === 404 || res.status === 501 || res.status === 502) ttsFailed.value = true;
      return false;
    }
    const blob = await res.blob();
    if (!blob.size) return false;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

function playBrowser(text: string, slow: boolean): boolean {
  if (!hasArabicVoice()) return false;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = cachedArabicVoice?.lang ?? "ar-SA";
    // Slower, clearer delivery for beginners; single letters/words even slower.
    utterance.rate = slow ? 0.55 : 0.7;
    utterance.pitch = 1;
    if (cachedArabicVoice) utterance.voice = cachedArabicVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

/**
 * Play Arabic audio using the best available source.
 * @param text the Arabic string to speak
 * @param assetSrc optional pre-recorded asset path (from a manifest)
 * @returns which source was used (or "unavailable")
 */
export async function playArabic(
  text: string,
  assetSrc?: string,
  opts?: { slow?: boolean },
): Promise<AudioResult> {
  if (typeof window === "undefined") return "unavailable";
  stopAll();
  const trimmed = text?.trim();
  if (!trimmed) return "unavailable";

  // Single letters and very short items are spoken extra-slowly for clarity,
  // unless the caller overrides.
  const isTiny = trimmed.replace(/[\u064B-\u0652\s]/g, "").length <= 3;
  const slow = opts?.slow ?? isTiny;

  // Prefer a pre-recorded asset (explicit, or resolved from the manifest).
  const resolvedAsset = assetSrc ?? getAudioAsset(trimmed);
  if (resolvedAsset) {
    const ok = await playAsset(resolvedAsset);
    if (ok) return "asset";
  }
  const ttsOk = await playTts(trimmed, slow);
  if (ttsOk) return "tts";
  const browserOk = playBrowser(trimmed, slow);
  if (browserOk) return "browser";
  return "unavailable";
}

export function audioAvailableHint(): boolean {
  // True if we have *some* reliable path (server TTS not yet known-failed, or an Arabic voice).
  return !ttsFailed.value || hasArabicVoice();
}
