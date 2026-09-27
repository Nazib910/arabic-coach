"use client";
import { useEffect, useState } from "react";
import type { Lesson } from "@/types";
import { pick, type Locale } from "@/lib/i18n";
import { parseReviews, recallCards, reviewCards, sameSpelling, scheduleReview, type RecallCard, type ReviewMap } from "@/lib/review";
import { playArabic } from "@/lib/audio";

export default function RecallPractice({ lesson, userId, locale, letterSubset }: { lesson: Lesson; userId: string; locale: Locale; letterSubset?: string[] }) {
  const storageKey = `arabic-coach-recall-v1:${userId}`;
  const [reviews, setReviews] = useState<ReviewMap>({});
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState<RecallCard[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");
  const [finished, setFinished] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [retrying, setRetrying] = useState(false);
  const card = cards[index];
  const learningCards = recallCards(lesson).filter(card => !letterSubset || letterSubset.includes(card.word));
  const availableCards = reviewCards(learningCards, reviews, new Date());
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setReviews(parseReviews(JSON.parse(localStorage.getItem(storageKey) ?? "{}"))); }
      catch { setNotice(pick(locale, { bn: "এই ব্রাউজারে review save করা যাচ্ছে না।", en: "Review storage is unavailable in this browser." })); }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [locale, storageKey]);
  function start() {
    const nextCards = reviewCards(learningCards, reviews, new Date());
    setCards(nextCards);
    // Shuffle only in a user event, never during render.
    const options = nextCards.map(item => item.word);
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    setChoices(options);
    setIndex(0); setAnswer(""); setResult(null); setRevealed(false); setFinished(false); setRetrying(false);
  }
  function check() {
    if (!card || result !== null || !answer.trim() || revealed) return;
    const correct = sameSpelling(answer, card.word);
    setResult(correct);
    if (retrying) return; // After seeing the answer this is rehearsal, not new retention evidence.
    const next = { ...reviews, [card.word]: scheduleReview(reviews[card.word], correct, new Date()) };
    setReviews(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setNotice(pick(locale, { bn: "ফলটি কেবল এই session-এ আছে; ব্রাউজার save ব্যর্থ।", en: "Result is session-only; browser save failed." })); }
  }
  function reveal() {
    if (!card || revealed || result !== null) return;
    setRevealed(true);
    if (retrying) return;
    const next = { ...reviews, [card.word]: scheduleReview(reviews[card.word], false, new Date()) };
    setReviews(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setNotice(pick(locale,{bn:"Review save হয়নি; এই session-এ অনুশীলন করুন।",en:"Review could not be saved; practise in this session."})); }
  }
  function next() {
    if (index + 1 >= cards.length) setFinished(true);
    else { setIndex(value => value + 1); setAnswer(""); setResult(null); setRevealed(false); setRetrying(false); }
  }
  return <section className="contentCard recallPractice" aria-label={pick(locale,{bn:"ছোট স্মৃতি অনুশীলন",en:"Quick recall practice"})}>
    <h2>{pick(locale,{bn:"৩–৫ মিনিট: মনে করে লিখুন",en:"3–5 minutes: retrieve, then check"})}</h2>
    <p>{pick(locale,{bn:"শব্দতালিকা না দেখে অর্থের আরবি লিখুন। প্রথম পাঠে চাইলে উত্তর চিনে বেছে নিন। এটি বানান/চেনার অনুশীলন—হরকত, উচ্চারণ বা সামগ্রিক দক্ষতার score নয়। Review এই account-এর জন্য এই ব্রাউজারেই থাকে।",en:"Without looking at the word list, write the Arabic for the meaning. Early lessons also offer recognition choices. This is spelling/recognition practice—not a check of vowels, pronunciation or overall mastery. Reviews stay in this browser for this account."})}</p>
    {!card || finished ? <><button className="primaryButton" onClick={start} disabled={!ready || !availableCards.length}>{pick(locale,{bn:finished?"আবার অনুশীলন":"শুরু করুন",en:finished?"Practise again":"Start practice"})}</button>{finished && <p role="status">{pick(locale,{bn:"আজকের ছোট অনুশীলন শেষ। ভুল শব্দগুলো আগামীকাল আবার আসবে; চাইলে এখনই শেখার অংশে ফিরে দেখুন।",en:"Practice finished. Missed words return tomorrow; revisit the examples now if needed."})}</p>}{!availableCards.length && <p>{pick(locale,{bn:"এই পাঠের যাচাইকৃত recall উপকরণ এখনো নেই।",en:"Checked recall materials are not available for this lesson yet."})}</p>}</> : <>
      <p>{index + 1}/{cards.length}</p><h3>{locale === "bn" ? card.bn : card.en}</h3>
      <label>{pick(locale,{bn:"আরবি উত্তর",en:"Arabic answer"})}<input dir="rtl" lang="ar" value={answer} onChange={event => setAnswer(event.target.value)} disabled={result !== null || revealed} onKeyDown={event => { if (event.key === "Enter") check(); }}/></label>
      {lesson.day <= 4 && <div className="practiceActions" aria-label={pick(locale,{bn:"অক্ষর বেছে নিন",en:"Choose the matching script"})}>{choices.map(word=><button key={word} lang="ar" dir="rtl" onClick={()=>setAnswer(word)} disabled={result!==null || revealed}>{word}</button>)}</div>}
      <div className="practiceActions"><button onClick={check} disabled={!answer.trim() || result !== null || revealed}>{pick(locale,{bn:"মিলিয়ে দেখুন",en:"Check answer"})}</button><button onClick={reveal} disabled={result !== null || revealed}>{pick(locale,{bn:"মনে পড়ছে না—শিখে নিই",en:"Show me—I need help"})}</button></div>
      {(result !== null || revealed) && <div role="status"><p>{pick(locale,{bn:revealed?"দেখে শিখুন; এই প্রচেষ্টা সঠিক recall হিসেবে গোনা হয়নি।":result?"বানান মিলেছে।":"এবার মিলেনি। সঠিক রূপটি দেখুন, তারপর আবার চেষ্টা করুন।",en:revealed?"Study the answer; this attempt is not counted as successful recall.":result?"Spelling matches.":"Not yet. Study the correct form, then retry."})}</p><strong dir="rtl" lang="ar">{card.word}</strong><div className="practiceActions"><button onClick={async () => { const source = await playArabic(card.word); if (source === "unavailable") setNotice(pick(locale,{bn:"অডিও পাওয়া যায়নি; পরে আবার চেষ্টা করুন।",en:"Audio unavailable; try again later."})); }}>{pick(locale,{bn:"শুনুন",en:"Listen"})}</button>{(result === false || revealed) && <button onClick={() => { setAnswer(""); setResult(null); setRevealed(false); setRetrying(true); }}>{pick(locale,{bn:"ঢেকে আবার চেষ্টা করুন (score নয়)",en:"Hide and retry (unscored)"})}</button>}<button onClick={next}>{pick(locale,{bn:"পরেরটি",en:"Next"})}</button></div></div>}
    </>}
    {notice && <p role="status">{notice}</p>}
  </section>;
}
