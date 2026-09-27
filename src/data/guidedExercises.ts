import type {Lesson} from "@/types";
/** Concrete practice prompts always reference materials supplied in the lesson. */
export function guidedExercises(lesson:Lesson):Lesson{
 if(lesson.day<=20)return lesson;
 const a=lesson.models[0],b=lesson.models[1],c=lesson.models[2];
 const word=lesson.vocabulary[(lesson.day-1)%lesson.vocabulary.length];
 const tasks=[
  {en:`Read the supplied model “${a}”. Explain its meaning in your own language, then identify one word and its role. Compare with the displayed translation.`,bn:`দেওয়া নমুনা “${a}” পড়ুন। নিজের ভাষায় অর্থ বলুন, তারপর একটি শব্দের ভূমিকা চিহ্নিত করুন। দেখানো অর্থের সঙ্গে মিলান।`},
  {en:`Study “${b}”. Cover it, write it from memory, then compare word order and endings. Log exactly one difference, or write “no difference”.`,bn:`“${b}” দেখে ঢেকে স্মৃতি থেকে লিখুন। শব্দের ক্রম ও শেষাংশ মিলিয়ে একটি পার্থক্য লিখুন; না থাকলে “পার্থক্য নেই” লিখুন।`},
  {en:`Using the supplied word “${word}”, write one new sentence. Use “${c}” only as a structural example; explain what you changed. This open answer needs self/teacher review, not automatic grading.`,bn:`দেওয়া “${word}” দিয়ে নিজের একটি বাক্য লিখুন। “${c}” শুধু গঠনের নমুনা হিসেবে দেখুন; কী বদলেছেন বলুন। এই খোলা উত্তরে নিজে/শিক্ষকের review প্রয়োজন—স্বয়ংক্রিয় score নয়।`},
 ];
 if(lesson.skill==='listening') tasks[0]={en:`Hide the translation and listen to “${a}” with the model audio button. Write what you understood, then reveal and compare. If audio is unavailable, do this as reading practice, not a listening assessment.`,bn:`অর্থ না দেখে audio button দিয়ে “${a}” শুনুন। কী বুঝলেন লিখে পরে অর্থ মিলান। অডিও না পেলে reading practice করুন—listening assessment নয়।`};
 return {...lesson,exercises:tasks.map(t=>t.en),exercisesBn:tasks.map(t=>t.bn)};
}
