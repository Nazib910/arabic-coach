import { simpleTranslit } from "@/lib/translit";
import { glossPronunciation } from "@/data/glossPronunciation";
import { extendedGlossary } from "@/data/extendedGlossary";
import { finalGlossary } from "@/data/finalGlossary";

// Meaning + transliteration for high-frequency words used in the beginner
// phases (PRD F2/F3). Keyed by the exact Arabic string used in lessons.
// Hand-authored transliteration overrides the auto helper for accuracy.
// Includes Phase 1 foundation vocab (119 unique entries), letter names,
// and numbers 0-10 + tens with careful vowelled transliteration.

export type Gloss = { bn: string; en: string; translit: string };

const glossary: Record<string, Gloss> = {
  // greetings & basics
  "أهلاً": { bn: "স্বাগতম", en: "welcome/hi", translit: "ahlan" },
  "مرحباً": { bn: "হ্যালো", en: "hello", translit: "marhaban" },
  "نعم": { bn: "হ্যাঁ", en: "yes", translit: "na'am" },
  "لا": { bn: "না", en: "no/not", translit: "laa" },
  "أنا": { bn: "আমি", en: "I", translit: "ana" },
  "أنت": { bn: "তুমি", en: "you (m)", translit: "anta" },
  "أنتِ": { bn: "তুমি", en: "you (f)", translit: "anti" },
  "من فضلك": { bn: "অনুগ্রহ করে", en: "please", translit: "min faḍlik" },
  "شكراً": { bn: "ধন্যবাদ", en: "thank you", translit: "shukran" },

  // letter names (from letters.ts)
  "ألف": { bn: "আলিফ", en: "alif (letter)", translit: "alif" },
  "باء": { bn: "বা", en: "baa (letter)", translit: "baa'" },
  "تاء": { bn: "তা", en: "taa (letter)", translit: "taa'" },
  "ثاء": { bn: "সা", en: "thaa (letter)", translit: "thaa'" },
  "جيم": { bn: "জিম", en: "jeem (letter)", translit: "jeem" },
  "حاء": { bn: "হা (গলার)", en: "haa (pharyngeal letter)", translit: "haa'" },
  "خاء": { bn: "খা", en: "khaa (letter)", translit: "khaa'" },
  "دال": { bn: "দাল", en: "daal (letter)", translit: "daal" },
  "ذال": { bn: "যাল", en: "dhaal (letter)", translit: "dhaal" },
  "راء": { bn: "রা", en: "raa (letter)", translit: "raa'" },
  "زاي": { bn: "যা", en: "zaay (letter)", translit: "zaay" },
  "سين": { bn: "সিন", en: "seen (letter)", translit: "seen" },
  "شين": { bn: "শিন", en: "sheen (letter)", translit: "sheen" },
  "صاد": { bn: "সোয়াদ", en: "saad (emphatic letter)", translit: "saad" },
  "ضاد": { bn: "দোয়াদ", en: "daad (emphatic letter)", translit: "daad" },
  "طاء": { bn: "তোয়া", en: "taa emphatic (letter)", translit: "taa' (emphatic)" },
  "ظاء": { bn: "যোয়া", en: "zaa emphatic (letter)", translit: "zaa' (emphatic)" },
  "عين": { bn: "আইন", en: "'ayn (letter)", translit: "'ayn" },
  "غين": { bn: "গাইন", en: "ghayn (letter)", translit: "ghayn" },
  "فاء": { bn: "ফা", en: "faa (letter)", translit: "faa'" },
  "قاف": { bn: "কাফ", en: "qaaf (letter)", translit: "qaaf" },
  "كاف": { bn: "কাফ", en: "kaaf (letter)", translit: "kaaf" },
  "لام": { bn: "লাম", en: "laam (letter)", translit: "laam" },
  "ميم": { bn: "মিম", en: "meem (letter)", translit: "meem" },
  "نون": { bn: "নুন", en: "noon (letter)", translit: "noon" },
  "هاء": { bn: "হা", en: "haa soft (letter)", translit: "haa'" },
  "واو": { bn: "ওয়াও", en: "waaw (letter)", translit: "waaw" },
  "ياء": { bn: "ইয়া", en: "yaa (letter)", translit: "yaa'" },

  // people & places
  "طالب": { bn: "ছাত্র", en: "student (m)", translit: "taalib" },
  "طالبة": { bn: "ছাত্রী", en: "student (f)", translit: "taaliba" },
  "معلّم": { bn: "শিক্ষক", en: "teacher (m)", translit: "mu'allim" },
  "معلّمة": { bn: "শিক্ষিকা", en: "teacher (f)", translit: "mu'allima" },
  "مُدرِّس": { bn: "শিক্ষক", en: "instructor (m)", translit: "mudarris" },
  "أستاذ": { bn: "অধ্যাপক", en: "professor", translit: "ustaadh" },
  "مدرسة": { bn: "স্কুল", en: "school", translit: "madrasa" },
  "جامعة": { bn: "বিশ্ববিদ্যালয়", en: "university", translit: "jaami'a" },
  "بيت": { bn: "বাড়ি", en: "house", translit: "bayt" },
  "مدينة": { bn: "শহর", en: "city", translit: "madeena" },
  "بلد": { bn: "দেশ", en: "country", translit: "balad" },
  "صديق": { bn: "বন্ধু", en: "friend (m)", translit: "sadeeq" },
  "شارع": { bn: "রাস্তা", en: "street", translit: "shaari'" },
  "غرفة": { bn: "ঘর", en: "room", translit: "ghurfa" },
  "أب": { bn: "বাবা", en: "father", translit: "ab" },
  "أم": { bn: "মা", en: "mother", translit: "umm" },

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
  "سيارة": { bn: "গাড়ি", en: "car", translit: "sayyaara" },
  "فيل": { bn: "হাতি", en: "elephant", translit: "feel" },

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
  "مجتهد": { bn: "পরিশ্রমী", en: "diligent", translit: "mujtahid" },

  // verbs (past - most common with vowels)
  "ذهب": { bn: "সে গেল", en: "he went", translit: "dhahaba" },
  "درس": { bn: "সে পড়ল", en: "he studied", translit: "darasa" },
  "عمل": { bn: "সে কাজ করল", en: "he worked", translit: "'amila" },
  "كتب": { bn: "সে লিখল", en: "he wrote", translit: "kataba" },
  "قرأ": { bn: "সে পড়ল", en: "he read", translit: "qara'a" },
  "قال": { bn: "সে বলল", en: "he said", translit: "qaala" },
  "كان": { bn: "ছিল", en: "was", translit: "kaana" },
  "رأى": { bn: "সে দেখল", en: "he saw", translit: "ra'aa" },
  "جاء": { bn: "সে এল", en: "he came", translit: "jaa'a" },

  // verbs (present - most common, vowelled)
  "يدرس": { bn: "সে পড়ে", en: "he studies", translit: "yadrus" },
  "يعمل": { bn: "সে কাজ করে", en: "he works", translit: "ya'mal" },
  "يسكن": { bn: "সে থাকে", en: "he lives", translit: "yaskun" },
  "يأكل": { bn: "সে খায়", en: "he eats", translit: "ya'kul" },
  "يشرب": { bn: "সে পান করে", en: "he drinks", translit: "yashrab" },
  "يذهب": { bn: "সে যায়", en: "he goes", translit: "yadhhab" },
  "يقرأ": { bn: "সে পড়ে", en: "he reads", translit: "yaqra'" },
  "يكتب": { bn: "সে লেখে", en: "he writes", translit: "yaktub" },

  // family
  "والد": { bn: "বাবা", en: "father", translit: "waalid" },
  "والدة": { bn: "মা", en: "mother", translit: "waalida" },
  "أخ": { bn: "ভাই", en: "brother", translit: "akh" },
  "أخت": { bn: "বোন", en: "sister", translit: "ukht" },
  "جدّ": { bn: "দাদা", en: "grandfather", translit: "jadd" },
  "جدّة": { bn: "দাদি", en: "grandmother", translit: "jadda" },

  // numbers 0-10
  "صفر": { bn: "শূন্য", en: "zero", translit: "sifr" },
  "واحد": { bn: "এক", en: "one", translit: "waahid" },
  "اثنان": { bn: "দুই", en: "two", translit: "ithnaan" },
  "اثنا": { bn: "বারো গঠনে দুই-এর রূপ", en: "two in the nominative compound twelve", translit: "ithnaa" },
  "ثلاثة": { bn: "তিন", en: "three", translit: "thalaatha" },
  "أربعة": { bn: "চার", en: "four", translit: "arba'a" },
  "خمسة": { bn: "পাঁচ", en: "five", translit: "khamsa" },
  "عشرة": { bn: "দশ", en: "ten", translit: "'ashara" },
  "عشر": { bn: "দশ", en: "ten (in compounds)", translit: "'ashar" },

  // numbers 11-100 & tens
  "أحد عشر": { bn: "এগার", en: "eleven", translit: "ahad 'ashar" },
  "اثنا عشر": { bn: "বারো", en: "twelve", translit: "ithna 'ashar" },
  "عشرون": { bn: "বিশ", en: "twenty", translit: "'ishrun" },
  "ثلاثون": { bn: "ত্রিশ", en: "thirty", translit: "thalaathun" },
  "أربعون": { bn: "চল্লিশ", en: "forty", translit: "arba'un" },
  "خمسون": { bn: "পঞ্চাশ", en: "fifty", translit: "khamsun" },
  "ستون": { bn: "ষাট", en: "sixty", translit: "situn" },
  "سبعون": { bn: "সত্তর", en: "seventy", translit: "saba'un" },
  "ثمانون": { bn: "আশি", en: "eighty", translit: "thamaanun" },
  "تسعون": { bn: "নব্বই", en: "ninety", translit: "tis'un" },
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

  // grammar & marks (lesson-specific)
  "الحروف": { bn: "অক্ষর/হরফ", en: "letters", translit: "al-huruf" },
  "الحركات": { bn: "স্বরচিহ্ন", en: "vowel marks", translit: "al-harakaat" },
  "الفتحة": { bn: "ফাতহা", en: "fatha (a-vowel)", translit: "al-fatha" },
  "الكسرة": { bn: "কাসরা", en: "kasra (i-vowel)", translit: "al-kasra" },
  "الضمة": { bn: "দাম্মা", en: "damma (u-vowel)", translit: "al-damma" },
  "السكون": { bn: "সুকুন", en: "sukun (no vowel)", translit: "al-sukun" },
  "المدّ": { bn: "লম্বা স্বর", en: "long vowels", translit: "al-madd" },
  "الشدّة": { bn: "শাদ্দা", en: "shadda (doubling)", translit: "al-shadda" },
  "التنوين": { bn: "তানউইন", en: "tanwin (indefinite)", translit: "al-tanwin" },
  "الهمزة": { bn: "হামজা", en: "hamza (glottal stop)", translit: "al-hamza" },
  "التاء المربوطة": { bn: "তা মারবুতা", en: "taa marbuta (f marker)", translit: "al-taa al-marbuta" },
  "الجملة": { bn: "বাক্য", en: "sentence", translit: "al-jumla" },
  "الجملة الاسمية": { bn: "নামবাচক বাক্য", en: "nominal sentence", translit: "al-jumla al-ismiyya" },

  // prepositions & demonstratives
  "في": { bn: "এ", en: "in", translit: "fee" },
  "على": { bn: "এর উপর", en: "on", translit: "'ala" },
  "تحت": { bn: "নিচে", en: "under", translit: "tahta" },
  "أمام": { bn: "সামনে", en: "in front of", translit: "amama" },
  "خلف": { bn: "পেছনে", en: "behind", translit: "khalfa" },
  "بجانب": { bn: "পাশে", en: "beside", translit: "bijaanib" },
  "بين": { bn: "মধ্যে", en: "between", translit: "bayna" },
  "فوق": { bn: "উপরে", en: "above", translit: "fawq" },
  "هذا": { bn: "এটি", en: "this (m)", translit: "hadha" },
  "هذه": { bn: "এটি", en: "this (f)", translit: "hadhih" },
  "ذلك": { bn: "ওটি", en: "that (m)", translit: "dhaalika" },
  "تلك": { bn: "ওটি", en: "that (f)", translit: "tilka" },
  "هنا": { bn: "এখানে", en: "here", translit: "hunaa" },
  "هناك": { bn: "সেখানে", en: "there", translit: "hunaak" },

  // possessive constructions
  "كتابي": { bn: "আমার বই", en: "my book", translit: "kitaabi" },
  "كتابك": { bn: "তোমার বই", en: "your book", translit: "kitabak" },
  "كتابه": { bn: "তার বই", en: "his book", translit: "kitabuhu" },
  "كتابها": { bn: "তার (স্ত্রী) বই", en: "her book", translit: "kitabuha" },
  "بيتي": { bn: "আমার বাড়ি", en: "my house", translit: "baytee" },
  "اسمه": { bn: "তার নাম", en: "his name", translit: "ismuhu" },
  "اسمها": { bn: "তার নাম", en: "her name", translit: "ismuha" },

  // vowelled words from lessons
  "كَتَبَ": { bn: "সে লিখল", en: "he wrote", translit: "kataba" },
  "بِنْت": { bn: "মেয়ে", en: "girl", translit: "bint" },
  "قلمٍ": { bn: "একটি কলম (সম্বন্ধপদের রূপ)", en: "a pen (genitive)", translit: "qalamin" },
  "كتابٌ": { bn: "একটি বই", en: "a book", translit: "kitaabun" },
  "بيتاً": { bn: "একটি বাড়ি (কর্মপদের রূপ)", en: "a house (accusative)", translit: "baytan" },
  "سُكون": { bn: "সুকুন", en: "sukun (no vowel)", translit: "sukun" },
  "فَتْحة": { bn: "ফাতহা", en: "fatha", translit: "fatha" },
  "كَسْرة": { bn: "কাসরা", en: "kasra", translit: "kasra" },
  "ضَمّة": { bn: "দাম্মা", en: "damma", translit: "damma" },
  "شُكراً": { bn: "ধন্যবাদ", en: "thank you", translit: "shukran" },
  "سؤال": { bn: "প্রশ্ন", en: "question", translit: "su'aal" },
  "بئر": { bn: "কূপ", en: "well", translit: "bi'r" },
  "شيء": { bn: "জিনিস", en: "thing", translit: "shay'" },
  "كُتُب": { bn: "বইগুলো", en: "books", translit: "kutub" },
  "مِنْ": { bn: "থেকে", en: "from", translit: "min" },
  "مَنْ": { bn: "কে", en: "who", translit: "man" },
  "ستة": { bn: "ছয়", en: "six", translit: "sitta" },
  "سبعة": { bn: "সাত", en: "seven", translit: "sabʿa" },
  "ثمانية": { bn: "আট", en: "eight", translit: "thamaaniya" },
  "تسعة": { bn: "নয়", en: "nine", translit: "tisʿa" },
  "شدّة": { bn: "একই ব্যঞ্জন দ্বিগুণ পড়ার চিহ্ন", en: "shadda: doubled consonant", translit: "shadda" },
  "تنوين": { bn: "শব্দশেষে অন/ইন/উন ধ্বনি", en: "tanwin: final an/in/un", translit: "tanween" },
  "أل": { bn: "নির্দিষ্ট বোঝানোর al-", en: "the definite article al-", translit: "al" },
  "طالب/طالبة": { bn: "ছাত্র / ছাত্রী", en: "male / female student", translit: "ṭaalib / ṭaaliba" },
  "معلّم/معلّمة": { bn: "শিক্ষক / শিক্ষিকা", en: "male / female teacher", translit: "muʿallim / muʿallima" },
  "مراجعة شاملة للمرحلة الأولى": { bn: "প্রথম ধাপের সম্পূর্ণ পুনরালোচনা", en: "full phase-one review (instruction, not a new word)", translit: "muraajaʿa shaamila lil-marḥala al-uulaa" },
};

const normalizedGlossary = new Map(Object.entries({ ...extendedGlossary, ...finalGlossary, ...glossary }).map(([word, gloss]) => [word.normalize("NFC"), { ...gloss, translit: glossPronunciation[word] ?? gloss.translit }]));

export function getGloss(rawWord: string): Gloss {
  const word = rawWord.trim().normalize("NFC");

  // First check main glossary
  const hit = normalizedGlossary.get(word);
  if (hit) return hit;

  // Then check extended glossary
  const extHit = extendedGlossary[word];
  if (extHit) {
    return { ...extHit, translit: glossPronunciation[word] ?? extHit.translit };
  }

  // Meaning can be shared with an unambiguous noun; pronunciation still includes al-.
  if (word.startsWith("ال")) {
    const bare = normalizedGlossary.get(word.slice(2));
    if (bare) return { ...bare, translit: simpleTranslit(word) };

    // Check extended glossary for definite form
    const bareName = word.slice(2);
    const extBare = extendedGlossary[bareName];
    if (extBare) return { ...extBare, translit: simpleTranslit(word) };
  }

  return { bn: "", en: "", translit: simpleTranslit(word) };
}

export const glossarySize = Object.keys(glossary).length;
