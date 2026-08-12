"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import GuidedTour from "@/components/GuidedTour";
import ArabicInputAssistant from "@/components/ArabicInputAssistant";
import ImageEvidenceUploader, { type SubmissionImage } from "@/components/ImageEvidenceUploader";
import LanguageToggle from "@/components/LanguageToggle";
import HadithShowcase from "@/components/HadithShowcase";
import { useToast } from "@/components/ToastProvider";
import type { ProgressMap, TutorFeedback } from "@/types";
import { bengaliNumber, pick, type Locale } from "@/lib/i18n";
import { getFeedbackCopy } from "@/lib/feedback";

const STORAGE_KEY = "arabic-coach-progress-v1";
const skillIcon = {
  reading: BookOpen,
  writing: PenLine,
  listening: Headphones,
  speaking: MessageCircle,
  grammar: Brain,
  vocabulary: Languages,
};

export default function ArabicCoach({ user, isDemo = false, locale, onLocaleChange }: { user: User; isDemo?: boolean; locale: Locale; onLocaleChange: (locale: Locale) => void }) {
  const { toast } = useToast();
  const userStorageKey = `${STORAGE_KEY}:${user.id}`;
  const tourStorageKey = `arabic-coach-tour-v1:${user.id}`;
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [images, setImages] = useState<SubmissionImage[]>([]);
  const [confidence, setConfidence] = useState(3);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [cloudLoaded, setCloudLoaded] = useState(isDemo);
  const [syncState, setSyncState] = useState<"loading" | "saved" | "saving" | "offline">(isDemo ? "offline" : "loading");
  const [tourOpen, setTourOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [dueWords, setDueWords] = useState<Array<{ word: string; status: string }>>([]);
  const [showPassageTranslation, setShowPassageTranslation] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(userStorageKey) ?? localStorage.getItem(STORAGE_KEY);
        if (saved) setProgress(JSON.parse(saved));
      } catch { /* ignore malformed local data */ }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [userStorageKey]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(userStorageKey, JSON.stringify(progress));
  }, [progress, hydrated, userStorageKey]);

  useEffect(() => {
    if (!hydrated) return;
    const frame = window.requestAnimationFrame(() => {
      if (!localStorage.getItem(tourStorageKey)) setTourOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hydrated, tourStorageKey]);

  useEffect(() => {
    let cancelled = false;
    async function loadCloudProgress() {
      if (isDemo) return;
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("lesson_attempts").select("day,answers,confidence,completed,feedback,updated_at").eq("user_id", user.id).eq("attempt_number", 1);
      if (cancelled) return;
      if (error) { setSyncState("offline"); setCloudLoaded(true); return; }
      const remote: ProgressMap = {};
      for (const row of data ?? []) {
        remote[row.day] = {
          completed: row.completed,
          answers: Array.isArray(row.answers) ? row.answers.map(String) : [],
          confidence: row.confidence,
          feedback: row.feedback as TutorFeedback | undefined,
          updatedAt: row.updated_at,
        };
      }
      setProgress((local) => {
        const merged = { ...remote };
        for (const [day, item] of Object.entries(local)) {
          const remoteItem = remote[Number(day)];
          if (!remoteItem || new Date(item.updatedAt) > new Date(remoteItem.updatedAt)) merged[Number(day)] = item;
        }
        return merged;
      });
      setCloudLoaded(true);
      setSyncState("saved");
    }
    void loadCloudProgress();
    return () => { cancelled = true; };
  }, [isDemo, user.id]);

  // Spaced-repetition: load vocabulary due for review (today or overdue).
  useEffect(() => {
    if (isDemo) return;
    let cancelled = false;
    (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("vocabulary_mastery")
        .select("word,status,next_review_at")
        .eq("user_id", user.id)
        .neq("status", "mastered")
        .lte("next_review_at", new Date().toISOString())
        .order("next_review_at", { ascending: true })
        .limit(24);
      if (cancelled || error) return;
      setDueWords((data ?? []).map((row: { word: unknown; status: unknown }) => ({ word: String(row.word), status: String(row.status) })));
    })();
    return () => { cancelled = true; };
  }, [isDemo, user.id, progress]);

  const completed = Object.values(progress).filter((item) => item.completed).length;
  const currentDay = Math.min(completed + 1, COURSE_LENGTH);
  const lesson = selectedDay ? lessons[selectedDay - 1] : null;
  const completion = Math.round((completed / COURSE_LENGTH) * 100);
  const currentPhase = phaseForDay(currentDay);

  useEffect(() => {
    if (isDemo || !hydrated || !cloudLoaded || !selectedDay) return;
    const item = progress[selectedDay];
    if (!item) return;
    const timer = window.setTimeout(async () => {
      setSyncState("saving");
      const supabase = getSupabaseBrowserClient();
      const currentLesson = lessons[selectedDay - 1];
      const { error } = await supabase.from("lesson_attempts").upsert({
        user_id: user.id,
        day: selectedDay,
        lesson_title: currentLesson.title,
        answers: item.answers,
        confidence: item.confidence,
        completed: item.completed,
        feedback: item.feedback ?? null,
        score: item.feedback?.score ?? null,
        model_id: item.feedback ? "gpt" : null,
        attempt_number: 1,
        updated_at: item.updatedAt,
      }, { onConflict: "user_id,day,attempt_number" });
      if (error) { setSyncState("offline"); return; }
      if (item.completed) await supabase.from("learner_profiles").update({ current_day: Math.min(completed + 1, 400) }).eq("id", user.id);
      setSyncState("saved");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [cloudLoaded, completed, hydrated, isDemo, progress, selectedDay, user.id]);

  const streak = useMemo(() => {
    const dates = new Set(Object.values(progress).filter(p => p.completed).map(p => p.updatedAt.slice(0, 10)));
    let count = 0;
    const cursor = new Date();
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [progress]);

  function openLesson(day: number) {
    const saved = progress[day];
    setSelectedDay(day);
    setAnswers(saved?.answers ?? ["", "", ""]);
    setImages([]);
    setConfidence(saved?.confidence ?? 3);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveDraft(nextAnswers = answers) {
    if (!lesson) return;
    setProgress(prev => ({
      ...prev,
      [lesson.day]: {
        completed: prev[lesson.day]?.completed ?? false,
        answers: nextAnswers,
        confidence,
        feedback: prev[lesson.day]?.feedback,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateAnswer(index: number, value: string) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    saveDraft(next);
  }

  function updateConfidence(value: number) {
    setConfidence(value);
    if (!lesson) return;
    setProgress((previous) => ({ ...previous, [lesson.day]: { completed: previous[lesson.day]?.completed ?? false, answers, confidence: value, feedback: previous[lesson.day]?.feedback, updatedAt: new Date().toISOString() } }));
  }

  async function requestFeedback() {
    if (!lesson || (answers.every(answer => !answer.trim()) && images.length === 0)) return;
    setLoading(true);
    if (isDemo) {
      window.setTimeout(() => {
        const feedback: TutorFeedback = {
          score: 88,
          headline: "Strong start—your core sentence pattern is clear.",
          strengths: ["You completed the task with relevant Arabic.", "Your response follows the lesson’s target pattern."],
          corrections: [{ original: answers[0] || "أنا طالب", corrected: answers[0] || "أنا طالبٌ", explanation: "In a fully vocalized model, the predicate commonly carries tanwīn." }],
          repairCodes: ["G"],
          nextSteps: ["Read the corrected model aloud three times.", "Write one new sentence without looking.", "Continue to the next lesson when ready."],
          teacherNote: "This is sample demo feedback. Personal accounts receive live AI evaluation and long-term teacher memory.",
          localized: {
            bn: { headline: "চমৎকার শুরু—আপনার মূল বাক্যগঠনটি স্পষ্ট।", strengths: ["আপনি প্রাসঙ্গিক আরবি ব্যবহার করে কাজটি সম্পন্ন করেছেন।", "আপনার উত্তর পাঠের নির্ধারিত বাক্যগঠন অনুসরণ করেছে।"], correctionExplanations: ["পূর্ণ হরকতযুক্ত নমুনায় বিধেয় পদে সাধারণত তানউইন ব্যবহৃত হয়।"], nextSteps: ["সংশোধিত নমুনাটি তিনবার উচ্চস্বরে পড়ুন।", "না দেখে একটি নতুন বাক্য লিখুন।", "প্রস্তুত হলে পরবর্তী পাঠে যান।"], teacherNote: "এটি ডেমোর নমুনা মতামত। ব্যক্তিগত অ্যাকাউন্টে সরাসরি AI মূল্যায়ন ও দীর্ঘমেয়াদি শিক্ষক-স্মৃতি পাওয়া যায়।" },
            en: { headline: "Strong start—your core sentence pattern is clear.", strengths: ["You completed the task with relevant Arabic.", "Your response follows the lesson’s target pattern."], correctionExplanations: ["In a fully vocalized model, the predicate commonly carries tanwīn."], nextSteps: ["Read the corrected model aloud three times.", "Write one new sentence without looking.", "Continue to the next lesson when ready."], teacherNote: "This is sample demo feedback. Personal accounts receive live AI evaluation and long-term teacher memory." },
          },
        };
        setProgress((previous) => ({ ...previous, [lesson.day]: { completed: true, answers, confidence, feedback, updatedAt: new Date().toISOString() } }));
        toast({ variant: "success", title: pick(locale, { bn: "আপনার উত্তর দেখা হয়েছে", en: "Evaluation complete" }), description: pick(locale, { bn: "শিক্ষকের মতামত নিচে দেখতে পাবেন।", en: "Your AI teacher’s feedback is now available below." }) });
        setLoading(false);
      }, 900);
      return;
    }
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson, answers, images, confidence, locale, previousFeedback: progress[lesson.day]?.feedback, passage: (() => { const p = getPassage(lesson.day); return p ? { kind: p.kind, title: p.title, text: p.lines.map((line) => line.ar), questions: p.questions.map((q) => q.ar) } : undefined; })() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Tutor request failed");
      const feedback = data.feedback as TutorFeedback;
      setProgress(prev => ({
        ...prev,
        [lesson.day]: { completed: true, answers, confidence, feedback, updatedAt: new Date().toISOString() },
      }));
      toast({ variant: "success", title: pick(locale, { bn: "আপনার উত্তর দেখা হয়েছে", en: "Evaluation complete" }), description: pick(locale, { bn: "আপনার জন্য শিক্ষকের মতামত তৈরি হয়েছে।", en: "Your personalized AI feedback is ready." }) });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ variant: "error", title: pick(locale, { bn: "এখন উত্তর দেখা যাচ্ছে না", en: "AI evaluation failed" }), description: locale === "bn" ? "AI শিক্ষক এখন সাড়া দিচ্ছেন না। একটু পর আবার চেষ্টা করুন।" : message });
    } finally {
      setLoading(false);
    }
  }

  function finishTour() {
    localStorage.setItem(tourStorageKey, "completed");
    setTourOpen(false);
  }

  // Derive the upcoming phase and an accuracy-based action list, mirroring the
  // roadmap's "observed result → instructional response" adaptation table.
  function buildNextPhasePlan() {
    const upcoming = phaseForDay(Math.min(currentDay, COURSE_LENGTH));
    const recentScores = Object.values(progress)
      .filter((item) => item.feedback)
      .slice(-4)
      .map((item) => item.feedback!.score);
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
            const phaseDone = phaseLessons.filter((item) => progress[item.day]?.completed).length;
            const open = expandedPhase === phase.index || (expandedPhase === null && currentPhase.index === phase.index);
            return (
              <div key={phase.index} className={`phaseGroup ${open ? "open" : ""} ${currentPhase.index === phase.index ? "current" : ""}`}>
                <button className="phaseGroupHead" onClick={() => setExpandedPhase(open ? -1 : phase.index)}>
                  <span className="phaseGroupNo">{bengaliNumber(phase.index,locale)}</span>
                  <span className="phaseGroupTitle"><b>{locale === "bn" ? phase.titleBn : phase.title}</b><small>{pick(locale,{bn:`দিন ${bengaliNumber(phase.startDay,locale)}–${bengaliNumber(phase.endDay,locale)} · ${bengaliNumber(phaseDone,locale)}/${bengaliNumber(phaseLessons.length,locale)}`,en:`Days ${phase.startDay}–${phase.endDay} · ${phaseDone}/${phaseLessons.length}`})}</small></span>
                  <ChevronRight size={15} className="phaseChevron" />
                </button>
                {open && <div className="phaseGroupDays">{phaseLessons.map((item) => {
                  const done = progress[item.day]?.completed;
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
        <div className="accountPanel"><div className={`syncStatus ${syncState}`}><span>{syncState === "offline" ? <CloudOff/> : <Cloud/>}</span><div><b>{isDemo ? pick(locale,{bn:"ডেমো · শুধু ব্রাউজারে",en:"Demo · browser only"}) : syncState === "loading" ? pick(locale,{bn:"অগ্রগতি লোড হচ্ছে",en:"Loading progress"}) : syncState === "saving" ? pick(locale,{bn:"সংরক্ষণ হচ্ছে…",en:"Saving…"}) : syncState === "offline" ? pick(locale,{bn:"অফলাইন ব্যাকআপ",en:"Offline backup"}) : pick(locale,{bn:"ক্লাউডে সংরক্ষিত",en:"Saved to cloud"})}</b><small>{user.email}</small></div></div><button onClick={()=>setTourOpen(true)}><CircleHelp/>{pick(locale,{bn:"পরিচিতি দেখুন",en:"Guided tour"})}</button><button onClick={()=>getSupabaseBrowserClient().auth.signOut()}><LogOut/>{pick(locale,{bn:"সাইন আউট",en:"Sign out"})}</button></div>
      </aside>
      {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}
      <main className="mainArea">
        {lesson ? renderLesson() : renderOverview()}
      </main>
      {tourOpen && <GuidedTour isDemo={isDemo} onFinish={finishTour} locale={locale}/>} 
    </div>
  );

  function renderOverview() {
    const nextLesson = lessons[currentDay - 1];
    const recentFeedback = Object.values(progress).filter((item) => item.feedback).at(-1)?.feedback;
    const recentCopy = recentFeedback ? getFeedbackCopy(recentFeedback, locale) : null;
    const checkpointDays = lessons.filter((item) => item.checkpoint).map((item) => item.day);
    const checkpointCount = checkpointDays.filter((day) => progress[day]?.completed).length;
    const nextPhasePlan = buildNextPhasePlan();
    return (
      <div className="pageWrap overviewPage">
        <header className="hero">
          <div>
            <span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"আপনার আরবি শেখার পথ",en:"Your personal Arabic path"})}</span>
            <h1>{pick(locale,{bn:<>আসসালামু আলাইকুম,<br/><em>চলুন, আরবিকে একটু একটু করে নিজের করে নিই।</em></>,en:<>Assalamu alaikum,<br/><em>let’s make Arabic yours.</em></>})}</h1>
            <p>{pick(locale,{bn:"আপনার উত্তর দেখে এই কোর্স বুঝবে কোথায় আরও সাহায্য দরকার, আর সেই অনুযায়ী পরের পাঠ সাজাবে।",en:"A structured MSA program that learns from your answers and adapts every next step."})}</p>
            <button className="primaryButton" onClick={() => openLesson(nextLesson.day)}>{completed ? pick(locale,{bn:"শেখা চালিয়ে যান",en:"Continue learning"}) : pick(locale,{bn:"চলুন শুরু করি",en:"Start your diagnostic"})}<ArrowRight size={17}/></button>
          </div>
          <div className="heroArabic" aria-hidden="true"><span>العربية</span><small>خطوة بخطوة</small></div>
        </header>
        <section className="statsGrid">
          <article className="statCard progressCard"><div className="ring" style={{ "--value": `${completion * 3.6}deg` } as React.CSSProperties}><b>{bengaliNumber(completion,locale)}%</b></div><div><span>{pick(locale,{bn:"কোর্সের অগ্রগতি",en:"Course progress"})}</span><strong>{pick(locale,{bn:`${bengaliNumber(COURSE_LENGTH,locale)} দিনের মধ্যে ${bengaliNumber(completed,locale)} দিন`,en:`${completed} of ${COURSE_LENGTH} days`})}</strong><small>{pick(locale,{bn:`ধাপ ${bengaliNumber(currentPhase.index,locale)}/${bengaliNumber(phaseSpecs.length,locale)} · ${currentPhase.titleBn}`,en:`Phase ${currentPhase.index}/${phaseSpecs.length} · ${currentPhase.title}`})}</small></div></article>
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
        {!isDemo && dueWords.length > 0 && <section className="srsPanel">
          <div className="srsHead"><span className="eyebrow"><Languages size={14}/> {pick(locale,{bn:"আজ যে শব্দগুলো ঝালিয়ে নেবেন",en:"Vocabulary due for review"})}</span><b>{bengaliNumber(dueWords.length,locale)}</b></div>
          <p>{pick(locale,{bn:"এই শব্দগুলোর পুনরাবৃত্তির সময় হয়েছে। ছুঁয়ে উচ্চারণ শুনুন ও একটি বাক্যে ব্যবহার করুন।",en:"These words are scheduled for spaced review. Tap to hear each one and use it in a sentence."})}</p>
          <div className="srsChips">{dueWords.map((item,index)=><button key={`${item.word}-${index}`} className={`srsChip ${item.status}`} onClick={()=>speak(item.word)} title={pick(locale,{bn:"উচ্চস্বরে শুনুন",en:"Read aloud"})}><Volume2 size={13}/><b dir="rtl">{item.word}</b></button>)}</div>
        </section>}
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
    const skillLabels = { reading:{bn:"পাঠ",en:"reading"}, writing:{bn:"লেখা",en:"writing"}, listening:{bn:"শ্রবণ",en:"listening"}, speaking:{bn:"কথন",en:"speaking"}, grammar:{bn:"ব্যাকরণ",en:"grammar"}, vocabulary:{bn:"শব্দভান্ডার",en:"vocabulary"} } as const;
    const dailyMethod = locale === "bn" ? [["৫–৮ মিনিট","না দেখে মনে করুন"],["১০–১২ মিনিট","শুনুন ও লক্ষ্য করুন"],["১২–১৫ মিনিট","ধাপে ধাপে অনুশীলন"],["১০–১৫ মিনিট","নিজে ব্যবহার করুন"],["৩–৫ মিনিট","শেষে একটু ভাবুন"]] : [["5–8 min","Retrieve"],["10–12 min","Input & sound"],["12–15 min","Guided practice"],["10–15 min","Production"],["3–5 min","Reflect"]];
    return (
      <div className="pageWrap lessonPage">
        <header className="lessonHeader">
          <button className="backButton" onClick={() => setSelectedDay(null)}><ArrowLeft size={16}/> {pick(locale,{bn:"সারসংক্ষেপ",en:"Overview"})}</button>
          <div className="lessonMeta"><span>{pick(locale,{bn:`${bengaliNumber(COURSE_LENGTH,locale)} দিনের মধ্যে ${bengaliNumber(lesson.day,locale)}তম দিন`,en:`Day ${lesson.day} of ${COURSE_LENGTH}`})}</span><i/><span>{locale === "bn" ? lesson.phaseBn : lesson.phase}</span><i/><span><Clock3 size={13}/>{locale === "bn" ? "৪৫–৬০ মিনিট" : lesson.duration}</span></div>
          <div className="lessonTitleRow"><div><span className="skillBadge"><SkillIcon size={14}/>{pick(locale,skillLabels[lesson.skill])}</span><h1>{locale === "bn" ? lesson.titleBn : lesson.title}</h1><p dir="rtl">{lesson.arabicTitle}</p></div><div className="dayStamp">{bengaliNumber(String(lesson.day).padStart(2,"0"),locale)}</div></div>
        </header>
        {lesson.checkpoint && <div className="checkpointBanner"><Target/><div><b>{pick(locale,{bn:"মূল্যায়ন ধাপ",en:"Assessment checkpoint"})}</b><span>{pick(locale,{bn:"নোট ছাড়া কাজ করুন। প্রথম প্রচেষ্টাই জমা দিন, যাতে শিক্ষক আপনার মনে থাকা দক্ষতা যথাযথভাবে যাচাই করতে পারেন।",en:"Work without notes. Submit your first attempt so the tutor can measure retained skill accurately."})}</span></div></div>}
        <div className="lessonColumns"><div className="lessonContent">
          <section className="contentCard briefCard">
            <CardTitle number={bengaliNumber("00",locale)} title={pick(locale,{bn:"কী শিখছেন ও কেন",en:"What you’re learning & why"})} icon={<Sparkles/>}/>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"আজ কী শিখছেন",en:"What you’re learning"})}</span><p>{locale==="bn"?lesson.brief.whatBn:lesson.brief.what}</p></div>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"কেন এটি জরুরি",en:"Why it matters"})}</span><p>{locale==="bn"?lesson.brief.whyBn:lesson.brief.why}</p></div>
            <div className="briefBlock"><span className="briefLabel">{pick(locale,{bn:"কীসের সঙ্গে যুক্ত",en:"How it connects"})}</span><p>{locale==="bn"?lesson.brief.buildsOnBn:lesson.brief.buildsOn}</p></div>
          </section>
          <section className="contentCard"><CardTitle number={bengaliNumber("01",locale)} title={pick(locale,{bn:"আজকের শেখার লক্ষ্য",en:"Today’s outcomes"})} icon={<Target/>}/><ul className="goalList">{goals.map((goal)=><li key={goal}><Check size={14}/>{goal}</li>)}</ul></section>
          <section className="contentCard"><CardTitle number={bengaliNumber("02",locale)} title={pick(locale,{bn:"মূল শব্দভান্ডার",en:"Core vocabulary"})} icon={<Languages/>}/><div className="vocabGrid">{lesson.vocabulary.map((word,index)=><div className="vocabChip" key={`${word}-${index}`}><button title={pick(locale,{bn:"উচ্চস্বরে শুনুন",en:"Read aloud"})} onClick={()=>speak(word)}><Volume2 size={14}/></button><b dir="rtl">{word}</b></div>)}</div></section>
          <section className="contentCard"><CardTitle number={bengaliNumber("03",locale)} title={pick(locale,{bn:"বাক্যের ধরন লক্ষ্য করুন",en:"Notice the pattern"})} icon={<BookOpen/>}/><p className="grammarNote">{locale === "bn" ? lesson.grammarBn : lesson.grammar}</p><div className="modelStack">{lesson.models.map((model,index)=><div key={model}><span>{bengaliNumber(index+1,locale)}</span><p dir="rtl">{model}</p><button onClick={()=>speak(model)} aria-label={pick(locale,{bn:"নমুনাটি শুনুন",en:"Read model aloud"})}><Volume2 size={16}/></button></div>)}</div><p className="practiceHint"><CircleHelp size={15}/> {pick(locale,{bn:"প্রতিটি নমুনা ধীরে ও স্বাভাবিকভাবে পড়ুন, তারপর স্মৃতি থেকে একবার বলুন।",en:"Read each model slowly, naturally, then once from memory."})}</p></section>
          {passage && <section className="contentCard passageCard">
            <CardTitle number={bengaliNumber("04",locale)} title={passage.kind === "listening" ? pick(locale,{bn:"শুনে বোঝার লেখা",en:"Listening text"}) : pick(locale,{bn:"পড়ার লেখা",en:"Reading text"})} icon={passage.kind === "listening" ? <Headphones/> : <BookOpen/>}/>
            <div className="passageHead">
              <div><b>{locale==="bn"?passage.titleBn:passage.title}</b><span>{pick(locale,{bn:passage.introBn,en:passage.intro})}</span></div>
              <div className="passageActions">
                <button onClick={()=>speak(passage.lines.map((line)=>line.ar).join(" "))} title={pick(locale,{bn:"পুরোটা শুনুন",en:"Play all"})}><Volume2 size={15}/>{pick(locale,{bn:"পুরোটা শুনুন",en:"Play all"})}</button>
                <button className={showPassageTranslation?"active":""} onClick={()=>setShowPassageTranslation((value)=>!value)} title={pick(locale,{bn:"অনুবাদ",en:"Translation"})}><Languages size={15}/>{showPassageTranslation?pick(locale,{bn:"অনুবাদ লুকান",en:"Hide translation"}):pick(locale,{bn:"অনুবাদ দেখান",en:"Show translation"})}</button>
              </div>
            </div>
            <div className="passageLines">{passage.lines.map((line,index)=>(
              <div className="passageLine" key={index}>
                <button onClick={()=>speak(line.ar)} aria-label={pick(locale,{bn:"এই লাইনটি শুনুন",en:"Read this line"})}><Volume2 size={15}/></button>
                <div><p dir="rtl">{line.ar}</p>{showPassageTranslation && <small>{locale==="bn"?line.bn:line.en}</small>}</div>
              </div>
            ))}</div>
            <div className="passageQuestions"><h4>{pick(locale,{bn:"বোঝার প্রশ্ন",en:"Comprehension"})}</h4><ol>{passage.questions.map((q,index)=><li key={index}><span dir="rtl">{q.ar}</span><small>{locale==="bn"?q.bn:q.en}</small></li>)}</ol><p className="practiceHint"><CircleHelp size={15}/> {pick(locale,{bn:"উত্তরগুলো নিচের অনুশীলনে আরবিতে লিখুন।",en:"Answer these in Arabic in the practice below."})}</p></div>
          </section>}
          <section className="contentCard exerciseCard"><CardTitle number={bengaliNumber("05",locale)} title={pick(locale,{bn:"এবার নিজে চেষ্টা করুন",en:"Practice & produce"})} icon={<PenLine/>}/>{exercises.map((exercise,index)=><div className="exercise" key={exercise}><label><span>{bengaliNumber(index+1,locale)}</span>{exercise}</label><ArabicInputAssistant value={answers[index] || ""} onChange={(value)=>updateAnswer(index,value)} placeholder={index===2 ? pick(locale,{bn:"এখানে আপনার আরবি উত্তর লিখুন বা তৈরি করুন…",en:"Write or build your Arabic response here…"}) : "اكتب إجابتك هنا…"} rows={index===2?6:4} vocabulary={lesson.vocabulary} locale={locale}/></div>)}</section>
          <section className="contentCard imageEvidenceCard"><ImageEvidenceUploader images={images} onChange={setImages} locale={locale} onError={(description)=>toast({ variant:"error", title:pick(locale,{bn:"ছবি যোগ করা যায়নি",en:"Could not add image"}), description })}/></section>
          <section className="contentCard submitCard"><div><span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"AI শিক্ষকের মতামত",en:"AI teacher review"})}</span><h2>{pick(locale,{bn:"উত্তরগুলো দেখে নেব?",en:"Ready for precise feedback?"})}</h2><p>{pick(locale,{bn:"AI শিক্ষক দেখবেন কোথায় ভালো করেছেন, কোথায় একটু ঠিক করা দরকার এবং এরপর কী অনুশীলন করবেন।",en:"Your work is evaluated for accuracy, vocabulary, grammar, and communication—not just marked right or wrong."})}</p></div><div className="confidence"><label>{pick(locale,{bn:"উত্তর নিয়ে কতটা নিশ্চিত?",en:"Confidence"})} <b>{bengaliNumber(confidence,locale)}/৫</b></label><input type="range" min="1" max="5" value={confidence} onChange={(event)=>updateConfidence(Number(event.target.value))}/></div><button className="primaryButton" onClick={requestFeedback} disabled={loading || (answers.every((answer)=>!answer.trim()) && images.length===0)}>{loading ? <><span className="spinner"/>{pick(locale,{bn:"শিক্ষক উত্তরগুলো দেখছেন…",en:"Teacher is reviewing…"})}</> : <><Send size={16}/>{feedback ? pick(locale,{bn:"আবার দেখে দিন",en:"Review again"}) : pick(locale,{bn:"শিক্ষককে দেখান",en:"Submit to my teacher"})}</>}</button></section>
          {feedback && <FeedbackPanel feedback={feedback} locale={locale}/>} 
          <div className="lessonNav"><button disabled={lesson.day===1} onClick={()=>openLesson(lesson.day-1)}><ArrowLeft/> {pick(locale,{bn:"আগের পাঠ",en:"Previous"})}</button><button disabled={lesson.day===COURSE_LENGTH} onClick={()=>openLesson(Math.min(COURSE_LENGTH,lesson.day+1))}>{pick(locale,{bn:"পরের পাঠ",en:"Next lesson"})} <ArrowRight/></button></div>
        </div><aside className="lessonAside"><div className="asideCard"><span className="eyebrow">{pick(locale,{bn:"দৈনিক পদ্ধতি",en:"Daily method"})}</span>{dailyMethod.map(([time,label])=><div key={label}><b>{time}</b><span>{label}</span></div>)}</div><div className="asideQuote" dir="rtl"><b>قليلٌ دائمٌ خيرٌ من كثيرٍ منقطعٍ</b><span>{pick(locale,{bn:"অল্প হলেও নিয়মিত প্রচেষ্টা, অনিয়মিত অধিক প্রচেষ্টার চেয়ে উত্তম।",en:"Steady little effort is better than interrupted abundance."})}</span></div></aside></div>
      </div>
    );
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

function CardTitle({number,title,icon}:{number:string;title:string;icon:React.ReactNode}) {
  return <div className="cardTitle"><span className="cardIcon">{icon}</span><div><span>{number}</span><h2>{title}</h2></div></div>;
}

function FeedbackPanel({feedback,locale}:{feedback:TutorFeedback;locale:Locale}) {
  const copy = getFeedbackCopy(feedback, locale);
  return <section className="feedbackPanel"><div className="feedbackTop"><div className="scoreCircle"><strong>{bengaliNumber(feedback.score,locale)}</strong><span>/100</span></div><div><span className="eyebrow"><Sparkles size={14}/> {pick(locale,{bn:"শিক্ষকের মতামত",en:"Teacher evaluation"})}</span><h2>{copy.headline}</h2><p>{copy.teacherNote}</p></div></div><div className="feedbackGrid"><div><h3><Check/>{pick(locale,{bn:"যা ভালো করেছেন",en:"What you did well"})}</h3><ul>{copy.strengths.map((item)=><li key={item}>{item}</li>)}</ul></div><div><h3><Target/>{pick(locale,{bn:"এরপর যা করবেন",en:"Next steps"})}</h3><ul>{copy.nextSteps.map((item)=><li key={item}>{item}</li>)}</ul></div></div>{feedback.corrections.length>0 && <div className="corrections"><h3>{pick(locale,{bn:"যেগুলো একটু ঠিক করবেন",en:"Corrections to study"})}</h3>{feedback.corrections.map((item,index)=><article key={index}><p className="wrong" dir="auto">{item.original}</p><ArrowRight size={15}/><p className="right" dir="auto">{item.corrected}</p><small>{copy.correctionExplanations[index] ?? item.explanation}</small></article>)}</div>}<div className="repairCodes">{feedback.repairCodes.map((code)=><span key={code}>{code}</span>)}</div></section>;
}
