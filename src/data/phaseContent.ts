// Per-phase content banks used by the curriculum generator to build genuine,
// phase-appropriate lessons for days beyond the handcrafted first month.
// Each phase supplies real MSA vocabulary, model sentences, grammar points and
// bilingual (en/bn) scaffolding so no generated day is empty filler.

export type PhaseContent = {
  vocabulary: string[];            // real MSA words for this phase (cycled per day)
  models: string[];                // model sentences (cycled per day)
  grammarPoints: Array<{ en: string; bn: string }>;
  exercises: Array<{ en: string; bn: string }>;
};

export const phaseContent: Record<string, PhaseContent> = {
  foundation: {
    vocabulary: ["كتاب","قلم","بيت","مدرسة","طالب","معلّم","باب","نافذة","شمس","قمر","لغة","اسم","مدينة","بلد","صديق","أستاذ","طاولة","كرسي","سبّورة","دفتر","ورقة","حقيبة","ساعة","شارع"],
    models: ["هذا كتابٌ جديدٌ.","أنا طالبٌ في المدرسةِ.","البيتُ كبيرٌ وجميلٌ.","اسمي من بنغلاديش.","هذه مدينةٌ هادئةٌ.","صديقي أستاذٌ في الجامعةِ."],
    grammarPoints: [
      { en: "Nominal sentences without a copula", bn: "‘হওয়া’ ক্রিয়া ছাড়া নামবাচক বাক্য" },
      { en: "Definite article and sun/moon letters", bn: "الـ এবং সূর্য/চন্দ্র বর্ণ" },
      { en: "Gender agreement of nouns and adjectives", bn: "বিশেষ্য-বিশেষণের লিঙ্গ মিল" },
    ],
    exercises: [
      { en: "Read today’s vocabulary aloud and mark long vowels.", bn: "আজকের শব্দ জোরে পড়ুন ও লম্বা স্বর চিহ্নিত করুন।" },
      { en: "Write six nominal sentences using the models.", bn: "উদাহরণ দেখে ছয়টি নামবাচক বাক্য লিখুন।" },
      { en: "Describe two objects around you in Arabic.", bn: "আপনার আশপাশের দুটি জিনিস আরবিতে বর্ণনা করুন।" },
    ],
  },
  "everyday-core": {
    vocabulary: ["يدرس","يعمل","يسكن","يأكل","يشرب","الآن","كلَّ يوم","أين","متى","لماذا","ماء","قهوة","يذهب","يرجع","يقرأ","يكتب","يستيقظ","ينام","صباحاً","مساءً","العمل","البيت","كيف","كم"],
    models: ["أنا أدرسُ العربيةَ كلَّ يومٍ.","أين تسكنُ الآن؟","هي لا تشربُ القهوةَ.","لماذا تتعلّمُ العربيةَ؟","أستيقظُ صباحاً ثم أذهبُ إلى العملِ.","كيف تقضي يومَك؟"],
    grammarPoints: [
      { en: "Present tense across the core persons", bn: "মূল কর্তায় বর্তমান কাল" },
      { en: "Negating the present with لا", bn: "لا দিয়ে বর্তমান কাল নেতিবাচক" },
      { en: "Question words and expected answers", bn: "প্রশ্নবোধক শব্দ ও প্রত্যাশিত উত্তর" },
    ],
    exercises: [
      { en: "Conjugate one verb for all five persons.", bn: "একটি ক্রিয়া পাঁচ কর্তায় রূপান্তর করুন।" },
      { en: "Write eight questions and answer them.", bn: "আটটি প্রশ্ন লিখে উত্তর দিন।" },
      { en: "Describe your daily routine in 60 words.", bn: "৬০ শব্দে নিজের রুটিন লিখুন।" },
    ],
  },
  narration: {
    vocabulary: ["ذهب","رجع","وُلِد","عاش","أب","أم","أخ","أخت","أولاً","ثم","بعد ذلك","أخيراً","جدّ","جدّة","طفولة","ذكرى","سافر","انتقل","التقى","تخرّج","عندما","في الماضي","قديماً","حينها"],
    models: ["ذهبتُ إلى الجامعةِ أمس.","وُلِدتُ في مدينةٍ صغيرةٍ.","أولاً درستُ ثم عملتُ.","عاشت أسرتي هناك سنواتٍ.","عندما كنتُ طفلاً، سافرنا كثيراً.","تخرّجَ أخي ثم انتقلَ إلى العاصمةِ."],
    grammarPoints: [
      { en: "Past tense suffixes for core persons", bn: "মূল কর্তায় অতীত কালের প্রত্যয়" },
      { en: "Sequence markers to connect events", bn: "ঘটনা জোড়ার ক্রম-চিহ্ন" },
      { en: "Common broken plurals in context", bn: "প্রসঙ্গে প্রচলিত ভাঙা বহুবচন" },
    ],
    exercises: [
      { en: "Turn six present sentences into the past.", bn: "ছয়টি বর্তমান বাক্য অতীত করুন।" },
      { en: "Write a short biography of a family member.", bn: "পরিবারের একজনের ছোট জীবনী লিখুন।" },
      { en: "Narrate yesterday in 8–10 sentences.", bn: "গতকাল নিয়ে ৮–১০ বাক্যে গল্প বলুন।" },
    ],
  },
  interaction: {
    vocabulary: ["سوف","سـ","من فضلك","اذهبْ","خذْ","يمين","يسار","مباشرةً","السوق","المتجر","الفاتورة","الموعد","انتظرْ","تعالَ","قربَ","بعيد","الثمن","الحجز","التذكرة","المحطة","المستشفى","الصيدلية","البنك","التوقيت"],
    models: ["سأزورُ السوقَ غداً.","من فضلك، اذهبْ يميناً ثم مباشرةً.","كم ثمنُ هذا؟","هل عندكم موعدٌ اليومَ؟","أينَ أقربُ محطةٍ من هنا؟","أريدُ أن أحجزَ تذكرةً، من فضلك."],
    grammarPoints: [
      { en: "Future with سـ and سوف", bn: "سـ ও سوف দিয়ে ভবিষ্যৎ" },
      { en: "Imperatives for requests and directions", bn: "অনুরোধ ও দিকনির্দেশে আদেশবাচক" },
      { en: "Polite service language", bn: "ভদ্র সেবা-ভাষা" },
    ],
    exercises: [
      { en: "Write a 10-turn shopping dialogue.", bn: "১০ পালার একটি কেনাকাটার সংলাপ লিখুন।" },
      { en: "Give directions to a place in your city.", bn: "আপনার শহরের একটি জায়গার দিকনির্দেশ দিন।" },
      { en: "Role-play booking an appointment.", bn: "একটি অ্যাপয়েন্টমেন্ট নেওয়ার রোল-প্লে করুন।" },
    ],
  },
  expansion: {
    vocabulary: ["الذي","التي","ه (ضمير)","ها","بسبب","لكن","بينما","صفة","وصف","تفصيل","علاقة","سياق","الذين","اللاتي","كم (ضمير)","نا","لأنّ","إضافةً","كذلك","مثل","خاصةً","تحديداً","الملامح","الطابع"],
    models: ["الكتابُ الذي قرأتُه مفيدٌ.","المدينةُ التي أسكنُها هادئةٌ.","أحبُّها لكنها بعيدةٌ.","هذا بيتُ صديقي الذي يعملُ هنا.","الطلابُ الذين درسوا معي أصدقائي.","المكانُ الذي وصفتُه لكم قريبٌ منّا."],
    grammarPoints: [
      { en: "Idafa chains and definiteness", bn: "ইদাফা শৃঙ্খল ও নির্দিষ্টতা" },
      { en: "Attached object pronouns", bn: "যুক্ত কর্ম-সর্বনাম" },
      { en: "Relative clauses with الذي/التي", bn: "الذي/التي দিয়ে সম্বন্ধবাচক বাক্য" },
    ],
    exercises: [
      { en: "Combine eight sentence pairs with relatives.", bn: "সম্বন্ধবাচক দিয়ে আট জোড়া বাক্য জুড়ুন।" },
      { en: "Add object pronouns to six verbs.", bn: "ছয়টি ক্রিয়ায় কর্ম-সর্বনাম যোগ করুন।" },
      { en: "Write a coherent 120-word description.", bn: "১২০ শব্দের একটি গোছানো বর্ণনা লিখুন।" },
    ],
  },
  "case-awareness": {
    vocabulary: ["ـُ (رفع)","ـَ (نصب)","ـِ (جر)","الفاعل","المفعول","مضاف إليه","مثنى","جمع سالم","رجلان","معلّمون","مسلمات","حرف جر","المبتدأ","الخبر","التنوين","الظرف","كتابان","طالبتان","مهندسون","موظفات","نصبَ","رفعَ","جرَّ","علامة"],
    models: ["ذهبَ الطالبُ إلى المدرسةِ.","رأيتُ الطالبَ في الصفِّ.","مررتُ بالطالبِ أمامَ البابِ.","جاء المعلّمانِ والمعلّمونَ.","قرأَ الطالبانِ كتابينِ مفيدينِ.","سلّمتُ على المهندسينَ والموظفاتِ."],
    grammarPoints: [
      { en: "Nominative for the subject", bn: "কর্তায় রফা (ـُ)" },
      { en: "Accusative for the object", bn: "কর্মে নসব (ـَ)" },
      { en: "Genitive after prepositions and idafa", bn: "অব্যয় ও ইদাফার পরে জর (ـِ)" },
    ],
    exercises: [
      { en: "Mark the case ending in ten sentences.", bn: "দশটি বাক্যে কারক-চিহ্ন দেখান।" },
      { en: "Rewrite five sentences changing subject to object.", bn: "পাঁচটি বাক্যে কর্তাকে কর্ম বানান।" },
      { en: "Read a short vocalized text and label endings.", bn: "একটি ছোট হরকতযুক্ত লেখা পড়ে শব্দান্ত চিহ্নিত করুন।" },
    ],
  },
  "media-foundations": {
    vocabulary: ["عنوان","خبر","تقرير","الطقس","درجة الحرارة","اقتصاد","سياسة","مليون","مليار","التاريخ","المصدر","حسب","صحيفة","قناة","وكالة","مراسل","حادث","مؤتمر","نسبة","ارتفع","انخفض","أعلن","صرّح","وقع"],
    models: ["حسب التقريرِ، الطقسُ حارٌّ اليومَ.","أعلنت الحكومةُ خبراً جديداً.","بلغ العددُ مليونَ نسمةٍ.","نُشِر المقالُ في التاريخِ نفسِه.","ارتفعت درجةُ الحرارةِ حسبَ الوكالةِ.","صرّح المراسلُ في المؤتمرِ الصحفيِّ."],
    grammarPoints: [
      { en: "Headline noun-phrase style", bn: "শিরোনামের বিশেষ্য-বাক্যাংশ রীতি" },
      { en: "Large numbers and dates", bn: "বড় সংখ্যা ও তারিখ" },
      { en: "Listening for gist, not every word", bn: "প্রতিটি শব্দ নয়, মূল কথা শোনা" },
    ],
    exercises: [
      { en: "Write three headlines from your week.", bn: "আপনার সপ্তাহ নিয়ে তিনটি শিরোনাম লিখুন।" },
      { en: "Summarize a short news item in 4 sentences.", bn: "একটি সংবাদ ৪ বাক্যে সংক্ষেপ করুন।" },
      { en: "Report today’s weather in Arabic.", bn: "আজকের আবহাওয়া আরবিতে বলুন।" },
    ],
  },
  "verb-system-1": {
    vocabulary: ["علّم (II)","درّس (II)","شاهد (III)","ساعد (III)","أرسل (IV)","أخرج (IV)","تعليم","مساعدة","إرسال","جذر","وزن","مصدر","قدّم (II)","سافر (III)","أكمل (IV)","كسّر (II)","حاول (III)","أعدّ (IV)","تقديم","محاولة","إعداد","فعّل","فاعَل","أفعَل"],
    models: ["علّمَ الأستاذُ الطلابَ العربيةَ.","ساعدتُ صديقي في العملِ.","أرسلتُ رسالةً إلى أختي.","التعليمُ مصدرُ الفعلِ علّم.","حاولَ الطالبُ أن يكملَ التمرينَ.","قدّمتِ المعلّمةُ درساً مفيداً."],
    grammarPoints: [
      { en: "Form II (fa''ala): causative/intensive", bn: "গঠন II (fa''ala): কার্যকারক/তীব্র" },
      { en: "Form III (faa'ala): associative", bn: "গঠন III (faa'ala): সহযোগিতামূলক" },
      { en: "Form IV (af'ala) and the masdar", bn: "গঠন IV (af'ala) ও মাসদার" },
    ],
    exercises: [
      { en: "Match six derived verbs to their form.", bn: "ছয়টি উৎপন্ন ক্রিয়া তাদের গঠনের সঙ্গে মিলান।" },
      { en: "Form the masdar of five verbs.", bn: "পাঁচটি ক্রিয়ার মাসদার তৈরি করুন।" },
      { en: "Use three derived verbs in sentences.", bn: "তিনটি উৎপন্ন ক্রিয়া বাক্যে ব্যবহার করুন।" },
    ],
  },
  opinions: {
    vocabulary: ["أفضل","أهم","أكثر","لأنّ","لذلك","مع أنّ","أوافق","لا أوافق","في رأيي","بالإضافة","من ناحية","النتيجة","أعتقد","أرى","ربما","بصراحة","من جهةٍ","على العكس","صحيحٌ أنّ","لكن","أقترح","أرفض","حجّة","دليل"],
    models: ["في رأيي، القراءةُ أهمُّ من مشاهدةِ التلفاز.","أوافقُ لأنّ العربيةَ مفيدةٌ.","مع أنّها صعبةٌ، لكنها ممتعةٌ.","لذلك أنصحُ بالدراسةِ اليوميةِ.","أعتقدُ أنّ الرياضةَ ضروريةٌ للصحةِ.","على العكسِ، أرى أنّ الوقتَ كافٍ."],
    grammarPoints: [
      { en: "Comparatives and superlatives (af'al)", bn: "তুলনা ও শ্রেষ্ঠতা (af'al)" },
      { en: "Cause, result and concession connectors", bn: "কারণ, ফল ও ছাড়-সংযোজক" },
      { en: "Language of agreement and disagreement", bn: "একমত ও দ্বিমতের ভাষা" },
    ],
    exercises: [
      { en: "Write ten comparative sentences.", bn: "দশটি তুলনামূলক বাক্য লিখুন।" },
      { en: "Argue for a preference with two reasons.", bn: "দুটি কারণসহ একটি পছন্দের পক্ষে যুক্তি দিন।" },
      { en: "Prepare a 4-minute opinion talk outline.", bn: "৪ মিনিটের মতামত-বক্তব্যের রূপরেখা করুন।" },
    ],
  },
  consolidation: {
    vocabulary: ["مراجعة","تكرار","طلاقة","مشروع","تسجيل","نطق","تحسين","هدف","تقييم","نقطة ضعف","نقطة قوة","خطة","تقدّم","إتقان","عادة","انضباط","مثابرة","تحدٍّ","إنجاز","قياس","معيار","تدرّب","راجعَ","أتقنَ"],
    models: ["أراجعُ ما تعلّمتُه كلَّ أسبوعٍ.","سجّلتُ نفسي وأنا أتكلّمُ.","نقطةُ ضعفي هي النطقُ.","خطّتي أن أحسّنَ الطلاقةَ.","تدرّبتُ يومياً حتى أتقنتُ المهارةَ.","أقيسُ تقدّمي بمعيارٍ واضحٍ."],
    grammarPoints: [
      { en: "Spiral review of prior phases", bn: "আগের ধাপগুলোর চক্রাকার পুনরালোচনা" },
      { en: "Pronunciation self-repair routines", bn: "উচ্চারণ নিজে-সংশোধন অভ্যাস" },
      { en: "Building fluency through timed retells", bn: "সময়-বাঁধা পুনঃকথনে সাবলীলতা" },
    ],
    exercises: [
      { en: "Record a 2-minute speaking sample.", bn: "২ মিনিটের একটি কথন নমুনা রেকর্ড করুন।" },
      { en: "List two strengths and two weak areas.", bn: "দুটি শক্তি ও দুটি দুর্বল দিক লিখুন।" },
      { en: "Complete a short integrated project.", bn: "একটি ছোট সমন্বিত প্রকল্প শেষ করুন।" },
    ],
  },
  "verb-system-2": {
    vocabulary: ["تعلّم (V)","تعاون (VI)","انكسر (VII)","اجتمع (VIII)","استخدم (X)","فاعل","مفعول","اسم الفاعل","اسم المفعول","معتلّ","أجوف","ناقص","تقدّم (V)","تبادل (VI)","انصرف (VII)","انتظر (VIII)","استقبل (X)","مكتوب","كاتب","مثال","مبني","معلوم","مجهول","صحيح"],
    models: ["تعلّمتُ اللغةَ بنفسي.","تعاونَ الطلابُ في المشروعِ.","اجتمعَ الفريقُ صباحاً.","المعلّمُ هو الفاعلُ، والدرسُ هو المفعولُ.","استقبلَ المديرُ الضيوفَ بحفاوةٍ.","الكاتبُ اسمُ فاعلٍ، والمكتوبُ اسمُ مفعولٍ."],
    grammarPoints: [
      { en: "Forms V–VI: reflexive and reciprocal", bn: "গঠন V–VI: আত্মবাচক ও পারস্পরিক" },
      { en: "Forms VII–VIII–X and their meanings", bn: "গঠন VII–VIII–X ও তাদের অর্থ" },
      { en: "Active and passive participles", bn: "কর্তৃ ও কর্ম কৃদন্ত" },
    ],
    exercises: [
      { en: "Identify the form of eight verbs.", bn: "আটটি ক্রিয়ার গঠন শনাক্ত করুন।" },
      { en: "Derive participles from five roots.", bn: "পাঁচটি মূল থেকে কৃদন্ত তৈরি করুন।" },
      { en: "Guess three new words from their roots.", bn: "মূল দেখে তিনটি নতুন শব্দের অর্থ আন্দাজ করুন।" },
    ],
  },
  "complex-grammar": {
    vocabulary: ["كان","أصبح","ليس","إنّ","أنّ","لكنّ","إذا","لو","إلّا","التوكيد","الشرط","الجواب","ظلّ","مازال","لعلّ","كأنّ","مَن (شرط)","ما (شرط)","لولا","غير","سوى","صار","بات","حتى"],
    models: ["كان الطقسُ بارداً أمسِ.","إنّ العلمَ نورٌ.","إذا درستَ، نجحتَ.","لم يحضرْ أحدٌ إلّا خالداً.","لعلّ الجوَّ يتحسّنُ غداً.","لولا المطرُ لخرجنا إلى الحديقةِ."],
    grammarPoints: [
      { en: "Kana and its sisters", bn: "كان ও তার বোনেরা" },
      { en: "Inna and its sisters", bn: "إنّ ও তার বোনেরা" },
      { en: "Conditional sentences and exception", bn: "শর্তবাক্য ও ব্যতিক্রম" },
    ],
    exercises: [
      { en: "Rewrite five sentences with kana/inna.", bn: "পাঁচটি বাক্য كان/إنّ দিয়ে আবার লিখুন।" },
      { en: "Write three conditional sentences.", bn: "তিনটি শর্তবাক্য লিখুন।" },
      { en: "Read an adapted paragraph and mark clauses.", bn: "একটি অভিযোজিত অনুচ্ছেদ পড়ে খণ্ডবাক্য চিহ্নিত করুন।" },
    ],
  },
  "academic-literacy": {
    vocabulary: ["تعريف","تصنيف","سبب","نتيجة","مقدمة","خاتمة","فقرة","حجّة","مثال","بمعنى","يتكوّن من","يشير إلى","موضوع","عنصر","نوع","خاصية","مقارنة","تلخيص","استنتاج","بناءً على","على سبيل المثال","يتمثّل في","ينقسم إلى"],
    models: ["يتكوّنُ الموضوعُ من ثلاثةِ أقسامٍ.","التعريفُ هو أن نوضّحَ المعنى.","نتيجةً لذلك، ارتفعَ العددُ.","تشيرُ الدراسةُ إلى أهميةِ القراءةِ.","ينقسمُ الموضوعُ إلى نوعينِ رئيسينِ.","على سبيلِ المثالِ، القراءةُ تنمّي التفكيرَ."],
    grammarPoints: [
      { en: "Paragraph structure: intro–body–close", bn: "অনুচ্ছেদ গঠন: ভূমিকা–মূল–উপসংহার" },
      { en: "Definition and classification language", bn: "সংজ্ঞা ও শ্রেণিবিভাগের ভাষা" },
      { en: "Cause and effect connectors", bn: "কারণ ও ফলের সংযোজক" },
    ],
    exercises: [
      { en: "Outline an explanatory paragraph.", bn: "একটি ব্যাখ্যামূলক অনুচ্ছেদের রূপরেখা করুন।" },
      { en: "Write two definition sentences.", bn: "দুটি সংজ্ঞা-বাক্য লিখুন।" },
      { en: "Draft a 200-word explanatory text.", bn: "২০০ শব্দের ব্যাখ্যামূলক লেখা লিখুন।" },
    ],
  },
  "authentic-listening": {
    vocabulary: ["مقابلة","مذيع","ضيف","لقاء","برنامج","بثّ","مباشر","تصريح","استنتاج","فكرة رئيسية","تفصيل","ملاحظة","حوار","نقاش","رأي","تعليق","سؤال","إجابة","موضوع","خلاصة","سياق","نبرة","قصد"],
    models: ["أجرى المذيعُ مقابلةً مع الضيفِ.","في البثِّ المباشرِ، ناقشوا الاقتصادَ.","الفكرةُ الرئيسيةُ هي التعليمُ.","استنتجتُ ذلك من التفاصيلِ.","فهمتُ قصدَ المتحدّثِ من نبرتِه.","لخّصتُ الحوارَ في ثلاثِ نقاطٍ."],
    grammarPoints: [
      { en: "Following reduced conversational cues", bn: "কম ইঙ্গিতে কথা অনুসরণ" },
      { en: "Inference from context", bn: "প্রসঙ্গ থেকে অনুমান" },
      { en: "Structured note-taking while listening", bn: "শোনার সময় গঠিত নোট" },
    ],
    exercises: [
      { en: "Take structured notes on a short clip.", bn: "একটি ছোট ক্লিপে গঠিত নোট নিন।" },
      { en: "Write the main idea plus five details.", bn: "মূল কথা ও পাঁচটি তথ্য লিখুন।" },
      { en: "Infer two implied points and explain.", bn: "দুটি অনুমিত বিষয় বের করে ব্যাখ্যা করুন।" },
    ],
  },
  "literature-bridge": {
    vocabulary: ["قصة","بطل","حدث","صورة","رمز","أسلوب","مشهد","عاطفة","لغة أدبية","معنى خفي","حوار","سرد","شخصية","حبكة","نهاية","بداية","وصف","تشبيه","استعارة","إيقاع","دلالة","موضوع","رسالة"],
    models: ["بدأت القصةُ بمشهدٍ هادئٍ.","استخدم الكاتبُ صورةً جميلةً.","شعرَ البطلُ بالحزنِ.","في هذا الرمزِ معنىً خفيٌّ.","الحبكةُ تتطوّرُ حتى النهايةِ المفاجئةِ.","استعملَ الشاعرُ استعارةً بديعةً."],
    grammarPoints: [
      { en: "Reading imagery and figurative language", bn: "চিত্রকল্প ও রূপক ভাষা পড়া" },
      { en: "Register: literary vs everyday", bn: "ভাষা-স্তর: সাহিত্যিক বনাম দৈনন্দিন" },
      { en: "Selected classical features", bn: "নির্বাচিত ধ্রুপদি বৈশিষ্ট্য" },
    ],
    exercises: [
      { en: "Summarize a short story in five sentences.", bn: "একটি ছোট গল্প পাঁচ বাক্যে সংক্ষেপ করুন।" },
      { en: "Explain one image and what it suggests.", bn: "একটি চিত্রকল্প ও তার ইঙ্গিত ব্যাখ্যা করুন।" },
      { en: "Write a short response to the passage.", bn: "অংশটি নিয়ে একটি ছোট প্রতিক্রিয়া লিখুন।" },
    ],
  },
  "formal-communication": {
    vocabulary: ["عرض تقديمي","بريد إلكتروني","تقرير","ملخّص","المحترم","تحية طيبة","وبعد","نأمل","مرفق","بخصوص","نتشرّف","تفضّلوا","سيادتكم","نحيطكم علماً","الموضوع","التوقيع","المرسل","المستلم","جدول الأعمال","الخاتمة","شكراً لتعاونكم","في الختام","نتطلّع"],
    models: ["تحيةً طيبةً وبعد،","نأملُ التعاونَ في هذا المشروعِ.","مرفقٌ التقريرُ للمراجعةِ.","سأقدّمُ عرضاً عن التعليمِ.","نحيطكم علماً بموعدِ الاجتماعِ القادمِ.","في الختامِ، شكراً لتعاونكم الكريمِ."],
    grammarPoints: [
      { en: "Formal email openings and closings", bn: "আনুষ্ঠানিক ইমেইলের শুরু ও শেষ" },
      { en: "Report and summary structure", bn: "প্রতিবেদন ও সারাংশের গঠন" },
      { en: "Polite formal register", bn: "ভদ্র আনুষ্ঠানিক ভাষা-স্তর" },
    ],
    exercises: [
      { en: "Write a formal email of request.", bn: "একটি আনুষ্ঠানিক অনুরোধ-ইমেইল লিখুন।" },
      { en: "Outline a 6-minute presentation.", bn: "৬ মিনিটের উপস্থাপনার রূপরেখা করুন।" },
      { en: "Summarize a report in 80 words.", bn: "একটি প্রতিবেদন ৮০ শব্দে সংক্ষেপ করুন।" },
    ],
  },
  "advanced-syntax": {
    vocabulary: ["المبني للمجهول","الحال","المفعول المطلق","التمييز","الترابط","نائب الفاعل","بينما","حيث","إذ","قد","ضمير الفصل","التقديم","المفعول لأجله","المفعول معه","الاستثناء","التوكيد","البدل","العطف","مصدر مؤول","جملة اعتراضية","أسلوب قصر","تقديم وتأخير","إسناد"],
    models: ["كُتِبَ المقالُ بعنايةٍ.","خرجَ الطالبُ مسرعاً.","فرِحَ فرحاً شديداً.","ازدادَ الطلابُ عدداً.","سافرَ طلباً للعلمِ.","ما نجحَ إلّا المجتهدُ."],
    grammarPoints: [
      { en: "Passive voice (al-mabni lil-majhul)", bn: "কর্মবাচ্য (al-mabni lil-majhul)" },
      { en: "Circumstantial clause (hal)", bn: "অবস্থাসূচক (hal)" },
      { en: "Absolute object and specification (tamyiz)", bn: "পরম কর্ম ও বিশেষায়ন (tamyiz)" },
    ],
    exercises: [
      { en: "Convert five active sentences to passive.", bn: "পাঁচটি কর্তৃবাচ্য বাক্য কর্মবাচ্য করুন।" },
      { en: "Add a hal clause to four sentences.", bn: "চারটি বাক্যে hal খণ্ডবাক্য যোগ করুন।" },
      { en: "Parse a complex sentence fully.", bn: "একটি জটিল বাক্য পূর্ণ বিশ্লেষণ করুন।" },
    ],
  },
  argumentation: {
    vocabulary: ["ادّعاء","دليل","حجّة مضادة","على الرغم","قد يُقال","الأرجح","بناءً على","علاوةً","ختاماً","وجهة نظر","إقناع","ترجيح","فرضية","برهان","تفنيد","استدلال","موضوعية","تحيّز","مغالطة","خلاصة القول","من المسلّم به","يترتّب على","بالمقابل"],
    models: ["أرى أنّ التعليمَ حقٌّ للجميعِ.","الدليلُ على ذلك واضحٌ.","قد يُقالُ عكسُ ذلك، لكن…","بناءً على ما سبق، أرجّحُ هذا الرأيَ.","من المسلّمِ به أنّ الوقتَ ثمينٌ.","بالمقابلِ، يمكنُ تفنيدُ هذه الحجّةِ."],
    grammarPoints: [
      { en: "Stating claims and evidence", bn: "দাবি ও প্রমাণ উপস্থাপন" },
      { en: "Handling counterarguments and hedging", bn: "বিপরীত যুক্তি ও সংযত ভাষা" },
      { en: "Rhetorical organization of an essay", bn: "রচনার অলংকারিক বিন্যাস" },
    ],
    exercises: [
      { en: "Write a thesis with two supporting reasons.", bn: "দুটি সমর্থক কারণসহ একটি থিসিস লিখুন।" },
      { en: "Address one counterargument.", bn: "একটি বিপরীত যুক্তির জবাব দিন।" },
      { en: "Draft a 350-word position essay.", bn: "৩৫০ শব্দের একটি অবস্থান-রচনা লিখুন।" },
    ],
  },
  "independent-comprehension": {
    vocabulary: ["مقال","محاضرة","بودكاست","مصطلح","مرادف","ضدّ","سياق","استقلالية","مصدر موثوق","تصفّح","تعمّق","استخلاص","تحليل","نقد","مراجعة","اقتباس","ملاحظات","فهرس","موسوعة","معجم","بحث","مقارنة مصادر","تقييم"],
    models: ["قرأتُ مقالاً كاملاً دون قاموسٍ.","استمعتُ إلى محاضرةٍ وفهمتُ الفكرةَ.","خمّنتُ المصطلحَ من السياقِ.","أعتمدُ على مصادرَ موثوقةٍ.","قارنتُ بين مصدرينِ قبل الاستنتاجِ.","دوّنتُ ملاحظاتٍ أثناء المحاضرةِ."],
    grammarPoints: [
      { en: "Reading authentic articles independently", bn: "বাস্তব নিবন্ধ নিজে নিজে পড়া" },
      { en: "Vocabulary autonomy from context", bn: "প্রসঙ্গ থেকে স্বাধীন শব্দভান্ডার" },
      { en: "Extracting main ideas from lectures", bn: "বক্তৃতা থেকে মূল ভাব বের করা" },
    ],
    exercises: [
      { en: "Read one authentic article and note 5 words.", bn: "একটি বাস্তব নিবন্ধ পড়ে ৫টি শব্দ টুকুন।" },
      { en: "Summarize a lecture in your own words.", bn: "একটি বক্তৃতা নিজের ভাষায় সংক্ষেপ করুন।" },
      { en: "Build a personal vocabulary list of 10.", bn: "১০টি শব্দের নিজস্ব তালিকা তৈরি করুন।" },
    ],
  },
  capstone: {
    vocabulary: ["حصيلة","مراجعة نهائية","اختبار","إنجاز","تطوّر","استمرارية","هدف بعيد","تقييم ذاتي","ملف الأعمال","خلاصة","التزام","المستوى","كفاءة","شهادة","إتقان","مهارة","خطة مستقبلية","مراجعة الأقران","نقاط القوة","نقاط التطوير","تغذية راجعة","إنجازات","استعداد"],
    models: ["راجعتُ ملفَّ أعمالي كاملاً.","تطوّرتْ مهاراتي كثيراً هذا العامَ.","خطّتي القادمةُ هي بلوغُ مستوى B2.","سأستمرُّ في الدراسةِ اليوميةِ.","حدّدتُ نقاطَ القوةِ ونقاطَ التطويرِ.","أنا مستعدٌّ للانتقالِ إلى المستوى التالي."],
    grammarPoints: [
      { en: "Portfolio revision and self-assessment", bn: "পোর্টফোলিও পরিমার্জন ও আত্ম-মূল্যায়ন" },
      { en: "Weak-area targeted clinics", bn: "দুর্বল দিকের লক্ষ্যভিত্তিক ক্লিনিক" },
      { en: "Planning sustainable B2 study", bn: "টেকসই B2 পড়ার পরিকল্পনা" },
    ],
    exercises: [
      { en: "Revise one earlier writing piece.", bn: "আগের একটি লেখা পরিমার্জন করুন।" },
      { en: "Complete a mock proficiency task.", bn: "একটি মক দক্ষতা পরীক্ষা সম্পন্ন করুন।" },
      { en: "Write your next 100-day plan.", bn: "পরবর্তী ১০০ দিনের পরিকল্পনা লিখুন।" },
    ],
  },
};
