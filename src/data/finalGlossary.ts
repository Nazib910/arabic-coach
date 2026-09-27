import type { Gloss } from "./glossary";
// Explicit contextual meanings. Romanization is an approximate reading aid.
const rows = `
سوق|বাজার|market|suuq
مكتبة|গ্রন্থাগার; বইয়ের দোকান|library; bookshop|maktaba
حديقة|বাগান|garden|ḥadiiqa
مسجد|মসজিদ|mosque|masjid
بنك|ব্যাংক|bank|bank
أحبّ|আমি ভালোবাসি|I love|uḥibb
لا أحبّ|আমি পছন্দ করি না|I do not like|laa uḥibb
أفضّل|আমি বেশি পছন্দ করি|I prefer|ufaḍḍil
قراءة|পড়া|reading|qiraaʾa
رياضة|খেলাধুলা; ব্যায়াম|sport; exercise|riyaaḍa
حساب|হিসাব; বিল|account; bill|ḥisaab
حدث|ঘটনা|event|ḥadath
بطل|নায়ক|hero|baṭal
معنى|অর্থ|meaning|maʿnaa
جذر|শব্দমূল|root|jadhr
حكى|সে বর্ণনা করল|he narrated|ḥakaa
وصلَ|সে পৌঁছাল|he arrived|waṣala
حدثَ|ঘটল|it happened|ḥadatha
شعرَ|সে অনুভব করল|he felt|shaʿara
تذكّرَ|সে মনে করল|he remembered|tadhakkara
زمن|সময়; কাল|time; tense|zaman
سيرة|জীবনী|biography|siira
قصة|গল্প|story|qiṣṣa
ترابط|সংযোগ; সংহতি|connection; cohesion|taraabuṭ
تقدّم|অগ্রগতি|progress|taqaddum
تحدٍّ|চ্যালেঞ্জ|challenge|taḥaddin
ذكرى|স্মৃতি|memory|dhikraa
درس مستفاد|অভিজ্ঞতা থেকে শেখা বিষয়|lesson learned|dars mustafaad
مراجعة شاملة للمرحلة الثالثة|তৃতীয় ধাপের পূর্ণ পুনরালোচনা|complete phase-three review|muraajaʿa shaamila lil-marḥala ath-thaalitha
نلتقي|আমরা দেখা করি|we meet|naltaqii
معاً|একসঙ্গে|together|maʿan
اكتبْ|লিখুন (পুরুষকে)|write! (to a man)|uktub
اقرأْ|পড়ুন (পুরুষকে)|read! (to a man)|iqraʾ
اذهبْ|যান (পুরুষকে)|go! (to a man)|idhhab
تعالَ|আসুন (পুরুষকে)|come! (to a man)|taʿaala
انتظرْ|অপেক্ষা করুন (পুরুষকে)|wait! (to a man)|intaẓir
خذْ|নিন (পুরুষকে)|take! (to a man)|khudh
يمين|ডান দিক|right side|yamiin
يسار|বাঁ দিক|left side|yasaar
مستقيم|সোজা|straight|mustaqiim
عند|কাছে; নিকটে|at; near|ʿinda
قرب|নিকটে|near|qurb
إشارة المرور|ট্রাফিক সিগন্যাল|traffic light|ishaara al-muruur
مواعيد|নির্ধারিত সময়গুলো|appointments|mawaaʿiid
مفتوح|খোলা|open|maftuuḥ
مغلق|বন্ধ|closed|mughlaq
يبدأ|সে শুরু করে|he begins|yabdaʾ
ينتهي|শেষ হয়|it ends|yantahii
يومياً|প্রতিদিন|daily|yawmiyyan
مستقبل|ভবিষ্যৎ|future|mustaqbal
خطة|পরিকল্পনা|plan|khuṭṭa
أمر|আদেশ|command|amr
اتجاهات|দিকনির্দেশ|directions|ittijaahaat
أحتاج|আমার প্রয়োজন|I need|aḥtaaj
هل يمكن|সম্ভব কি|is it possible?|hal yumkin
فاتورة|বিল|invoice; bill|faatuura
دفع|অর্থ প্রদান|payment|dafʿ
نقداً|নগদে|in cash|naqdan
قائمة|তালিকা; মেনু|list; menu|qaaʾima
أطلب|আমি চাই; অর্ডার করি|I request; order|aṭlub
بدون|ছাড়া|without|biduun
إضافي|অতিরিক্ত|additional|iḍaafii
لذيذ|সুস্বাদু|delicious|ladhiidh
حلوى|মিষ্টি; ডেজার্ট|sweets; dessert|ḥalwaa
من المتكلم|কে বলছেন|who is speaking?|man al-mutakallim
اترك رسالة|বার্তা রেখে যান|leave a message|utruk risaala
اتصل بي|আমাকে ফোন করুন|call me|ittaṣil bii
بعدها|তার পরে|after that|baʿdahaa
تأكّد|নিশ্চিত করুন|make sure|taʾakkad
احرص|খেয়াল রাখুন|take care to|iḥriṣ
خدمات|সেবাসমূহ|services|khadamaat
تعليمات|নির্দেশাবলি|instructions|taʿliimaat
تذكرة|টিকিট|ticket|tadhkira
قطار|ট্রেন|train|qiṭaar
حافلة|বাস|bus|ḥaafila
مطار|বিমানবন্দর|airport|maṭaar
رحلة|যাত্রা|journey|riḥla
محطة|স্টেশন|station|maḥaṭṭa
ألم|ব্যথা|pain|alam
حرارة|তাপ; জ্বর|heat; fever|ḥaraara
دواء|ওষুধ|medicine|dawaaʾ
راحة|বিশ্রাম|rest|raaḥa
وصفة|প্রেসক্রিপশন; রেসিপি|prescription; recipe|waṣfa
أشعر بـ|আমি অনুভব করি|I feel|ashʿur bi
أدعوك|আমি আপনাকে আমন্ত্রণ জানাই|I invite you|adʿuuka
بكل سرور|আনন্দের সঙ্গে|with pleasure|bi-kulli suruur
آسف|দুঃখিত (পুরুষ বক্তা)|sorry (male speaker)|aasif
الذي|যে (পুং একবচন)|who/which (masculine singular)|alladhii
التي|যে (স্ত্রী একবচন)|who/which (feminine singular)|allatii
الذين|যারা (পুং বহুবচন)|who (masculine plural)|alladhiina
اللاتي|যারা (স্ত্রী বহুবচন)|who (feminine plural)|allaatii
ه (ضمير)|তাকে; তার (পুং)|him; his (suffix)|hu / hi
ها|তাকে; তার (স্ত্রী)|her (suffix)|haa
كم (ضمير)|তোমাদের; তোমাদেরকে (পুং বহুবচন)|your; you (masculine plural suffix)|kum
نا|আমাদের; আমাদেরকে|our; us (suffix)|naa
بسبب|কারণে|because of|bi-sabab
صفة|বৈশিষ্ট্য; বিশেষণ|quality; adjective|ṣifa
علاقة|সম্পর্ক|relationship|ʿalaaqa
إضافةً|আরও; অতিরিক্তভাবে|additionally|iḍaafatan
كذلك|এছাড়াও|also|kadhaalik
مثل|মতো; যেমন|like; such as|mithl
خاصةً|বিশেষত|especially|khaaṣṣatan
تحديداً|নির্দিষ্টভাবে|specifically|taḥdiidan
ملامح|বৈশিষ্ট্যসমূহ|features|malaamiḥ
طابع|ধরন; বৈশিষ্ট্য|character; nature|ṭaabiʿ
فاعل|কর্তা; active pattern|subject; active pattern|faaʿil
مفعول|কর্ম; passive pattern|object; passive pattern|mafʿuul
مثنى|দ্বিবচন|dual|muthannaa
رجلان|দুই ব্যক্তি (রফা)|two men (nominative)|rajulaan
معلّمون|শিক্ষকগণ (রফা)|teachers (nominative)|muʿallimuun
حرف جر|সম্বন্ধসূচক অব্যয়|preposition|ḥarf jarr
كتابان|দুই বই (রফা)|two books (nominative)|kitaabaan
مهندسون|প্রকৌশলীগণ (রফা)|engineers (nominative)|muhandisuun
موظفات|নারী কর্মীগণ|female employees|muwaẓẓafaat
رفعَ|সে রফা করল; তুলল|he assigned nominative; raised|rafaʿa
جرَّ|সে জর করল; টানল|he assigned genitive; pulled|jarra
علامة|চিহ্ন|mark|ʿalaama
طقس|আবহাওয়া|weather|ṭaqs
درجة الحرارة|তাপমাত্রা|temperature|darajat al-ḥaraara
سياسة|রাজনীতি; নীতি|politics; policy|siyaasa
مليار|একশ কোটি|billion|milyaar
تاريخ|তারিখ; ইতিহাস|date; history|taariikh
حسب|অনুযায়ী|according to|ḥasaba
قناة|চ্যানেল|channel|qanaat
وكالة|সংস্থা|agency|wakaala
حادث|দুর্ঘটনা; ঘটনা|accident; incident|ḥaadith
نسبة|অনুপাত; হার|ratio; rate|nisba
ارتفع|সে/তা বেড়েছে|he/it rose|irtafaʿa
أعلن|সে ঘোষণা করল|he announced|aʿlana
وقع|সে/তা পড়ল; ঘটল|he/it fell; happened|waqaʿa
علّم (II)|সে শেখাল (গঠন ২)|he taught (Form II)|ʿallama
درّس (II)|সে পড়াল (গঠন ২)|he taught (Form II)|darrasa
شاهد (III)|সে দেখল (গঠন ৩)|he watched (Form III)|shaahada
ساعد (III)|সে সাহায্য করল (গঠন ৩)|he helped (Form III)|saaʿada
أرسل (IV)|সে পাঠাল (গঠন ৪)|he sent (Form IV)|arsala
أخرج (IV)|সে বের করল (গঠন ৪)|he brought out (Form IV)|akhraja
قدّم (II)|সে উপস্থাপন করল (গঠন ২)|he presented (Form II)|qaddama
سافر (III)|সে ভ্রমণ করল (গঠন ৩)|he travelled (Form III)|saafara
أكمل (IV)|সে সম্পন্ন করল (গঠন ৪)|he completed (Form IV)|akmala
كسّر (II)|সে চূর্ণ করল (গঠন ২)|he broke into pieces (Form II)|kassara
حاول (III)|সে চেষ্টা করল (গঠন ৩)|he tried (Form III)|ḥaawala
أعدّ (IV)|সে প্রস্তুত করল (গঠন ৪)|he prepared (Form IV)|aʿadda
تعليم|শিক্ষাদান|teaching|taʿliim
مساعدة|সাহায্য|assistance|musaaʿada
إرسال|পাঠানো|sending|irsaal
وزن|শব্দের ছাঁচ; ওজন|word pattern; weight|wazn
مصدر|ক্রিয়াবাচক বিশেষ্য; উৎস|verbal noun; source|maṣdar
تقديم|উপস্থাপন|presentation|taqdiim
محاولة|প্রচেষ্টা|attempt|muḥaawala
إعداد|প্রস্তুতি|preparation|iʿdaad
فعّل|গঠন ২-এর ছাঁচ|Form II pattern|faʿʿala
فاعَل|গঠন ৩-এর ছাঁচ|Form III pattern|faaʿala
أفعَل|গঠন ৪-এর ছাঁচ|Form IV pattern|afʿala
أفضل|আরও ভালো; সেরা|better; best|afḍal
أهم|আরও গুরুত্বপূর্ণ|more important|ahamm
أكثر|আরও বেশি|more|akthar
مع أنّ|যদিও|although|maʿa anna
أوافق|আমি একমত|I agree|uwaafiq
لا أوافق|আমি একমত নই|I disagree|laa uwaafiq
في رأيي|আমার মতে|in my opinion|fii raʾyii
بالإضافة|অতিরিক্তভাবে|in addition|bil-iḍaafa
من ناحية|এক দিক থেকে|from one perspective|min naaḥiya
نتيجة|ফলাফল|result|natiija
أعتقد|আমি মনে করি|I think|aʿtaqid
أرى|আমি দেখি; মনে করি|I see; consider|araa
ربما|সম্ভবত|perhaps|rubbamaa
بصراحة|সত্যি বলতে|frankly|bi-ṣaraaḥa
من جهةٍ|এক দিক থেকে|on one hand|min jihatin
على العكس|বিপরীতে|on the contrary|ʿalaa al-ʿaks
صحيحٌ أنّ|এ কথা সত্য যে|it is true that|ṣaḥiiḥun anna
أقترح|আমি প্রস্তাব করি|I suggest|aqtariḥ
أرفض|আমি প্রত্যাখ্যান করি|I reject|arfuḍ
تكرار|পুনরাবৃত্তি|repetition|takraar
طلاقة|সাবলীলতা|fluency|ṭalaaqa
مشروع|প্রকল্প|project|mashruuʿ
تسجيل|রেকর্ডিং|recording|tasjiil
نطق|উচ্চারণ|pronunciation|nuṭq
تحسين|উন্নতি করা|improvement|taḥsiin
هدف|লক্ষ্য|goal|hadaf
نقطة ضعف|দুর্বল দিক|weak point|nuqṭat ḍaʿf
نقطة قوة|শক্তিশালী দিক|strong point|nuqṭat quwwa
عادة|অভ্যাস|habit|ʿaada
انضباط|শৃঙ্খলা|discipline|inḍibaaṭ
مثابرة|অধ্যবসায়|perseverance|muthaabara
قياس|পরিমাপ|measurement|qiyaas
معيار|মানদণ্ড|criterion|miʿyaar
تدرّب|সে অনুশীলন করল|he practised|tadarraba
راجعَ|সে পুনরালোচনা করল|he reviewed|raajaʿa
أتقنَ|সে আয়ত্ত করল|he mastered|atqana
تعلّم (V)|সে শিখল (গঠন ৫)|he learned (Form V)|taʿallama
تعاون (VI)|সে সহযোগিতা করল (গঠন ৬)|he cooperated (Form VI)|taʿaawana
انكسر (VII)|তা ভাঙল (গঠন ৭)|it broke (Form VII)|inkasara
اجتمع (VIII)|সে মিলিত হলো (গঠন ৮)|he met (Form VIII)|ijtamaʿa
استخدم (X)|সে ব্যবহার করল (গঠন ১০)|he used (Form X)|istakhdama
تقدّم (V)|সে অগ্রসর হলো (গঠন ৫)|he advanced (Form V)|taqaddama
تبادل (VI)|সে বিনিময় করল (গঠন ৬)|he exchanged (Form VI)|tabaadala
انصرف (VII)|সে চলে গেল (গঠন ৭)|he left (Form VII)|inṣarafa
انتظر (VIII)|সে অপেক্ষা করল (গঠন ৮)|he waited (Form VIII)|intaẓara
استقبل (X)|সে স্বাগত জানাল (গঠন ১০)|he received (Form X)|istaqbala
اسم الفاعل|কর্তৃবাচক কৃদন্ত|active participle|ism al-faaʿil
اسم المفعول|কর্মবাচক কৃদন্ত|passive participle|ism al-mafʿuul
معتلّ|দুর্বল মূলবর্ণযুক্ত ক্রিয়া|weak-root verb|muʿtall
أجوف|মধ্য মূলবর্ণ দুর্বল এমন ক্রিয়া|hollow verb|ajwaf
ناقص|শেষ মূলবর্ণ দুর্বল এমন ক্রিয়া|defective verb|naaqiṣ
مكتوب|লিখিত|written|maktuub
كاتب|লেখক; লেখে এমন|writer; writing|kaatib
مبني|অপরিবর্তনীয়; গঠিত|indeclinable; built|mabnii
معلوم|জ্ঞাত; কর্তৃবাচ্য|known; active voice|maʿluum
مجهول|অজ্ঞাত; কর্মবাচ্য|unknown; passive voice|majhuul
صحيح|শুদ্ধ; সবল মূলবর্ণযুক্ত|correct; sound-root|ṣaḥiiḥ
أصبح|হয়ে গেল; সকালে ছিল|became; was in the morning|aṣbaḥa
ليس|নয়|is not|laysa
إنّ|নিশ্চয়ই|indeed|inna
أنّ|যে|that|anna
لكنّ|কিন্তু (নামবাচক বাক্যের আগে)|but (before nominal clause)|laakinna
إذا|যদি; যখন|if; when|idhaa
لو|যদি (কাল্পনিক)|if (hypothetical)|law
إلّا|ছাড়া|except|illaa
شرط|শর্ত|condition|sharṭ
جواب|উত্তর; শর্তের ফল|answer; consequence|jawaab
ظلّ|হতে থাকল|remained; continued|ẓalla
مازال|এখনও আছে|still is|maa zaala
لعلّ|হয়তো; আশা করা যায়|perhaps; hopefully|laʿalla
كأنّ|যেন|as if|kaʾanna
مَن (شرط)|যে কেউ (শর্ত)|whoever (conditional)|man
ما (شرط)|যা কিছু (শর্ত)|whatever (conditional)|maa
لولا|না থাকলে|were it not for|lawlaa
غير|অন্য; ছাড়া|other; except|ghayr
سوى|ছাড়া|except|siwaa
صار|হয়ে গেল|became|ṣaara
بات|রাতে থাকল; হয়ে গেল|spent the night; became|baata
حتى|পর্যন্ত; যাতে|until; so that|ḥattaa
تعريف|সংজ্ঞা|definition|taʿriif
تصنيف|শ্রেণিবিভাগ|classification|taṣniif
سبب|কারণ|cause|sabab
مقدمة|ভূমিকা|introduction|muqaddima
خاتمة|উপসংহার|conclusion|khaatima
فقرة|অনুচ্ছেদ|paragraph|faqra
بمعنى|অর্থাৎ|meaning; in the sense of|bi-maʿnaa
يتكوّن من|দিয়ে গঠিত|consists of|yatakawwan min
يشير إلى|নির্দেশ করে|indicates|yushiir ilaa
عنصر|উপাদান|element|ʿunṣur
نوع|ধরন|type|nawʿ
خاصية|বৈশিষ্ট্য|property|khaaṣṣiyya
مقارنة|তুলনা|comparison|muqaarana
تلخيص|সারসংক্ষেপ|summarizing|talkhiiṣ
على سبيل المثال|উদাহরণস্বরূপ|for example|ʿalaa sabiil al-mithaal
يتمثّل في|প্রকাশ পায়|is represented in|yatamaththal fii
ينقسم إلى|বিভক্ত হয়|is divided into|yanqasim ilaa
مقابلة|সাক্ষাৎকার|interview|muqaabala
مذيع|উপস্থাপক|presenter|mudhiiʿ
ضيف|অতিথি|guest|ḍayf
لقاء|সাক্ষাৎ|meeting|liqaaʾ
برنامج|অনুষ্ঠান; প্রোগ্রাম|programme|barnaamaj
بثّ|সম্প্রচার|broadcast|bathth
مباشر|সরাসরি|live; direct|mubaashir
تصريح|বিবৃতি|statement|taṣriiḥ
فكرة رئيسية|মূল ভাব|main idea|fikra raʾiisiyya
ملاحظة|নোট; পর্যবেক্ষণ|note; observation|mulaaḥaẓa
نقاش|আলোচনা|discussion|niqaash
رأي|মতামত|opinion|raʾy
تعليق|মন্তব্য|comment|taʿliiq
إجابة|উত্তর|answer|ijaaba
نبرة|কণ্ঠের ভঙ্গি|tone|nabra
قصد|উদ্দেশ্য|intention|qaṣd
صورة|ছবি; চিত্রকল্প|image; imagery|ṣuura
رمز|প্রতীক|symbol|ramz
أسلوب|রীতি; শৈলী|style|usluub
مشهد|দৃশ্য|scene|mashhad
عاطفة|আবেগ|emotion|ʿaaṭifa
لغة أدبية|সাহিত্যিক ভাষা|literary language|lugha adabiyya
معنى خفي|গোপন অর্থ|hidden meaning|maʿnaa khafii
سرد|বর্ণনা|narration|sard
شخصية|চরিত্র|character|shakhṣiyya
حبكة|কাহিনির বিন্যাস|plot|ḥabka
نهاية|শেষ|ending|nihaaya
بداية|শুরু|beginning|bidaaya
تشبيه|উপমা|simile|tashbiih
استعارة|রূপক|metaphor|istiʿaara
إيقاع|ছন্দ|rhythm|iiqaaʿ
دلالة|তাৎপর্য|significance|dalaala
رسالة|বার্তা; চিঠি|message; letter|risaala
عرض تقديمي|উপস্থাপনা|presentation|ʿarḍ taqdiimii
بريد إلكتروني|ইমেইল|email|bariid iliktruunii
محترم|সম্মানিত|respected|muḥtaram
تحية طيبة|শুভেচ্ছা|kind greetings|taḥiyya ṭayyiba
وبعد|শুভেচ্ছার পর মূল কথায়|and now (formal opening)|wa-baʿd
نأمل|আমরা আশা করি|we hope|naʾmal
مرفق|সংযুক্ত|attached|murfaq
بخصوص|সম্পর্কে|regarding|bi-khuṣuuṣ
نتشرّف|আমরা সম্মানিত বোধ করি|we are honoured|natasharraf
تفضّلوا|অনুগ্রহ করুন (বহুবচন)|please (plural)|tafaḍḍaluu
سيادتكم|আপনার সম্মানিত ব্যক্তি (সম্বোধন)|your honour (formal address)|siyaadatukum
نحيطكم علماً|আমরা আপনাকে জানাচ্ছি|we inform you|nuḥiiṭukum ʿilman
توقيع|স্বাক্ষর|signature|tawqiiʿ
مرسل|প্রেরক|sender|mursil
مستلم|প্রাপক|recipient|mustalim
جدول الأعمال|আলোচ্যসূচি|agenda|jadwal al-aʿmaal
شكراً لتعاونكم|আপনার সহযোগিতার জন্য ধন্যবাদ|thank you for your cooperation|shukran li-taʿaawunikum
في الختام|পরিশেষে|in closing|fii al-khitaam
نتطلّع|আমরা আগ্রহ নিয়ে অপেক্ষা করি|we look forward|nataṭallaʿ
المبني للمجهول|কর্মবাচ্য|passive voice|al-mabnii lil-majhuul
حال|অবস্থাসূচক পদ|circumstantial expression|ḥaal
المفعول المطلق|ক্রিয়ামূলজাত জোরসূচক কর্ম|cognate accusative|al-mafʿuul al-muṭlaq
تمييز|অস্পষ্টতা নির্দিষ্টকারী পদ|specifying accusative|tamyiiz
نائب الفاعل|কর্মবাচ্যের কর্তা|passive subject|naaʾib al-faaʿil
حيث|যেখানে; যেহেতু|where; since|ḥaythu
إذ|যখন; যেহেতু|when; since|idh
قد|ক্রিয়ার আগে নিশ্চয়তা বা সম্ভাবনাসূচক|particle of completion or possibility|qad
ضمير الفصل|বিচ্ছেদকারী সর্বনাম|separating pronoun|ḍamiir al-faṣl
المفعول لأجله|উদ্দেশ্যসূচক কর্ম|accusative of purpose|al-mafʿuul li-ajlih
المفعول معه|সহযোগসূচক কর্ম|accusative of accompaniment|al-mafʿuul maʿah
استثناء|ব্যতিক্রম|exception|istithnaaʾ
بدل|বিকল্প ব্যাখ্যাপদ|apposition|badal
عطف|সংযোজন|coordination|ʿaṭf
مصدر مؤول|নামবাচক অর্থে ব্যবহৃত উপবাক্য|nominalized clause|maṣdar muʾawwal
جملة اعتراضية|মধ্যবর্তী ব্যাখ্যামূলক বাক্য|parenthetical clause|jumla iʿtiraaḍiyya
أسلوب قصر|সীমাবদ্ধতা প্রকাশের রীতি|restriction construction|usluub qaṣr
تقديم وتأخير|পদের স্থান আগে-পিছে করা|fronting and postponement|taqdiim wa-taʾkhiir
إسناد|কর্তার সঙ্গে বিধেয় যুক্ত করা|predication|isnaad
ادّعاء|দাবি|claim|iddiʿaaʾ
حجّة مضادة|বিপরীত যুক্তি|counterargument|ḥujja muḍaadda
على الرغم|সত্ত্বেও|despite|ʿalaa ar-raghm
قد يُقال|বলা যেতে পারে|it may be said|qad yuqaalu
الأرجح|বেশি সম্ভাব্য|more likely|al-arjaḥ
علاوةً|তদুপরি|furthermore|ʿilaawatan
ختاماً|পরিশেষে|in conclusion|khitaaman
وجهة نظر|দৃষ্টিভঙ্গি|point of view|wijhat naẓar
إقناع|বিশ্বাস করানো|persuasion|iqnaaʿ
ترجيح|একটি মতকে বেশি গ্রহণযোগ্য ধরা|weighing in favour|tarjiiḥ
فرضية|অনুমান; hypothesis|hypothesis|faraḍiyya
برهان|প্রমাণ|proof|burhaan
تفنيد|যুক্তি খণ্ডন|refutation|tafniid
استدلال|যুক্তি থেকে সিদ্ধান্ত|reasoning; inference|istidlaal
موضوعية|নিরপেক্ষতা|objectivity|mawḍuuʿiyya
تحيّز|পক্ষপাত|bias|taḥayyuz
مغالطة|যুক্তিগত ভুল|fallacy|mughaalaṭa
خلاصة القول|মূল কথা হলো|in summary|khulaaṣat al-qawl
من المسلّم به|স্বীকৃত যে|it is accepted that|min al-musallam bihi
يترتّب على|এর ফলে ঘটে|results from|yatarattab ʿalaa
بالمقابل|অন্যদিকে|in contrast|bil-muqaabil
مقال|নিবন্ধ|article|maqaal
محاضرة|বক্তৃতা|lecture|muḥaaḍara
بودكاست|পডকাস্ট|podcast|buudkaast
مصطلح|পরিভাষা|term|muṣṭalaḥ
مرادف|সমার্থক শব্দ|synonym|muraadif
ضدّ|বিপরীত|opposite|ḍidd
استقلالية|স্বাধীনতা|independence|istiqlaaliyya
مصدر موثوق|নির্ভরযোগ্য উৎস|reliable source|maṣdar mawthuuq
تصفّح|দ্রুত দেখে নেওয়া|browsing; skimming|taṣaffuḥ
تعمّق|গভীরে যাওয়া|in-depth study|taʿammuq
استخلاص|মূল কথা বের করা|extraction; deduction|istikhlaaṣ
تحليل|বিশ্লেষণ|analysis|taḥliil
نقد|সমালোচনা|critique|naqd
اقتباس|উদ্ধৃতি|quotation|iqtibaas
ملاحظات|নোটসমূহ|notes|mulaaḥaẓaat
فهرس|সূচি|index|fihris
موسوعة|বিশ্বকোষ|encyclopedia|mawsuuʿa
معجم|অভিধান|dictionary|muʿjam
بحث|গবেষণা|research|baḥth
مقارنة مصادر|উৎসগুলোর তুলনা|comparison of sources|muqaaranat maṣaadir
حصيلة|সঞ্চিত অর্জন|accumulated outcome|ḥaṣiila
مراجعة نهائية|চূড়ান্ত পুনরালোচনা|final review|muraajaʿa nihaaʾiyya
اختبار|পরীক্ষা|test|ikhtibaar
تطوّر|বিকাশ|development|taṭawwur
استمرارية|ধারাবাহিকতা|continuity|istimraariyya
هدف بعيد|দীর্ঘমেয়াদি লক্ষ্য|long-term goal|hadaf baʿiid
تقييم ذاتي|নিজের মূল্যায়ন|self-assessment|taqyiim dhaatii
ملف الأعمال|কাজের সংগ্রহ|portfolio|milaff al-aʿmaal
التزام|অঙ্গীকার|commitment|iltizaam
مستوى|স্তর|level|mustawaa
كفاءة|দক্ষতা|competence|kafaaʾa
شهادة|সনদ|certificate|shahaada
مهارة|দক্ষতা|skill|mahaara
خطة مستقبلية|ভবিষ্যৎ পরিকল্পনা|future plan|khuṭṭa mustaqbaliyya
مراجعة الأقران|সহপাঠীর মূল্যায়ন|peer review|muraajaʿat al-aqraan
نقاط القوة|শক্তিশালী দিকগুলো|strengths|niqaaṭ al-quwwa
نقاط التطوير|উন্নতির জায়গাগুলো|areas for development|niqaaṭ at-taṭwiir
تغذية راجعة|প্রতিক্রিয়া; feedback|feedback|taghdhiya raajiʿa
إنجازات|অর্জনসমূহ|achievements|injaazaat
استعداد|প্রস্তুতি|readiness|istiʿdaad
لا أستطيع|আমি পারি না|I cannot|laa astaṭiiʿ
للأسف|দুঃখের বিষয়|unfortunately|lil-asaf
إعلان|বিজ্ঞাপন; ঘোষণা|advertisement; announcement|iʿlaan
للبيع|বিক্রয়ের জন্য|for sale|lil-bayʿ
مطلوب|প্রয়োজন; চাওয়া হয়েছে|wanted; required|maṭluub
عرض|প্রস্তাব; অফার|offer|ʿarḍ
تخفيض|মূল্যছাড়|discount|takhfiiḍ
اتصل|ফোন করুন|call!|ittaṣil
سفر|ভ্রমণ|travel|safar
صحة|স্বাস্থ্য|health|ṣiḥḥa
دعوة|আমন্ত্রণ|invitation|daʿwa
إعلانات|বিজ্ঞাপনসমূহ|advertisements|iʿlaanaat
مشكلة|সমস্যা|problem|mushkila
لا يعمل|কাজ করছে না|does not work|laa yaʿmal
خطأ|ভুল|error|khaṭaʾ
حلّ|সমাধান|solution|ḥall
استرجاع|ফেরত; পুনরুদ্ধার|return; retrieval|istirjaaʿ
لا أظن|আমি মনে করি না|I do not think|laa aẓunn
بالطبع|অবশ্যই|of course|biṭ-ṭabʿ
موقف|পরিস্থিতি; অবস্থান|situation; position|mawqif
دور|পালা; ভূমিকা|turn; role|dawr
تمثيل|অভিনয়|acting|tamthiil
ردّ|জবাব|reply|radd
طلب|অনুরোধ|request|ṭalab
ختام|সমাপ্তি|closing|khitaam
مراجعة شاملة للمرحلة الرابعة|চতুর্থ ধাপের পূর্ণ পুনরালোচনা|complete phase-four review|muraajaʿa shaamila lil-marḥala ar-raabiʿa
`;
export const finalGlossary: Record<string, Gloss> = Object.fromEntries(rows.trim().split("\n").map(row => {
  const [ar,bn,en,translit] = row.split("|");
  if (!ar || !bn || !en || !translit) throw new Error(`Invalid authored gloss: ${ar}`);
  return [ar.normalize("NFC"), {bn,en,translit}];
}));
