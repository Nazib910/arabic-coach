export type QuranLesson = {
  id: string; title: {bn:string;en:string}; reference: string; ar: string;
  meaning: {bn:string;en:string}; teaching: {bn:string;en:string};
  question: {bn:string;en:string}; options: Array<{ar:string;bn:string;en:string}>; correct: number;
};
// Conventional Arabic orthography, not a facsimile of Uthmani calligraphy.
// Study glosses are authored learning aids, not a substitute for tafsir or a recitation teacher.
export const quranCourseContent: QuranLesson[] = [
  {id:"q1",title:{bn:"নাম দিয়ে শুরু: بِسْمِ",en:"Beginning with a name: بِسْمِ"},reference:"1:1",ar:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    meaning:{bn:"পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।",en:"In the name of Allah, the Most Merciful, the Especially Merciful."},
    teaching:{bn:"بِ অর্থ ‘দিয়ে/নামে’ প্রসঙ্গে ব্যবহৃত অব্যয়; اسْم অর্থ নাম। بِسْمِ-তে এগুলো যুক্ত হয়েছে। পরের শব্দের সঙ্গে মিলে ‘আল্লাহর নামে’। Quranic Arabic ও MSA-র বহু ভিত্তি এক, কিন্তু ব্যবহার ও প্রসঙ্গ এক নয়।",en:"بِ is a preposition; اسْم means name. Together بِسْمِ means ‘in the name of’ here. Quranic Arabic and MSA share many foundations, but usage and context differ."},
    question:{bn:"بِسْمِ-তে اسْم-এর অর্থ কী?",en:"What does اسْم mean in بِسْمِ?"},options:[{ar:"اسْم",bn:"নাম",en:"name"},{ar:"يَوْم",bn:"দিন",en:"day"},{ar:"صِرَاط",bn:"পথ",en:"path"}],correct:0},
  {id:"q2",title:{bn:"প্রশংসা ও সম্বন্ধ",en:"Praise and possession"},reference:"1:2",ar:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    meaning:{bn:"সমস্ত প্রশংসা আল্লাহর, যিনি সকল জগতের রব।",en:"All praise belongs to Allah, Lord of all worlds."},
    teaching:{bn:"الْحَمْدُ-তে الـ নির্দিষ্টতা বোঝায়। لِلَّهِ-তে لِ অর্থ ‘জন্য/অধিকারভুক্ত’। رَبِّ الْعَالَمِينَ-তে দুই নামের সম্বন্ধ: জগতসমূহের রব।",en:"الـ makes الْحَمْدُ definite. The لِ in لِلَّهِ conveys ‘belongs to / for’. رَبِّ الْعَالَمِينَ is a possessive construction: Lord of the worlds."},
    question:{bn:"প্রশংসা কার অধিকারভুক্ত বলা হয়েছে?",en:"To whom does the praise belong?"},options:[{ar:"الْعَالَمِينَ",bn:"জগতসমূহ",en:"the worlds"},{ar:"اللَّهِ",bn:"আল্লাহ",en:"Allah"},{ar:"يَوْمِ",bn:"দিন",en:"day"}],correct:1},
  {id:"q3",title:{bn:"সম্বন্ধের শৃঙ্খল",en:"A chain of possession"},reference:"1:4",ar:"مَالِكِ يَوْمِ الدِّينِ",
    meaning:{bn:"বিচার দিনের অধিপতি।",en:"Master of the Day of Judgment."},
    teaching:{bn:"مَالِكِ — অধিপতি, يَوْمِ — দিন, الدِّينِ — এখানে বিচার/প্রতিফল। প্রসঙ্গ ছাড়া الدِّين-কে প্রতিবার একই ইংরেজি বা বাংলা শব্দে বদলানো ঠিক নয়। এখানে অর্থের শৃঙ্খল: বিচার → দিন → অধিপতি।",en:"مَالِكِ means Master; يَوْمِ means day; الدِّينِ here refers to judgment/recompense. Do not assign a word one context-free translation everywhere. Read the chain: judgment → day → Master."},
    question:{bn:"এই আয়াতে يَوْمِ-এর অর্থ কী?",en:"What does يَوْمِ mean here?"},options:[{ar:"رَبِّ",bn:"রব",en:"Lord"},{ar:"صِرَاطَ",bn:"পথ",en:"path"},{ar:"يَوْمِ",bn:"দিন",en:"day"}],correct:2},
  {id:"q4",title:{bn:"আমরা ও কেবল আপনিই",en:"We and You alone"},reference:"1:5",ar:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    meaning:{bn:"আমরা কেবল আপনারই ইবাদত করি এবং কেবল আপনারই সাহায্য চাই।",en:"You alone we worship, and You alone we ask for help."},
    teaching:{bn:"نَعْبُدُ ও نَسْتَعِينُ-তে نـ ‘আমরা’ বোঝায়। إِيَّاكَ কর্মবাচক সর্বনাম এখানে ক্রিয়ার আগে এসেছে; এই বিন্যাসে একমাত্র সেই সত্তার প্রতি কাজটি নিবেদিত বোঝায়। وَ দুই অংশ যুক্ত করে; নিজে থেকে সময়ের ক্রম নিশ্চিত করে না।",en:"The نـ in نَعْبُدُ and نَسْتَعِينُ marks ‘we’. The object pronoun إِيَّاكَ is placed before the verb, conveying exclusive focus here. وَ joins the clauses; it does not itself require chronological sequence."},
    question:{bn:"نَعْبُدُ-তে কর্তা কারা?",en:"Who is the subject of نَعْبُدُ?"},options:[{ar:"نَحْنُ",bn:"আমরা",en:"we"},{ar:"هُوَ",bn:"তিনি",en:"he"},{ar:"أَنْتَ",bn:"আপনি",en:"you"}],correct:0},
  {id:"q5",title:{bn:"অনুরোধ ও যুক্ত সর্বনাম",en:"A request and an attached pronoun"},reference:"1:6",ar:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    meaning:{bn:"আমাদের সরল পথে পরিচালিত করুন।",en:"Guide us to the straight path."},
    teaching:{bn:"اهْدِ একটি অনুরোধসূচক ক্রিয়ার রূপ। ـنَا এখানে ‘আমাদেরকে’—কর্ম। الْمُسْتَقِيمَ বিশেষণটি الصِّرَاطَ-কে বর্ণনা করছে; উভয়েই নির্দিষ্ট। একই نا অন্য অবস্থানে ‘আমাদের’ বা ‘আমরা’-ও বোঝাতে পারে।",en:"اهْدِ is an imperative used as a request. The suffix ـنَا is the object ‘us’ here. الْمُسْتَقِيمَ describes الصِّرَاطَ; both are definite. In other constructions نا can mean ‘our’ or ‘we’."},
    question:{bn:"اهْدِنَا-তে ـنَا কী বোঝায়?",en:"What does ـنَا mean in اهْدِنَا?"},options:[{ar:"هُ",bn:"তাঁকে",en:"him"},{ar:"نَا",bn:"আমাদেরকে",en:"us"},{ar:"كَ",bn:"আপনাকে",en:"you"}],correct:1},
  {id:"q6",title:{bn:"বলুন ও একত্ব",en:"Say and oneness"},reference:"112:1",ar:"قُلْ هُوَ اللَّهُ أَحَدٌ",
    meaning:{bn:"বলুন: তিনি আল্লাহ, এক ও অদ্বিতীয়।",en:"Say: He is Allah, One."},
    teaching:{bn:"قُلْ — ‘বলুন’, আদেশসূচক রূপ। هُوَ — ‘তিনি’, স্বতন্ত্র সর্বনাম। أَحَدٌ এখানে একত্ব বোঝায়। অনুবাদটি ভাষা শেখার সহায়তা; আল্লাহর গুণাবলির ব্যাখ্যার জন্য প্রামাণ্য তাফসির দেখুন।",en:"قُلْ is the imperative ‘say’. هُوَ is the independent pronoun ‘He’. أَحَدٌ expresses oneness here. This is a language-learning gloss; consult reliable tafsir for theological explanation."},
    question:{bn:"কোন শব্দটি ‘বলুন’ অর্থ দেয়?",en:"Which word means ‘say’ as a command?"},options:[{ar:"هُوَ",bn:"তিনি",en:"He"},{ar:"أَحَدٌ",bn:"এক",en:"One"},{ar:"قُلْ",bn:"বলুন",en:"Say"}],correct:2},
  {id:"q7",title:{bn:"না-বাচকতা ও কর্তৃ/কর্মবাচ্য",en:"Negation and active/passive forms"},reference:"112:3",ar:"لَمْ يَلِدْ وَلَمْ يُولَدْ",
    meaning:{bn:"তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।",en:"He has not begotten, nor was He begotten."},
    teaching:{bn:"لَمْ এখানে না-বাচকতা বোঝায়। يَلِدْ কর্তৃবাচ্য, يُولَدْ কর্মবাচ্য—স্বর বদলে ভূমিকা বদলেছে। আয়াতের শুরুতে وَ নেই; দ্বিতীয় لَمْ-এর আগে وَ আছে।",en:"لَمْ negates the verb here. يَلِدْ is active and يُولَدْ passive: the vowels distinguish the roles. There is no وَ at the start of this verse; وَ appears before the second لَمْ."},
    question:{bn:"কোন রূপটি কর্মবাচ্য?",en:"Which form is passive?"},options:[{ar:"يُولَدْ",bn:"জন্ম দেওয়া হয়েছে",en:"was begotten"},{ar:"يَلِدْ",bn:"জন্ম দেয়",en:"begets"},{ar:"قُلْ",bn:"বলুন",en:"say"}],correct:0},
  {id:"q8",title:{bn:"যুক্ত সর্বনাম ও সমকক্ষ",en:"An attached pronoun and equivalence"},reference:"112:4",ar:"وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    meaning:{bn:"এবং তাঁর সমকক্ষ কেউ নেই।",en:"And there is none comparable to Him."},
    teaching:{bn:"لَهُ-তে لِ/لَ অব্যয়ের সঙ্গে هُ সর্বনাম যুক্ত—‘তাঁর জন্য/তাঁর সঙ্গে’ প্রসঙ্গে অর্থ হয়। كُفُوًا এখানে সমকক্ষ। أَحَدٌ না-বাচক বাক্যে ‘কেউ’ বোঝায়; 112:1-এর অর্থ সরাসরি এখানে বসাবেন না।",en:"لَهُ combines a preposition with the pronoun هُ, referring to Him. كُفُوًا means comparable/equal here. In this negated clause أَحَدٌ means ‘anyone’; do not mechanically reuse its gloss from 112:1."},
    question:{bn:"لَهُ-তে সর্বনাম কোন অংশ?",en:"Which part of لَهُ is the pronoun?"},options:[{ar:"لَ",bn:"অব্যয়",en:"preposition"},{ar:"هُ",bn:"তাঁকে/তাঁর",en:"Him/his"},{ar:"وَ",bn:"এবং",en:"and"}],correct:1},
];
export const QURAN_COURSE_LENGTH = quranCourseContent.length;
