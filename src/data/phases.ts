import type { Skill } from "@/types";

// The 20-phase Modern Standard Arabic syllabus, transcribed from
// Arabic_400_Day_Master_Roadmap.pdf. Each phase spans 20 days.
// This is the single source of truth for the long-range program; the
// day-level curriculum in curriculum.ts is generated against it.

export type PhaseSpec = {
  index: number;              // 1..20
  startDay: number;           // inclusive
  endDay: number;            // inclusive
  key: string;                // stable slug used for phase labels/grouping
  title: string;              // English phase name
  titleBn: string;            // Bangla phase name
  summary: string;            // English "core syllabus" line from the roadmap
  summaryBn: string;
  exit: string;               // English "exit performance" from the roadmap
  exitBn: string;
  focusSkills: Skill[];       // dominant skills this phase trains
  topics: string[];           // ordered grammar/skill topics that seed daily lessons
};

export const COURSE_LENGTH = 400;
export const PHASE_LENGTH = 20;
export const CHECKPOINT_INTERVAL = 7;              // weekly integrated quiz
export const PHASE_TASK_INTERVAL = PHASE_LENGTH;   // every 20 days: phase performance task
export const BENCHMARK_DAYS = [100, 200, 300, 400]; // cumulative benchmark + portfolio review

export const phaseSpecs: PhaseSpec[] = [
  {
    index: 1, startDay: 1, endDay: 20, key: "foundation",
    title: "Foundation reset", titleBn: "শুরুর ভিত্তি",
    summary: "Sound–letter mapping; connected script; short/long vowels; greetings; nominal sentences; 120 core words",
    summaryBn: "অক্ষর-ধ্বনি মিল, যুক্ত লেখা, ছোট/লম্বা স্বর, শুভেচ্ছা, নামবাচক বাক্য ও ১২০টি মূল শব্দ",
    exit: "Read fully vocalized phrases; introduce yourself; write short copied and original sentences",
    exitBn: "হরকতযুক্ত বাক্য পড়া, নিজের পরিচয় দেওয়া ও ছোট বাক্য লেখা",
    focusSkills: ["reading", "writing", "grammar"],
    topics: ["Letters & sounds", "Short & long vowels", "Definite article", "Gender & nominal sentences", "Demonstratives", "Greetings & courtesy", "Core 120 vocabulary"],
  },
  {
    index: 2, startDay: 21, endDay: 40, key: "everyday-core",
    title: "Everyday core", titleBn: "প্রতিদিনের আরবি",
    summary: "Present tense; question words; negation; gender/number agreement; home, study, and routine",
    summaryBn: "বর্তমান কাল, প্রশ্নবোধক শব্দ, নেতিবাচক, লিঙ্গ/বচন মিল এবং ঘর, পড়া ও রুটিন",
    exit: "Hold a 2-minute guided exchange; understand slow, familiar speech",
    exitBn: "২ মিনিটের সহজ কথোপকথন চালানো ও ধীর পরিচিত কথা বোঝা",
    focusSkills: ["grammar", "speaking", "listening"],
    topics: ["Present tense persons", "Question words", "Negation", "Number & gender agreement", "Daily routine", "Home & study vocabulary", "Guided conversation"],
  },
  {
    index: 3, startDay: 41, endDay: 60, key: "narration",
    title: "Past & narration", titleBn: "অতীত ও ঘটনা বলা",
    summary: "Past tense; sequence markers; common broken plurals; family and biography",
    summaryBn: "অতীত কাল, ক্রম-চিহ্ন, প্রচলিত ভাঙা বহুবচন এবং পরিবার ও জীবনী",
    exit: "Tell a short past event in 8–10 connected sentences",
    exitBn: "৮–১০টি যুক্ত বাক্যে অতীতের একটি ছোট ঘটনা বলা",
    focusSkills: ["grammar", "writing", "speaking"],
    topics: ["Past tense foundation", "Sequence markers", "Broken plurals", "Family & biography", "Connected narration", "Time expressions", "Personal history"],
  },
  {
    index: 4, startDay: 61, endDay: 80, key: "interaction",
    title: "Plans & interaction", titleBn: "পরিকল্পনা ও কথাবার্তা",
    summary: "Future markers; imperatives; requests; directions; shopping and services",
    summaryBn: "ভবিষ্যৎ চিহ্ন, আদেশ, অনুরোধ, দিকনির্দেশ এবং কেনাকাটা ও সেবা",
    exit: "Complete practical role-plays and follow multi-step directions",
    exitBn: "বাস্তব রোল-প্লে করা ও ধাপে ধাপে নির্দেশ অনুসরণ করা",
    focusSkills: ["speaking", "listening", "grammar"],
    topics: ["Future markers", "Imperatives", "Polite requests", "Directions", "Shopping & services", "Practical role-play", "Multi-step listening"],
  },
  {
    index: 5, startDay: 81, endDay: 100, key: "expansion",
    title: "Sentence expansion", titleBn: "বাক্য বিস্তার",
    summary: "Idafa; object pronouns; relative clauses; connectors; description",
    summaryBn: "ইদাফা, কর্ম-সর্বনাম, সম্বন্ধবাচক খণ্ডবাক্য, সংযোজক ও বর্ণনা",
    exit: "Read and write a coherent 120-word profile or description",
    exitBn: "১২০ শব্দের একটি গোছানো পরিচিতি বা বর্ণনা পড়া ও লেখা",
    focusSkills: ["grammar", "writing", "reading"],
    topics: ["Idafa chains", "Object pronouns", "Relative clauses", "Connectors", "Rich description", "Profile writing", "Cohesive reading"],
  },
  {
    index: 6, startDay: 101, endDay: 120, key: "case-awareness",
    title: "Case awareness", titleBn: "কারক পরিচিতি",
    summary: "Core nominative/accusative/genitive patterns; sound plurals; dual; formal reading",
    summaryBn: "মূল কর্তৃ/কর্ম/সম্বন্ধ কারক, নিয়মিত বহুবচন, দ্বিবচন ও আনুষ্ঠানিক পাঠ",
    exit: "Recognize high-frequency endings without over-focusing on full inflection",
    exitBn: "পূর্ণ রূপান্তরে আটকে না থেকে প্রচলিত শব্দান্ত চেনা",
    focusSkills: ["grammar", "reading"],
    topics: ["Nominative case", "Accusative case", "Genitive case", "Sound plurals", "The dual", "Formal reading", "Ending recognition"],
  },
  {
    index: 7, startDay: 121, endDay: 140, key: "media-foundations",
    title: "Media foundations", titleBn: "সংবাদ-ভাষার ভিত্তি",
    summary: "Headlines; dates; numbers; weather; public information; listening for gist",
    summaryBn: "শিরোনাম, তারিখ, সংখ্যা, আবহাওয়া, সাধারণ তথ্য ও মূল কথা শোনা",
    exit: "Summarize a short learner news item orally and in writing",
    exitBn: "একটি সহজ সংবাদ মৌখিক ও লিখিতভাবে সংক্ষেপে বলা",
    focusSkills: ["reading", "listening", "vocabulary"],
    topics: ["Headlines", "Dates & calendar", "Large numbers", "Weather reports", "Public information", "Listening for gist", "News summary"],
  },
  {
    index: 8, startDay: 141, endDay: 160, key: "verb-system-1",
    title: "Verb system I", titleBn: "ক্রিয়া-ব্যবস্থা ১",
    summary: "Derived forms II–IV; transitivity; verbal nouns; root-pattern awareness",
    summaryBn: "গঠন II–IV, সকর্মকতা, ক্রিয়াবাচক বিশেষ্য ও মূল-ধাতু সচেতনতা",
    exit: "Infer meaning families and use high-frequency derived verbs",
    exitBn: "অর্থ-পরিবার আন্দাজ করা ও প্রচলিত উৎপন্ন ক্রিয়া ব্যবহার",
    focusSkills: ["grammar", "vocabulary"],
    topics: ["Form II (fa''ala)", "Form III (faa'ala)", "Form IV (af'ala)", "Transitivity", "Verbal nouns (masdar)", "Root–pattern awareness", "Derived-verb reading"],
  },
  {
    index: 9, startDay: 161, endDay: 180, key: "opinions",
    title: "Opinions & reasons", titleBn: "মতামত ও কারণ",
    summary: "Comparatives; because/therefore/although; agreement and disagreement",
    summaryBn: "তুলনা, কারণ/অতএব/যদিও এবং একমত ও দ্বিমত",
    exit: "Sustain a structured 4-minute discussion on familiar topics",
    exitBn: "পরিচিত বিষয়ে ৪ মিনিটের গোছানো আলোচনা চালানো",
    focusSkills: ["speaking", "grammar", "writing"],
    topics: ["Comparatives & superlatives", "Cause & result", "Concession (although)", "Agreeing", "Disagreeing politely", "Structured discussion", "Opinion writing"],
  },
  {
    index: 10, startDay: 181, endDay: 200, key: "consolidation",
    title: "Mid-course consolidation", titleBn: "মধ্য-কোর্স সংহতকরণ",
    summary: "Spiral review; pronunciation repair; fluency routines; integrated project",
    summaryBn: "চক্রাকার পুনরালোচনা, উচ্চারণ সংশোধন, সাবলীলতা ও সমন্বিত প্রকল্প",
    exit: "Reach strong A2 / emerging B1 performance on internal benchmark",
    exitBn: "অভ্যন্তরীণ মানদণ্ডে শক্ত A2 / উদীয়মান B1 পর্যায়ে পৌঁছানো",
    focusSkills: ["speaking", "reading", "writing"],
    topics: ["Spiral review", "Pronunciation repair", "Fluency routines", "Integrated project", "Timed retells", "Graded reading", "A2/B1 benchmark"],
  },
  {
    index: 11, startDay: 201, endDay: 220, key: "verb-system-2",
    title: "Verb system II", titleBn: "ক্রিয়া-ব্যবস্থা ২",
    summary: "Derived forms V–X; active/passive participles; weak verb families",
    summaryBn: "গঠন V–X, কর্তৃ/কর্ম কৃদন্ত ও দুর্বল ক্রিয়া-পরিবার",
    exit: "Decode unfamiliar vocabulary through roots and patterns",
    exitBn: "মূল ও গঠন দেখে অচেনা শব্দের অর্থ বের করা",
    focusSkills: ["grammar", "reading", "vocabulary"],
    topics: ["Forms V–VI", "Forms VII–VIII", "Forms IX–X", "Active participle", "Passive participle", "Weak verbs", "Root decoding"],
  },
  {
    index: 12, startDay: 221, endDay: 240, key: "complex-grammar",
    title: "Complex grammar", titleBn: "জটিল ব্যাকরণ",
    summary: "Kana and sisters; inna and sisters; conditionals; exception; emphasis",
    summaryBn: "كان ও তার বোনেরা, إنّ ও তার বোনেরা, শর্ত, ব্যতিক্রম ও জোর",
    exit: "Read adapted essays and produce accurate multi-clause sentences",
    exitBn: "অভিযোজিত রচনা পড়া ও নির্ভুল বহু-খণ্ডবাক্য তৈরি",
    focusSkills: ["grammar", "reading", "writing"],
    topics: ["Kana & sisters", "Inna & sisters", "Conditional sentences", "Exception (illa)", "Emphasis", "Multi-clause writing", "Adapted essay reading"],
  },
  {
    index: 13, startDay: 241, endDay: 260, key: "academic-literacy",
    title: "Academic literacy", titleBn: "একাডেমিক সাক্ষরতা",
    summary: "Paragraph structure; definition; classification; cause/effect; note-taking",
    summaryBn: "অনুচ্ছেদ গঠন, সংজ্ঞা, শ্রেণিবিভাগ, কারণ/ফল ও নোট নেওয়া",
    exit: "Write a 200-word organized explanatory text",
    exitBn: "২০০ শব্দের একটি গোছানো ব্যাখ্যামূলক লেখা লেখা",
    focusSkills: ["writing", "reading"],
    topics: ["Paragraph structure", "Definition writing", "Classification", "Cause & effect", "Note-taking", "Explanatory text", "Academic reading"],
  },
  {
    index: 14, startDay: 261, endDay: 280, key: "authentic-listening",
    title: "Authentic listening", titleBn: "বাস্তব শ্রবণ",
    summary: "Interviews and reports; reduced cues; inference; structured note-taking",
    summaryBn: "সাক্ষাৎকার ও প্রতিবেদন, কম ইঙ্গিত, অনুমান ও গঠিত নোট",
    exit: "Understand the main points of clear standard broadcasts",
    exitBn: "পরিষ্কার প্রমিত সম্প্রচারের মূল কথা বোঝা",
    focusSkills: ["listening", "reading"],
    topics: ["Interviews", "News reports", "Reduced cues", "Inference", "Structured notes", "Broadcast listening", "Main-point capture"],
  },
  {
    index: 15, startDay: 281, endDay: 300, key: "literature-bridge",
    title: "Literature bridge", titleBn: "সাহিত্যের সেতু",
    summary: "Short stories; imagery; register; selected classical features",
    summaryBn: "ছোট গল্প, চিত্রকল্প, ভাষা-স্তর ও নির্বাচিত ধ্রুপদি বৈশিষ্ট্য",
    exit: "Analyze and discuss an accessible literary passage",
    exitBn: "একটি সহজ সাহিত্য-অংশ বিশ্লেষণ ও আলোচনা করা",
    focusSkills: ["reading", "speaking", "writing"],
    topics: ["Short stories", "Imagery", "Register", "Classical features", "Literary analysis", "Discussion", "Response writing"],
  },
  {
    index: 16, startDay: 301, endDay: 320, key: "formal-communication",
    title: "Formal communication", titleBn: "আনুষ্ঠানিক যোগাযোগ",
    summary: "Presentations; email; reports; summaries; polite formal interaction",
    summaryBn: "উপস্থাপনা, ইমেইল, প্রতিবেদন, সারাংশ ও ভদ্র আনুষ্ঠানিক যোগাযোগ",
    exit: "Deliver a 6–8 minute prepared presentation with questions",
    exitBn: "প্রশ্নসহ ৬–৮ মিনিটের প্রস্তুত উপস্থাপনা দেওয়া",
    focusSkills: ["speaking", "writing"],
    topics: ["Presentations", "Formal email", "Reports", "Summaries", "Polite formality", "Q&A handling", "Prepared delivery"],
  },
  {
    index: 17, startDay: 321, endDay: 340, key: "advanced-syntax",
    title: "Advanced syntax", titleBn: "উন্নত বাক্যগঠন",
    summary: "Passive; circumstantial clauses; absolute object; specification; cohesion",
    summaryBn: "কর্মবাচ্য, অবস্থাসূচক খণ্ডবাক্য, পরম কর্ম, বিশেষায়ন ও সংহতি",
    exit: "Parse and produce sophisticated formal sentences",
    exitBn: "জটিল আনুষ্ঠানিক বাক্য বিশ্লেষণ ও তৈরি করা",
    focusSkills: ["grammar", "writing", "reading"],
    topics: ["Passive voice", "Circumstantial clause (hal)", "Absolute object", "Specification (tamyiz)", "Cohesion", "Formal sentence building", "Syntactic parsing"],
  },
  {
    index: 18, startDay: 341, endDay: 360, key: "argumentation",
    title: "Argumentation", titleBn: "যুক্তি-উপস্থাপন",
    summary: "Claims, evidence, counterarguments, hedging, rhetorical organization",
    summaryBn: "দাবি, প্রমাণ, বিপরীত যুক্তি, সংযত ভাষা ও অলংকারিক বিন্যাস",
    exit: "Write and defend a 350-word position essay",
    exitBn: "৩৫০ শব্দের একটি অবস্থান-রচনা লেখা ও তা সমর্থন করা",
    focusSkills: ["writing", "speaking"],
    topics: ["Claims", "Evidence", "Counterarguments", "Hedging", "Rhetorical organization", "Position essay", "Defending a thesis"],
  },
  {
    index: 19, startDay: 361, endDay: 380, key: "independent-comprehension",
    title: "Independent comprehension", titleBn: "স্বাধীন অনুধাবন",
    summary: "Authentic articles, lectures, podcasts; vocabulary autonomy",
    summaryBn: "বাস্তব নিবন্ধ, বক্তৃতা, পডকাস্ট ও স্বাধীন শব্দভান্ডার",
    exit: "Work independently with level-appropriate authentic materials",
    exitBn: "উপযুক্ত মানের বাস্তব উপকরণ নিজে নিজে ব্যবহার করা",
    focusSkills: ["reading", "listening", "vocabulary"],
    topics: ["Authentic articles", "Lectures", "Podcasts", "Vocabulary autonomy", "Independent reading", "Independent listening", "Self-directed study"],
  },
  {
    index: 20, startDay: 381, endDay: 400, key: "capstone",
    title: "Capstone & transition", titleBn: "সমাপনী ও পরবর্তী ধাপ",
    summary: "Portfolio revision; weak-area clinics; mock proficiency tasks; learning plan",
    summaryBn: "পোর্টফোলিও পরিমার্জন, দুর্বল দিক ক্লিনিক, মক দক্ষতা পরীক্ষা ও শেখার পরিকল্পনা",
    exit: "Demonstrate balanced B1+/B2-oriented performance and a sustainable next plan",
    exitBn: "সুষম B1+/B2 পর্যায়ের দক্ষতা ও টেকসই পরবর্তী পরিকল্পনা দেখানো",
    focusSkills: ["speaking", "writing", "reading"],
    topics: ["Portfolio revision", "Weak-area clinic", "Mock proficiency", "Speaking capstone", "Writing capstone", "Learning plan", "Transition to B2"],
  },
];

export function phaseForDay(day: number): PhaseSpec {
  return phaseSpecs.find((p) => day >= p.startDay && day <= p.endDay) ?? phaseSpecs[phaseSpecs.length - 1];
}

export function isCheckpointDay(day: number): boolean {
  return day % CHECKPOINT_INTERVAL === 0 || day % PHASE_TASK_INTERVAL === 0 || BENCHMARK_DAYS.includes(day);
}

export function isBenchmarkDay(day: number): boolean {
  return BENCHMARK_DAYS.includes(day);
}

export function isPhaseTaskDay(day: number): boolean {
  return day % PHASE_TASK_INTERVAL === 0;
}
