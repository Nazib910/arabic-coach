import { lessons } from "@/data/lessons";
import { phaseForDay } from "@/data/phases";

// Graded reading & listening passages attached to specific days.
// Each passage is written in level-appropriate MSA (fully vowelled for the
// early phases), with a sentence-by-sentence structure so learners can tap to
// hear each line, plus a bilingual translation and comprehension questions.

export type PassageKind = "reading" | "listening";

export type PassageLine = {
  ar: string;         // one sentence of the passage (vowelled where helpful)
  en: string;         // English rendering
  bn: string;         // Bangla rendering
};

export type ComprehensionQuestion = {
  ar: string;
  en: string;
  bn: string;
};

export type Passage = {
  kind: PassageKind;
  title: string;
  titleBn: string;
  intro: string;      // what to do with this text (strategy prompt)
  introBn: string;
  lines: PassageLine[];
  questions: ComprehensionQuestion[];
};

// Keyed by absolute day number. Hand-written for the first 60 days.
const handwritten: Record<number, Passage> = {
  // Day 26 — Everyday core listening clinic
  26: {
    kind: "listening",
    title: "A student’s morning",
    titleBn: "একজন ছাত্রের সকাল",
    intro: "Listen (tap each line), predict first, then note the gist and details.",
    introBn: "প্রতিটি লাইন ছুঁয়ে শুনুন; আগে আন্দাজ করুন, তারপর মূল কথা ও তথ্য টুকুন।",
    lines: [
      { ar: "أَسْتَيْقِظُ كُلَّ صَباحٍ في السّاعةِ السّادسةِ.", en: "I wake up every morning at six o’clock.", bn: "আমি প্রতিদিন সকাল ছয়টায় ঘুম থেকে উঠি।" },
      { ar: "أَتَناوَلُ الفَطورَ ثُمَّ أَشْرَبُ الشّايَ.", en: "I eat breakfast, then I drink tea.", bn: "নাশতা করি, তারপর চা খাই।" },
      { ar: "أَذْهَبُ إلى الجامعةِ بالحافلةِ.", en: "I go to the university by bus.", bn: "বাসে করে বিশ্ববিদ্যালয়ে যাই।" },
      { ar: "أَدْرُسُ اللّغةَ العربيةَ لأنّها مُفيدةٌ.", en: "I study Arabic because it is useful.", bn: "আরবি পড়ি কারণ এটি উপকারী।" },
    ],
    questions: [
      { ar: "متى يستيقظُ الطالبُ؟", en: "When does the student wake up?", bn: "ছাত্রটি কখন ঘুম থেকে ওঠে?" },
      { ar: "كيف يذهبُ إلى الجامعةِ؟", en: "How does he go to the university?", bn: "সে কীভাবে বিশ্ববিদ্যালয়ে যায়?" },
      { ar: "لماذا يدرسُ العربيةَ؟", en: "Why does he study Arabic?", bn: "সে কেন আরবি পড়ে?" },
    ],
  },
  // Day 37 — Everyday core listening clinic
  37: {
    kind: "listening",
    title: "At the market",
    titleBn: "বাজারে",
    intro: "Predict the topic, listen for the gist, then catch the prices and items.",
    introBn: "বিষয় আন্দাজ করুন, মূল কথা শুনুন, তারপর দাম ও জিনিসগুলো ধরুন।",
    lines: [
      { ar: "ذَهَبَتْ سَلْمى إلى السّوقِ يَوْمَ الجُمُعةِ.", en: "Salma went to the market on Friday.", bn: "সালমা শুক্রবার বাজারে গেল।" },
      { ar: "اِشْتَرَتْ كيلو مِنَ التُّفّاحِ وخُبْزاً طازَجاً.", en: "She bought a kilo of apples and fresh bread.", bn: "সে এক কেজি আপেল ও তাজা রুটি কিনল।" },
      { ar: "كانَ التُّفّاحُ رَخيصاً، لكنّ الخُبْزَ غالٍ قليلاً.", en: "The apples were cheap, but the bread was a little expensive.", bn: "আপেল সস্তা ছিল, কিন্তু রুটি একটু দামি।" },
      { ar: "رَجَعَتْ إلى البيتِ سعيدةً بِتَسَوُّقِها.", en: "She returned home happy with her shopping.", bn: "কেনাকাটায় খুশি হয়ে সে বাড়ি ফিরল।" },
    ],
    questions: [
      { ar: "ماذا اشترتْ سلمى؟", en: "What did Salma buy?", bn: "সালমা কী কিনল?" },
      { ar: "أيُّهما كان غالياً؟", en: "Which item was expensive?", bn: "কোন জিনিসটি দামি ছিল?" },
      { ar: "متى ذهبتْ إلى السوقِ؟", en: "When did she go to the market?", bn: "সে কখন বাজারে গেল?" },
    ],
  },
  // Day 56 — Narration: reading a short story
  56: {
    kind: "reading",
    title: "The first day at work",
    titleBn: "কাজের প্রথম দিন",
    intro: "Read the title and predict. Don’t translate every word — infer from context.",
    introBn: "শিরোনাম পড়ে আন্দাজ করুন। প্রতিটি শব্দ অনুবাদ নয়—প্রসঙ্গ থেকে বুঝুন।",
    lines: [
      { ar: "في الصّباحِ الباكرِ، اسْتَيْقَظَ كَريمٌ مُبَكِّراً.", en: "Early in the morning, Karim woke up early.", bn: "খুব ভোরে করিম আগেভাগে জেগে উঠল।" },
      { ar: "كانَ يَوْمَه الأوّلَ في العَمَلِ، فَشَعَرَ بالقَلَقِ.", en: "It was his first day at work, so he felt anxious.", bn: "এটি ছিল কাজের প্রথম দিন, তাই সে উদ্বিগ্ন বোধ করল।" },
      { ar: "لَبِسَ مَلابِسَه ثُمَّ خَرَجَ مِنَ البيتِ.", en: "He put on his clothes, then left the house.", bn: "পোশাক পরে বাড়ি থেকে বের হলো।" },
      { ar: "وَصَلَ إلى المَكْتَبِ، واسْتَقْبَلَه المُديرُ بِابْتِسامةٍ.", en: "He arrived at the office, and the manager received him with a smile.", bn: "অফিসে পৌঁছাল, ম্যানেজার হাসিমুখে তাকে স্বাগত জানাল।" },
      { ar: "في نِهايةِ اليَوْمِ، عادَ كَريمٌ سعيداً ومُطْمَئِنّاً.", en: "At the end of the day, Karim returned happy and reassured.", bn: "দিনের শেষে করিম খুশি ও নিশ্চিন্ত মনে ফিরল।" },
    ],
    questions: [
      { ar: "لماذا شعرَ كريمٌ بالقلقِ؟", en: "Why did Karim feel anxious?", bn: "করিম কেন উদ্বিগ্ন বোধ করল?" },
      { ar: "كيف استقبلَه المديرُ؟", en: "How did the manager receive him?", bn: "ম্যানেজার কীভাবে তাকে স্বাগত জানাল?" },
      { ar: "كيف كانتْ حالتُه في نهايةِ اليومِ؟", en: "How did he feel at the end of the day?", bn: "দিনের শেষে তার অবস্থা কেমন ছিল?" },
    ],
  },
  // Day 57 — Narration: listening to a past account
  57: {
    kind: "listening",
    title: "A memorable trip",
    titleBn: "একটি স্মরণীয় ভ্রমণ",
    intro: "Listen for the sequence of events and the past-tense verbs.",
    introBn: "ঘটনার ক্রম ও অতীত কালের ক্রিয়াগুলো শুনুন।",
    lines: [
      { ar: "قَبْلَ سنةٍ، سافَرْتُ مع عائلتي إلى مدينةٍ بعيدةٍ.", en: "A year ago, I travelled with my family to a distant city.", bn: "এক বছর আগে পরিবারের সঙ্গে দূরের এক শহরে গিয়েছিলাম।" },
      { ar: "أوّلاً، رَكِبْنا القِطارَ في الصّباحِ.", en: "First, we took the train in the morning.", bn: "প্রথমে সকালে ট্রেনে চড়লাম।" },
      { ar: "ثُمَّ زُرْنا حَديقةً كبيرةً وجميلةً.", en: "Then we visited a big, beautiful park.", bn: "তারপর বড় ও সুন্দর একটি পার্কে গেলাম।" },
      { ar: "بعدَ ذلكَ، تَناوَلْنا الغَداءَ في مَطعمٍ قديمٍ.", en: "After that, we had lunch in an old restaurant.", bn: "এরপর একটি পুরনো রেস্তোরাঁয় দুপুরের খাবার খেলাম।" },
      { ar: "أخيراً، عُدْنا مساءً وكُنّا مُتْعَبينَ لكنْ سُعَداءَ.", en: "Finally, we returned in the evening, tired but happy.", bn: "অবশেষে সন্ধ্যায় ফিরলাম—ক্লান্ত কিন্তু খুশি।" },
    ],
    questions: [
      { ar: "إلى أينَ سافرَ المتحدّثُ؟", en: "Where did the speaker travel?", bn: "বক্তা কোথায় ভ্রমণ করলেন?" },
      { ar: "ماذا فعلوا بعدَ زيارةِ الحديقةِ؟", en: "What did they do after visiting the park?", bn: "পার্ক দেখার পর তারা কী করল?" },
      { ar: "كيفَ كانوا في نهايةِ الرحلةِ؟", en: "How did they feel at the end of the trip?", bn: "ভ্রমণের শেষে তাদের অবস্থা কেমন ছিল?" },
    ],
  },
};

// Fallback generator: build a light graded passage for any reading/listening
// day that doesn't have a hand-written one, using the day's own vocabulary and
// models so it always matches what was just taught.
function generatedPassage(day: number): Passage | null {
  const lesson = lessons[day - 1];
  if (!lesson) return null;
  const kind: PassageKind = lesson.skill === "listening" ? "listening" : "reading";
  const phase = phaseForDay(day);
  const models = lesson.models.filter(Boolean).slice(0, 4);
  if (models.length < 2) return null;
  const lines: PassageLine[] = models.map((ar) => ({
    ar,
    en: `Model sentence from ${phase.title}.`,
    bn: `${phase.titleBn} ধাপের একটি নমুনা বাক্য।`,
  }));
  return {
    kind,
    title: kind === "listening" ? "Listening focus" : "Reading focus",
    titleBn: kind === "listening" ? "শ্রবণ অনুশীলন" : "পঠন অনুশীলন",
    intro: kind === "listening"
      ? "Tap each line, predict, then note the gist and key details."
      : "Preview, infer unknown words from context, then summarise.",
    introBn: kind === "listening"
      ? "প্রতিটি লাইন ছুঁয়ে শুনুন; আন্দাজ করে মূল কথা ও তথ্য টুকুন।"
      : "আগে দেখুন, অচেনা শব্দ প্রসঙ্গ থেকে বুঝুন, তারপর সারাংশ করুন।",
    lines,
    questions: [
      { ar: "ما الفكرةُ الرئيسيةُ للنصِّ؟", en: "What is the main idea of the text?", bn: "লেখাটির মূল কথা কী?" },
      { ar: "اكتبْ تفصيلينِ من النصِّ.", en: "Write two details from the text.", bn: "লেখা থেকে দুটি তথ্য লিখুন।" },
      { ar: "لخّصِ النصَّ بجملةٍ واحدةٍ.", en: "Summarise the text in one sentence.", bn: "এক বাক্যে লেখাটি সংক্ষেপ করুন।" },
    ],
  };
}

export function getPassage(day: number): Passage | null {
  if (handwritten[day]) return handwritten[day];
  const lesson = lessons[day - 1];
  if (!lesson) return null;
  // Only attach a generated passage to reading/listening skill days.
  if (lesson.skill === "reading" || lesson.skill === "listening") {
    return generatedPassage(day);
  }
  return null;
}
