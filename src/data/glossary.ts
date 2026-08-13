import { simpleTranslit } from "@/lib/translit";

// Meaning + transliteration for high-frequency words used in the beginner
// phases (PRD F2/F3). Keyed by the exact Arabic string used in lessons.
// Hand-authored transliteration overrides the auto helper for accuracy.

export type Gloss = { bn: string; en: string; translit: string };

const glossary: Record<string, Gloss> = {
  // greetings & basics
  "أهلاً": { bn: "স্বাগতম", en: "welcome/hi", translit: "ahlan" },
  "مرحباً": { bn: "হ্যালো", en: "hello", translit: "marhaban" },
  "نعم": { bn: "হ্যাঁ", en: "yes", translit: "na'am" },
  "لا": { bn: "না", en: "no/not", translit: "laa" },
  "أنا": { bn: "আমি", en: "I", translit: "ana" },
  "أنت": { bn: "তুমি", en: "you", translit: "anta" },
  "من فضلك": { bn: "অনুগ্রহ করে", en: "please", translit: "min fadlik" },
  "شكراً": { bn: "ধন্যবাদ", en: "thank you", translit: "shukran" },
  // people & places
  "طالب": { bn: "ছাত্র", en: "student (m)", translit: "taalib" },
  "طالبة": { bn: "ছাত্রী", en: "student (f)", translit: "taaliba" },
  "معلّم": { bn: "শিক্ষক", en: "teacher (m)", translit: "mu'allim" },
  "أستاذ": { bn: "অধ্যাপক", en: "professor", translit: "ustaadh" },
  "مدرسة": { bn: "স্কুল", en: "school", translit: "madrasa" },
  "جامعة": { bn: "বিশ্ববিদ্যালয়", en: "university", translit: "jaami'a" },
  "بيت": { bn: "বাড়ি", en: "house", translit: "bayt" },
  "مدينة": { bn: "শহর", en: "city", translit: "madeena" },
  "بلد": { bn: "দেশ", en: "country", translit: "balad" },
  "صديق": { bn: "বন্ধু", en: "friend", translit: "sadeeq" },
  "شارع": { bn: "রাস্তা", en: "street", translit: "shaari'" },
  "غرفة": { bn: "ঘর", en: "room", translit: "ghurfa" },
  // objects
  "كتاب": { bn: "বই", en: "book", translit: "kitaab" },
  "قلم": { bn: "কলম", en: "pen", translit: "qalam" },
  "باب": { bn: "দরজা", en: "door", translit: "baab" },
  "نافذة": { bn: "জানালা", en: "window", translit: "naafidha" },
  "طاولة": { bn: "টেবিল", en: "table", translit: "taawila" },
  "كرسي": { bn: "চেয়ার", en: "chair", translit: "kursee" },
  "حقيبة": { bn: "ব্যাগ", en: "bag", translit: "haqeeba" },
  "دفتر": { bn: "খাতা", en: "notebook", translit: "daftar" },
  "ساعة": { bn: "ঘড়ি/ঘণ্টা", en: "clock/hour", translit: "saa'a" },
  "هاتف": { bn: "ফোন", en: "phone", translit: "haatif" },
  // nature
  "شمس": { bn: "সূর্য", en: "sun", translit: "shams" },
  "قمر": { bn: "চাঁদ", en: "moon", translit: "qamar" },
  "نور": { bn: "আলো", en: "light", translit: "noor" },
  "نهر": { bn: "নদী", en: "river", translit: "nahr" },
  "لغة": { bn: "ভাষা", en: "language", translit: "lugha" },
  "اسم": { bn: "নাম", en: "name", translit: "ism" },
  // adjectives
  "كبير": { bn: "বড়", en: "big", translit: "kabeer" },
  "صغير": { bn: "ছোট", en: "small", translit: "sagheer" },
  "جديد": { bn: "নতুন", en: "new", translit: "jadeed" },
  "قديم": { bn: "পুরনো", en: "old", translit: "qadeem" },
  "جميل": { bn: "সুন্দর", en: "beautiful", translit: "jameel" },
  "قريب": { bn: "কাছের", en: "near", translit: "qareeb" },
  "نظيف": { bn: "পরিষ্কার", en: "clean", translit: "nadheef" },
  "واسع": { bn: "প্রশস্ত", en: "spacious", translit: "waasi'" },
  "مفيد": { bn: "উপকারী", en: "useful", translit: "mufeed" },
  "لطيف": { bn: "ভদ্র/মিষ্টি", en: "kind/nice", translit: "lateef" },
  "ذكي": { bn: "চালাক", en: "smart", translit: "dhakee" },
  "مشغول": { bn: "ব্যস্ত", en: "busy", translit: "mashghool" },
  "هادئ": { bn: "শান্ত", en: "calm/quiet", translit: "haadi'" },
  "طويل": { bn: "লম্বা", en: "tall/long", translit: "taweel" },
  "قصير": { bn: "খাটো/ছোট", en: "short", translit: "qaseer" },
  // verbs (present)
  "يدرس": { bn: "সে পড়ে", en: "he studies", translit: "yadrus" },
  "يعمل": { bn: "সে কাজ করে", en: "he works", translit: "ya'mal" },
  "يسكن": { bn: "সে থাকে", en: "he lives", translit: "yaskun" },
  "يأكل": { bn: "সে খায়", en: "he eats", translit: "ya'kul" },
  "يشرب": { bn: "সে পান করে", en: "he drinks", translit: "yashrab" },
  "يذهب": { bn: "সে যায়", en: "he goes", translit: "yadhhab" },
  "يقرأ": { bn: "সে পড়ে", en: "he reads", translit: "yaqra'" },
  "يكتب": { bn: "সে লেখে", en: "he writes", translit: "yaktub" },
  // verbs (past)
  "ذهب": { bn: "সে গেল", en: "he went", translit: "dhahaba" },
  "درس": { bn: "সে পড়ল", en: "he studied", translit: "darasa" },
  "عمل": { bn: "সে কাজ করল", en: "he worked", translit: "'amila" },
  "كتب": { bn: "সে লিখল", en: "he wrote", translit: "kataba" },
  "قرأ": { bn: "সে পড়ল", en: "he read", translit: "qara'a" },
  "قال": { bn: "সে বলল", en: "he said", translit: "qaala" },
  "كان": { bn: "ছিল", en: "was", translit: "kaana" },
  "رأى": { bn: "সে দেখল", en: "he saw", translit: "ra'aa" },
  "جاء": { bn: "সে এল", en: "he came", translit: "jaa'a" },
  // family
  "والد": { bn: "বাবা", en: "father", translit: "waalid" },
  "والدة": { bn: "মা", en: "mother", translit: "waalida" },
  "أخ": { bn: "ভাই", en: "brother", translit: "akh" },
  "أخت": { bn: "বোন", en: "sister", translit: "ukht" },
  "جدّ": { bn: "দাদা", en: "grandfather", translit: "jadd" },
  "جدّة": { bn: "দাদি", en: "grandmother", translit: "jadda" },
  // numbers
  "صفر": { bn: "শূন্য", en: "zero", translit: "sifr" },
  "واحد": { bn: "এক", en: "one", translit: "waahid" },
  "اثنان": { bn: "দুই", en: "two", translit: "ithnaan" },
  "ثلاثة": { bn: "তিন", en: "three", translit: "thalaatha" },
  "أربعة": { bn: "চার", en: "four", translit: "arba'a" },
  "خمسة": { bn: "পাঁচ", en: "five", translit: "khamsa" },
  "عشرة": { bn: "দশ", en: "ten", translit: "'ashara" },
  "مئة": { bn: "একশ", en: "hundred", translit: "mi'a" },
  "سنة": { bn: "বছর", en: "year", translit: "sana" },
  // question words
  "من": { bn: "কে", en: "who", translit: "man" },
  "ما": { bn: "কী", en: "what", translit: "maa" },
  "أين": { bn: "কোথায়", en: "where", translit: "ayna" },
  "متى": { bn: "কখন", en: "when", translit: "mataa" },
  "كيف": { bn: "কীভাবে", en: "how", translit: "kayfa" },
  "لماذا": { bn: "কেন", en: "why", translit: "limaadha" },
  "كم": { bn: "কত", en: "how many", translit: "kam" },
  // food & drink
  "ماء": { bn: "পানি", en: "water", translit: "maa'" },
  "قهوة": { bn: "কফি", en: "coffee", translit: "qahwa" },
  "شاي": { bn: "চা", en: "tea", translit: "shaay" },
  "خبز": { bn: "রুটি", en: "bread", translit: "khubz" },
  "أرز": { bn: "ভাত/চাল", en: "rice", translit: "aruzz" },
  "طعام": { bn: "খাবার", en: "food", translit: "ta'aam" },
};

export function getGloss(rawWord: string): Gloss {
  const word = rawWord.trim();
  const hit = glossary[word];
  if (hit) return hit;
  // Try stripping the definite article الـ for a match.
  if (word.startsWith("ال")) {
    const bare = word.slice(2);
    if (glossary[bare]) return glossary[bare];
  }
  return { bn: "", en: "", translit: simpleTranslit(word) };
}

export const glossarySize = Object.keys(glossary).length;
