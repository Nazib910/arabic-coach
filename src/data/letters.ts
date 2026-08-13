// The 28 Arabic letters with their four positional forms, sound, a beginner
// pronunciation tip (BN/EN), and a difficulty group (PRD F4). Used by the
// Alphabet & Sounds trainer and the Days 2–4 lessons.
//
// Forms use the actual joined glyphs (with ـ tatweel to show the join point)
// so a beginner can see how a letter looks at the start / middle / end of a word.

export type LetterGroup = "soft" | "emphatic" | "guttural";

export type LetterInfo = {
  ar: string;            // isolated letter
  name: string;          // letter name (romanized)
  nameBn: string;        // letter name (Bangla)
  translit: string;      // its sound
  forms: { isolated: string; initial: string; medial: string; final: string };
  tipEn: string;         // how to pronounce it
  tipBn: string;
  group: LetterGroup;
  connectsLeft: boolean; // false for the 6 non-connectors ا د ذ ر ز و
};

export const letters: LetterInfo[] = [
  { ar: "ا", name: "alif", nameBn: "আলিফ", translit: "aa", forms: { isolated: "ا", initial: "ا", medial: "ـا", final: "ـا" }, tipEn: "A long ‘aa’ as in ‘father’.", tipBn: "‘বাবা’-র মতো লম্বা ‘আ’।", group: "soft", connectsLeft: false },
  { ar: "ب", name: "baa", nameBn: "বা", translit: "b", forms: { isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" }, tipEn: "‘b’ as in ‘book’ — one dot below.", tipBn: "‘বই’-এর ‘ব’ — নিচে একটি নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ت", name: "taa", nameBn: "তা", translit: "t", forms: { isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" }, tipEn: "‘t’ as in ‘tap’ — two dots above.", tipBn: "‘ত’ — ওপরে দুটি নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ث", name: "thaa", nameBn: "সা", translit: "th", forms: { isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" }, tipEn: "‘th’ as in ‘think’ — three dots above.", tipBn: "‘think’-এর ‘th’ — ওপরে তিন নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ج", name: "jeem", nameBn: "জিম", translit: "j", forms: { isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" }, tipEn: "‘j’ as in ‘jam’ — one dot inside.", tipBn: "‘জ’ — ভেতরে একটি নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ح", name: "haa", nameBn: "হা (গলার)", translit: "h", forms: { isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" }, tipEn: "A breathy ‘h’ from the throat (like fogging a mirror).", tipBn: "গলা থেকে জোরালো ‘হ’ (আয়নায় হাঁ করে ফুঁ দেওয়ার মতো)।", group: "guttural", connectsLeft: true },
  { ar: "خ", name: "khaa", nameBn: "খা", translit: "kh", forms: { isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" }, tipEn: "‘kh’ like clearing the throat — one dot above.", tipBn: "গলা পরিষ্কারের মতো ‘খ’ — ওপরে এক নুকতা।", group: "guttural", connectsLeft: true },
  { ar: "د", name: "daal", nameBn: "দাল", translit: "d", forms: { isolated: "د", initial: "د", medial: "ـد", final: "ـد" }, tipEn: "‘d’ as in ‘door’. Does not join to the left.", tipBn: "‘দরজা’-র ‘দ’। বাঁয়ে জোড়া লাগে না।", group: "soft", connectsLeft: false },
  { ar: "ذ", name: "dhaal", nameBn: "যাল", translit: "dh", forms: { isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" }, tipEn: "‘th’ as in ‘this’ — one dot above.", tipBn: "‘this’-এর ‘th’ — ওপরে এক নুকতা।", group: "soft", connectsLeft: false },
  { ar: "ر", name: "raa", nameBn: "রা", translit: "r", forms: { isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" }, tipEn: "A rolled ‘r’. Does not join to the left.", tipBn: "গড়ানো ‘র’। বাঁয়ে জোড়া লাগে না।", group: "soft", connectsLeft: false },
  { ar: "ز", name: "zaay", nameBn: "যা", translit: "z", forms: { isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" }, tipEn: "‘z’ as in ‘zoo’ — one dot above.", tipBn: "‘z’ (zoo) — ওপরে এক নুকতা।", group: "soft", connectsLeft: false },
  { ar: "س", name: "seen", nameBn: "সিন", translit: "s", forms: { isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" }, tipEn: "‘s’ as in ‘see’.", tipBn: "‘s’ (see)।", group: "soft", connectsLeft: true },
  { ar: "ش", name: "sheen", nameBn: "শিন", translit: "sh", forms: { isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" }, tipEn: "‘sh’ as in ‘she’ — three dots above.", tipBn: "‘sh’ (she) — ওপরে তিন নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ص", name: "saad", nameBn: "সোয়াদ", translit: "s", forms: { isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" }, tipEn: "A heavy, emphatic ‘s’ (mouth full, deep).", tipBn: "ভারী, জোরালো ‘স’ (মুখ ভরে, গভীর)।", group: "emphatic", connectsLeft: true },
  { ar: "ض", name: "daad", nameBn: "দোয়াদ", translit: "d", forms: { isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" }, tipEn: "A heavy, emphatic ‘d’ — the signature Arabic sound.", tipBn: "ভারী, জোরালো ‘দ’ — আরবির স্বকীয় ধ্বনি।", group: "emphatic", connectsLeft: true },
  { ar: "ط", name: "taa (emphatic)", nameBn: "তোয়া", translit: "t", forms: { isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط" }, tipEn: "A heavy, emphatic ‘t’ (deeper than ت).", tipBn: "ভারী, জোরালো ‘ত’ (ت থেকে গভীর)।", group: "emphatic", connectsLeft: true },
  { ar: "ظ", name: "zaa (emphatic)", nameBn: "যোয়া", translit: "z", forms: { isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ" }, tipEn: "A heavy, emphatic ‘dh/z’.", tipBn: "ভারী, জোরালো ‘য/z’।", group: "emphatic", connectsLeft: true },
  { ar: "ع", name: "‘ayn", nameBn: "আইন", translit: "'a", forms: { isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" }, tipEn: "A deep throat sound — tighten the throat and voice it. Hardest sound; practise a lot.", tipBn: "গলার গভীর ধ্বনি — গলা চেপে স্বর দিন। সবচেয়ে কঠিন; বেশি অনুশীলন করুন।", group: "guttural", connectsLeft: true },
  { ar: "غ", name: "ghayn", nameBn: "গাইন", translit: "gh", forms: { isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" }, tipEn: "Like a French ‘r’ / gargling — one dot above.", tipBn: "ফরাসি ‘r’ / গার্গল করার মতো — ওপরে এক নুকতা।", group: "guttural", connectsLeft: true },
  { ar: "ف", name: "faa", nameBn: "ফা", translit: "f", forms: { isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" }, tipEn: "‘f’ as in ‘fun’ — one dot above.", tipBn: "‘f’ (fun) — ওপরে এক নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ق", name: "qaaf", nameBn: "কাফ", translit: "q", forms: { isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" }, tipEn: "A deep ‘k’ from the back of the throat (deeper than ك).", tipBn: "গলার পেছন থেকে গভীর ‘ক’ (ك থেকে গভীর)।", group: "guttural", connectsLeft: true },
  { ar: "ك", name: "kaaf", nameBn: "কাফ", translit: "k", forms: { isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" }, tipEn: "‘k’ as in ‘key’.", tipBn: "‘k’ (key)।", group: "soft", connectsLeft: true },
  { ar: "ل", name: "laam", nameBn: "লাম", translit: "l", forms: { isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" }, tipEn: "‘l’ as in ‘love’.", tipBn: "‘l’ (love)।", group: "soft", connectsLeft: true },
  { ar: "م", name: "meem", nameBn: "মিম", translit: "m", forms: { isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" }, tipEn: "‘m’ as in ‘moon’.", tipBn: "‘m’ (moon)।", group: "soft", connectsLeft: true },
  { ar: "ن", name: "noon", nameBn: "নুন", translit: "n", forms: { isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" }, tipEn: "‘n’ as in ‘noon’ — one dot above.", tipBn: "‘n’ (noon) — ওপরে এক নুকতা।", group: "soft", connectsLeft: true },
  { ar: "ه", name: "haa (soft)", nameBn: "হা", translit: "h", forms: { isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه" }, tipEn: "A soft ‘h’ as in ‘hat’ (lighter than ح).", tipBn: "নরম ‘হ’ (hat) — ح থেকে হালকা।", group: "soft", connectsLeft: true },
  { ar: "و", name: "waaw", nameBn: "ওয়াও", translit: "w/oo", forms: { isolated: "و", initial: "و", medial: "ـو", final: "ـو" }, tipEn: "‘w’ as in ‘we’, or long ‘oo’. Does not join to the left.", tipBn: "‘w’ (we), বা লম্বা ‘ঊ’। বাঁয়ে জোড়া লাগে না।", group: "soft", connectsLeft: false },
  { ar: "ي", name: "yaa", nameBn: "ইয়া", translit: "y/ee", forms: { isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" }, tipEn: "‘y’ as in ‘yes’, or long ‘ee’ — two dots below.", tipBn: "‘y’ (yes), বা লম্বা ‘ঈ’ — নিচে দুই নুকতা।", group: "soft", connectsLeft: true },
];

export const confusablePairs: Array<[string, string]> = [
  ["ح", "ه"], ["ق", "ك"], ["ع", "ء"], ["س", "ص"], ["ت", "ط"], ["ذ", "ز"], ["د", "ض"],
];

export function letterByChar(ch: string): LetterInfo | undefined {
  return letters.find((l) => l.ar === ch);
}
