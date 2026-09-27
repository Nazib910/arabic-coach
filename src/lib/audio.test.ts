import { test } from "node:test";
import assert from "node:assert/strict";
import { playArabic, stopArabic } from "./audio";

test("cancelled pending TTS never starts stale audio; URLs are revoked", async (t) => {
  const played: string[] = [], revoked: string[] = [];
  class FakeAudio {
    onerror: (() => void) | null = null;
    onended: (() => void) | null = null;
    constructor(public src: string) {}
    pause() {}
    async play() { played.push(this.src); }
  }
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalAudio = Object.getOwnPropertyDescriptor(globalThis, "Audio");
  Object.defineProperty(globalThis, "window", { value: {}, configurable: true });
  Object.defineProperty(globalThis, "Audio", { value: FakeAudio, configurable: true });
  let resolveFetch!: (response: Response) => void;
  t.mock.method(globalThis, "fetch", () => new Promise<Response>(resolve => { resolveFetch = resolve; }));
  t.mock.method(URL, "createObjectURL", () => "blob:test");
  t.mock.method(URL, "revokeObjectURL", (url: string) => { revoked.push(url); });
  try {
    const stale = playArabic("عبارة جديدة للاختبار");
    assert.equal(await playArabic("ب", "/audio/letters/1.m4a"), "asset");
    resolveFetch(new Response(new Blob(["audio"])));
    assert.equal(await stale, "cancelled");
    assert.deepEqual(played, ["/audio/letters/1.m4a"]);
    t.mock.method(globalThis, "fetch", async () => new Response(new Blob(["audio"])));
    assert.equal(await playArabic("صوت جديد للاختبار"), "tts");
    stopArabic();
    assert.deepEqual(revoked, ["blob:test"]);
  } finally {
    stopArabic();
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow); else Reflect.deleteProperty(globalThis, "window");
    if (originalAudio) Object.defineProperty(globalThis, "Audio", originalAudio); else Reflect.deleteProperty(globalThis, "Audio");
  }
});
