// Extended glossary for Days 21–400 vocabulary
// Includes bilingual meanings (Bengali + English) and transliterations
// for verbs, adjectives, nouns, and multiword phrases from phases 2-4 and beyond

export type Gloss = { bn: string; en: string; translit: string };

export const extendedGlossary: Record<string, Gloss> = {
  // ===== Days 21–30: Present tense persons & adverbs of frequency =====

  // Present tense first person
  "أدرس": { bn: "আমি পড়ি", en: "I study", translit: "adrus" },
  "أعمل": { bn: "আমি কাজ করি", en: "I work", translit: "a'mal" },
  "أكتب": { bn: "আমি লিখি", en: "I write", translit: "aktub" },
  "أذهب": { bn: "আমি যাই", en: "I go", translit: "adhhab" },
  "أقرأ": { bn: "আমি পড়ি", en: "I read", translit: "aqra'" },
  "أستيقظ": { bn: "আমি জাগি", en: "I wake up", translit: "astayqidh" },
  "أتناول": { bn: "আমি খাই", en: "I have/eat", translit: "ataanwal" },
  "أعود": { bn: "আমি ফিরে আসি", en: "I return", translit: "a'ud" },
  "أستريح": { bn: "আমি বিশ্রাম নিই", en: "I rest", translit: "astarih" },
  "أنام": { bn: "আমি ঘুমাই", en: "I sleep", translit: "anam" },

  // Present tense second/third person
  "تدرس": { bn: "সে পড়ে (স্ত্রী বা তুমি)", en: "you study (f) / she studies", translit: "tadrus" },
  "تعمل": { bn: "সে কাজ করে / তুমি কাজ করো", en: "you work (f) / she works", translit: "ta'mal" },
  "تسكن": { bn: "সে থাকে / তুমি থাকো", en: "you live (f) / she lives", translit: "taskun" },
  "تقرأ": { bn: "সে পড়ে / তুমি পড়ো (স্ত্রী)", en: "you read (f) / she reads", translit: "taqra'" },

  // Present tense plural
  "يعملون": { bn: "তারা কাজ করে", en: "they work (m)", translit: "ya'malun" },
  "يسكنون": { bn: "তারা থাকে", en: "they live (m)", translit: "yaskunun" },

  // Adverbs of frequency
  "أبداً": { bn: "কখনো না", en: "never", translit: "abadan" },
  "دائماً": { bn: "সর্বদা", en: "always", translit: "daa'iman" },
  "أحياناً": { bn: "কখনো কখনো", en: "sometimes", translit: "ahyanan" },
  "كثيراً": { bn: "অনেক", en: "often/much", translit: "kathiran" },
  "قليلاً": { bn: "কম", en: "a little", translit: "qalilan" },

  // Question markers & particles
  "مَن": { bn: "কে", en: "who", translit: "man" },
  "هل": { bn: "কি (প্রশ্ন)", en: "is it? (yes/no question)", translit: "hal" },

  // Grammar & grammar-related labels (Days 26, 46)
  "المضارع": { bn: "বর্তমান কাল", en: "present tense", translit: "al-mudhari'" },
  "النفي": { bn: "অস্বীকার", en: "negation", translit: "an-nafi" },
  "الأسئلة": { bn: "প্রশ্ন", en: "questions", translit: "al-as'ila" },
  "الروتين": { bn: "দৈনন্দিন রুটিন", en: "daily routine", translit: "ar-rutin" },

  // ===== Days 27–30: Possessive constructions & family =====

  "كتاب الطالب": { bn: "শিক্ষার্থীর বই", en: "student's book", translit: "kitaab at-taalib" },
  "باب الغرفة": { bn: "ঘরের দরজা", en: "room door", translit: "baab al-ghurfa" },
  "مفتاح البيت": { bn: "ঘরের চাবি", en: "house key", translit: "miftaah al-bayt" },
  "اسم المدينة": { bn: "শহরের নাম", en: "city name", translit: "ism al-madeena" },

  // Possessive pronouns (Days 30)
  "والدي": { bn: "আমার বাবা", en: "my father", translit: "waaldi" },
  "والدتي": { bn: "আমার মা", en: "my mother", translit: "waaldati" },
  "أخي": { bn: "আমার ভাই", en: "my brother", translit: "akhi" },
  "أختي": { bn: "আমার বোন", en: "my sister", translit: "ukhti" },
  "جدّي": { bn: "আমার দাদা", en: "my grandfather", translit: "jaddi" },
  "جدّتي": { bn: "আমার দাদি", en: "my grandmother", translit: "jaddati" },

  // ===== Days 31–40: Days of week, places, shopping, feelings =====

  // Days of week
  "السبت": { bn: "শনিবার", en: "Saturday", translit: "as-sabt" },
  "الأحد": { bn: "রবিবার", en: "Sunday", translit: "al-ahad" },
  "الاثنين": { bn: "সোমবার", en: "Monday", translit: "al-ithnayn" },
  "الثلاثاء": { bn: "মঙ্গলবার", en: "Tuesday", translit: "ath-thulaatha'" },
  "الأربعاء": { bn: "বুধবার", en: "Wednesday", translit: "al-arba'a'" },
  "الخميس": { bn: "বৃহস্পতিবার", en: "Thursday", translit: "al-khamees" },
  "الجمعة": { bn: "শুক্রবার", en: "Friday", translit: "al-jumu'a" },

  // Verbs related to leisure (Days 31)
  "عطلة": { bn: "ছুটি", en: "holiday/vacation", translit: "'utla" },
  "أزور": { bn: "আমি দেখতে যাই", en: "I visit", translit: "azur" },
  "ألعب": { bn: "আমি খেলি", en: "I play", translit: "al'ab" },

  // Grammar concepts (Days 32)
  "الإضافة": { bn: "যুক্ত গঠন", en: "idafa/possessive construction", translit: "al-idafa" },
  "الأماكن": { bn: "স্থান", en: "places", translit: "al-amakin" },
  "التفضيل": { bn: "তুলনা", en: "comparison/preference", translit: "at-tafdil" },
  "العائلة": { bn: "পরিবার", en: "family", translit: "al-'a'ila" },

  // Shopping vocabulary (Days 33, 38)
  "ثمن": { bn: "মূল্য", en: "price", translit: "thaman" },
  "ريال": { bn: "রিয়াল (মুদ্রা)", en: "riyal (currency)", translit: "riyal" },
  "كيلو": { bn: "কিলোগ্রাম", en: "kilogram", translit: "kilo" },
  "رخيص": { bn: "সস্তা", en: "cheap", translit: "rakhis" },
  "غالٍ": { bn: "দামী", en: "expensive", translit: "ghali" },

  // Emotions & states (Days 35)
  "سعيد": { bn: "খুশি", en: "happy", translit: "sa'id" },
  "حزين": { bn: "দুঃখী", en: "sad", translit: "hazin" },
  "متعب": { bn: "ক্লান্ত", en: "tired", translit: "muta'ab" },
  "جائع": { bn: "ক্ষুধার্ত", en: "hungry", translit: "ja'i'" },
  "عطشان": { bn: "পিপাসু", en: "thirsty", translit: "'atshan" },
  "مرتاح": { bn: "শান্ত", en: "relaxed/comfortable", translit: "murtaah" },

  // Listening/comprehension skills (Days 37)
  "اسمعْ": { bn: "শোন", en: "listen (imperative)", translit: "isma'" },
  "كرّرْ": { bn: "পুনরাবৃত্তি করো", en: "repeat (imperative)", translit: "karar" },
  "توقّعْ": { bn: "অনুমান করো", en: "predict/guess (imperative)", translit: "tawaqqa'" },
  "فكرة": { bn: "ধারণা", en: "idea", translit: "fikra" },
  "تفصيل": { bn: "বিস্তারিত", en: "detail", translit: "tafsil" },
  "جملة": { bn: "বাক্য", en: "sentence", translit: "jumla" },

  // Shopping & description (Days 38–39)
  "التسوّق": { bn: "কেনাকাটা", en: "shopping", translit: "at-taswwuq" },
  "الوصف": { bn: "বর্ণনা", en: "description", translit: "al-wasf" },
  "المشاعر": { bn: "অনুভূতি", en: "feelings", translit: "al-masha'ir" },
  "المطعم": { bn: "রেস্তোরাঁ", en: "restaurant", translit: "al-mat'am" },

  // Politeness & clarification (Days 39)
  "عفواً": { bn: "ক্ষমা করুন", en: "excuse me/sorry", translit: "'afwan" },
  "ببطء": { bn: "ধীরে", en: "slowly", translit: "bibut'" },
  "أفهم": { bn: "আমি বুঝি", en: "I understand", translit: "afhim" },
  "أقصد": { bn: "আমি বোঝাতে চাই", en: "I mean", translit: "aqsid" },
  "يعني": { bn: "মানে/অর্থ", en: "means/that is", translit: "ya'ni" },
  "ممكن": { bn: "সম্ভব", en: "possible", translit: "mumkin" },

  // ===== Days 41–50: Past tense persons & time expressions =====

  // Past tense first person
  "ذهبتُ": { bn: "আমি গেলাম", en: "I went", translit: "dhahabtu" },
  "درستُ": { bn: "আমি পড়লাম", en: "I studied", translit: "darastu" },
  "عملتُ": { bn: "আমি কাজ করলাম", en: "I worked", translit: "'amalu" },
  "كتبتُ": { bn: "আমি লিখলাম", en: "I wrote", translit: "katabtu" },
  "قرأتُ": { bn: "আমি পড়লাম", en: "I read", translit: "qara'tu" },

  // Past tense second person
  "ذهبتَ": { bn: "তুমি গেলে / তিনি গেলেন", en: "you went / he went", translit: "dhahabta" },

  // Past tense third person (f)
  "درستْ": { bn: "সে পড়ল (স্ত্রী)", en: "she studied", translit: "darsat" },

  // Past tense plural
  "ذهبنا": { bn: "আমরা গেলাম", en: "we went", translit: "dhahabna" },
  "عملوا": { bn: "তারা কাজ করল", en: "they worked", translit: "'amalu" },
  "سمعوا": { bn: "তারা শুনল", en: "they heard", translit: "sami'u" },
  "وصلنا": { bn: "আমরা পৌঁছেলাম", en: "we arrived", translit: "wasalna" },
  "خرجوا": { bn: "তারা বেরিয়ে গেল", en: "they went out", translit: "kharaju" },

  // Time expressions (Days 43, 52, 55)
  "اليومَ/أمسِ": { bn: "আজ / গতকাল", en: "today / yesterday", translit: "al-yawm / amsi" },
  "الآن/سابقاً": { bn: "এখন / আগে", en: "now / before", translit: "al-an / sabiqan" },
  "كلَّ يوم/مرةً": { bn: "প্রতিদিন / একবার", en: "every day / once", translit: "kulla yawm / marra" },
  "أمسِ": { bn: "গতকাল", en: "yesterday", translit: "amsi" },
  "قبل يومين": { bn: "দুই দিন আগে", en: "two days ago", translit: "qabl yawmayn" },
  "منذ سنةٍ": { bn: "এক বছর আগে থেকে", en: "for a year", translit: "mundhu sanatin" },
  "في الماضي": { bn: "অতীতে", en: "in the past", translit: "fi al-madi" },
  "ذات يومٍ": { bn: "একদিন", en: "once upon a time", translit: "dhaat yawmin" },

  // Subject-verb agreement (Days 44)
  "الطالبُ ذهب": { bn: "শিক্ষার্থী গেল", en: "the student (m) went", translit: "at-taalib dhahaba" },
  "الطالبةُ ذهبتْ": { bn: "শিক্ষার্থী গেল (স্ত্রী)", en: "the student (f) went", translit: "at-taliba dhahabat" },
  "الطلابُ ذهبوا": { bn: "শিক্ষার্থীরা গেল", en: "the students went", translit: "at-tallabu dhahabu" },

  // Negation particles (Days 45)
  "لم": { bn: "না (অতীত)", en: "did not", translit: "lam" },
  "ما ذهبتُ": { bn: "আমি যাইনি", en: "I did not go", translit: "ma dhahabtu" },
  "لم أذهبْ": { bn: "আমি যাইনি", en: "I did not go", translit: "lam adhhab" },
  "ما رأيتُ": { bn: "আমি দেখিনি", en: "I did not see", translit: "ma ra'aytu" },

  // Grammar concepts (Days 46, 51)
  "الماضي": { bn: "অতীত কাল", en: "past tense", translit: "al-madi" },
  "التطابق": { bn: "মিল/সামঞ্জস্য", en: "agreement/harmony", translit: "at-tawaafuq" },

  // Sequence connectors (Days 47, 55, 70)
  "أولاً": { bn: "প্রথমে", en: "first", translit: "awwalan" },
  "ثم": { bn: "তারপর", en: "then", translit: "thumma" },
  "بعد ذلك": { bn: "এর পরে", en: "after that", translit: "ba'd dhalik" },
  "عندما": { bn: "যখন", en: "when", translit: "'indama" },
  "أخيراً": { bn: "অবশেষে", en: "finally", translit: "akhiran" },
  "بينما": { bn: "যখন / যেখানে", en: "while/whereas", translit: "baynama" },

  // Plurals (Days 48)
  "كتاب/كتب": { bn: "বই / বইগুলো", en: "book / books", translit: "kitaab / kutub" },
  "رجل/رجال": { bn: "লোক / লোকজন", en: "man / men", translit: "rajul / rijal" },
  "مدينة/مدن": { bn: "শহর / শহরগুলো", en: "city / cities", translit: "madeena / mudun" },
  "بيت/بيوت": { bn: "বাড়ি / বাড়িগুলো", en: "house / houses", translit: "bayt / buyut" },

  // Irregular past tense (Days 49)
  "أعطى": { bn: "তিনি দিল", en: "he gave", translit: "a'ta" },
  "مشى": { bn: "তিনি গেল", en: "he walked", translit: "masha" },

  // Imperfect with كان (Days 50)
  "كنتُ ألعبُ": { bn: "আমি খেলছিলাম", en: "I used to play", translit: "kuntu al'abu" },
  "كان يسكنُ": { bn: "তিনি থাকতেন", en: "he used to live", translit: "kana yaskun" },
  "كانوا يدرسون": { bn: "তারা পড়তেন", en: "they used to study", translit: "kanu yadrusun" },
  "في الصغر": { bn: "শৈশবে", en: "in childhood", translit: "fi as-saghar" },

  // Grammar concepts (Days 51)
  "الروابط": { bn: "সংযোগকারী", en: "connectors/links", translit: "ar-rawabith" },
  "الجموع": { bn: "বহুবচন", en: "plurals", translit: "al-jumু'" },
  "المعتلّ": { bn: "বিরতিপূর্ণ ক্রিয়া", en: "weak/defective verbs", translit: "al-mu'tall" },
  "كان+المضارع": { bn: "কান + বর্তমান", en: "kaan + present tense", translit: "kaan + al-mudhari'" },

  // Life events (Days 53–54)
  "وُلِد": { bn: "তিনি জন্মেছিলেন", en: "he was born", translit: "wulida" },
  "عاش": { bn: "তিনি বেঁচেছিলেন", en: "he lived", translit: "'asha" },
  "انتقل": { bn: "তিনি চলে গেলেন", en: "he moved", translit: "intaqal" },
  "تزوّج": { bn: "তিনি বিয়ে করলেন", en: "he got married", translit: "tazawwaj" },
  "تقاعد": { bn: "তিনি অবসর নিলেন", en: "he retired", translit: "taqa'ad" },

  "بدأتُ": { bn: "আমি শুরু করলাম", en: "I began", translit: "bada'tu" },
  "تعلّمتُ": { bn: "আমি শিখলাম", en: "I learned", translit: "ta'allamtu" },
  "انتقلتُ": { bn: "আমি চলে গেলাম", en: "I moved", translit: "intaqaltu" },
  "قرّرتُ": { bn: "আমি সিদ্ধান্ত নিলাম", en: "I decided", translit: "qarrarat" },
  "أحببتُ": { bn: "আমি ভালোবেসেছি", en: "I loved", translit: "ahbabtu" },

  // Narrative connectors (Days 55)
  "في البدايةِ": { bn: "শুরুতে", en: "in the beginning", translit: "fi al-bidaya" },
  "وبعدها": { bn: "এবং এর পরে", en: "and after that", translit: "wa ba'daha" },
  "لكن": { bn: "কিন্তু", en: "but", translit: "laakin" },
  "لذلك": { bn: "তাই/সেজন্য", en: "therefore/for that reason", translit: "lidhaalik" },
  "في النهايةِ": { bn: "শেষে", en: "in the end", translit: "fi an-nihaya" },

  // ===== Days 56–70: Advanced narratives & comprehension =====

  "عنوان": { bn: "শিরোনাম", en: "title/heading", translit: "'unwan" },
  "سياق": { bn: "প্রসঙ্গ", en: "context", translit: "siyaq" },
  "موضوع": { bn: "বিষয়", en: "topic/subject", translit: "mawdu'" },
  "نقطة": { bn: "পয়েন্ট", en: "point", translit: "nuqta" },
  "حوار": { bn: "সংলাপ", en: "dialogue", translit: "hiwar" },
  "مراجعة": { bn: "পর্যালোচনা", en: "review", translit: "muraja'a" },
  "ملخّص": { bn: "সংক্ষিপ্তসার", en: "summary", translit: "mulakhas" },
  "تقرير": { bn: "প্রতিবেদন", en: "report", translit: "taqrir" },
  "دليل": { bn: "প্রমাণ", en: "evidence/proof", translit: "dalil" },
  "بناءً على": { bn: "ভিত্তিতে", en: "based on", translit: "bina'an 'ala" },
  "خلاصة": { bn: "সারাংশ", en: "conclusion/summary", translit: "khulasa" },
  "وصف": { bn: "বর্ণনা", en: "description", translit: "wasf" },
  "تقييم": { bn: "মূল্যায়ন", en: "assessment", translit: "taqyim" },
  "حجّة": { bn: "যুক্তি", en: "argument", translit: "hujja" },
  "مثال": { bn: "উদাহরণ", en: "example", translit: "mithal" },
  "استنتاج": { bn: "সিদ্ধান্ত", en: "conclusion", translit: "istintaj" },
  "إنجاز": { bn: "অর্জন", en: "achievement", translit: "injaz" },
  "إتقان": { bn: "দক্ষতা", en: "mastery", translit: "itqan" },

  // ===== Days 61+: Future tense & advanced grammar =====

  "سأدرس": { bn: "আমি পড়বো", en: "I will study", translit: "sa adrus" },
  "سأزور": { bn: "আমি দেখতে যাবো", en: "I will visit", translit: "sa azur" },
  "سوف أعمل": { bn: "আমি কাজ করবো", en: "I will work", translit: "sawf a'mal" },
  "غداً": { bn: "আগামীকাল", en: "tomorrow", translit: "ghadan" },
  "الأسبوع القادم": { bn: "আসন্ন সপ্তাহ", en: "next week", translit: "al-usbu' al-qadim" },
  "لاحقاً": { bn: "পরে", en: "later", translit: "lahiqan" },
  "هيّا": { bn: "চলো (উৎসাহব্যঞ্জক)", en: "let's go / come on", translit: "haya" },
  "ما رأيك": { bn: "তুমার মতামত কী", en: "what do you think", translit: "ma ra'yuk" },
  "اتفقنا": { bn: "আমরা সম্মত হয়েছি", en: "we agreed", translit: "ittafaqna" },
  "موعد": { bn: "সময়/অ্যাপয়েন্টমেন্ট", en: "appointment/time", translit: "maw'id" },

  // Grammar-related (Phase 4+)
  "مضاف إليه": { bn: "সম্বন্ধপদ", en: "genitive (possessive modifier)", translit: "mudhaf ilayh" },
  "مسلمات": { bn: "মৌলিক নিয়ম", en: "basics/axioms", translit: "muslimmat" },
  "الظرف": { bn: "সময় বা স্থান বোধক শব্দ", en: "adverbial (time/place)", translit: "adh-dharf" },
  "نصبَ": { bn: "কর্মপদ চিহ্ন", en: "accusative marker", translit: "nasaba" },
  "ـَ (نصب)": { bn: "নসব চিহ্ন", en: "accusative case marker", translit: "fatha (accusative)" },
  "ـِ (جر)": { bn: "জর চিহ্ন", en: "genitive case marker", translit: "kasra (genitive)" },
  "ـُ (رفع)": { bn: "রফ চিহ্ন", en: "nominative case marker", translit: "damma (nominative)" },
  "جمع سالم": { bn: "বিশুদ্ধ বহুবচন", en: "regular plural", translit: "jam' salim" },
  "المبتدأ": { bn: "কর্তা (নামবাচক বাক্যের)", en: "subject (nominal sentence)", translit: "al-mubtada'" },
  "طالبتان": { bn: "দুই শিক্ষার্থী (স্ত্রী)", en: "two students (f)", translit: "talibatan" },

  // ===== Days 121+: Economics, news, complex topics =====

  "اقتصاد": { bn: "অর্থনীতি", en: "economy", translit: "iqtisad" },
  "المصدر": { bn: "উৎস", en: "source", translit: "al-masdar" },
  "مراسل": { bn: "প্রতিবেদক", en: "correspondent", translit: "murasil" },
  "انخفض": { bn: "তিনি হ্রাস পেলেন", en: "he/it decreased", translit: "inkhafadha" },
  "خبر": { bn: "সংবাদ", en: "news/information", translit: "khabar" },
  "مليون": { bn: "দশ লক্ষ", en: "million", translit: "milyun" },
  "صحيفة": { bn: "সংবাদপত্র", en: "newspaper", translit: "sahifa" },
  "مؤتمر": { bn: "সম্মেলন", en: "conference", translit: "mu'tamar" },
  "صرّح": { bn: "তিনি ঘোষণা দিলেন", en: "he announced", translit: "sarrah" },
  "التوكيد": { bn: "জোর/নিশ্চিতকরণ", en: "emphasis/confirmation", translit: "at-tawkid" },
  "لأنّ": { bn: "কারণ (সংযোজক)", en: "because (conjunction)", translit: "li'anna" },

  // ===== Grammar terminology (phases 4+) =====

  "مراجعة شاملة للمرحلة الأولى": { bn: "প্রথম ধাপের সম্পূর্ণ পর্যালোচনা", en: "full phase-one review", translit: "muraja'a shamila lil-marhal al-ula" },
  "مراجعة شاملة للمرحلة الثانية": { bn: "দ্বিতীয় ধাপের সম্পূর্ণ পর্যালোচনা", en: "full phase-two review", translit: "muraja'a shamila lil-marhal ath-thaniya" },
};

export function getExtendedGloss(rawWord: string): Gloss | null {
  const word = rawWord.trim().normalize("NFC");
  return extendedGlossary[word] ?? null;
}

export const extendedGlossarySize = Object.keys(extendedGlossary).length;
