import {advancedReadings} from "./advancedReadings";
export type PhaseReading={title:{bn:string;en:string};lines:Array<{ar:string;bn:string;en:string}>;question:{bn:string;en:string};answers:string[];explanation:{bn:string;en:string}};
// Authored practice simulations, not authentic news or proficiency exams.
export const phaseReadings:Record<string,PhaseReading>={
 ...advancedReadings,
 expansion:{title:{bn:"হারানো বই",en:"The missing book"},lines:[
 {ar:"الْكِتَابُ الَّذِي تَبْحَثُ عَنْهُ لَيْلَى عَلَى الطَّاوِلَةِ.",bn:"লায়লা যে বইটি খুঁজছে সেটি টেবিলে।",en:"The book Layla is looking for is on the table."},
 {ar:"أَخَذَتْهُ أُخْتُهَا أَمْسِ، ثُمَّ أَعَادَتْهُ الْيَوْمَ.",bn:"তার বোন গতকাল সেটি নিয়েছিল, তারপর আজ ফেরত দিয়েছে।",en:"Her sister took it yesterday, then returned it today."},
 {ar:"فَرِحَتْ لَيْلَى لِأَنَّ الْكِتَابَ هَدِيَّةٌ مِنْ صَدِيقَتِهَا.",bn:"লায়লা খুশি হলো, কারণ বইটি তার বান্ধবীর উপহার।",en:"Layla was happy because the book was a gift from her friend."}],question:{bn:"বইটি এখন কোথায়?",en:"Where is the book now?"},answers:["على الطاولة","الطاولة"],explanation:{bn:"প্রথম বাক্যে على الطاولة অবস্থান জানাচ্ছে। عنه-তে ه সর্বনামটি বইকে বোঝায়।",en:"على الطاولة in the first sentence states the location. The pronoun ه in عنه refers to the book."}},
 "case-awareness":{title:{bn:"শ্রেণিকক্ষের তিন ভূমিকা",en:"Three classroom roles"},lines:[
 {ar:"دَخَلَ الْمُعَلِّمُ الْفَصْلَ.",bn:"শিক্ষক শ্রেণিকক্ষে প্রবেশ করলেন।",en:"The teacher entered the classroom."},
 {ar:"رَأَى الطَّالِبُ الْمُعَلِّمَ.",bn:"ছাত্র শিক্ষককে দেখল।",en:"The student saw the teacher."},
 {ar:"سَلَّمَ الطَّالِبُ عَلَى الْمُعَلِّمِ.",bn:"ছাত্র শিক্ষককে সালাম দিল।",en:"The student greeted the teacher."}],question:{bn:"শেষ বাক্যে على-এর পরের শব্দটি হরকতসহ লিখুন।",en:"Write the word after على in the last sentence, including its ending."},answers:["الْمُعَلِّمِ"],explanation:{bn:"على অব্যয়ের পরে শিক্ষক শব্দটি জর: الْمُعَلِّمِ। এখানে শেষ কাসরাটিও মিলতে হবে।",en:"After على the noun is genitive: الْمُعَلِّمِ. This task checks the final kasra as well."}},
 "media-foundations":{title:{bn:"অনুশীলনী সংবাদ: নতুন গ্রন্থাগার",en:"Simulated news: a new library"},lines:[
 {ar:"افْتَتَحَتِ الْمَدِينَةُ مَكْتَبَةً جَدِيدَةً يَوْمَ السَّبْتِ.",bn:"শহরটি শনিবার নতুন একটি গ্রন্থাগার উদ্বোধন করেছে।",en:"The city opened a new library on Saturday."},
 {ar:"تَحْتَوِي الْمَكْتَبَةُ عَلَى عَشَرَةِ آلَافِ كِتَابٍ.",bn:"গ্রন্থাগারে দশ হাজার বই আছে।",en:"The library contains ten thousand books."},
 {ar:"وَقَالَ الْمُدِيرُ إِنَّ الدُّخُولَ مَجَّانِيٌّ.",bn:"পরিচালক জানিয়েছেন, প্রবেশ বিনামূল্যে।",en:"The director said admission is free."}],question:{bn:"কোন দিন গ্রন্থাগারটি খোলা হয়েছে?",en:"On which day did the library open?"},answers:["السبت","يوم السبت"],explanation:{bn:"প্রথম বাক্যে يوم السبت আছে। এটি বানানো অনুশীলনী সংবাদ, বাস্তব ঘটনার দাবি নয়।",en:"يوم السبت appears in the opening sentence. This is a fictional practice report, not a real news claim."}},
 "verb-system-1":{title:{bn:"পাঠ প্রস্তুতি",en:"Preparing a lesson"},lines:[
 {ar:"أَعَدَّتِ الْمُعَلِّمَةُ دَرْسًا عَنِ الْمَاءِ.",bn:"শিক্ষিকা পানি নিয়ে একটি পাঠ প্রস্তুত করেছেন।",en:"The teacher prepared a lesson about water."},
 {ar:"شَاهَدَ الطُّلَّابُ فِيلْمًا قَصِيرًا، ثُمَّ سَاعَدُوا بَعْضَهُمْ.",bn:"ছাত্ররা একটি ছোট চলচ্চিত্র দেখেছে, তারপর পরস্পরকে সাহায্য করেছে।",en:"The students watched a short film, then helped one another."},
 {ar:"أَرْسَلَتِ الْمُعَلِّمَةُ مُلَخَّصًا إِلَى الْأُسَرِ.",bn:"শিক্ষিকা পরিবারগুলোর কাছে একটি সারাংশ পাঠিয়েছেন।",en:"The teacher sent a summary to the families."}],question:{bn:"শিক্ষিকা কী পাঠিয়েছেন?",en:"What did the teacher send?"},answers:["ملخصا","ملخّصاً","ملخص"],explanation:{bn:"শেষ বাক্যে أرسلت-এর কর্ম ملخّصاً। أرسل গঠন IV, شاهد ও ساعد গঠন III।",en:"ملخصاً is the object of أرسلت. أرسل is Form IV; شاهد and ساعد are Form III."}},
 opinions:{title:{bn:"দুটি যাতায়াতের উপায়",en:"Two ways to travel"},lines:[
 {ar:"يُفَضِّلُ سَامِي الْحَافِلَةَ لِأَنَّهَا أَرْخَصُ مِنَ السَّيَّارَةِ.",bn:"সামি বাস পছন্দ করে, কারণ গাড়ির চেয়ে তা সস্তা।",en:"Sami prefers the bus because it is cheaper than the car."},
 {ar:"لَكِنَّ أُخْتَهُ تَرَى أَنَّ السَّيَّارَةَ أَسْرَعُ.",bn:"কিন্তু তার বোন মনে করে গাড়ি দ্রুততর।",en:"His sister, however, thinks the car is faster."},
 {ar:"اتَّفَقَا عَلَى اسْتِخْدَامِ الْحَافِلَةِ هَذَا الْأُسْبُوعَ.",bn:"তারা এই সপ্তাহে বাস ব্যবহার করতে একমত হয়েছে।",en:"They agreed to use the bus this week."}],question:{bn:"তারা শেষ পর্যন্ত কোনটি বেছে নিয়েছে?",en:"What did they finally choose?"},answers:["الحافلة"],explanation:{bn:"শেষ বাক্যের الحافلة সিদ্ধান্তটি জানায়; আগের দুই বাক্যে কারণ ও ভিন্নমত আছে।",en:"الحافلة in the last sentence states the decision; the earlier sentences give reasons and a differing opinion."}},
 consolidation:{title:{bn:"একটি বাস্তবসম্মত review plan",en:"A realistic review plan"},lines:[
 {ar:"رَاجَعَتْ مَرْيَمُ خَمْسَ كَلِمَاتٍ قَبْلَ الدَّرْسِ.",bn:"মারিয়াম পাঠের আগে পাঁচটি শব্দ ঝালাই করেছে।",en:"Maryam reviewed five words before the lesson."},
 {ar:"نَسِيَتْ كَلِمَتَيْنِ، فَكَتَبَتْهُمَا فِي دَفْتَرِهَا.",bn:"সে দুটি শব্দ ভুলে গিয়েছিল, তাই খাতায় সেগুলো লিখেছে।",en:"She forgot two words, so she wrote them in her notebook."},
 {ar:"سَتُرَاجِعُهُمَا غَدًا قَبْلَ تَعَلُّمِ كَلِمَاتٍ جَدِيدَةٍ.",bn:"নতুন শব্দ শেখার আগে আগামীকাল সে ওই দুটি ঝালাই করবে।",en:"She will review those two tomorrow before learning new words."}],question:{bn:"ভুলে যাওয়া শব্দগুলো সে কবে আবার দেখবে?",en:"When will she review the forgotten words?"},answers:["غدا","غداً"],explanation:{bn:"শেষ বাক্যের غداً আগামীকাল বোঝায়। هما সর্বনাম দুটি শব্দের জন্য।",en:"غداً means tomorrow. The suffix هما refers to the two words."}},
 "verb-system-2":{title:{bn:"দলের কাজ",en:"Teamwork"},lines:[
 {ar:"اجْتَمَعَ الْفَرِيقُ فِي الْمَكْتَبَةِ.",bn:"দলটি গ্রন্থাগারে মিলিত হয়েছে।",en:"The team met in the library."},
 {ar:"تَبَادَلَ الطُّلَّابُ الْأَفْكَارَ وَاسْتَخْدَمُوا الْحَاسُوبَ.",bn:"ছাত্ররা ভাবনা বিনিময় করেছে ও কম্পিউটার ব্যবহার করেছে।",en:"The students exchanged ideas and used the computer."},
 {ar:"كَانَ التَّقْرِيرُ الْمَكْتُوبُ وَاضِحًا.",bn:"লিখিত প্রতিবেদনটি স্পষ্ট ছিল।",en:"The written report was clear."}],question:{bn:"কোন শব্দটি ‘লিখিত’ অর্থে কর্ম-কৃদন্ত?",en:"Which word is the passive participle meaning ‘written’?"},answers:["المكتوب","مكتوب"],explanation:{bn:"مكتوب লেখা হয়েছে এমন কিছুকে বোঝায়; كاتب লেখক/লিখছে এমন ব্যক্তি।",en:"مكتوب describes something written; كاتب refers to a writer or one writing."}},
 "complex-grammar":{title:{bn:"বৃষ্টির দিনের সিদ্ধান্ত",en:"A rainy-day decision"},lines:[
 {ar:"كَانَ الْجَوُّ بَارِدًا فِي الصَّبَاحِ.",bn:"সকালে আবহাওয়া ঠান্ডা ছিল।",en:"The weather was cold in the morning."},
 {ar:"قَالَ الْأَبُ: إِذَا تَوَقَّفَ الْمَطَرُ، سَنَخْرُجُ.",bn:"বাবা বললেন: বৃষ্টি থামলে আমরা বের হব।",en:"The father said: If the rain stops, we will go out."},
 {ar:"لَمْ يَتَوَقَّفِ الْمَطَرُ، فَبَقِيَ الْجَمِيعُ فِي الْبَيْتِ.",bn:"বৃষ্টি থামেনি, তাই সবাই বাড়িতে রয়ে গেছে।",en:"The rain did not stop, so everyone stayed at home."}],question:{bn:"পরিবারটি কোথায় থেকে গেল?",en:"Where did the family stay?"},answers:["في البيت","البيت"],explanation:{bn:"বের হওয়ার শর্ত পূরণ হয়নি। শেষ বাক্যে في البيت ফলটি জানায়।",en:"The condition for going out was not met. في البيت states the resulting location."}},
};
