import type { FeedbackCopy, TutorFeedback } from "@/types";
import type { Locale } from "@/lib/i18n";

export function getFeedbackCopy(feedback: TutorFeedback, locale: Locale): FeedbackCopy {
  const localized = feedback.localized?.[locale];
  if (localized) return localized;
  return {
    headline: feedback.headline,
    strengths: feedback.strengths,
    correctionExplanations: feedback.corrections.map((item) => item.explanation),
    nextSteps: feedback.nextSteps,
    teacherNote: feedback.teacherNote,
  };
}
