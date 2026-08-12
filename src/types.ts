export type Skill = "reading" | "writing" | "listening" | "speaking" | "grammar" | "vocabulary";

export type Lesson = {
  day: number;
  title: string;
  titleBn: string;
  arabicTitle: string;
  phase: string;
  phaseBn: string;
  duration: string;
  focus: string;
  focusBn: string;
  vocabulary: string[];
  models: string[];
  grammar: string;
  grammarBn: string;
  goals: string[];
  goalsBn: string[];
  exercises: string[];
  exercisesBn: string[];
  skill: Skill;
  checkpoint?: boolean;
  // "What you're learning & why" — a detailed, multi-sentence briefing.
  brief: LessonBrief;
};

export type LessonBrief = {
  what: string;      // what you are learning today (a few sentences)
  whatBn: string;
  why: string;       // why it matters / how it connects / what you'll be able to do
  whyBn: string;
  buildsOn: string;  // link to prior learning + where it leads
  buildsOnBn: string;
};

export type DayProgress = {
  completed: boolean;
  answers: string[];
  confidence: number;
  feedback?: TutorFeedback;
  updatedAt: string;
};

export type FeedbackCopy = {
  headline: string;
  strengths: string[];
  correctionExplanations: string[];
  nextSteps: string[];
  teacherNote: string;
};

export type TutorFeedback = {
  score: number;
  headline: string;
  strengths: string[];
  corrections: Array<{ original: string; corrected: string; explanation: string }>;
  repairCodes: string[];
  nextSteps: string[];
  teacherNote: string;
  localized?: { bn: FeedbackCopy; en: FeedbackCopy };
};

export type ProgressMap = Record<number, DayProgress>;
