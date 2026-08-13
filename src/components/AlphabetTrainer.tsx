"use client";

import { useMemo, useState } from "react";
import { Volume2, Check, X } from "lucide-react";
import { letters, confusablePairs, type LetterInfo } from "@/data/letters";
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

  return (
    <div className="alphabetTrainer">
      <div className="letterGrid">
        {shown.map((letter) => (
          <button
            key={letter.ar}
            className={`letterTile ${active.ar === letter.ar ? "active" : ""} ${letter.group}`}
            onClick={() => { setActive(letter); void playArabic(letter.ar); }}
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
            <button className="hearBtn" onClick={() => void playArabic(active.ar)}><Volume2 size={15}/> {pick(locale, { bn: "শব্দটি শুনুন", en: "Hear the sound" })}</button>
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

      <SoundDrill subset={shown.map((l) => l.ar)} locale={locale} />
    </div>
  );
}

// "Which did you hear?" — plays a letter, learner picks between two confusable
// options. No penalty; pure ear-training.
function SoundDrill({ subset, locale }: { subset: string[]; locale: Locale }) {
  const pairs = useMemo(
    () => confusablePairs.filter(([a, b]) => subset.includes(a) || subset.includes(b)),
    [subset],
  );
  const [round, setRound] = useState(0);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);

  const usablePairs = pairs.length ? pairs : confusablePairs;
  const pair = usablePairs[round % usablePairs.length];
  // The correct answer is randomly one of the pair, stable per round.
  const answerIndex = useMemo(() => Math.floor(Math.random() * 2), [round]);
  const answer = pair[answerIndex];

  function choose(choice: string) {
    setResult(choice === answer ? "right" : "wrong");
  }
  function next() {
    setResult(null);
    setRound((r) => r + 1);
  }

  return (
    <div className="soundDrill">
      <div className="soundDrillHead">
        <b>{pick(locale, { bn: "কোনটি শুনলেন?", en: "Which did you hear?" })}</b>
        <button className="hearBtn" onClick={() => void playArabic(answer)}><Volume2 size={15}/> {pick(locale, { bn: "আবার শুনুন", en: "Play sound" })}</button>
      </div>
      <div className="soundDrillOptions">
        {pair.map((ch) => (
          <button
            key={ch}
            className={`drillOption ${result && ch === answer ? "correct" : ""} ${result === "wrong" && ch !== answer ? "" : ""}`}
            disabled={Boolean(result)}
            onClick={() => choose(ch)}
            dir="rtl"
          >
            {ch}
          </button>
        ))}
      </div>
      {result && (
        <div className={`drillResult ${result}`}>
          {result === "right" ? <><Check size={15}/> {pick(locale, { bn: "ঠিক আছে!", en: "Correct!" })}</> : <><X size={15}/> {pick(locale, { bn: `এটি ছিল ${answer}`, en: `It was ${answer}` })}</>}
          <button onClick={next}>{pick(locale, { bn: "পরেরটি", en: "Next" })}</button>
        </div>
      )}
    </div>
  );
}
