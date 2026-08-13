// Reliable Arabic audio playback for beginners (PRD F1).
//
// Strategy, in order:
//   1. Pre-recorded asset if one exists for this text (gold path, needed for
//      true isolated-letter sounds).
//   2. Server TTS route (/api/tts) that streams natural MSA audio.
//   3. Browser speechSynthesis — ONLY if an Arabic voice is actually installed.
//   4. Otherwise: report "unavailable" so the UI can show the transliteration
//      instead of failing silently.

export type AudioResult = "asset" | "tts" | "browser" | "unavailable";

let cachedArabicVoice: SpeechSynthesisVoice | null | undefined;
const assetCache = new Map<string, HTMLAudioElement>();
let currentAudio: HTMLAudioElement | null = null;
const ttsFailed = { value: false }; // once the server route 404/errors, stop hammering it

function hasArabicVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  if (cachedArabicVoice !== undefined) return Boolean(cachedArabicVoice);
  const voices = window.speechSynthesis.getVoices();
  cachedArabicVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("ar")) ?? null;
  return Boolean(cachedArabicVoice);
}

// Voice list can load async on some browsers.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      cachedArabicVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("ar")) ?? null;
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
    let audio = assetCache.get(src);
    if (!audio) {
      audio = new Audio(src);
      assetCache.set(src, audio);
    }
    currentAudio = audio;
    audio.currentTime = 0;
    audio.onended = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.play().then(() => {/* started */}).catch(() => resolve(false));
    // Resolve optimistically once playback starts; onerror above handles failures.
    setTimeout(() => resolve(true), 60);
  });
}

async function playTts(text: string): Promise<boolean> {
  if (ttsFailed.value) return false;
  try {
    const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
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

function playBrowser(text: string): boolean {
  if (!hasArabicVoice()) return false;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
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
export async function playArabic(text: string, assetSrc?: string): Promise<AudioResult> {
  if (typeof window === "undefined") return "unavailable";
  stopAll();
  const trimmed = text?.trim();
  if (!trimmed) return "unavailable";

  if (assetSrc) {
    const ok = await playAsset(assetSrc);
    if (ok) return "asset";
  }
  const ttsOk = await playTts(trimmed);
  if (ttsOk) return "tts";
  const browserOk = playBrowser(trimmed);
  if (browserOk) return "browser";
  return "unavailable";
}

export function audioAvailableHint(): boolean {
  // True if we have *some* reliable path (server TTS not yet known-failed, or an Arabic voice).
  return !ttsFailed.value || hasArabicVoice();
}
