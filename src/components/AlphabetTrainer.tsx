"use client";

import { useMemo, useState } from "react";
import { getDrillPairs } from "@/lib/alphabetDrill";
import { Volume2, Check, X } from "lucide-react";
import { letters, type LetterInfo } from "@/data/letters";
import { playArabic } from "@/lib/audio";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

// Interactive Alphabet & Sounds trainer (PRD F4).
// - subset: optionally restrict to the letters taught on a given day
// - shows the four positional forms, a pronunciation tip, and audio
// - includes a short "which did you hear?" discrimination micro-drill

export default function AlphabetTrainer({ subset, locale }: { subset?: string[]; locale: Locale }) {
  const shown = useMemo<LetterInfo[]>(
    () => (subset && subset.length ? letters.filter((l) => subset.includes(l.ar)) : letters),
    [subset],
  );
  const [active, setActive] = useState<LetterInfo>(shown[0] ?? letters[0]);
  const [audioError, setAudioError] = useState(false);
  async function hearLetter(ch: string) {
    setAudioError(false);
    const source = await playArabic(ch);
    setAudioError(source === "unavailable");
  }

  // Reset active letter when subset changes (if it's no longer in shown)
  const shownChars = useMemo(() => shown.map(l => l.ar), [shown]);
  if (!shownChars.includes(active.ar) && shown.length > 0) {
    setActive(shown[0]);
  }

  return (
    <div className="alphabetTrainer">
      <div className="letterGrid">
        {shown.map((letter) => (
          <button
            key={letter.ar}
            className={`letterTile ${active.ar === letter.ar ? "active" : ""} ${letter.group}`}
            onClick={() => { setActive(letter); void hearLetter(letter.ar); }}
            aria-label={pick(locale,{bn:`${letter.nameBn} অক্ষরটি শুনুন`,en:`Hear letter ${letter.name}`})}
            aria-pressed={active.ar === letter.ar}
            title={letter.name}
          >
            <b dir="rtl">{letter.ar}</b>
            <small>{locale === "bn" ? letter.nameBn : letter.name}</small>
          </button>
        ))}
      </div>

      <div className="letterDetail">
        <div className="letterDetailHead">
          <span className="bigGlyph" dir="rtl">{active.ar}</span>
          <div>
            <b>{locale === "bn" ? active.nameBn : active.name} <i className="translit">/{active.translit}/</i></b>
            <p>{locale === "bn" ? active.tipBn : active.tipEn}</p>
            <button className="hearBtn" onClick={() => void hearLetter(active.ar)}><Volume2 size={15}/> {pick(locale, { bn: "শব্দটি শুনুন", en: "Hear the sound" })}</button>
          </div>
        </div>
        <div className="letterForms">
          {(["isolated","initial","medial","final"] as const).map((form) => (
            <div className="letterForm" key={form}>
              <span dir="rtl">{active.forms[form]}</span>
              <small>{pick(locale, {
                bn: { isolated: "একক", initial: "শুরুতে", medial: "মাঝে", final: "শেষে" }[form],
                en: { isolated: "isolated", initial: "initial", medial: "medial", final: "final" }[form],
              })}</small>
            </div>
          ))}
        </div>
      </div>

      {audioError && <p role="status">{pick(locale,{bn:"অডিও পাওয়া যায়নি। পরে আবার চেষ্টা করুন; উচ্চারণ-সহায়িকা আনুমানিক।",en:"Audio unavailable. Try again later; transliteration is only approximate."})}</p>}
      <SoundDrill key={shownChars.join("")} subset={shownChars} locale={locale} />
    </div>
  );
}

// "Which did you hear?" — plays a letter, learner picks between two confusable
// options. No penalty; pure ear-training.
// Only shows if there are valid confusable pairs within the taught subset.
function SoundDrill({ subset, locale }: { subset: string[]; locale: Locale }) {
  const fallbackPairs = useMemo(() => getDrillPairs(subset), [subset]);
  const [heard, setHeard] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const [round, setRound] = useState(0);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [answerIndex, setAnswerIndex] = useState(0);

  // If no pairs available, don't show drill
  if (fallbackPairs.length === 0) {
    return null;
  }

  const pair = fallbackPairs[round % fallbackPairs.length];
  const answer = pair[answerIndex];

  function choose(choice: string) {
    if (heard && !result) setResult(choice === answer ? "right" : "wrong");
  }

  async function hear() {
    setPlaying(true);
    setHeard(false);
    setAudioError(false);
    const index = heard ? answerIndex : Math.floor(Math.random() * 2);
    setAnswerIndex(index);
    const source = await playArabic(pair[index]);
    setHeard(source !== "unavailable" && source !== "cancelled");
    setAudioError(source === "unavailable");
    setPlaying(false);
  }

  function next() {
    setResult(null);
    setHeard(false);
    setAudioError(false);
    setRound((r) => r + 1);
  }

  return (
    <div className="soundDrill">
      <div className="soundDrillHead">
        <b>{pick(locale, { bn: "কোনটি শুনলেন?", en: "Which did you hear?" })}</b>
        <button
          className="hearBtn"
          onClick={hear}
          disabled={Boolean(result) || playing}
        >
          <Volume2 size={15}/> {pick(locale, { bn: "আবার শুনুন", en: "Play sound" })}
        </button>
      </div>
      <div className="soundDrillOptions">
        {pair.map((ch) => (
          <button
            key={ch}
            className={`drillOption ${result && ch === answer ? "correct" : ""} ${result === "wrong" && ch !== answer ? "" : ""}`}
            disabled={Boolean(result) || !heard || playing}
            onClick={() => choose(ch)}
            dir="rtl"
          >
            {ch}
          </button>
        ))}
      </div>
      {audioError && <p role="status">{pick(locale,{bn:"অডিও পাওয়া যায়নি। আবার চেষ্টা করুন; না শুনে উত্তর দিতে হবে না।",en:"Audio unavailable. Retry when ready; no answer is required without sound."})}</p>}
      {result && (
        <div role="status" className={`drillResult ${result}`}>
          {result === "right" ? <><Check size={15}/> {pick(locale, { bn: "ঠিক আছে!", en: "Correct!" })}</> : <><X size={15}/> {pick(locale, { bn: `এটি ছিল ${answer}`, en: `It was ${answer}` })}</>}
          <button onClick={next}>{pick(locale, { bn: "পরেরটি", en: "Next" })}</button>
        </div>
      )}
    </div>
  );
}
