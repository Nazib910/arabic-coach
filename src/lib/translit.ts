// Simple, beginner-friendly romanization of vowelled Arabic (PRD F3).
// Deliberately uses plain ASCII-ish forms (aa, ee, oo, ', kh, sh, dh, th)
// rather than academic diacritics (ā, ḥ, ʿ) — easier for non-technical
// Bengali/English beginners to read and say. This is a *best-effort* helper;
// hand-authored transliterations in the glossary always take precedence.

const map: Record<string, string> = {
  "ا": "aa", "أ": "a", "إ": "i", "آ": "aa", "ء": "'", "ئ": "'", "ؤ": "'",
  "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h", "خ": "kh",
  "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh",
  "ص": "s", "ض": "d", "ط": "t", "ظ": "z", "ع": "'a", "غ": "gh",
  "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n",
  "ه": "h", "و": "w", "ي": "y", "ى": "a", "ة": "h",
  // short vowels
  "\u064E": "a",  // fatha
  "\u0650": "i",  // kasra
  "\u064F": "u",  // damma
  "\u064B": "an", // fathatan
  "\u064D": "in", // kasratan
  "\u064C": "un", // dammatan
  "\u0652": "",   // sukun (no vowel)
  "\u0651": "\u0651", // shadda — handled below (doubles previous consonant)
  " ": " ",
};

const longVowelPrev: Record<string, string> = { "و": "oo", "ي": "ee", "ا": "aa" };

export function simpleTranslit(input: string): string {
  if (!input) return "";
  let out = "";
  let prevConsonant = "";
  for (const ch of input.normalize("NFC")) {
    if (ch === "\u0651") {
      // shadda: double the previous consonant sound
      out += prevConsonant;
      continue;
    }
    // long vowel after a consonant: و→oo, ي→ee, ا→aa (approximate)
    if ((ch === "و" || ch === "ي" || ch === "ا") && prevConsonant) {
      out += longVowelPrev[ch];
      prevConsonant = "";
      continue;
    }
    const t = map[ch];
    if (t === undefined) {
      // skip unknown marks (tatweel etc.) but keep punctuation
      if (/[،.!؟?]/.test(ch)) out += ch;
      continue;
    }
    out += t;
    // track a single-letter consonant for shadda/long-vowel handling
    prevConsonant = /[a-z']/.test(t) && t.length <= 2 && !/[aeiou]/.test(t[0]) ? t : "";
  }
  return out.replace(/\s+/g, " ").trim();
}
