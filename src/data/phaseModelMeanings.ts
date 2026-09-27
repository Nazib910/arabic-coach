// Translations align to phaseContent.models in order; never to unrelated fallback text.
export const phaseModelMeanings: Record<string, Array<{bn:string;en:string}>> = Object.fromEntries(Object.entries({
  expansion: [
    ["আমি যে বইটি পড়েছি সেটি উপকারী।","The book that I read is useful."], ["আমি যে শহরে থাকি সেটি শান্ত।","The city where I live is quiet."], ["আমি সেটিকে ভালোবাসি, কিন্তু সেটি দূরে।","I love it, but it is far away."], ["এটি আমার সেই বন্ধুর বাড়ি যে এখানে কাজ করে।","This is the house of my friend who works here."], ["যে ছাত্ররা আমার সঙ্গে পড়েছে তারা আমার বন্ধু।","The students who studied with me are my friends."], ["আপনাদের কাছে যে জায়গাটির বর্ণনা দিয়েছি সেটি আমাদের কাছে।","The place I described to you is near us."],
  ],
  "case-awareness": [
    ["ছাত্রটি স্কুলে গেল।","The student went to school."], ["আমি শ্রেণিতে ছাত্রটিকে দেখেছি।","I saw the student in class."], ["দরজার সামনে ছাত্রটির পাশ দিয়ে গিয়েছি।","I passed by the student in front of the door."], ["দুই শিক্ষক এবং শিক্ষকগণ এসেছেন।","The two teachers and the teachers came."], ["দুই ছাত্র দুটি উপকারী বই পড়েছে।","The two students read two useful books."], ["আমি প্রকৌশলীগণ ও নারী কর্মীদের সালাম জানিয়েছি।","I greeted the engineers and the female employees."],
  ],
  "media-foundations": [
    ["প্রতিবেদন অনুযায়ী আজ আবহাওয়া গরম।","According to the report, the weather is hot today."], ["সরকার নতুন একটি খবর ঘোষণা করেছে।","The government announced new information."], ["সংখ্যাটি দশ লক্ষ অধিবাসীতে পৌঁছেছে।","The number reached one million inhabitants."], ["নিবন্ধটি একই তারিখে প্রকাশিত হয়েছে।","The article was published on the same date."], ["সংস্থা অনুযায়ী তাপমাত্রা বেড়েছে।","The temperature rose according to the agency."], ["সংবাদদাতা সংবাদ সম্মেলনে বিবৃতি দিয়েছেন।","The correspondent made a statement at the press conference."],
  ],
  "verb-system-1": [
    ["অধ্যাপক ছাত্রদের আরবি শিখিয়েছেন।","The professor taught the students Arabic."], ["আমি কাজে বন্ধুকে সাহায্য করেছি।","I helped my friend at work."], ["আমি বোনকে একটি চিঠি পাঠিয়েছি।","I sent a letter to my sister."], ["تعليم হলো علّم ক্রিয়ার মাসদার।","Taʿliim is the verbal noun of ʿallama."], ["ছাত্রটি অনুশীলন শেষ করার চেষ্টা করেছে।","The student tried to complete the exercise."], ["শিক্ষিকা একটি উপকারী পাঠ দিয়েছেন।","The teacher presented a useful lesson."],
  ],
  opinions: [
    ["আমার মতে টেলিভিশন দেখার চেয়ে পড়া বেশি গুরুত্বপূর্ণ।","In my opinion, reading is more important than watching television."], ["আমি একমত, কারণ আরবি উপকারী।","I agree because Arabic is useful."], ["যদিও এটি কঠিন, তবুও আনন্দদায়ক।","Although it is difficult, it is enjoyable."], ["তাই আমি প্রতিদিন পড়ার পরামর্শ দিই।","Therefore I recommend daily study."], ["আমি মনে করি খেলাধুলা স্বাস্থ্যের জন্য প্রয়োজনীয়।","I think sport is necessary for health."], ["বিপরীতে, আমি মনে করি সময় যথেষ্ট।","On the contrary, I think there is enough time."],
  ],
  consolidation: [
    ["প্রতি সপ্তাহে শেখা বিষয়গুলো ঝালাই করি।","I review what I learned every week."], ["কথা বলার সময় নিজেকে রেকর্ড করেছি।","I recorded myself speaking."], ["আমার দুর্বল দিক উচ্চারণ।","My weak point is pronunciation."], ["আমার পরিকল্পনা সাবলীলতা উন্নত করা।","My plan is to improve fluency."], ["দক্ষতাটি আয়ত্ত করা পর্যন্ত প্রতিদিন অনুশীলন করেছি।","I practised daily until I mastered the skill."], ["স্পষ্ট মানদণ্ড দিয়ে অগ্রগতি মাপি।","I measure my progress using a clear criterion."],
  ],
  "verb-system-2": [
    ["আমি নিজে ভাষাটি শিখেছি।","I learned the language by myself."], ["ছাত্ররা প্রকল্পে সহযোগিতা করেছে।","The students cooperated on the project."], ["দলটি সকালে মিলিত হয়েছে।","The team met in the morning."], ["শিক্ষক হলেন কর্তা, পাঠ হলো কর্ম।","The teacher is the subject, and the lesson is the object."], ["পরিচালক অতিথিদের আন্তরিকভাবে স্বাগত জানিয়েছেন।","The director welcomed the guests warmly."], ["كاتب কর্তৃকৃদন্ত, مكتوب কর্মকৃদন্ত।","Kaatib is an active participle; maktuub is a passive participle."],
  ],
  "complex-grammar": [
    ["গতকাল আবহাওয়া ঠান্ডা ছিল।","The weather was cold yesterday."], ["নিশ্চয়ই জ্ঞান আলো।","Indeed, knowledge is light."], ["পড়লে সফল হবে।","If you study, you will succeed."], ["খালিদ ছাড়া কেউ উপস্থিত হয়নি।","Nobody attended except Khalid."], ["আশা করি আগামীকাল আবহাওয়া ভালো হবে।","Perhaps the weather will improve tomorrow."], ["বৃষ্টি না হলে আমরা বাগানে যেতাম।","Were it not for the rain, we would have gone to the garden."],
  ],
  "academic-literacy": [
    ["বিষয়টি তিনটি অংশ নিয়ে গঠিত।","The topic consists of three sections."], ["সংজ্ঞা দেওয়ার অর্থ হলো অর্থটি স্পষ্ট করা।","To define is to clarify the meaning."], ["তার ফলে সংখ্যা বেড়েছে।","As a result, the number increased."], ["গবেষণাটি পড়ার গুরুত্ব নির্দেশ করে।","The study indicates the importance of reading."], ["বিষয়টি প্রধান দুটি ভাগে বিভক্ত।","The topic is divided into two main types."], ["উদাহরণস্বরূপ, পড়া চিন্তাশক্তি বাড়ায়।","For example, reading develops thinking."],
  ],
  "authentic-listening": [
    ["উপস্থাপক অতিথির সাক্ষাৎকার নিয়েছেন।","The presenter interviewed the guest."], ["সরাসরি সম্প্রচারে তাঁরা অর্থনীতি নিয়ে আলোচনা করেছেন।","They discussed the economy in the live broadcast."], ["মূল ভাব হলো শিক্ষা।","The main idea is education."], ["তথ্যগুলো থেকে আমি সেই সিদ্ধান্তে এসেছি।","I inferred that from the details."], ["কণ্ঠের ভঙ্গি থেকে বক্তার উদ্দেশ্য বুঝেছি।","I understood the speaker's intention from his tone."], ["সংলাপটি তিনটি পয়েন্টে সংক্ষেপ করেছি।","I summarized the dialogue in three points."],
  ],
  "literature-bridge": [
    ["গল্পটি একটি শান্ত দৃশ্য দিয়ে শুরু হয়েছে।","The story began with a quiet scene."], ["লেখক একটি সুন্দর চিত্রকল্প ব্যবহার করেছেন।","The writer used a beautiful image."], ["নায়ক দুঃখ অনুভব করেছে।","The hero felt sad."], ["এই প্রতীকে গোপন অর্থ আছে।","There is a hidden meaning in this symbol."], ["অপ্রত্যাশিত সমাপ্তি পর্যন্ত কাহিনি এগোয়।","The plot develops until the surprising ending."], ["কবি একটি চমৎকার রূপক ব্যবহার করেছেন।","The poet used an exquisite metaphor."],
  ],
  "formal-communication": [
    ["শুভেচ্ছা জানিয়ে মূল কথায় আসছি—","Kind greetings, and now to the matter at hand—"], ["এই প্রকল্পে সহযোগিতার আশা করি।","We hope to cooperate on this project."], ["পর্যালোচনার জন্য প্রতিবেদন সংযুক্ত।","The report is attached for review."], ["আমি শিক্ষা বিষয়ে উপস্থাপনা দেব।","I will give a presentation about education."], ["পরবর্তী সভার সময় আপনাদের জানাচ্ছি।","We inform you of the time of the next meeting."], ["পরিশেষে, আপনাদের সহযোগিতার জন্য ধন্যবাদ।","In closing, thank you for your kind cooperation."],
  ],
  "advanced-syntax": [
    ["নিবন্ধটি যত্নসহকারে লেখা হয়েছে।","The article was written carefully."], ["ছাত্রটি তাড়াহুড়ো করে বের হয়েছে।","The student left in a hurry."], ["সে অত্যন্ত আনন্দিত হয়েছে।","He rejoiced greatly."], ["ছাত্রদের সংখ্যা বেড়েছে।","The students increased in number."], ["সে জ্ঞান অর্জনের উদ্দেশ্যে ভ্রমণ করেছে।","He travelled in pursuit of knowledge."], ["কেবল পরিশ্রমী ব্যক্তিই সফল হয়েছে।","Only the diligent person succeeded."],
  ],
  argumentation: [
    ["আমি মনে করি শিক্ষা সবার অধিকার।","I believe education is a right for everyone."], ["এর প্রমাণ স্পষ্ট।","The evidence for that is clear."], ["এর বিপরীতও বলা যেতে পারে, কিন্তু…","The opposite may be said, but…"], ["পূর্বের আলোচনার ভিত্তিতে এই মতকে বেশি গ্রহণযোগ্য মনে করি।","Based on the foregoing, I favour this opinion."], ["সময় মূল্যবান—এটি স্বীকৃত।","It is accepted that time is precious."], ["অন্যদিকে, এই যুক্তি খণ্ডন করা যায়।","In contrast, this argument can be refuted."],
  ],
  "independent-comprehension": [
    ["অভিধান ছাড়া একটি সম্পূর্ণ নিবন্ধ পড়েছি।","I read an entire article without a dictionary."], ["একটি বক্তৃতা শুনে মূল ভাব বুঝেছি।","I listened to a lecture and understood its idea."], ["প্রসঙ্গ থেকে পরিভাষার অর্থ অনুমান করেছি।","I guessed the term from context."], ["নির্ভরযোগ্য উৎসের ওপর নির্ভর করি।","I rely on reliable sources."], ["সিদ্ধান্তের আগে দুটি উৎস তুলনা করেছি।","I compared two sources before drawing a conclusion."], ["বক্তৃতার সময় নোট নিয়েছি।","I took notes during the lecture."],
  ],
  capstone: [
    ["কাজের পুরো সংগ্রহটি পর্যালোচনা করেছি।","I reviewed my complete portfolio."], ["এই বছর আমার দক্ষতা অনেক উন্নত হয়েছে।","My skills developed considerably this year."], ["আমার পরবর্তী পরিকল্পনা B2 স্তরে পৌঁছানো।","My next plan is to reach level B2."], ["প্রতিদিন পড়া চালিয়ে যাব।","I will continue daily study."], ["শক্তিশালী দিক ও উন্নতির জায়গা নির্ধারণ করেছি।","I identified my strengths and areas for development."], ["আমি পরবর্তী স্তরে যাওয়ার জন্য প্রস্তুত।","I am ready to move to the next level."],
  ],
}).map(([key, rows])=>[key,rows.map(([bn,en])=>({bn,en}))]));
