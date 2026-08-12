import type { LessonBrief } from "@/types";
import { phaseForDay } from "@/data/phases";

// Detailed "what you're learning & why" briefings, keyed by absolute day.
// Hand-written for the foundation and early phases where the "why" matters most
// for a beginner; a phase-aware generator fills the rest so no day is empty.

const handwritten: Record<number, LessonBrief> = {
  1: {
    what: "Today is a gentle start. You meet a few greeting words (أهلاً، مرحباً، نعم، لا) and you see how a simple Arabic sentence works: Arabic reads right to left, and — unlike English — there is no word for “am/is/are”. So “I am a student” is literally just “I student” (أنا طالبٌ).",
    whatBn: "আজ খুব সহজ শুরু। কয়েকটি শুভেচ্ছা-শব্দ (أهلاً، مرحباً، نعم، لا) শিখবেন এবং দেখবেন একটি সাধারণ আরবি বাক্য কীভাবে কাজ করে: আরবি ডান থেকে বামে পড়া হয়, আর ইংরেজির মতো এখানে “am/is/are” বলে কোনো শব্দ নেই। তাই “আমি একজন ছাত্র” আসলে শুধু “আমি ছাত্র” (أنا طالبٌ)।",
    why: "This one idea — sentences without a “to be” verb — is the single biggest reason Arabic feels easy at the start. Once you accept it, you can already make true sentences about yourself on day one, which builds confidence and momentum.",
    whyBn: "এই একটি ধারণা — “হওয়া” ক্রিয়া ছাড়া বাক্য — শুরুতে আরবিকে সহজ মনে হওয়ার সবচেয়ে বড় কারণ। এটা মেনে নিলেই প্রথম দিনেই নিজের সম্পর্কে সত্য বাক্য বানাতে পারবেন, যা আত্মবিশ্বাস ও গতি দেয়।",
    buildsOn: "This is the seed for everything: the “no copula” nominal sentence returns properly on Day 12 and stays with you for the whole course.",
    buildsOnBn: "এটাই সব কিছুর বীজ: “হওয়া-ক্রিয়া ছাড়া” নামবাচক বাক্য ১২তম দিনে পুরোপুরি ফিরে আসে এবং পুরো কোর্সজুড়ে সঙ্গে থাকে।",
  },
  2: {
    what: "You learn the first seven letters (ا ب ت ث ج ح خ), their sounds, and how most Arabic letters change shape when they join their neighbours. Notice the tricky pair ح and خ — same skeleton, but خ has a dot and a harsher “kh” sound.",
    whatBn: "প্রথম সাতটি অক্ষর (ا ب ت ث ج ح خ), তাদের ধ্বনি এবং বেশিরভাগ আরবি অক্ষর প্রতিবেশীর সঙ্গে জোড়া লাগলে কীভাবে রূপ বদলায়—তা শিখবেন। কঠিন জোড়া ح ও خ খেয়াল করুন—একই কাঠামো, কিন্তু خ-এ একটি নুকতা ও কর্কশ “kh” ধ্বনি।",
    why: "Arabic is read as connected shapes, not separate blocks. If you learn letters in their joined forms from the very beginning, real words will look familiar instead of foreign, and reading will come months sooner.",
    whyBn: "আরবি আলাদা ব্লক নয়, যুক্ত আকৃতি হিসেবে পড়া হয়। একদম শুরু থেকেই যুক্ত রূপে অক্ষর শিখলে আসল শব্দ অচেনা নয়, পরিচিত মনে হবে—আর পড়া অনেক আগেই আয়ত্তে আসবে।",
    buildsOn: "This is the first of three alphabet days (2–4). Every word you read later rests on recognising these shapes instantly.",
    buildsOnBn: "এটি তিনটি বর্ণমালা-দিনের (২–৪) প্রথমটি। পরে যত শব্দ পড়বেন, সব এই আকৃতিগুলো সঙ্গে সঙ্গে চেনার ওপর দাঁড়িয়ে।",
  },
  5: {
    what: "You learn the three short vowels — fatḥa (◌َ = a), kasra (◌ِ = i), ḍamma (◌ُ = u) — and sukūn (◌ْ = no vowel). These small marks above and below letters tell you exactly how to pronounce each consonant.",
    whatBn: "তিনটি ছোট স্বর—ফাতহা (◌َ = a), কাসরা (◌ِ = i), দাম্মা (◌ُ = u)—আর সুকুন (◌ْ = স্বরহীন) শিখবেন। অক্ষরের ওপর-নিচের এই ছোট চিহ্নগুলো বলে দেয় প্রতিটি ব্যঞ্জন কীভাবে উচ্চারণ করতে হবে।",
    why: "Arabic letters are only consonants; the vowels are these marks. Without them you cannot know if ك+ت+ب is kataba, kutiba, or kutub. Mastering harakāt now means you can read any fully-vowelled text aloud accurately.",
    whyBn: "আরবি অক্ষরগুলো কেবল ব্যঞ্জন; স্বর হলো এই চিহ্নগুলো। এগুলো ছাড়া ك+ت+ب যে kataba না kutiba না kutub—তা বোঝা যায় না। এখন হরকত আয়ত্ত করলে যেকোনো হরকতযুক্ত লেখা নির্ভুলভাবে জোরে পড়তে পারবেন।",
    buildsOn: "Short vowels + Day 6’s long vowels are the complete sound system. Together they let you read the vowelled words in every later lesson.",
    buildsOnBn: "ছোট স্বর + ৬ষ্ঠ দিনের লম্বা স্বর মিলে পূর্ণ ধ্বনি-ব্যবস্থা। এই দুটি মিলে পরের প্রতিটি পাঠের হরকতযুক্ত শব্দ পড়তে সাহায্য করে।",
  },
  8: {
    what: "Two important marks: shadda (◌ّ) doubles a letter (مدرّس = mu-dar-ris), and tanwīn (◌ً ◌ٍ ◌ٌ) adds an -an / -in / -un sound to the end of an indefinite noun (كتابٌ = kitābun, “a book”).",
    whatBn: "দুটি গুরুত্বপূর্ণ চিহ্ন: শাদ্দা (◌ّ) একটি অক্ষরকে দ্বিগুণ করে (مدرّس = mu-dar-ris), আর তানউইন (◌ً ◌ٍ ◌ٌ) একটি অনির্দিষ্ট বিশেষ্যের শেষে -an / -in / -un ধ্বনি যোগ করে (كتابٌ = kitābun, “একটি বই”)।",
    why: "You have already seen tanwīn in words like طالبٌ. Here you finally learn what that little double-mark means: it signals “a/an”. Understanding it removes the mystery from almost every sentence you have read so far.",
    whyBn: "طالبٌ-এর মতো শব্দে আপনি আগেই তানউইন দেখেছেন। এখানে অবশেষে শিখছেন ঐ ছোট দ্বৈত-চিহ্নের মানে: এটি “একটি/একজন” বোঝায়। এটা বোঝা আপনার এ পর্যন্ত পড়া প্রায় প্রতিটি বাক্যের রহস্য দূর করে দেয়।",
    buildsOn: "Tanwīn marks indefiniteness; on Day 10 you learn الـ which marks definiteness. The two are opposites you will contrast constantly.",
    buildsOnBn: "তানউইন অনির্দিষ্টতা বোঝায়; ১০তম দিনে শিখবেন الـ যা নির্দিষ্টতা বোঝায়। এই দুটি বিপরীত, যা বারবার তুলনা করবেন।",
  },
  9: {
    what: "You meet taa marbūṭa (ة), the ending that marks most feminine nouns (طالب → طالبة, “male student → female student”). You also start making adjectives agree: a feminine noun needs a feminine adjective (سيارةٌ جديدةٌ).",
    whatBn: "তা মারবুতা (ة) শিখবেন—যে শেষাংশ বেশিরভাগ স্ত্রীলিঙ্গ বিশেষ্য বোঝায় (طالب → طالبة, “ছাত্র → ছাত্রী”)। সেই সঙ্গে বিশেষণের মিল শুরু করবেন: স্ত্রীলিঙ্গ বিশেষ্যের জন্য স্ত্রীলিঙ্গ বিশেষণ লাগে (سيارةٌ جديدةٌ)।",
    why: "Gender runs through all of Arabic — nouns, adjectives, and later verbs all must agree. Spotting ة early means your descriptions will sound correct instead of “broken” from the very first weeks.",
    whyBn: "লিঙ্গ পুরো আরবিজুড়ে চলে—বিশেষ্য, বিশেষণ, পরে ক্রিয়াও মিলতে হয়। ة আগেভাগে চিনলে প্রথম সপ্তাহ থেকেই আপনার বর্ণনা “ভাঙা” না হয়ে সঠিক শোনাবে।",
    buildsOn: "Gender agreement deepens on Day 15 (adjectives) and returns for verbs in Phase 3’s past tense.",
    buildsOnBn: "লিঙ্গ-মিল ১৫তম দিনে (বিশেষণ) আরও গভীর হয় এবং তৃতীয় ধাপের অতীত কালে ক্রিয়ার জন্য ফিরে আসে।",
  },
  10: {
    what: "The definite article الـ (“the”). The surprise: with about half the letters (the “sun letters” like ش، ن، ر) the ل is not pronounced — it assimilates, so الشمس is read ash-shams, not al-shams. With “moon letters” (like ق، ب، م) you do hear the ل: القمر = al-qamar.",
    whatBn: "নির্দিষ্টতাসূচক الـ (“the”)। চমক: প্রায় অর্ধেক অক্ষরের (“সূর্য-বর্ণ” যেমন ش، ن، ر) সঙ্গে ل উচ্চারিত হয় না—মিশে যায়, তাই الشمس পড়া হয় ash-shams, al-shams নয়। “চন্দ্র-বর্ণে” (যেমন ق، ب، م) ل শোনা যায়: القمر = al-qamar।",
    why: "الـ is on countless words. Getting the sun/moon rule right is the difference between sounding like a reader and sounding like a native — and it directly pairs with the tanwīn (a/an) you just learned.",
    whyBn: "الـ অসংখ্য শব্দে থাকে। সূর্য/চন্দ্র নিয়ম ঠিক করা—পাঠক শোনানো আর স্থানীয়ের মতো শোনানোর পার্থক্য গড়ে দেয়—আর এটি এইমাত্র শেখা তানউইন (একটি/একজন)-এর সঙ্গে সরাসরি জোড়া।",
    buildsOn: "Definiteness (الـ) vs indefiniteness (tanwīn) is the backbone of adjective agreement (Day 15) and iḍāfa possession (Day 27).",
    buildsOnBn: "নির্দিষ্টতা (الـ) বনাম অনির্দিষ্টতা (তানউইন) হলো বিশেষণ-মিল (১৫তম দিন) ও ইদাফা মালিকানা (২৭তম দিন)-এর মেরুদণ্ড।",
  },
  12: {
    what: "The nominal sentence in full: a subject + a predicate, with no verb. البيتُ كبيرٌ literally = “the-house big” = “the house is big”. Notice the subject takes الـ (definite) and the predicate takes tanwīn (indefinite).",
    whatBn: "পূর্ণ নামবাচক বাক্য: উদ্দেশ্য + বিধেয়, কোনো ক্রিয়া ছাড়া। البيتُ كبيرٌ আক্ষরিক = “the-house big” = “বাড়িটি বড়”। খেয়াল করুন উদ্দেশ্য নেয় الـ (নির্দিষ্ট) আর বিধেয় নেয় তানউইন (অনির্দিষ্ট)।",
    why: "This is the workhorse sentence of Arabic and the pattern behind describing anything — people, places, feelings. Everything you learned about الـ, ة, and tanwīn now clicks together into real, correct sentences.",
    whyBn: "এটি আরবির প্রধান কর্মঠ বাক্য এবং যেকোনো কিছু—মানুষ, জায়গা, অনুভূতি—বর্ণনার পেছনের কাঠামো। الـ, ة ও তানউইন নিয়ে যা শিখেছেন সব এখন একসঙ্গে মিলে সত্য, সঠিক বাক্যে রূপ নেয়।",
    buildsOn: "It combines Days 8–10 and leads straight into adjectives (15) and the present tense (21).",
    buildsOnBn: "এটি ৮–১০ দিনের বিষয় একত্র করে এবং সরাসরি বিশেষণ (১৫) ও বর্তমান কাল (২১)-এ নিয়ে যায়।",
  },
  15: {
    what: "Attached pronouns: instead of a separate word for “my/your/his/her”, Arabic sticks a small ending onto the noun — كتاب + ـي = كتابي (“my book”), كتابك (“your book”), كتابه (“his book”), كتابها (“her book”).",
    whatBn: "যুক্ত সর্বনাম: “আমার/তোমার/তার” বলতে আলাদা শব্দের বদলে আরবি বিশেষ্যের শেষে একটি ছোট অংশ জুড়ে দেয়—كتاب + ـي = كتابي (“আমার বই”), كتابك (“তোমার বই”), كتابه (“তার বই”), كتابها (“তার—স্ত্রী—বই”)।",
    why: "These little endings appear everywhere in real speech (اسمي، بيتي، صديقي). Learning them now means you can talk about your own things immediately, and it quietly prepares you for iḍāfa possession later.",
    whyBn: "বাস্তব কথায় এই ছোট শেষাংশগুলো সর্বত্র আসে (اسمي، بيتي، صديقي)। এখন শিখলে নিজের জিনিস নিয়ে সঙ্গে সঙ্গে কথা বলতে পারবেন, আর এটি পরে ইদাফা-মালিকানার জন্য নীরবে প্রস্তুত করে।",
    buildsOn: "This is deliberately taught before iḍāfa (Day 27) so possession feels natural when nouns start owning other nouns.",
    buildsOnBn: "এটি ইচ্ছাকৃতভাবে ইদাফার (২৭তম দিন) আগে শেখানো—যাতে বিশেষ্য যখন অন্য বিশেষ্যের মালিক হয়, মালিকানা স্বাভাবিক লাগে।",
  },
  16: {
    what: "Numbers 0–10 and the Arabic digits (٠١٢٣٤٥٦٧٨٩). Important quirk: after the numbers 3–10, the counted noun becomes plural (ثلاثةُ كتبٍ = “three books”, literally “three of-books”).",
    whatBn: "০–১০ সংখ্যা ও আরবি অঙ্ক (٠١٢٣٤٥٦٧٨٩)। জরুরি বৈশিষ্ট্য: ৩–১০ সংখ্যার পরে গণিত বিশেষ্য বহুবচন হয় (ثلاثةُ كتبٍ = “তিনটি বই”, আক্ষরিক “তিন বইয়ের”)।",
    why: "You need numbers for age, prices, phone numbers, and quantities every single day. The plural-after-3-to-10 rule is unusual, so meeting it clearly now prevents a very common beginner mistake.",
    whyBn: "বয়স, দাম, ফোন নম্বর, পরিমাণ—প্রতিদিন সংখ্যা লাগে। ৩–১০ এর পরে বহুবচন নিয়মটি অস্বাভাবিক, তাই এখন স্পষ্টভাবে দেখলে beginner-দের একটি খুব সাধারণ ভুল এড়ানো যায়।",
    buildsOn: "Day 17 extends this to 11–100, where the rule flips (the noun becomes singular) — so learning the 3–10 rule cleanly here matters.",
    buildsOnBn: "১৭তম দিন এটিকে ১১–১০০ পর্যন্ত বাড়ায়, যেখানে নিয়ম উল্টে যায় (বিশেষ্য একবচন হয়)—তাই এখানে ৩–১০ নিয়ম পরিষ্কার শেখা জরুরি।",
  },
  17: {
    what: "Numbers 11–100. Here the counting rule flips: after 11 and above, the counted noun is singular and takes an -an ending (ثلاثونَ طالباً = “thirty students”, literally “thirty student”). You use these for age and prices.",
    whatBn: "সংখ্যা ১১–১০০। এখানে গণনার নিয়ম উল্টে যায়: ১১ ও তার বেশি সংখ্যার পরে গণিত বিশেষ্য একবচন হয় ও -an শেষ নেয় (ثلاثونَ طالباً = “ত্রিশজন ছাত্র”, আক্ষরিক “ত্রিশ ছাত্র”)। বয়স ও দামে এগুলো ব্যবহার করবেন।",
    why: "This is exactly opposite to yesterday’s 3–10 rule, and mixing them up is the most common number error learners make. Seeing the two rules side by side, one day apart, is the best way to lock them in.",
    whyBn: "এটি গতকালের ৩–১০ নিয়মের একদম উল্টো, আর এদুটো গুলিয়ে ফেলা শিক্ষার্থীদের সবচেয়ে সাধারণ সংখ্যা-ভুল। এক দিন ব্যবধানে দুই নিয়ম পাশাপাশি দেখা—এদের পাকাপোক্ত করার সেরা উপায়।",
    buildsOn: "Completes your number system so you can handle real ages, prices and quantities in Phase 2’s shopping and daily-life lessons.",
    buildsOnBn: "আপনার সংখ্যা-ব্যবস্থা সম্পূর্ণ করে—যাতে দ্বিতীয় ধাপের কেনাকাটা ও দৈনন্দিন পাঠে বাস্তব বয়স, দাম ও পরিমাণ সামলাতে পারেন।",
  },
  21: {
    what: "The present tense begins. Arabic verbs change by adding a prefix for the person: أ for “I” (أدرس = I study) and تـ for “you” (تدرس = you study). The verb’s core stays the same; only the front changes.",
    whatBn: "বর্তমান কাল শুরু। আরবি ক্রিয়া কর্তা অনুযায়ী উপসর্গ যোগ করে বদলায়: “আমি”-র জন্য أ (أدرس = আমি পড়ি) আর “তুমি”-র জন্য تـ (تدرس = তুমি পড়ো)। ক্রিয়ার মূল একই থাকে; শুধু সামনেটা বদলায়।",
    why: "Until now your sentences had no verbs. The present tense unlocks talking about what you do — study, work, live, eat — which is most of everyday conversation. Prefix patterns are regular, so a little practice goes a long way.",
    whyBn: "এতক্ষণ আপনার বাক্যে ক্রিয়া ছিল না। বর্তমান কাল খুলে দেয় আপনি কী করেন—পড়া, কাজ, বাস, খাওয়া—যা দৈনন্দিন কথার বেশিরভাগ। উপসর্গের ধরন নিয়মিত, তাই সামান্য অনুশীলনেই অনেক দূর যাওয়া যায়।",
    buildsOn: "Day 22 adds he/she/they; then negation (23) and questions (24) turn these verbs into real conversation.",
    buildsOnBn: "২২তম দিন যোগ করে সে/তারা; তারপর নেতিবাচক (২৩) ও প্রশ্ন (২৪) এই ক্রিয়াগুলোকে বাস্তব কথোপকথনে রূপ দেয়।",
  },
  27: {
    what: "iḍāfa — possession by putting two nouns together: كتابُ الطالبِ = “the student’s book” (literally “book the-student”). The first noun never takes الـ, and the second noun is in the genitive (ends in -i).",
    whatBn: "ইদাফা—দুটি বিশেষ্য পাশাপাশি বসিয়ে মালিকানা: كتابُ الطالبِ = “ছাত্রের বই” (আক্ষরিক “বই the-ছাত্র”)। প্রথম বিশেষ্য কখনো الـ নেয় না, আর দ্বিতীয় বিশেষ্য সম্বন্ধ কারকে (-i শেষ) থাকে।",
    why: "iḍāfa is how Arabic says “X of Y” for everything — the door of the room, the name of the city, the student’s book. It is one of the most frequent structures in the language, and your earlier pronoun suffixes (كتابي) were a first taste of it.",
    whyBn: "যেকোনো “X-এর Y” আরবি ইদাফা দিয়ে বলে—ঘরের দরজা, শহরের নাম, ছাত্রের বই। এটি ভাষার সবচেয়ে ঘন-ব্যবহৃত কাঠামোর একটি, আর আগের যুক্ত সর্বনাম (كتابي) ছিল তারই প্রথম স্বাদ।",
    buildsOn: "Builds on definiteness (Day 10) and pronoun suffixes (Day 15); it returns constantly in description, news and formal writing later.",
    buildsOnBn: "নির্দিষ্টতা (১০তম দিন) ও যুক্ত সর্বনাম (১৫তম দিন)-এর ওপর দাঁড়ায়; পরে বর্ণনা, সংবাদ ও আনুষ্ঠানিক লেখায় বারবার ফিরে আসে।",
  },
  41: {
    what: "The past tense begins. Unlike the present (which uses prefixes), the past uses endings: ذهبتُ = “I went”, ذهبتَ = “you went”, ذهب = “he went” (no ending). The core letters ذ-ه-ب stay; the ending tells you who.",
    whatBn: "অতীত কাল শুরু। বর্তমান (যা উপসর্গ ব্যবহার করে)-এর বিপরীতে অতীত ব্যবহার করে প্রত্যয়: ذهبتُ = “আমি গেলাম”, ذهبتَ = “তুমি গেলে”, ذهب = “সে গেল” (কোনো প্রত্যয় নেই)। মূল অক্ষর ذ-ه-ب থাকে; প্রত্যয় বলে কে।",
    why: "Everything you’ve wanted to say about yesterday, your childhood, or a trip needs the past tense. Because it uses endings (not prefixes), contrasting it with the present you already know makes both tenses clearer.",
    whyBn: "গতকাল, শৈশব বা একটি ভ্রমণ নিয়ে যা বলতে চেয়েছেন—সব লাগে অতীত কাল। এটি প্রত্যয় ব্যবহার করে (উপসর্গ নয়), তাই আপনার জানা বর্তমানের সঙ্গে তুলনা করলে দুই কালই পরিষ্কার হয়।",
    buildsOn: "Day 43 bridges present↔past directly; the whole of Phase 3 turns this into storytelling.",
    buildsOnBn: "৪৩তম দিন সরাসরি বর্তমান↔অতীত সেতু গড়ে; পুরো তৃতীয় ধাপ এটিকে গল্প বলায় রূপ দেয়।",
  },
};

const skillPurpose: Record<string, { en: string; bn: string }> = {
  reading: { en: "read Arabic more fluently and guess meaning from context", bn: "আরও সাবলীলভাবে আরবি পড়া ও প্রসঙ্গ থেকে অর্থ আন্দাজ করা" },
  writing: { en: "write clear, correct Arabic sentences of your own", bn: "নিজের স্পষ্ট, সঠিক আরবি বাক্য লেখা" },
  listening: { en: "understand spoken Arabic without needing every word", bn: "প্রতিটি শব্দ ছাড়াই কথিত আরবি বোঝা" },
  speaking: { en: "say what you mean out loud with confidence", bn: "যা বোঝাতে চান তা আত্মবিশ্বাসে জোরে বলা" },
  grammar: { en: "build accurate sentences by understanding the rule behind them", bn: "নিয়ম বুঝে নির্ভুল বাক্য গড়া" },
  vocabulary: { en: "recall and use a set of high-frequency words", bn: "প্রচলিত কিছু শব্দ মনে রাখা ও ব্যবহার করা" },
};

function generatedBrief(day: number, lesson: { title: string; titleBn: string; focus: string; focusBn: string; grammar: string; grammarBn: string; skill: string; checkpoint?: boolean }): LessonBrief {
  const phase = phaseForDay(day);
  const purpose = skillPurpose[lesson.skill] ?? skillPurpose.grammar;
  if (lesson.checkpoint) {
    return {
      what: `Today is a checkpoint for the “${phase.title}” phase. You’ll bring together everything from the recent lessons — ${lesson.focus.toLowerCase()} — and use it without notes across reading, writing and speaking.`,
      whatBn: `আজ “${phase.titleBn}” ধাপের একটি যাচাই। সাম্প্রতিক পাঠের সবকিছু—${lesson.focusBn}—একত্র করে নোট ছাড়া পড়া, লেখা ও বলায় ব্যবহার করবেন।`,
      why: `Checkpoints exist to prove what has truly stuck, not just what you have seen. Working from memory here shows your tutor exactly what to reinforce next, so your next lessons fit you personally.`,
      whyBn: `যাচাই থাকে এটা প্রমাণের জন্য যে কী সত্যিই মনে গেঁথেছে—শুধু কী দেখেছেন তা নয়। স্মৃতি থেকে কাজ করলে শিক্ষক ঠিক বুঝবেন এরপর কী জোর দিতে হবে, যাতে পরের পাঠ আপনার জন্য উপযোগী হয়।`,
      buildsOn: `It consolidates this phase and decides the pace of the next one.`,
      buildsOnBn: `এটি এই ধাপকে দৃঢ় করে এবং পরের ধাপের গতি ঠিক করে।`,
    };
  }
  return {
    what: `Today’s focus is ${lesson.title.toLowerCase()}. In grammar terms: ${lesson.grammar}. You’ll meet it inside the “${phase.title}” phase, which is about: ${phase.summary}.`,
    whatBn: `আজকের মূল বিষয় ${lesson.titleBn}। ব্যাকরণে: ${lesson.grammarBn}। এটি পাবেন “${phase.titleBn}” ধাপে, যার বিষয়: ${phase.summaryBn}।`,
    why: `This matters because it helps you ${purpose.en}. It is a real, usable piece of the phase goal — ${phase.exit.toLowerCase()} — not an isolated rule.`,
    whyBn: `এটি জরুরি কারণ এটি আপনাকে সাহায্য করে ${purpose.bn}। এটি ধাপের লক্ষ্যের একটি বাস্তব, ব্যবহারযোগ্য অংশ—${phase.exitBn}—কোনো বিচ্ছিন্ন নিয়ম নয়।`,
    buildsOn: `It builds on the earlier days of this phase and feeds directly into its exit goal: ${phase.exit.toLowerCase()}.`,
    buildsOnBn: `এটি এই ধাপের আগের দিনগুলোর ওপর দাঁড়ায় এবং সরাসরি ধাপের লক্ষ্যে যোগ দেয়: ${phase.exitBn}।`,
  };
}

export function getLessonBrief(
  day: number,
  lesson: { title: string; titleBn: string; focus: string; focusBn: string; grammar: string; grammarBn: string; skill: string; checkpoint?: boolean },
): LessonBrief {
  return handwritten[day] ?? generatedBrief(day, lesson);
}
