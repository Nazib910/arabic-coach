"use client";

import { useEffect, useMemo, useState } from "react";
import { useLearningProgress } from "@/lib/useLearningProgress";
import { applyFeedback } from "@/lib/progress";
import { useCheckProgress } from "@/lib/useCheckProgress";
import { nextCheckDay, repairDay } from "@/lib/checkpoint";
import LessonCheckpoint from "@/components/LessonCheckpoint";
import LearningBackup from "@/components/LearningBackup";
import ReadingPractice from "@/components/ReadingPractice";
import QuranCourse from "@/components/QuranCourse";
import { getModelMeaning } from "@/data/learningMaterials";
import { TutorFeedbackSchema } from "@/lib/tutorContract";
import {
  ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronRight,
  CircleHelp, Clock3, Download, Flame, Headphones, Languages,
  LayoutDashboard, Menu, MessageCircle, PenLine, Send, Sparkles,
  Target, Trophy, Volume2, X, Cloud, CloudOff, LogOut,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { lessons } from "@/data/lessons";
import { phaseSpecs, phaseForDay, COURSE_LENGTH } from "@/data/phases";
import { getPassage } from "@/data/passages";
import { playArabic, stopArabic } from "@/lib/audio";
import { getGloss } from "@/data/glossary";
import { simpleTranslit } from "@/lib/translit";
import AlphabetTrainer from "@/components/AlphabetTrainer";
import RecallPractice from "@/components/RecallPractice";
import SpeakingPractice from "@/components/SpeakingPractice";
import { alphabetIntroductions } from "@/data/foundation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import GuidedTour from "@/components/GuidedTour";
import ArabicInputAssistant from "@/components/ArabicInputAssistant";
import ImageEvidenceUploader, { type SubmissionImage } from "@/components/ImageEvidenceUploader";
import LanguageToggle from "@/components/LanguageToggle";
import HadithShowcase from "@/components/HadithShowcase";
import { useToast } from "@/components/ToastProvider";
import type { TutorFeedback } from "@/types";
import { bengaliNumber, pick, type Locale } from "@/lib/i18n";
import { getFeedbackCopy } from "@/lib/feedback";

const skillIcon = {
  reading: BookOpen,
  writing: PenLine,
  listening: Headphones,
  speaking: MessageCircle,
  grammar: Brain,
  vocabulary: Languages,
};

export default function ArabicCoach({ user, isDemo = false, locale, onLocaleChange, onExitDemo }: { user: User; isDemo?: boolean; locale: Locale; onLocaleChange: (locale: Locale) => void; onExitDemo?: () => void }) {
  const { toast } = useToast();
  const { checks, save: saveCheck, storageError: checkStorageError } = useCheckProgress(user.id);
  const [track,setTrack]=useState<"msa"|"quran">("msa");
  const tourStorageKey = `arabic-coach-tour-v1:${user.id}`;
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { progress, setProgress, hydrated, syncState, retrySync } = useLearningProgress(user.id, isDemo);
  const answers = selectedDay ? progress[selectedDay]?.answers ?? lessons[selectedDay - 1].exercises.map(() => "") : [];
  const [images, setImages] = useState<SubmissionImage[]>([]);
  const confidence = selectedDay ? progress[selectedDay]?.confidence ?? 3 : 3;
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [coreSession, setCoreSession] = useState(true);
  const [coreSet, setCoreSet] = useState(0);
  useEffect(() => () => stopArabic(), []);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showPassageTranslation, setShowPassageTranslation] = useState(false);
  const [translitOverride, setTranslitOverride] = useState<boolean | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const frame = window.requestAnimationFrame(() => {
      try { if (!localStorage.getItem(tourStorageKey)) setTourOpen(true); } catch { /* tour remains available manually */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hydrated, tourStorageKey]);


  const completed = Object.values(checks).filter((item) => item.passed).length;
  const currentDay = nextCheckDay(checks);
  const lesson = selectedDay ? lessons[selectedDay - 1] : null;
  const completion = Math.round((completed / COURSE_LENGTH) * 100);
  const currentPhase = phaseForDay(currentDay);

  const streak = useMemo(() => {
    const dates = new Set(Object.values(checks).map(p => p.attemptedAt.slice(0, 10)));
    let count = 0;
    const cursor = new Date();
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [checks]);

  function openLesson(day: number) {
    if (!hydrated || day < 1 || day > COURSE_LENGTH) return;
    stopArabic();
    setTrack("msa");
    setSelectedDay(day);
    setCoreSet(0);
    setImages([]);
    setShowPassageTranslation(false);
    setShowTranscript(false);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveDraft(nextAnswers = answers) {
    if (!lesson) return;
    setProgress(prev => ({
      ...prev,
      [lesson.day]: {
        completed: false,
        answers: nextAnswers,
        confidence,
        feedback: undefined,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateAnswer(index: number, value: string) {
    const next = [...answers];
    next[index] = value;
    saveDraft(next);
  }

  function updateConfidence(value: number) {
    if (!lesson) return;
    setProgress((previous) => ({ ...previous, [lesson.day]: { completed: previous[lesson.day]?.completed ?? false, answers, confidence: value, feedback: previous[lesson.day]?.feedback, updatedAt: new Date().toISOString() } }));
  }

  async function requestFeedback() {
    if (loading || !lesson || (answers.every(answer => !answer.trim()) && images.length === 0)) return;
    if (isDemo) {
      toast({ variant: "info", title: pick(locale, { bn: "ডেমোতে AI মূল্যায়ন নেই", en: "No AI grading in demo" }), description: pick(locale, { bn: "আপনার খসড়া এই ব্রাউজারে আছে। নিচের ছোট অনুশীলনে উত্তর মিলিয়ে দেখুন—এখানে বানানো score দেওয়া হয় না।", en: "Your draft stays in this browser. Use the quick practice to check answers; demo work is not given a made-up score." }) });
      return;
    }
    setLoading(true);
    const submitted = [...answers];
    try {
      const response = await fetch("/api/tutor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(110_000),
        body: JSON.stringify({ lesson: { day: lesson.day }, answers: submitted, images, confidence }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Tutor request failed");
      const feedback: TutorFeedback = { ...TutorFeedbackSchema.parse(data.feedback), source: "ai", assessedSkill: lesson.skill === "speaking" || lesson.skill === "listening" ? "writing" : lesson.skill };
      setProgress(prev => ({ ...prev, [lesson.day]: applyFeedback(prev[lesson.day], submitted, confidence, feedback, lesson.exercises.length, new Date().toISOString()) }));
      toast({ variant: "success", title: pick(locale, { bn: "লেখার পরামর্শ প্রস্তুত", en: "Written feedback ready" }), description: data.saved ? pick(locale, { bn: "এটি লেখা/ছবির মূল্যায়ন—শোনা-বলার দক্ষতার score নয়।", en: "This reviews text/images, not spoken or listening proficiency." }) : pick(locale, { bn: "ক্লাউডে review history রাখা যায়নি। ফল এই ডিভাইসে আছে; sync আবার চেষ্টা করুন।", en: "Review history could not be saved to cloud. The result is on this device; retry sync." }) });
    } catch (error) {
      toast({ variant: "error", title: pick(locale, { bn: "এখন উত্তর দেখা যাচ্ছে না", en: "AI evaluation unavailable" }), description: pick(locale, { bn: "আপনার খসড়া রাখা হয়েছে। ছোট অনুশীলন চালিয়ে যান বা পরে আবার জমা দিন।", en: error instanceof Error ? error.message : "Your draft is retained. Try quick practice or submit again later." }) });
    } finally { setLoading(false); }
  }

  function finishTour() {
    try { localStorage.setItem(tourStorageKey, "completed"); } catch { /* dismiss without persistence */ }
    setTourOpen(false);
  }

  // Derive the upcoming phase and an accuracy-based action list, mirroring the
  // roadmap's "observed result → instructional response" adaptation table.
  function buildNextPhasePlan() {
    const upcoming = phaseForDay(Math.min(currentDay, COURSE_LENGTH));
    const recentScores = Object.values(checks)
      .sort((a,b)=>Date.parse(a.attemptedAt)-Date.parse(b.attemptedAt))
      .slice(-4).map(item=>100*item.correct/item.total);
    const avg = recentScores.length ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : null;
    const actions: Array<{ bn: string; en: string }> = [];
    if (avg === null) {
      actions.push({ bn: "প্রথম পাঠ শেষ করুন—তারপর পরিকল্পনা আপনার ফলাফল অনুযায়ী সাজবে।", en: "Complete a lesson—your plan will adapt to your results." });
    } else if (avg < 70) {
      actions.push({ bn: "নতুন ব্যাকরণ থামিয়ে ছোট ধাপে পুনরায় শিখুন ও ২ দিন মেরামত করুন।", en: "Pause new grammar; reteach in smaller steps with 2 repair days." });
    } else if (avg < 85) {
      actions.push({ bn: "নির্ধারিত গতিতে চলুন; সবচেয়ে দুর্বল দুটি বিষয়ে বাড়তি অনুশীলন যোগ করুন।", en: "Continue at pace; add retrieval for your two weakest categories." });
    } else if (avg < 95) {
      actions.push({ bn: "পুনরাবৃত্তি কমিয়ে খোলা কথা ও লেখা বাড়ান।", en: "Reduce repetitive drills; add open-ended speaking and writing." });
    } else {
      actions.push({ bn: "সংক্ষিপ্ত পুনরালোচনা; দ্রুত শ্রবণ ও বাস্তব উপকরণ যোগ করুন।", en: "Compact review; add faster listening and authentic input." });
    }
    actions.push({ bn: upcoming.summaryBn, en: upcoming.summary });
    return { phase: upcoming, actions };
  }

  return (
    <div className={`appShell locale-${locale}`}>
      <a className="skipLink" href="#learning-content">{pick(locale,{bn:"মূল পাঠে যান",en:"Skip to learning content"})}</a>
      <button className="mobileMenu" onClick={() => setSidebarOpen(true)} aria-label={pick(locale,{bn:"কোর্স মেনু খুলুন",en:"Open course menu"})}><Menu size={22} /></button>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brandRow">
          <button className="brand" onClick={() => { setSelectedDay(null); setSidebarOpen(false); }}>
            <span className="brandMark">ض</span><span><b>Darija</b><small>{pick(locale,{bn:"আরবি শেখার সঙ্গী",en:"Arabic learning studio"})}</small></span>
          </button>
          <button className="closeMenu" onClick={() => setSidebarOpen(false)} aria-label={pick(locale,{bn:"মেনু বন্ধ করুন",en:"Close menu"})}><X /></button>
        </div>
        <div className="sidebarLocale"><LanguageToggle locale={locale} onChange={onLocaleChange} compact/></div>
        <button className={`overviewLink ${selectedDay === null ? "active" : ""}`} onClick={() => { setSelectedDay(null); setSidebarOpen(false); }}>
          <LayoutDashboard size={17} /> {pick(locale,{bn:"সারসংক্ষেপ",en:"Overview"})}
        </button>
        <div className="courseLabel"><span>{pick(locale,{bn:"৪০০ দিনের কোর্স",en:"400-day course"})}</span><b>{bengaliNumber(completed,locale)}/{bengaliNumber(COURSE_LENGTH,locale)}</b></div>
        <div className="dayList">
          {phaseSpecs.map((phase) => {
            const phaseLessons = lessons.slice(phase.startDay - 1, phase.endDay);
            const phaseDone = phaseLessons.filter((item) => checks[item.day]?.passed).length;
            const open = expandedPhase === phase.index || (expandedPhase === null && currentPhase.index === phase.index);
            return (
              <div key={phase.index} className={`phaseGroup ${open ? "open" : ""} ${currentPhase.index === phase.index ? "current" : ""}`}>
                <button className="phaseGroupHead" onClick={() => setExpandedPhase(open ? -1 : phase.index)}>
                  <span className="phaseGroupNo">{bengaliNumber(phase.index,locale)}</span>
                  <span className="phaseGroupTitle"><b>{locale === "bn" ? phase.titleBn : phase.title}</b><small>{pick(locale,{bn:`দিন ${bengaliNumber(phase.startDay,locale)}–${bengaliNumber(phase.endDay,locale)} · ${bengaliNumber(phaseDone,locale)}/${bengaliNumber(phaseLessons.length,locale)}`,en:`Days ${phase.startDay}–${phase.endDay} · ${phaseDone}/${phaseLessons.length}`})}</small></span>
                  <ChevronRight size={15} className="phaseChevron" />
                </button>
                {open && <div className="phaseGroupDays">{phaseLessons.map((item) => {
                  const done = checks[item.day]?.passed;
                  const active = selectedDay === item.day;
                  return (
                    <button key={item.day} className={`dayLink ${active ? "active" : ""}`} onClick={() => openLesson(item.day)}>
                      <span className={`dayNumber ${done ? "done" : item.day === currentDay ? "current" : ""}`}>{done ? <Check size={13} /> : bengaliNumber(item.day,locale)}</span>
                      <span><b>{locale === "bn" ? item.titleBn : item.title}</b><small>{item.arabicTitle}</small></span>
                      {item.checkpoint && <span className="checkpointDot" title={pick(locale,{bn:"মূল্যায়ন",en:"Checkpoint"})} />}
                    </button>
                  );
                })}</div>}
              </div>
            );
          })}
        </div>
        <div className="sidebarDownloads">
          <a href="/Arabic_30_Day_Adaptive_Workbook.pdf" download><Download size={15}/> {pick(locale,{bn:"ওয়ার্কবুক PDF",en:"Workbook PDF"})}</a>
          <a href="/Arabic_400_Day_Master_Roadmap.pdf" download><Download size={15}/> {pick(locale,{bn:"৪০০ দিনের রোডম্যাপ",en:"400-day roadmap"})}</a>
        </div>
        <div className="accountPanel"><div className={`syncStatus ${syncState}`}><span>{syncState === "offline" ? <CloudOff/> : <Cloud/>}</span><div><b>{isDemo ? pick(locale,{bn:"ডেমো · শুধু ব্রাউজারে",en:"Demo · browser only"}) : syncState === "loading" ? pick(locale,{bn:"অগ্রগতি লোড হচ্ছে",en:"Loading progress"}) : syncState === "saving" ? pick(locale,{bn:"সংরক্ষণ হচ্ছে…",en:"Saving…"}) : syncState === "offline" ? pick(locale,{bn:"অফলাইন ব্যাকআপ",en:"Offline backup"}) : pick(locale,{bn:"ক্লাউডে সংরক্ষিত",en:"Saved to cloud"})}</b><small>{user.email}</small></div></div>{!isDemo && syncState === "offline" && <button onClick={retrySync}>{pick(locale,{bn:"আবার sync করুন",en:"Retry sync"})}</button>}<button onClick={()=>setTourOpen(true)}><CircleHelp/>{pick(locale,{bn:"পরিচিতি দেখুন",en:"Guided tour"})}</button><button onClick={()=>onExitDemo ? onExitDemo() : getSupabaseBrowserClient().auth.signOut()}><LogOut/>{pick(locale,{bn:"সাইন আউট",en:"Sign out"})}</button></div>
      </aside>
      {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}
      <main id="learning-content" tabIndex={-1} className="mainArea">
        <div className="pageWrap trackHeader">
          <nav className="practiceActions" aria-label={pick(locale,{bn:"শেখার পথ",en:"Learning track"})}>
            <button aria-pressed={track==="msa"} onClick={()=>{stopArabic();setTrack("msa");}}>{pick(locale,{bn:"Foundation ও MSA",en:"Foundation & MSA"})}</button>
            <button aria-pressed={track==="quran"} onClick={()=>{stopArabic();setTrack("quran");}}>{pick(locale,{bn:"কুরআনের ভাষা",en:"Quran language"})}</button>
          </nav>
          <p className="releaseNotice">{pick(locale,{bn:"এই release-এ AI review/server audio সাময়িক বন্ধ। মূল পাঠ, local check, bundled/device audio ও backup ব্যবহার করুন। নতুন review/check history cloud-এ sync হয় না।",en:"AI review/server audio are paused in this release. Core lessons, local checks, bundled/device audio and backups remain available. New review/check history does not cloud-sync."})}</p>
          {checkStorageError && <p role="alert">{pick(locale,{bn:"Check save হয়নি—browser storage unavailable।",en:"Check could not be saved—browser storage unavailable."})}</p>}
          {repairDay(checks) && track==="msa" && <button className="primaryButton" onClick={()=>openLesson(repairDay(checks)!)}>{pick(locale,{bn:`আগে পাঠ ${repairDay(checks)} ঝালাই করুন`,en:`Repair lesson ${repairDay(checks)} first`})}</button>}
        </div>
        {track==="quran" ? <div className="pageWrap"><QuranCourse userId={user.id} locale={locale}/></div> : lesson ? renderLesson() : renderOverview()}
      </main>
      {tourOpen && <GuidedTour isDemo={isDemo} onFinish={finishTour} locale={locale}/>}
    </div>
  );

  function renderOverview() {
    const nextLesson = lessons[currentDay - 1];
    const recentFeedback = Object.values(progress).filter((item) => item.feedback).sort((a,b)=>Date.parse(a.updatedAt)-Date.parse(b.updatedAt)).at(-1)?.feedback;
    const recentCopy = recentFeedback ? getFeedbackCopy(recentFeedback, locale) : null;
    const checkpointDays = lessons.filter((item) => item.checkpoint).map((item) => item.day);
    const checkpointCount = checkpointDays.filter((day) => checks[day]?.passed).length;
    const nextPhasePlan = buildNextPhasePlan();
    return (
      <div className="pageWrap overviewPage">
        <header className="hero">
          <div>
            <span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"আপনার আরবি শেখার পথ",en:"Your personal Arabic path"})}</span>
            <h1>{pick(locale,{bn:<>আসসালামু আলাইকুম,<br/><em>চলুন, আরবিকে একটু একটু করে নিজের করে নিই।</em></>,en:<>Assalamu alaikum,<br/><em>let’s make Arabic yours.</em></>})}</h1>
            <p>{pick(locale,{bn:"হরফ, অর্থ ও ছোট অনুশীলন দিয়ে শুরু করুন। লিখিত কাজের AI পরামর্শ আলাদা; কথন ও শোনার পূর্ণ মূল্যায়ন এখনো নেই।",en:"Start with letters, meanings and short practice. AI reviews written work separately; full speaking and listening assessment is not yet available."})}</p>
            <button className="primaryButton" onClick={() => openLesson(nextLesson.day)}>{completed ? pick(locale,{bn:"শেখা চালিয়ে যান",en:"Continue learning"}) : pick(locale,{bn:"চলুন শুরু করি",en:"Start your diagnostic"})}<ArrowRight size={17}/></button>
          </div>
          <div className="heroArabic" aria-hidden="true"><span>العربية</span><small>خطوة بخطوة</small></div>
        </header>
        <section className="statsGrid">
          <article className="statCard progressCard"><div className="ring" style={{ "--value": `${completion * 3.6}deg` } as React.CSSProperties}><b>{bengaliNumber(completion,locale)}%</b></div><div><span>{pick(locale,{bn:"মূল session-এর স্থানীয় check",en:"Local core-session checks"})}</span><strong>{pick(locale,{bn:`${bengaliNumber(COURSE_LENGTH,locale)} দিনের মধ্যে ${bengaliNumber(completed,locale)} দিন`,en:`${completed} of ${COURSE_LENGTH} days`})}</strong><small>{pick(locale,{bn:`ধাপ ${bengaliNumber(currentPhase.index,locale)}/${bengaliNumber(phaseSpecs.length,locale)} · ${currentPhase.titleBn}`,en:`Phase ${currentPhase.index}/${phaseSpecs.length} · ${currentPhase.title}`})}</small></div></article>
          <article className="statCard"><span className="iconBox amber"><Flame/></span><div><span>{pick(locale,{bn:"টানা শেখার দিন",en:"Study streak"})}</span><strong>{pick(locale,{bn:`${bengaliNumber(streak,locale)} দিন`,en:`${streak} ${streak === 1 ? "day" : "days"}`})}</strong><small>{pick(locale,{bn:"প্রতিদিন একটু করলেই অনেক দূর যাওয়া যায়",en:"Consistency builds fluency"})}</small></div></article>
          <article className="statCard"><span className="iconBox green"><Trophy/></span><div><span>{pick(locale,{bn:"মূল্যায়ন ধাপ",en:"Checkpoints"})}</span><strong>{pick(locale,{bn:`${bengaliNumber(checkpointDays.length,locale)}টির মধ্যে ${bengaliNumber(checkpointCount,locale)}টি`,en:`${checkpointCount} of ${checkpointDays.length}`})}</strong><small>{pick(locale,{bn:"ছোট ছোট ধাপে এগিয়ে চলুন",en:"Evidence-based advancement"})}</small></div></article>
        </section>
        <section className="sectionBlock">
          <div className="sectionHeading"><div><span className="eyebrow">{pick(locale,{bn:"এরপর যা শিখবেন",en:"Recommended next"})}</span><h2>{pick(locale,{bn:"আজকের পাঠ",en:"Today’s lesson"})}</h2></div><span className="timePill"><Clock3 size={14}/>{locale === "bn" ? "৪৫–৬০ মিনিট" : nextLesson.duration}</span></div>
          <article className="nextLessonCard" onClick={() => openLesson(nextLesson.day)}><div className="lessonIndex">{locale === "bn" ? bengaliNumber(String(nextLesson.day).padStart(2,"0"),locale) : String(nextLesson.day).padStart(2,"0")}</div><div className="nextLessonCopy"><span>{locale === "bn" ? nextLesson.phaseBn : nextLesson.phase}</span><h3>{locale === "bn" ? nextLesson.titleBn : nextLesson.title}</h3><p dir="rtl">{nextLesson.arabicTitle}</p><small>{locale === "bn" ? nextLesson.focusBn : nextLesson.focus}</small></div><button aria-label={pick(locale,{bn:"পাঠ খুলুন",en:"Open lesson"})}><ChevronRight/></button></article>
        </section>
        {nextPhasePlan && <section className="nextPhasePanel">
          <span className="eyebrow"><Target size={14}/> {pick(locale,{bn:"পরবর্তী ধাপের পরিকল্পনা",en:"Next-phase plan"})}</span>
          <h2>{pick(locale,{bn:`ধাপ ${bengaliNumber(nextPhasePlan.phase.index,locale)}: ${nextPhasePlan.phase.titleBn}`,en:`Phase ${nextPhasePlan.phase.index}: ${nextPhasePlan.phase.title}`})}</h2>
          <p>{pick(locale,{bn:nextPhasePlan.phase.exitBn,en:nextPhasePlan.phase.exit})}</p>
          <ul>{nextPhasePlan.actions.map((action)=><li key={action.en}><ChevronRight size={14}/>{pick(locale,action)}</li>)}</ul>
        </section>}
        <LearningBackup userId={user.id} locale={locale}/>
        <RecallPractice key="overview-recall" lesson={nextLesson} userId={user.id} locale={locale}/>
        <section className="sectionBlock">
          <div className="sectionHeading"><div><span className="eyebrow">{pick(locale,{bn:"২০ ধাপের পথ",en:"The 20-phase roadmap"})}</span><h2>{pick(locale,{bn:"৪০০ দিনের শেখার পথ",en:"Your 400-day learning map"})}</h2></div></div>
          <div className="phaseTracker">{phaseSpecs.map((phase) => {
            const phaseLessons = lessons.slice(phase.startDay - 1, phase.endDay);
            const total = phaseLessons.length;
            const done = phaseLessons.filter((item) => progress[item.day]?.completed).length;
            const state = done === total ? "done" : currentPhase.index === phase.index ? "current" : done > 0 ? "started" : "locked";
            const scores = phaseLessons.map((item) => progress[item.day]?.feedback?.score).filter((s): s is number => typeof s === "number");
            const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
            return <article className={`phaseTrackCard ${state}`} key={phase.index} onClick={() => openLesson(Math.max(phase.startDay, Math.min(currentDay, phase.endDay)))}>
              <div className="phaseTrackTop"><span className="phaseTrackNo">{bengaliNumber(phase.index,locale)}</span>{avg !== null && <span className="phaseTrackScore">{bengaliNumber(avg,locale)}</span>}</div>
              <h3>{locale === "bn" ? phase.titleBn : phase.title}</h3>
              <div className="miniProgress"><i style={{width:`${total?done/total*100:0}%`}}/></div>
              <small>{pick(locale,{bn:`দিন ${bengaliNumber(phase.startDay,locale)}–${bengaliNumber(phase.endDay,locale)} · ${bengaliNumber(done,locale)}/${bengaliNumber(total,locale)}`,en:`Days ${phase.startDay}–${phase.endDay} · ${done}/${total}`})}</small>
            </article>;
          })}</div>
        </section>
        <HadithShowcase locale={locale}/>
        <section className="teacherBanner"><span className="teacherIcon"><Brain/></span><div><span className="eyebrow">{pick(locale,{bn:"আপনার AI শিক্ষক",en:"Adaptive teacher"})}</span><h2>{recentCopy ? recentCopy.headline : pick(locale,{bn:"আপনার উত্তর দেখেই ঠিক হবে এরপর কী শিখবেন",en:"Your answers shape what comes next"})}</h2><p>{recentCopy ? recentCopy.teacherNote : pick(locale,{bn:"একটি পাঠ শেষ করুন। AI শিক্ষক আপনার ভালো দিক, ভুলগুলো এবং এরপর কী অনুশীলন করবেন—সব সহজ করে জানাবেন।",en:"Complete a lesson and your AI teacher will diagnose patterns, correct Arabic, and prescribe targeted repair work."})}</p></div></section>
      </div>
    );
  }

  function renderLesson() {
    if (!lesson) return null;
    const SkillIcon = skillIcon[lesson.skill];
    const feedback = progress[lesson.day]?.feedback;
    const goals = locale === "bn" ? lesson.goalsBn : lesson.goals;
    const exercises = locale === "bn" ? lesson.exercisesBn : lesson.exercises;
    const passage = getPassage(lesson.day);
    // Transliteration crutch: on by default for the first two weeks, off after,
    // unless the learner has manually overridden it.
    const showTranslit = translitOverride ?? (lesson.day <= 14);
    // Alphabet days (2–4) show the interactive trainer with that day's letters.
    const alphabetSubset = alphabetIntroductions;
    const allTrainerLetters = alphabetSubset[lesson.day] ?? null;
    const letterSetStart = allTrainerLetters ? (coreSet % Math.ceil(allTrainerLetters.length/5))*5 : 0;
    const trainerLetters = allTrainerLetters && (coreSession ? allTrainerLetters.slice(letterSetStart, letterSetStart+5) : allTrainerLetters);
    const coreSetCount = Math.max(lesson.models.length, Math.ceil(lesson.vocabulary.length / 5), Math.ceil((allTrainerLetters?.length ?? 0) / 5));
    const vocabSetStart = (coreSet % Math.ceil(lesson.vocabulary.length/5))*5;
    const coreVocabulary = lesson.vocabulary.slice(vocabSetStart,vocabSetStart+5);
    const skillLabels = { reading:{bn:"পাঠ",en:"reading"}, writing:{bn:"লেখা",en:"writing"}, listening:{bn:"শ্রবণ",en:"listening"}, speaking:{bn:"কথন",en:"speaking"}, grammar:{bn:"ব্যাকরণ",en:"grammar"}, vocabulary:{bn:"শব্দভান্ডার",en:"vocabulary"} } as const;
    const dailyMethod = locale === "bn" ? [["৩ মিনিট","আগের শব্দ মনে করুন"],["৫ মিনিট","শুনুন ও অর্থ বুঝুন"],["৫ মিনিট","ছোট অনুশীলন"],["২–৫ মিনিট","ভুল ঠিক করে থামুন"]] : [["3 min","Recall"],["5 min","Hear & understand"],["5 min","Quick practice"],["2–5 min","Repair & stop"]];
    return (
      <div className="pageWrap lessonPage">
        <header className="lessonHeader">
          <button className="backButton" onClick={() => setSelectedDay(null)}><ArrowLeft size={16}/> {pick(locale,{bn:"সারসংক্ষেপ",en:"Overview"})}</button>
          <div className="lessonMeta"><span>{pick(locale,{bn:`${bengaliNumber(COURSE_LENGTH,locale)} দিনের মধ্যে ${bengaliNumber(lesson.day,locale)}তম দিন`,en:`Day ${lesson.day} of ${COURSE_LENGTH}`})}</span><i/><span>{locale === "bn" ? lesson.phaseBn : lesson.phase}</span><i/><span><Clock3 size={13}/>{pick(locale,{bn:coreSession?"১৫–২০ মিনিট: মূল session":"বাড়তি কাজ: নিজের গতিতে",en:coreSession?"15–20 min core":"Extension: at your pace"})}</span></div>
          <div className="lessonTitleRow"><div><span className="skillBadge"><SkillIcon size={14}/>{pick(locale,skillLabels[lesson.skill])}</span><h1>{locale === "bn" ? lesson.titleBn : lesson.title}</h1><p dir="rtl">{lesson.arabicTitle}</p></div><div className="dayStamp">{bengaliNumber(String(lesson.day).padStart(2,"0"),locale)}</div></div>
        </header>
        <section className="sessionGuide contentCard"><h2>{pick(locale,{bn:"অল্প করে শিখুন, প্রয়োজনে একই পাঠে ফিরুন",en:"A small session, not a race"})}</h2><p>{pick(locale,{bn:"প্রথমে সর্বোচ্চ ৫টি শব্দ বা কয়েকটি হরফ, একটি নমুনা এবং ছোট recall করুন। তারপর থামতে পারেন। পুরো পাঠ শেষ হতে একাধিক session লাগতে পারে—মূল ৪০০ দিনের সময়সূচি আর একই ফলের নিশ্চয়তা নয়।",en:"Start with up to five words or a few letters, one model and quick recall. Then stop if you need to. A full lesson can take several sessions; the original 400-day pace and outcomes are not guaranteed."})}</p><button aria-pressed={!coreSession} onClick={()=>setCoreSession(value=>!value)}>{pick(locale,{bn:coreSession?"বাড়তি পাঠ ও AI review দেখুন":"ছোট মূল session-এ ফিরুন",en:coreSession?"Show extended lesson & AI review":"Return to short core session"})}</button>{lesson.day > 80 && <p role="note">{pick(locale,{bn:"এই advanced পাঠ template-ভিত্তিক; সম্পূর্ণ guided course হিসেবে content review এখনো বাকি।",en:"This advanced lesson is template-based; content review for fully guided learning is still pending."})}</p>}{isDemo && <p>{pick(locale,{bn:"ডেমো: কোনো AI score নয়; ছোট অনুশীলন এবং খসড়া শুধু এই ব্রাউজারে।",en:"Demo: no AI scores; practice and drafts stay in this browser."})}</p>}</section>
        {coreSession && coreSetCount > 1 && <div className="practiceActions" aria-label={pick(locale,{bn:"ছোট শব্দগুচ্ছ বেছে নিন",en:"Choose a small learning set"})}>{Array.from({length:coreSetCount},(_,index)=><button key={index} aria-pressed={index===coreSet} onClick={()=>setCoreSet(index)}>{pick(locale,{bn:`শব্দগুচ্ছ ${bengaliNumber(index+1,locale)}`,en:`Set ${index+1}`})}</button>)}</div>}
        {lesson.checkpoint && !coreSession && <div className="checkpointBanner"><Target/><div><b>{pick(locale,{bn:"মূল্যায়ন ধাপ",en:"Assessment checkpoint"})}</b><span>{pick(locale,{bn:"নোট ছাড়া কাজ করুন। প্রথম প্রচেষ্টাই জমা দিন, যাতে শিক্ষক আপনার মনে থাকা দক্ষতা যথাযথভাবে যাচাই করতে পারেন।",en:"Work without notes. Submit your first attempt so the tutor can measure retained skill accurately."})}</span></div></div>}
        <div className="lessonColumns"><div className="lessonContent">
          <section className="contentCard briefCard">
            <CardTitle number={bengaliNumber("00",locale)} title={pick(locale,{bn:"কী শিখছেন ও কেন",en:"What you’re learning & why"})} icon={<Sparkles/>}/>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"আজ কী শিখছেন",en:"What you’re learning"})}</span><p>{locale==="bn"?lesson.brief.whatBn:lesson.brief.what}</p></div>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"কেন এটি জরুরি",en:"Why it matters"})}</span><p>{locale==="bn"?lesson.brief.whyBn:lesson.brief.why}</p></div>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"কীসের সঙ্গে যুক্ত",en:"How it connects"})}</span><p>{locale==="bn"?lesson.brief.buildsOnBn:lesson.brief.buildsOn}</p></div>
          </section>
          <section className="contentCard"><CardTitle number={bengaliNumber("01",locale)} title={pick(locale,{bn:"আজকের শেখার লক্ষ্য",en:"Today’s outcomes"})} icon={<Target/>}/><ul className="goalList">{goals.map((goal)=><li key={goal}><Check size={14}/>{goal}</li>)}</ul></section>
          <section className="contentCard"><div className="cardTitleRow"><CardTitle number={bengaliNumber("02",locale)} title={pick(locale,{bn:"মূল শব্দভান্ডার",en:"Core vocabulary"})} icon={<Languages/>}/><button className={`translitToggle ${showTranslit?"active":""}`} onClick={()=>setTranslitOverride(!showTranslit)} title={pick(locale,{bn:"উচ্চারণ-সহায়িকা",en:"Pronunciation help"})}>{showTranslit?pick(locale,{bn:"উচ্চারণ লুকান",en:"Hide abc"}):pick(locale,{bn:"উচ্চারণ (abc)",en:"Show abc"})}</button></div><div className="vocabGrid">{(coreSession ? coreVocabulary : lesson.vocabulary).map((word,index)=>{const g=getGloss(word);const meaning=locale==="bn"?g.bn:g.en;return <div className="vocabChip" key={`${word}-${index}`}><button title={pick(locale,{bn:"উচ্চস্বরে শুনুন",en:"Read aloud"})} onClick={()=>speak(word)}><Volume2 size={14}/></button><div className="vocabText"><b dir="rtl">{word}</b>{showTranslit && <i className="translit">{g.translit}</i>}<small className="gloss">{meaning || pick(locale,{bn:"অর্থ এখনো যোগ করা হয়নি",en:"Meaning not yet available"})}</small></div></div>;})}</div></section>
          {trainerLetters && <section className="contentCard"><CardTitle number={bengaliNumber("2b",locale)} title={pick(locale,{bn:"হরফ ও ধ্বনি অনুশীলন",en:"Letters & sounds trainer"})} icon={<Volume2/>}/><p className="grammarNote">{pick(locale,{bn:"প্রতিটি অক্ষরে চাপ দিয়ে ধ্বনি শুনুন, চারটি রূপ দেখুন, তারপর ‘কোনটি শুনলেন’ অনুশীলন করুন।",en:"Tap each letter to hear its sound, see its four forms, then try the ‘which did you hear?’ drill."})}</p><AlphabetTrainer key={`${lesson.day}-${coreSet}-${coreSession}`} subset={trainerLetters} locale={locale}/></section>}
          <section className="contentCard"><CardTitle number={bengaliNumber("03",locale)} title={pick(locale,{bn:"বাক্যের ধরন লক্ষ্য করুন",en:"Notice the pattern"})} icon={<BookOpen/>}/><p className="grammarNote">{locale === "bn" ? lesson.grammarBn : lesson.grammar}</p><div className="modelStack">{lesson.models.map((model,index)=><div key={model} hidden={coreSession&&index!==coreSet%lesson.models.length}><span>{bengaliNumber(index+1,locale)}</span><div className="modelText"><p dir="rtl" lang="ar">{model}</p>{getModelMeaning(lesson.day,index) && <small>{pick(locale,getModelMeaning(lesson.day,index)!)}</small>}{showTranslit && <i className="translit">{simpleTranslit(model)}</i>}</div><button onClick={()=>speak(model)} aria-label={pick(locale,{bn:"নমুনাটি শুনুন",en:"Read model aloud"})}><Volume2 size={16}/></button></div>)}</div><p className="practiceHint"><CircleHelp size={15}/> {pick(locale,{bn:"প্রতিটি নমুনা ধীরে ও স্বাভাবিকভাবে পড়ুন, তারপর স্মৃতি থেকে একবার বলুন।",en:"Read each model slowly, naturally, then once from memory."})}</p></section>
          {passage && <section className="contentCard passageCard">
            <CardTitle number={bengaliNumber("04",locale)} title={passage.kind === "listening" ? pick(locale,{bn:"শুনে বোঝার লেখা",en:"Listening text"}) : pick(locale,{bn:"পড়ার লেখা",en:"Reading text"})} icon={passage.kind === "listening" ? <Headphones/> : <BookOpen/>}/>
            <div className="passageHead">
              <div><b>{locale==="bn"?passage.titleBn:passage.title}</b><span>{pick(locale,{bn:passage.introBn,en:passage.intro})}</span></div>
              <div className="passageActions">
                <button onClick={()=>speak(passage.lines.map((line)=>line.ar).join(" "))} title={pick(locale,{bn:"পুরোটা শুনুন",en:"Play all"})}><Volume2 size={15}/>{pick(locale,{bn:"পুরোটা শুনুন",en:"Play all"})}</button>
                <button className={showPassageTranslation?"active":""} onClick={()=>setShowPassageTranslation((value)=>!value)} title={pick(locale,{bn:"অনুবাদ",en:"Translation"})}><Languages size={15}/>{showPassageTranslation?pick(locale,{bn:"অনুবাদ লুকান",en:"Hide translation"}):pick(locale,{bn:"অনুবাদ দেখান",en:"Show translation"})}</button>
              </div>
            </div>
            {passage.kind === "listening" && <button className="hearBtn" aria-expanded={showTranscript} onClick={()=>setShowTranscript(value=>!value)}>{pick(locale,{bn:showTranscript?"লেখা লুকান":"আগে শুনুন, তারপর লেখা দেখুন",en:showTranscript?"Hide transcript":"Listen first, then reveal transcript"})}</button>}
            {(passage.kind !== "listening" || showTranscript) && <div className="passageLines">{passage.lines.map((line,index)=>(
              <div className="passageLine" key={index}>
                <button onClick={()=>speak(line.ar)} aria-label={pick(locale,{bn:"এই লাইনটি শুনুন",en:"Read this line"})}><Volume2 size={15}/></button>
                <div><p dir="rtl" lang="ar">{line.ar}</p>{showPassageTranslation && <small>{locale==="bn"?line.bn:line.en}</small>}</div>
              </div>
            ))}</div>}
            <div className="passageQuestions"><h4>{pick(locale,{bn:"বোঝার প্রশ্ন",en:"Comprehension"})}</h4><ol>{passage.questions.map((q,index)=><li key={index}><span dir="rtl">{q.ar}</span><small>{locale==="bn"?q.bn:q.en}</small></li>)}</ol><p className="practiceHint"><CircleHelp size={15}/> {pick(locale,{bn:"উত্তরগুলো নিচের অনুশীলনে আরবিতে লিখুন।",en:"Answer these in Arabic in the practice below."})}</p></div>
          </section>}
          <RecallPractice key={`recall-${lesson.day}-${coreSet}-${coreSession}`} lesson={coreSession ? {...lesson,vocabulary:coreVocabulary} : lesson} userId={user.id} locale={locale} letterSubset={coreSession ? trainerLetters ?? undefined : undefined}/>
          <ReadingPractice key={`reading-${lesson.day}`} day={lesson.day} locale={locale}/>
          <SpeakingPractice key={`speaking-${lesson.day}`} locale={locale}/>
          <LessonCheckpoint key={`check-${lesson.day}`} day={lesson.day} locale={locale} onResult={saveCheck} onRepair={openLesson}/>
          {!coreSession && <section className="contentCard exerciseCard"><CardTitle number={bengaliNumber("05",locale)} title={pick(locale,{bn:"বাড়তি অনুশীলন ও লেখা",en:"Extended practice & writing"})} icon={<PenLine/>}/>{exercises.map((exercise,index)=><div className="exercise" key={exercise}><label htmlFor={`exercise-${lesson.day}-${index}`}><span>{bengaliNumber(index+1,locale)}</span>{exercise}</label><ArabicInputAssistant id={`exercise-${lesson.day}-${index}`} value={answers[index] || ""} onChange={(value)=>updateAnswer(index,value)} placeholder={pick(locale,{bn:"আরবি উত্তর বা নিজের অসুবিধা লিখুন…",en:"Write your Arabic answer or explain a difficulty…"})} rows={index===2?6:4} vocabulary={lesson.vocabulary} locale={locale}/></div>)}</section>}
          <section hidden={coreSession} className="contentCard imageEvidenceCard"><ImageEvidenceUploader images={images} onChange={setImages} locale={locale} onError={(description)=>toast({ variant:"error", title:pick(locale,{bn:"ছবি যোগ করা যায়নি",en:"Could not add image"}), description })}/></section>
          <section hidden={coreSession} className="contentCard submitCard"><div><span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"AI শিক্ষকের মতামত",en:"AI teacher review"})}</span><h2>{pick(locale,{bn:"উত্তরগুলো দেখে নেব?",en:"Ready for precise feedback?"})}</h2><p>{pick(locale,{bn:"AI শিক্ষক দেখবেন কোথায় ভালো করেছেন, কোথায় একটু ঠিক করা দরকার এবং এরপর কী অনুশীলন করবেন।",en:"Your work is evaluated for accuracy, vocabulary, grammar, and communication—not just marked right or wrong."})}</p></div><div className="confidence"><label>{pick(locale,{bn:"উত্তর নিয়ে কতটা নিশ্চিত?",en:"Confidence"})} <b>{bengaliNumber(confidence,locale)}/৫</b></label><input type="range" min="1" max="5" value={confidence} onChange={(event)=>updateConfidence(Number(event.target.value))}/></div><button className="primaryButton" onClick={requestFeedback} disabled={loading || (answers.every((answer)=>!answer.trim()) && images.length===0)}>{loading ? <><span className="spinner"/>{pick(locale,{bn:"শিক্ষক উত্তরগুলো দেখছেন…",en:"Teacher is reviewing…"})}</> : <><Send size={16}/>{feedback ? pick(locale,{bn:"আবার দেখে দিন",en:"Review again"}) : pick(locale,{bn:"শিক্ষককে দেখান",en:"Submit to my teacher"})}</>}</button></section>
          {feedback && <FeedbackPanel feedback={feedback} locale={locale}/>}
          <div className="lessonNav"><button disabled={lesson.day===1} onClick={()=>openLesson(lesson.day-1)}><ArrowLeft/> {pick(locale,{bn:"আগের পাঠ",en:"Previous"})}</button><button disabled={lesson.day===COURSE_LENGTH} onClick={()=>openLesson(Math.min(COURSE_LENGTH,lesson.day+1))}>{pick(locale,{bn:"পরের পাঠ",en:"Next lesson"})} <ArrowRight/></button></div>
        </div><aside className="lessonAside"><div className="asideCard"><span className="eyebrow">{pick(locale,{bn:"দৈনিক পদ্ধতি",en:"Daily method"})}</span>{dailyMethod.map(([time,label])=><div key={label}><b>{time}</b><span>{label}</span></div>)}</div><div className="asideQuote" dir="rtl"><b>قليلٌ دائمٌ خيرٌ من كثيرٍ منقطعٍ</b><span>{pick(locale,{bn:"অল্প হলেও নিয়মিত প্রচেষ্টা, অনিয়মিত অধিক প্রচেষ্টার চেয়ে উত্তম।",en:"Steady little effort is better than interrupted abundance."})}</span></div></aside></div>
      </div>
    );
  }

  async function speak(text: string, assetSrc?: string) {
    const result = await playArabic(text, assetSrc);
    if (result === "unavailable") {
      setTranslitOverride(true);
      toast({
        variant: "error",
        title: pick(locale, { bn: "এই ডিভাইসে অডিও পাওয়া যায়নি", en: "Audio unavailable on this device" }),
        description: pick(locale, { bn: "উচ্চারণের জন্য নিচের রোমান হরফ (উচ্চারণ-সহায়িকা) দেখুন।", en: "Use the transliteration (pronunciation help) shown below to sound it out." }),
      });
    }
  }
}

function CardTitle({number,title,icon}:{number:string;title:string;icon:React.ReactNode}) {
  return <div className="cardTitle"><span className="cardIcon">{icon}</span><div><span>{number}</span><h2>{title}</h2></div></div>;
}

function FeedbackPanel({feedback,locale}:{feedback:TutorFeedback;locale:Locale}) {
  const copy = getFeedbackCopy(feedback, locale);
  return <section className="feedbackPanel"><p className="grammarNote">{pick(locale,{bn:feedback.source === "ai"?"শুধু জমা দেওয়া লেখা/ছবির পরামর্শ। এটি pronunciation, listening বা পুরো পাঠে mastery প্রমাণ করে না।":"পুরোনো বা নমুনা feedback—নতুন নিয়মে যাচাই করা হয়নি।",en:feedback.source === "ai"?"Feedback on submitted text/images only. This does not establish pronunciation, listening or whole-lesson mastery.":"Legacy or sample feedback—not verified under the current assessment rules."})}</p><div className="feedbackTop"><div className="scoreCircle"><strong>{bengaliNumber(feedback.score,locale)}</strong><span>/100</span></div><div><span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"শিক্ষকের মতামত",en:"Teacher evaluation"})}</span><h2>{copy.headline}</h2><p>{copy.teacherNote}</p></div></div><div className="feedbackGrid"><div><h3><Check/>{pick(locale,{bn:"যা ভালো করেছেন",en:"What you did well"})}</h3><ul>{copy.strengths.map((item)=><li key={item}>{item}</li>)}</ul></div><div><h3><Target/>{pick(locale,{bn:"এরপর যা করবেন",en:"Next steps"})}</h3><ul>{copy.nextSteps.map((item)=><li key={item}>{item}</li>)}</ul></div></div>{feedback.corrections.length>0 && <div className="corrections"><h3>{pick(locale,{bn:"যেগুলো একটু ঠিক করবেন",en:"Corrections to study"})}</h3>{feedback.corrections.map((item,index)=><article key={index}><p className="wrong" dir="auto">{item.original}</p><ArrowRight size={15}/><p className="right" dir="auto">{item.corrected}</p><small>{copy.correctionExplanations[index] ?? item.explanation}</small></article>)}</div>}<div className="repairCodes">{feedback.repairCodes.map((code)=><span key={code}>{code}</span>)}</div></section>;
}
