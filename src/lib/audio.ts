import { getAudioAsset } from "@/data/audioManifest";

export type AudioResult = "asset" | "tts" | "browser" | "unavailable" | "cancelled";
let generation = 0;
let audio: HTMLAudioElement | undefined;
let objectUrl: string | undefined;
let controller: AbortController | undefined;
let cancelPending: (() => void) | undefined;
let retryTtsAfter = 0;

export function stopArabic() {
  generation++;
  cancelPending?.();
  cancelPending = undefined;
  controller?.abort();
  controller = undefined;
  audio?.pause();
  audio = undefined;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = undefined;
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function startAudio(src: string, token: number): Promise<boolean> {
  return new Promise(resolve => {
    if (token !== generation) { resolve(false); return; }
    const player = new Audio(src);
    audio = player;
    let settled = false;
    const finish = (success: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (cancelPending === cancel) cancelPending = undefined;
      if (!success) player.pause();
      resolve(success);
    };
    const cancel = () => finish(false);
    cancelPending = cancel;
    const timer = setTimeout(cancel, 8000);
    const release = () => {
      if (audio === player && objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = undefined;
      }
    };
    player.onerror = () => { release(); cancel(); };
    player.onended = release;
    try { Promise.resolve(player.play()).then(() => finish(token === generation), cancel); }
    catch { cancel(); }
  });
}

function arabicVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  const voices = window.speechSynthesis.getVoices().filter(voice => /^ar(?:-|$)/i.test(voice.lang));
  return voices.find(voice => voice.lang === "ar-SA") ?? voices[0];
}

function startBrowser(text: string, slow: boolean, token: number): Promise<boolean> {
  const voice = arabicVoice();
  if (!voice || token !== generation) return Promise.resolve(false);
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    utterance.rate = slow ? 0.55 : 0.7;
    let settled = false;
    const finish = (success: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (cancelPending === cancel) cancelPending = undefined;
      if (!success && token === generation) window.speechSynthesis.cancel();
      resolve(success);
    };
    const cancel = () => finish(false);
    cancelPending = cancel;
    const timer = setTimeout(cancel, 3000);
    utterance.onstart = () => finish(token === generation);
    utterance.onerror = cancel;
    try { window.speechSynthesis.speak(utterance); } catch { cancel(); }
  });
}

export async function playArabic(text: string, assetSrc?: string, opts?: { slow?: boolean }): Promise<AudioResult> {
  if (typeof window === "undefined") return "unavailable";
  stopArabic();
  const token = generation;
  const trimmed = text.trim();
  if (!trimmed) return "unavailable";
  const slow = opts?.slow ?? trimmed.replace(/[\u064B-\u0652\s]/g, "").length <= 3;
  const asset = assetSrc ?? getAudioAsset(trimmed);
  if (asset && await startAudio(asset, token)) return "asset";
  if (token !== generation) return "cancelled";
  if (Date.now() >= retryTtsAfter) {
    const abort = new AbortController();
    controller = abort;
    const timer = setTimeout(() => abort.abort(), 8000);
    try {
      const response = await fetch(`/api/tts?text=${encodeURIComponent(trimmed)}&slow=${slow ? "1" : "0"}`, { signal: abort.signal });
      if (token !== generation) return "cancelled";
      if (response.ok) {
        const blob = await response.blob();
        if (token !== generation) return "cancelled";
        if (blob.size) {
          const url = URL.createObjectURL(blob);
          objectUrl = url;
          if (await startAudio(url, token)) return "tts";
          if (objectUrl === url) { URL.revokeObjectURL(url); objectUrl = undefined; }
        }
      } else {
        retryTtsAfter = Date.now() + ([404, 501].includes(response.status) ? 60_000 : 5000);
      }
    } catch {
      if (token === generation) retryTtsAfter = Date.now() + 5000;
    } finally {
      clearTimeout(timer);
      if (controller === abort) controller = undefined;
    }
  }
  if (token !== generation) return "cancelled";
  if (await startBrowser(trimmed, slow, token)) return "browser";
  return token === generation ? "unavailable" : "cancelled";
}

export function audioAvailableHint(): boolean {
  return Date.now() >= retryTtsAfter || Boolean(arabicVoice());
}
