import type { Lesson } from "@/types";

export const alphabetIntroductions: Record<number, string[]> = {
  2: ["ا", "ب", "ت", "ث", "ج", "ح", "خ"],
  3: ["د", "ذ", "ر", "ز", "س", "ش", "ص", "ض"],
  4: ["ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"],
};
export type ModelMeaning = { bn: string; en: string };
export const foundationModelMeanings: Record<number, ModelMeaning[]> = {
  1: [{ bn: "স্বাগতম! আমি একজন ছাত্র। শুনে অনুকরণ করুন; এখনই পড়তে হবে না।", en: "Hello! I am a student. Listen and imitate; reading is not required yet." }, { bn: "হ্যালো, কেমন আছেন?", en: "Hello, how are you?" }, { bn: "আরবি শিখে আমি খুশি।", en: "I am happy to learn Arabic." }],
  2: [{ bn: "আজকের সাতটি অক্ষর। নাম শুনুন, তারপর একই অক্ষর খুঁজুন।", en: "Today's seven letters. Hear each name, then locate its letter." }, { bn: "বা-এর এক নুকতা নিচে; তা-এর দুই ওপরে; সা-এর তিন ওপরে।", en: "Baa: one dot below; taa: two above; thaa: three above." }, { bn: "জিমের নুকতা ভেতরে, হা-তে নেই, খা-এর ওপরে।", en: "Jeem has a dot inside, haa none, khaa above." }],
  3: [{ bn: "দাল, যাল, রা, যা—পরের অক্ষরের সঙ্গে বাঁয়ে জোড়া লাগে না।", en: "Daal, dhaal, raa, zaay do not join to the following letter on the left." }, { bn: "সিন ও শিন; সোয়াদ ও দোয়াদ।", en: "Seen and sheen; saad and daad." }, { bn: "আজকের অক্ষরগুলো জোড়া রূপে দেখুন; শব্দ হিসেবে পড়তে হবে না।", en: "Notice joined forms of today's letters; these are not words to decode." }],
  4: [{bn:"চোখ — মেঘ",en:"Eye — cloud"},{bn:"কলম — কুকুর",en:"Pen — dog"},{bn:"রাত — দিনের আলো — দিন",en:"Night — daytime — day"}],
  5: [{bn:"বা-তে a, i, u ও কোনো স্বর নেই।",en:"Baa with a, i, u and no vowel."},{bn:"সে লিখল: ka-ta-ba।",en:"He wrote: ka-ta-ba."},{bn:"মেয়ে: bint।",en:"Girl: bint."}],
  6: [{bn:"ছোট a / দীর্ঘ aa",en:"Short a / long aa"},{bn:"ছোট u / দীর্ঘ uu",en:"Short u / long uu"},{bn:"ছোট i / দীর্ঘ ii",en:"Short i / long ii"}],
  7: [{bn:"চারটি স্বরচিহ্নের অনুশীলন।",en:"Four vowel-mark patterns."},{bn:"দরজা — আলো — হাতি",en:"Door — light — elephant"},{bn:"সে লিখল — মেয়ে",en:"He wrote — girl"}],
  8: [{bn:"শিক্ষক; দ্বিগুণ r ধ্বনি।",en:"Teacher; doubled r sound."},{bn:"একটি বই; শেষে un।",en:"A book; final un."},{bn:"ধন্যবাদ; শেষে an।",en:"Thank you; final an."}],
  9: [{bn:"ছাত্র — ছাত্রী",en:"Male student — female student"},{bn:"একটি বড় স্কুল",en:"A large school"},{bn:"এটি একটি নতুন গাড়ি।",en:"This is a new car."}],
  10: [{bn:"চাঁদটি; al-qamar।",en:"The moon; al-qamar."},{bn:"সূর্যটি; ash-shams।",en:"The sun; ash-shams."},{bn:"ছাত্রটি বিশ্ববিদ্যালয়ে আছে।",en:"The student is at the university."}],
  11: [{bn:"বাবা — মা",en:"Father — mother"},{bn:"প্রশ্ন — কূপ",en:"Question — well"},{bn:"ছাত্রটি কিছু পড়ল।",en:"The student read something."}],
  12: [{bn:"বাড়িটি বড়।",en:"The house is big."},{bn:"ছাত্রটি পরিশ্রমী।",en:"The student is diligent."},{bn:"স্কুলটি কাছে।",en:"The school is nearby."}],
  13: [{bn:"এটি একটি বই, আর এটি একটি গাড়ি।",en:"This is a book, and this is a car."},{bn:"বই এখানে, কলম সেখানে।",en:"The book is here; the pen is there."},{bn:"এটি কী? এটি একটি দরজা।",en:"What is this? This is a door."}],
  14: [{bn:"এটি একটি বই।",en:"This is a book."},{bn:"বইটি নতুন।",en:"The book is new."},{bn:"বাড়িটি বড়।",en:"The house is big."}],
  15: [{bn:"নতুন বইটি উপকারী।",en:"The new book is useful."},{bn:"নতুন গাড়িটি দ্রুতগতির।",en:"The new car is fast."},{bn:"একটি প্রশস্ত ও পরিষ্কার ঘর।",en:"A spacious and clean room."}],
  16: [{bn:"এটি আমার বই।",en:"This is my book."},{bn:"আপনার নাম কী? (পুরুষ শ্রোতা)",en:"What is your name? (male listener)"},{bn:"তার (নারীর) বাড়ি কাছে, আর তার (পুরুষের) নাম করিম।",en:"Her house is nearby, and his name is Karim."}],
  17: [{bn:"আমার তিনটি বই আছে।",en:"I have three books."},{bn:"আমার ফোন নম্বর: ০১৭…",en:"My phone number: 017…"},{bn:"আমার পাঁচটি কলম ও দুটি বই আছে।",en:"I have five pens and two books."}],
  18: [{bn:"আমার বয়স বিশ বছর।",en:"I am twenty years old."},{bn:"দাম পঁয়তাল্লিশ।",en:"The price is forty-five."},{bn:"শ্রেণিতে ত্রিশজন ছাত্র আছে।",en:"There are thirty students in the class."}],
  19: [{bn:"বইটি টেবিলের ওপর।",en:"The book is on the table."},{bn:"কলমটি ব্যাগের ভেতর।",en:"The pen is in the bag."},{bn:"স্কুলটি বাগানের পাশে।",en:"The school is beside the garden."}],
  20: [{bn:"এটি একটি বাড়ি।",en:"This is a house."},{bn:"বাড়িটি বড়।",en:"The house is big."},{bn:"বইটি টেবিলের ওপর।",en:"The book is on the table."}],
};

const overrides: Record<number, Partial<Lesson>> = {
  2: {
    models: ["ا ب ت ث ج ح خ", "ب — ت — ث", "ج — ح — خ"],
    exercises: ["Copy today's seven letters: ا ب ت ث ج ح خ.", "Join ب + ا + ب and ت + ا + ج using the letter-shape examples.", "Find every خ in: ج خ ح خ ج ح. Write how many you found."],
    exercisesBn: ["আজকের সাতটি অক্ষর দেখে লিখুন: ا ب ت ث ج ح خ।", "হরফের রূপ দেখে ب + ا + ب এবং ت + ا + ج জোড়া দিন।", "ج خ ح خ ج ح তালিকায় সব خ খুঁজুন। কয়টি আছে লিখুন।"],
  },
  3: {
    models: ["د ذ ر ز", "س ش ص ض", "سـ — ـسـ — ـس"],
    exercises: ["Copy the four letters that do not join left: د ذ ر ز.", "Copy these pairs and describe the dots: س ش and ص ض.", "Listen to س and ص in the trainer. Repeat both; describe any difficulty in your own language. This is self-practice, not a speaking score."],
    exercisesBn: ["বাঁয়ে জোড়া লাগে না এমন চারটি অক্ষর লিখুন: د ذ ر ز।", "س ش এবং ص ض দেখে লিখুন। নুকতার পার্থক্য বলুন।", "হরফের trainer-এ س ও ص শুনে অনুকরণ করুন। কোথায় কঠিন লাগে বাংলায় লিখুন—এটি নিজের অনুশীলন, কথনের score নয়।"],
  },
  5: {
    exercises: ["Add the mark to ب for ba, bi, bu and b with no vowel: use َ ِ ُ ْ.", "Read: بَ بِ بُ تَ تِ تُ. Name each vowel mark.", "Copy كَتَبَ and بِنْت. Then cover them and write them again."],
    exercisesBn: ["ba, bi, bu ও স্বর ছাড়া b লিখতে ب-তে َ ِ ُ ْ বসান।", "بَ بِ بُ تَ تِ تُ পড়ুন। প্রতিটি স্বরচিহ্নের নাম বলুন।", "كَتَبَ ও بِنْت দেখে লিখুন। ঢেকে আবার লিখুন।"],
  },
  7: {
    vocabulary: ["باب", "نور", "فيل", "كَتَبَ", "بِنْت"],
    models: ["بَ بِ بُ بْ", "بَاب — نُور — فِيل", "كَتَبَ — بِنْت"],
    exercises: ["Copy بَ بِ بُ بْ and label the four vowel marks.", "Join ب + ا + ب, ن + و + ر and ف + ي + ل. Compare with the models after trying.", "Without looking, write the Arabic for door, light and elephant. Then check the vocabulary meanings."],
    exercisesBn: ["بَ بِ بُ بْ লিখে চারটি স্বরচিহ্নের নাম দিন।", "ب + ا + ب, ن + و + ر ও ف + ي + ل জুড়ুন। চেষ্টা করার পরে নমুনার সঙ্গে মিলান।", "না দেখে দরজা, আলো ও হাতি আরবিতে লিখুন। তারপর শব্দতালিকার সঙ্গে মিলান।"],
  },
  6: {
    exercises: ["Sort بَاب، نُور، فِيل by the long vowel ا، و، ي.", "Copy and read بَ / بَا, بُ / بُو, بِ / بِي; compare short and long sounds.", "Cover the vocabulary and write door, light and elephant in Arabic."],
    exercisesBn: ["بَاب، نُور، فِيل-কে দীর্ঘ স্বর ا، و، ي অনুযায়ী ভাগ করুন।", "بَ / بَا, بُ / بُو, بِ / بِي লিখে শুনুন; ছোট ও দীর্ঘ স্বর তুলনা করুন।", "শব্দতালিকা ঢেকে দরজা, আলো ও হাতি আরবিতে লিখুন।"],
  },
  8: {
    exercises: ["Copy مُدَرِّس and سُكَّر. Identify the doubled consonant in each.", "Write the ending sounds of كِتَابٌ، بَيْتًا، قَلَمٍ: un, an or in.", "Write شُكْرًا and مَرْحَبًا. Underline the tanwin mark."],
    exercisesBn: ["مُدَرِّس ও سُكَّر লিখুন। কোন ব্যঞ্জন দ্বিগুণ হচ্ছে চিহ্নিত করুন।", "كِتَابٌ، بَيْتًا، قَلَمٍ-এর শেষ ধ্বনি লিখুন: un, an না in।", "شُكْرًا ও مَرْحَبًا লিখে তানউইন চিহ্ন দেখান।"],
  },
  9: {
    exercises: ["Change طَالِب and مُعَلِّم to feminine by adding ة.", "Copy مَدْرَسَة and غُرْفَة; circle ة. At a pause the final ending is normally -a/-ah, not -t.", "Sort: طَالِب، طَالِبَة، مُعَلِّم، مُعَلِّمَة، غُرْفَة، سَيَّارَة into masculine/feminine."],
    exercisesBn: ["طَالِب ও مُعَلِّم-এ ة যোগ করে স্ত্রীলিঙ্গ করুন।", "مَدْرَسَة ও غُرْفَة লিখে ة চিহ্নিত করুন। থামলে সাধারণত শেষে -a/-ah শোনা যায়, -t নয়।", "طَالِب، طَالِبَة، مُعَلِّم، مُعَلِّمَة، غُرْفَة، سَيَّارَة-কে পুং/স্ত্রীলিঙ্গে ভাগ করুন।"],
  },
  10: {
    exercises: ["Sort شَمْس، نَهْر، طَالِب، قَمَر، بَيْت، جَامِعَة: sun letters ش ن ط, moon letters ق ب ج.", "Add ال to كِتَاب، بَيْت، قَمَر. Example: بَيْت → الْبَيْت.", "Copy الشَّمْس and الْقَمَر. Explain which one doubles the first noun consonant when spoken."],
    exercisesBn: ["شَمْس، نَهْر، طَالِب، قَمَر، بَيْت، جَامِعَة ভাগ করুন: সূর্য-হরফ ش ن ط; চন্দ্র-হরফ ق ب ج।", "كِتَاب، بَيْت، قَمَر-এ ال বসান। যেমন: بَيْت → الْبَيْت।", "الشَّمْس ও الْقَمَر লিখুন। কোনটিতে উচ্চারণে প্রথম ব্যঞ্জন দ্বিগুণ হয় বলুন।"],
  },
  11: {
    exercises: ["Copy أَب، أُمّ، سُؤَال، بِئْر، شَيْء.", "Find hamza's seat in أَب، أُمّ، سُؤَال، بِئْر، شَيْء: alif, waaw, yaa or the line.", "Copy قَرَأَ (he read) and سَأَلَ (he asked). Mark every hamza."],
    exercisesBn: ["أَب، أُمّ، سُؤَال، بِئْر، شَيْء দেখে লিখুন।", "এই পাঁচ শব্দে হামজা কোথায়—আলিফে, ওয়াওয়ে, ইয়ায়ে না লাইনে—বলুন।", "قَرَأَ (সে পড়ল) ও سَأَلَ (সে জিজ্ঞেস করল) লিখে হামজা চিহ্নিত করুন।"],
  },
  12: {
    exercises: ["Complete الْبَيْتُ ___ with كَبِيرٌ (big) and الطَّالِبُ ___ with مُجْتَهِدٌ (diligent).", "Write two sentences about a house using كَبِيرٌ (big) or جَمِيلٌ (beautiful). Model: الْبَيْتُ كَبِيرٌ.", "Explain why no present-tense word for 'is' is needed in الْبَيْتُ كَبِيرٌ."],
    exercisesBn: ["الْبَيْتُ ___-এ كَبِيرٌ (বড়) এবং الطَّالِبُ ___-এ مُجْتَهِدٌ (পরিশ্রমী) বসান।", "বাড়ি নিয়ে كَبِيرٌ (বড়) বা جَمِيلٌ (সুন্দর) দিয়ে দুই বাক্য লিখুন। নমুনা: الْبَيْتُ كَبِيرٌ।", "الْبَيْتُ كَبِيرٌ-এ বর্তমান কালের ‘হয়/is’ আলাদা করে কেন লাগে না বলুন।"],
  },
  13: {
    exercises: ["Choose هَذَا (masculine) or هَذِهِ (feminine): كِتَاب، سَيَّارَة، بَاب، غُرْفَة.", "Answer مَا هَذَا؟ for a book using هَذَا كِتَابٌ. Then answer for a door (بَاب).", "Write two sentences: the book is here (الْكِتَابُ هُنَا); the pen is there (الْقَلَمُ هُنَاكَ)."],
    exercisesBn: ["كِتَاب، سَيَّارَة، بَاب، غُرْفَة-এর জন্য هَذَا (পুং) বা هَذِهِ (স্ত্রী) বাছুন।", "বই দেখিয়ে مَا هَذَا؟-এর উত্তর দিন: هَذَا كِتَابٌ। তারপর দরজা (بَاب) দিয়ে করুন।", "লিখুন: বই এখানে (الْكِتَابُ هُنَا); কলম সেখানে (الْقَلَمُ هُنَاكَ)।"],
  },
  14: {
    models: ["هَذَا كِتَابٌ.", "الْكِتَابُ جَدِيدٌ.", "الْبَيْتُ كَبِيرٌ."],
    exercises: ["Read these three supplied lines. Explain each meaning in your own language.", "Without the models, write: This is a book. The house is big.", "Compare your writing with the models. Write one correction or explain why they match."],
    exercisesBn: ["দেওয়া তিনটি লাইন পড়ুন। প্রতিটির অর্থ নিজের ভাষায় বলুন।", "নমুনা না দেখে লিখুন: এটি একটি বই। বাড়িটি বড়।", "নমুনার সঙ্গে নিজের লেখা মিলিয়ে একটি সংশোধন লিখুন; মিললে কেন মিলেছে বলুন।"],
  },
  15: {
    exercises: ["Correct الْكِتَابُ جَدِيدَةٌ and السَّيَّارَةُ جَدِيدٌ. كتاب is masculine; سيارة is feminine.", "Match بَيْت with كَبِير and غُرْفَة with وَاسِعَة; write both phrases.", "Write one sentence about a room using غُرْفَة and وَاسِعَة (spacious)."],
    exercisesBn: ["الْكِتَابُ جَدِيدَةٌ ও السَّيَّارَةُ جَدِيدٌ ঠিক করুন। كتاب পুং, سيارة স্ত্রীলিঙ্গ।", "بَيْت-এর সঙ্গে كَبِير এবং غُرْفَة-এর সঙ্গে وَاسِعَة মিলিয়ে দুই phrase লিখুন।", "غُرْفَة ও وَاسِعَة (প্রশস্ত) দিয়ে ঘর নিয়ে একটি বাক্য লিখুন।"],
  },
  16: {
    exercises: ["Attach ـي to كِتَاب and بَيْت: my book, my house.", "Copy كِتَابُكَ (your book, male listener), كِتَابُهُ (his book), كِتَابُهَا (her book). Label each owner.", "Write هَذَا كِتَابِي (This is my book). Replace my with his using the supplied form."],
    exercisesBn: ["كِتَاب ও بَيْت-এ ـي বসান: আমার বই, আমার বাড়ি।", "كِتَابُكَ (আপনার বই, পুরুষ শ্রোতা), كِتَابُهُ (তার বই, পুরুষ), كِتَابُهَا (তার বই, নারী) লিখে মালিক চিহ্নিত করুন।", "هَذَا كِتَابِي (এটি আমার বই) লিখুন। দেওয়া রূপ দিয়ে ‘আমার’-এর বদলে ‘তার’ করুন।"],
  },
  18: {
    vocabulary: ["أحد عشر", "اثنا عشر", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون", "مئة", "سنة"],
    exercises: ["Use the word list to write 11, 12, 20 and 100.", "Write the tens 20–90 using the supplied words. End with مِئَة (100).", "Copy عُمْرِي عِشْرُونَ سَنَةً (I am twenty years old). This is a model; you do not have to disclose your age."],
    exercisesBn: ["শব্দতালিকা দেখে 11, 12, 20 ও 100 লিখুন।", "দেওয়া শব্দ দিয়ে 20–90 দশকগুলো লিখুন। শেষে مِئَة (100) দিন।", "عُمْرِي عِشْرُونَ سَنَةً (আমার বয়স বিশ বছর) লিখুন। নিজের বয়স প্রকাশ জরুরি নয়—এটি নমুনা।"],
  },
  19: {
    exercises: ["Translate: الْقَلَمُ فِي الْحَقِيبَةِ (the pen is in the bag). Identify في.", "Use the model الْكِتَابُ عَلَى الطَّاوِلَةِ (the book is on the table); change على to تحت (under).", "Write two sentences locating a book (كِتَاب) or pen (قَلَم) relative to a table (طَاوِلَة)."],
    exercisesBn: ["الْقَلَمُ فِي الْحَقِيبَةِ (কলম ব্যাগে আছে) অনুবাদ করে في চিহ্নিত করুন।", "الْكِتَابُ عَلَى الطَّاوِلَةِ (বই টেবিলে আছে)-তে على-এর বদলে تحت (নিচে) দিন।", "টেবিল (طَاوِلَة)-এর তুলনায় বই (كِتَاب) বা কলম (قَلَم) কোথায়, দুই বাক্যে লিখুন।"],
  },
  20: {
    vocabulary: ["كتاب", "قلم", "بيت", "كبير", "جديد", "في", "على"],
    models: ["هَذَا بَيْتٌ.", "الْبَيْتُ كَبِيرٌ.", "الْكِتَابُ عَلَى الطَّاوِلَةِ."],
    exercises: ["Without the word list, write Arabic for: book, pen, house, big, new.", "Write three original nominal sentences using the words you learned. Then compare gender and endings with the models.", "Use the optional recorder to say two sentences. In this box explain what you compared on replay; no speaking score is assigned."],
    exercisesBn: ["শব্দতালিকা না দেখে বই, কলম, বাড়ি, বড় ও নতুন আরবিতে লিখুন।", "শেখা শব্দ দিয়ে তিনটি নিজের নামবাচক বাক্য লিখুন। পরে নমুনার সঙ্গে লিঙ্গ ও শেষাংশ মিলান।", "ঐচ্ছিক recorder-এ দুই বাক্য বলুন। শুনে কী তুলনা করলেন এখানে লিখুন; কথনের score দেওয়া হয় না।"],
  },
  17: { vocabulary: ["صفر", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة"] },
};

export function improveFoundation(lesson: Lesson): Lesson {
  return { ...lesson, ...overrides[lesson.day] };
}
