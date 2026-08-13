# PRD — "True Beginner Foundation" for the Arabic Coach

> **Goal in one line:** Make it possible for a person who has *never seen an Arabic letter* and knows *no Arabic sound* — and who is not technical — to open this app and build a rock‑solid Arabic foundation, learning both the **words** and **how to pronounce them**, without ever hitting a wall.

- **Author:** ENI (with LO)
- **Status:** Draft for approval
- **Scope of this PRD:** The beginner journey, primarily **Phase 1 (Days 1–20 Foundation)** and the cross‑cutting systems (audio, meanings, transliteration, alphabet trainer) that also serve every later phase.
- **Non‑negotiable constraint from LO:** *Never turn this into an "advanced" app. The learning sequence must be preserved and clean — no mess. Nothing half‑baked.*

---

## 0. How this PRD was validated (cross‑check log)

Per LO's instruction to "cross‑check twice, thrice," every core finding below was verified from **three independent angles** and only kept when all three agreed:

1. **Direct code read** (ENI) — read `ArabicCoach.tsx`, `handcraftedLessons.ts`, `passages.ts`, `ArabicInputAssistant.tsx`, `types.ts`, `lessonBriefs.ts`, `phases.ts`.
2. **Independent code audit** (Explore subagent) — exhaustive file audit with severity ratings and line evidence.
3. **Independent pedagogy research** (Domain Research subagent) — best‑practice beginner MSA sequencing from multiple authoritative teaching methodologies (Al‑Kitaab, Kalimah Center, LTSDR/Hawramani, Buruj, CEFR A1–A2).

Where the audit (what the app *does*) and the research (what a beginner *needs*) pointed at the same gap, it is marked **[TRIPLE‑CONFIRMED]**.

---

## 1. Vision & success definition

### 1.1 Vision
A calm, encouraging, mobile‑friendly path where a complete beginner (Bengali‑ or English‑speaking) learns Arabic in the correct order — **sound → letter → syllable → word (with meaning) → sentence → communication** — hearing every item in clear native‑quality audio and always knowing what each word means.

### 1.2 What "solid foundation" concretely means (our acceptance bar)
Adapted from the research's A1 definition. By the **end of Phase 1 (Day 20)** a learner should be able to, *without help*:
- Recognise and pronounce **all 28 letters** in isolation and tell apart the confusable pairs (ح/ه, ق/ك, ع/ء, س/ص, ط/ت).
- Read any **fully‑vowelled** word aloud with reasonable accuracy.
- Understand and say **~50 high‑frequency words** *with their meaning*.
- Build simple **nominal sentences** (subject + predicate, no verb).
- Use the definite article الـ, gender (ة), pronoun suffixes, and numbers 0–100 in short sentences.

### 1.3 Guiding principles (design guardrails)
1. **Sound‑first, always.** Nothing is taught silently. Every letter, word, model and passage is *hearable* reliably.
2. **Never a word without a meaning.** Every vocabulary item shows its gloss (BN + EN).
3. **Nothing used before it is taught.** Sequence integrity is enforced, not assumed.
4. **Fully vowelled (mushakkal) for all of Phase 1–2.** Harakāt are training wheels for reading; reduce only later.
5. **Transliteration is a *temporary*, optional crutch** (first ~2 weeks), always paired with the script, easy to switch off.
6. **Small daily load** (5–10 new words), context over lists, spaced repetition.
7. **Beginner‑calm UX.** No jargon, no dead ends, graceful fallback when the AI tutor or audio is unavailable.
8. **Do not advance the ceiling.** We deepen the *floor*; we do not add advanced features that complicate the beginner path.

---

## 2. Personas

- **Amina (primary): absolute beginner, Bengali‑speaking, non‑technical.** Has never seen Arabic script. Wants to read Qur'an/greetings and simple sentences. Phone user. Easily discouraged by silence or confusion.
- **Rafiq (secondary): English‑speaking absolute beginner.** Comfortable with apps, zero Arabic.
- **Returning learner:** knows the alphabet, wants to skip ahead — must not be forced through, but must not break sequence for beginners either.

---

## 3. Gap register (current state → why it fails a beginner)

Severity: **P0 = blocker** (a true beginner cannot succeed), **P1 = major** (significant struggle), **P2 = minor** (polish).

| # | Gap | Evidence (file) | Why it kills the foundation (research) | Severity |
|---|-----|-----------------|----------------------------------------|----------|
| G1 | **No reliable audio.** Only browser `speechSynthesis` (`lang="ar-SA"`), which is missing on many devices and *cannot* pronounce isolated letters. | `ArabicCoach.tsx` `speak()` L458–465 | "Learning script without sound creates a weak foundation… pronunciation must be part of study from day one." **[TRIPLE‑CONFIRMED]** | **P0** |
| G2 | **Vocabulary has no meaning shown.** Words render as speaker button + Arabic only. | `ArabicCoach.tsx` L429 (`vocabChip`), `lessons.ts` builds `vocabulary` as bare strings | "Never list vocabulary in isolation; always word + meaning + example." A learner sees كتاب and cannot know it means "book." **[TRIPLE‑CONFIRMED]** | **P0** |
| G3 | **No transliteration crutch** anywhere (models, vocab, passages). | `ArabicCoach.tsx` L429/L430/L440–445 | For weeks 1–2, a phonetic bridge (paired with script) is the accepted "training wheels." Absent → learner cannot even attempt to say a new word. | **P0** |
| G4 | **Alphabet is *listed*, not *taught*.** Days 2–4 name letters in bulk; no isolated per‑letter sound, no 4‑form chart, no writing/stroke guidance. | `handcraftedLessons.ts` Days 2–4 | Research: teach the four forms early, sound‑first, by difficulty groups; handwriting is "not optional." | **P1** |
| G5 | **Sequence violations — items used before taught.** Day 1 uses مرحباً/أنا (letters ح ر ب ن taught Days 2–4); vowelled words appear before Day 5 vowels. | `handcraftedLessons.ts` Day 1 vs Days 2–6 | "Nothing used before taught" is a core sequencing rule; violating it disorients the true zero. | **P1** |
| G6 | **No difficult‑sound training** (ع ح ق خ غ ص ض ط ظ): no minimal pairs, no discrimination drills, no makhraj tips. | absent everywhere | Research: *listening discrimination must precede production*; early feedback prevents fossilised errors. | **P1** |
| G7 | **Letter order is shape‑based, not difficulty‑based.** | Days 2–4 | Research favours grouping by sound difficulty (soft → emphatic → guttural). (Design choice, not a bug — see §7 note.) | **P2** |
| G8 | **AI tutor is the only feedback and can be offline** (`LLM_API_BASE` = external host, model "gpt"); demo gives *mock* feedback that could mislead. | `api/tutor/route.ts` | A beginner stranded without correction loses the core loop; mock feedback can teach wrong things silently. | **P1** |
| G9 | **Onboarding/tour is optional & skippable**, no forced "how Arabic works" (RTL, no copula) primer; RTL + inline audio buttons carry mobile‑reflow risk. | `GuidedTour.tsx`, RTL blocks | A non‑technical beginner needs an unmissable, gentle orientation. | **P2** |
| G10 | **Generated passages/briefs for later days are templated** (fine now, but not hand‑quality) — not a Phase‑1 blocker. | `passages.ts`, `lessonBriefs.ts` | Acceptable for now; note for later polish. | **P2** |

### 3.1 What is already GOOD (keep, do not regress)
- **Curriculum order is pedagogically correct** at the macro level: harf → harakāt → shadda/tanwīn → ة → الـ → hamza → nominal sentence → present → past. Research validates this exact spine.
- **"What & why" briefs** (bilingual) — excellent; expand, don't remove.
- **Bilingual BN/EN UI, phonetic keyboard, SRS table, checkpoints, adaptive next‑phase** — strong scaffolding already present.
- **Fully‑vowelled model sentences** in Phase 1 — matches best practice.

---

## 4. The target beginner journey (what a Day‑1 user experiences)

1. **Unmissable, gentle primer** (first login): 4 tiny cards — "Arabic reads right‑to‑left", "there's no word for is/are", "you'll always hear every word", "learn a little every day." Dismissible after viewing, re‑openable.
2. **Every lesson now opens the same calm way:** "What & why" → outcomes → **Sounds/Letters (hear it)** → **Vocabulary with meaning + audio + transliteration** → pattern (models with meaning + audio) → optional reading/listening text → practice → feedback.
3. **The learner can always hear** any letter, word, or sentence with one tap, and it sounds correct on any device.
4. **The learner always sees what a word means** (BN + EN) and, for the first ~2 weeks, an optional romanization under the Arabic.
5. **The alphabet is genuinely taught**: an interactive trainer with per‑letter sound, the four connected forms, a pronunciation tip, and a "trace it" prompt.
6. **Confusable sounds get discrimination drills** ("Which did you hear: ع or ء?").
7. **If the AI tutor is unavailable**, the learner still gets useful rule‑based/self‑check feedback and is never blocked.

---

## 5. Feature specifications

Each feature has: **What, Why, Spec, Data model, Acceptance criteria (AC).** Features are ordered by priority.

### F1 — Reliable pronunciation audio (P0)  *[fixes G1, underpins everything]*
- **What:** Replace "TTS‑only" with a layered audio system that reliably plays correct Arabic for letters, words, and sentences on any device.
- **Spec (layered fallback, in order):**
  1. **Pre‑recorded audio assets** for the highest‑value, finite sets: the **28 letters** (isolated + with fatḥa/kasra/ḍamma), the **~50 Phase‑1 core words**, and Phase‑1 **model sentences / passages**. Served from `/public/audio/...` (or Supabase Storage). This is the gold path and the only way to get true isolated‑letter sounds.
  2. **A cloud TTS fallback** (server route) for any Arabic string without a recorded asset, returning an audio stream. (Provider TBD; must produce natural MSA.)
  3. **Browser `speechSynthesis`** as a last resort *only if an Arabic voice is present* — otherwise show a clear "audio unavailable on this device, here's the transliteration" message instead of silently failing.
- **Data model:** `audioKey` on letters/words/sentences → maps to an asset path; a manifest (`audioManifest.ts` or a Storage index) of available recordings.
- **AC:**
  - Tapping any of the 28 letters plays a clear isolated sound on a device with **no** Arabic TTS installed.
  - Tapping a Phase‑1 word plays recorded audio; a random later word plays via TTS fallback or degrades gracefully with a visible message (never silent).
  - No console error path leaves the user with a dead button.
- **Note:** Recording/sourcing 28 letters × 4 (isolated + 3 vowels) + ~50 words + ~60 sentences is a **content task**; the engineering is the player + manifest + fallback. We can ship the *player + fallback* first, then drop in assets as they're produced.

### F2 — Vocabulary with meaning (P0)  *[fixes G2]*
- **What:** Every vocabulary word shows its **meaning (BN + EN)** and an optional **transliteration**, alongside the audio button.
- **Spec:** Change vocabulary from `string[]` to a structured list `{ ar, bn, en, translit }`. Render in `vocabChip`: Arabic (large) + gloss (BN/EN by locale) + translit (toggle) + audio.
- **Data model (breaking, handled carefully):**
  - New type `VocabItem = { ar: string; bn: string; en: string; translit: string }`.
  - `Lesson.vocabulary: VocabItem[]` (was `string[]`).
  - Backward path: a `glossary.ts` map from Arabic word → `{bn,en,translit}` so we can enrich the *existing* comma‑separated vocab without rewriting all 400 days at once; unknown words fall back to `{ar, ar, "", translit()}` and are flagged for authoring.
- **AC:** On Day 1, every word shows its Bengali + English meaning. No Phase‑1 word is meaning‑less. The `ArabicInputAssistant` "tap to insert" chips still work (insert the `ar`).

### F3 — Transliteration crutch (P0, time‑boxed)  *[fixes G3]*
- **What:** An optional romanization shown under Arabic in vocabulary, models, and passages, defaulting **on for Days 1–14** and **off from Day 15**, with a manual toggle the learner controls (persisted).
- **Spec:** A `translit(ar)` helper (deterministic MSA romanization of *vowelled* text) + hand‑authored transliteration for Phase‑1 words/sentences (more accurate than auto). A single global toggle "show pronunciation help (abc)" in the lesson header; remembers the user's choice; the *default* follows the day rule until the user overrides.
- **Why time‑boxed:** research is explicit — transliteration must be a temporary bridge, always paired with script, removed early to avoid script avoidance.
- **AC:** Day 1 shows `مَرْحَبًا` with `marḥaban` beneath; toggling hides it app‑wide; from Day 15 it's off by default but re‑enableable.

### F4 — Interactive Alphabet & Sounds trainer (P1)  *[fixes G4, G6]*
- **What:** A dedicated, reusable **Letter Card** used inside Days 2–4 (and a standalone "Alphabet" reference always reachable): for each letter — name, isolated glyph, **the four forms** (isolated / initial / medial / final), **sound audio**, a one‑line **makhraj/pronunciation tip** (esp. for ع ح ق خ غ ص ض ط ظ), and a **"trace it"** stroke hint.
- **Spec:**
  - New data `letters.ts`: 28 entries `{ ar, name, translit, forms:{isolated,initial,medial,final}, sound, tipBn, tipEn, group:"soft"|"emphatic"|"guttural" }`.
  - New component `AlphabetTrainer` / `LetterCard`.
  - **Minimal‑pair discrimination micro‑drill** for confusable sets (ع/ء, ح/ه, ق/ك, س/ص, ت/ط): play a sound, learner picks which letter — 5 quick items, no penalty, just ear‑training.
- **AC:** On Days 2–4 the learner can hear each letter, see its 4 forms, read a tip, and do a short "which did you hear?" drill. Works on mobile.

### F5 — Sequence integrity pass (P1)  *[fixes G5]*
- **What:** Ensure no letter/vowel/word/grammar point is *used before it is taught* in Days 1–20.
- **Spec:** Re‑order/adjust Day‑1–6 content so that: Day 1 uses only pre‑taught‑safe material (or is explicitly framed as "listen & mimic, you'll learn to read these next"); vowelled words only appear after Day 5; each day's vocabulary only uses letters introduced up to that day *or* is clearly marked "sound‑only, reading comes later." Add an automated **lint script** (`scripts/checkSequence.ts`) that flags any Phase‑1 word using a not‑yet‑taught letter, run in CI/build.
- **AC:** The lint passes for Days 1–20; Day 1 no longer asks a true zero to *read* letters they haven't met (it asks them to *hear & repeat*).

### F6 — Graceful feedback fallback (P1)  *[fixes G8]*
- **What:** When the AI tutor endpoint is unreachable, the learner still gets constructive, **clearly‑labelled** feedback and is never blocked; mock/demo feedback is visibly marked as practice‑only.
- **Spec:** On tutor error, return a rule‑based self‑check (did you use today's target words? length? contains Arabic script?) with a banner "Automatic check — your teacher will review later." Demo feedback labelled "Sample feedback (demo)."
- **AC:** With the tutor offline, submitting an answer produces visible, honest feedback and a working "next lesson" path.

### F7 — Unmissable beginner primer + mobile hardening (P2)  *[fixes G9]*
- **What:** A first‑run 4‑card primer ("how Arabic works"), always re‑openable; audit RTL/audio‑button layout on small screens.
- **AC:** New users see the primer once; it's re‑openable from a help icon; lesson cards reflow cleanly at 360px width.

### F8 — Later‑phase content polish (P2)  *[G10]*
- Out of scope for the beginner PRD except to note: hand‑author briefs/passages/vocab meanings phase‑by‑phase after Phase 1 is perfect.

---

## 6. Sequencing guardrails (LO's "no mess" rule, made concrete)

These are hard rules the implementation must obey; they are what keep the app beginner‑correct and prevent it drifting "advanced":

1. **The 20‑phase / 400‑day macro order is frozen.** We do not reorder phases. We only deepen Phase 1.
2. **Introduce‑before‑use is enforced by a lint** (F5). A build that violates it fails.
3. **Fully vowelled through Phase 2.** No un‑vowelled Arabic is shown to a learner before Day 40.
4. **Transliteration auto‑off at Day 15**, manual override allowed. It must never appear *without* the Arabic beside it.
5. **New‑word budget:** ≤ 10 new words/day in Phase 1. Checkpoints add *no* new words.
6. **Every learner‑facing Arabic string is hearable and glossable.** No exceptions in Phase 1.
7. **Additive, not disruptive:** new cards (Sounds, meanings, translit) slot into the *existing* lesson order (What&why → outcomes → sounds → vocab → pattern → text → practice). We do not restructure the proven flow.

---

## 7. Notes on debated design choices (so we decide deliberately)

- **Letter order (G7):** Current order is shape/traditional (ا ب ت …). Research prefers difficulty grouping (soft → emphatic → guttural). **Recommendation:** keep the familiar traditional order for *reading recognition* (learners will meet this order everywhere, incl. Qur'an), but layer the **difficulty‑group tips and the discrimination drills** on top. This gets the pedagogical benefit *without* reordering the alphabet the learner expects — a good "not a mess" compromise. Flag for LO's call.
- **Audio sourcing:** highest quality = human recordings; fastest = cloud TTS. **Recommendation:** ship the *player + fallback chain* first (engineering), then progressively add human recordings for the 28 letters and 50 core words (content), which is where isolated‑sound quality matters most.

---

## 8. Data‑model changes (carefully, to avoid breaking 400 days)

| Change | Risk | Mitigation |
|--------|------|------------|
| `Lesson.vocabulary: string[]` → `VocabItem[]` | Touches generator + every render + `ArabicInputAssistant` | Introduce a `glossary.ts` (Arabic→{bn,en,translit}); a single mapping step enriches existing bare words at build time; renders read `.ar/.bn/.en`. Unknown words degrade to `{ar, ar, "", auto‑translit}` and are logged for authoring. |
| New `letters.ts`, `glossary.ts`, `audioManifest.ts` | Additive | No risk; new files. |
| `Lesson.brief` already exists | — | Reuse pattern for consistency. |
| Transliteration default state (day‑based + user toggle) | Minor | Store toggle in `localStorage`; default computed from `lesson.day`. |

**Principle:** all changes are **additive or safely mapped** — we never hand‑rewrite 400 days in one shot.

---

## 9. Phased rollout (sequenced, each independently shippable & verifiable)

> Each milestone ends with `tsc` + `next build` green and a manual smoke test. Nothing merges half‑baked.

- **M1 — Audio floor (F1) + graceful fallback (F6).** The single biggest beginner unblocker. Ship player + fallback chain; wire the "never silent" behaviour. *(Assets can trickle in after.)*
- **M2 — Meanings (F2) + transliteration (F3).** Vocabulary shows BN/EN + optional romanization; `glossary.ts` covers all Phase‑1 words. This makes Days 1–20 truly learnable.
- **M3 — Alphabet & Sounds trainer (F4).** Letter cards with 4 forms, tips, and discrimination drills wired into Days 2–4 + standalone reference.
- **M4 — Sequence integrity (F5).** Re‑tune Days 1–6, add the lint, make Day 1 "hear & mimic."
- **M5 — Primer + mobile hardening (F7).** First‑run orientation + 360px audit.
- **M6 — Content fill.** Human audio for 28 letters + 50 words; hand transliteration for Phase‑1; then expand outward.

**Rationale for this order:** audio and meaning are the two P0s that make *everything else* usable; the alphabet trainer depends on the audio floor; sequence + primer are refinements on top.

---

## 10. Acceptance criteria for "beginner‑ready" (the definition of done for Phase 1)

A true beginner, on a plain phone with no Arabic TTS, can:
1. Hear every one of the 28 letters clearly (isolated) and each Phase‑1 word/sentence. ✅ (F1)
2. See the meaning (BN+EN) of every word they're taught. ✅ (F2)
3. Read a romanization for the first two weeks, then wean off. ✅ (F3)
4. Learn each letter's four forms, a pronunciation tip, and pass a "which did you hear?" drill. ✅ (F4)
5. Never encounter a letter/word before it's been introduced (lint‑guaranteed). ✅ (F5)
6. Always get feedback and a next step, even if the AI is down. ✅ (F6)
7. Get a gentle orientation and a layout that works on a small screen. ✅ (F7)
8. Reach the §1.2 "solid foundation" bar by Day 20.

---

## 11. Risks & mitigations
- **Audio assets are a content lift.** → Ship engineering first; TTS fallback covers the gap; add human recordings for the finite high‑value sets progressively.
- **Vocabulary refactor could ripple.** → Glossary‑map approach keeps it additive; strong typing + build gate catches misses.
- **Transliteration can become a crutch.** → Auto‑off at Day 15 + always paired with script (research‑backed).
- **Scope creep toward "advanced."** → §6 guardrails + "deepen the floor, not raise the ceiling" principle.

---

## 12. Explicitly out of scope (for this beginner PRD)
- Advanced‑phase content authoring (Phases 5–20 hand‑polish).
- Speaking‑recognition scoring of the learner's own pronunciation (future; needs mic + phoneme scoring).
- Dialect content (research: MSA‑only for the beginner months).
- Gamification/streaks beyond the existing streak.

---

## 13. Open questions for LO
1. **Audio source:** OK to start with cloud TTS fallback now and add human letter/word recordings over time? Any preferred voice/provider, or should I record a placeholder set?
2. **Letter order:** keep traditional order + difficulty tips (my recommendation), or reorder by sound difficulty?
3. **Priority:** implement in the M1→M6 order above, or do you want meanings (M2) *before* audio (M1)?
4. **Transliteration style:** academic (ā, ḥ, ʿ) or simple (aa, h, ') for non‑technical Bengali users? (I lean simple.)

---

## Appendix A — Day‑20 "solid foundation" self‑test (measurable exit)

A concrete, gradable checkpoint that operationalises §1.2. The learner must:
- **Listen:** identify 10 letters played in isolation (incl. 4 confusable pairs). Pass = 8/10.
- **Read aloud:** read 10 fully‑vowelled words correctly. Pass = 8/10.
- **Meaning:** match 15 core words to their BN/EN meaning. Pass = 12/15.
- **Write:** produce 5 correct nominal sentences using الـ, gender, a pronoun suffix, and a number.
- **Speak:** 45‑second self‑introduction using taught material.

This becomes the Day‑20 checkpoint's rubric and the trigger for the adaptive next‑phase plan.

---

## Appendix B — Cross‑check summary (for LO)

- **Pass 1 (build correctness):** every gap has file‑level evidence; the 3 P0s (audio, meanings, transliteration) were each confirmed by direct code read **and** the independent audit.
- **Pass 2 (pedagogy correctness):** every proposed fix maps to an independently‑researched best practice (sound‑first, meaning‑in‑context, time‑boxed transliteration, four‑forms + discrimination, introduce‑before‑use, daily small load).
- **Pass 3 (sequence/no‑mess):** §6 guardrails + F5 lint guarantee the sequence stays intact and additive; the macro 400‑day order is explicitly frozen; every change is additive or safely mapped.

**Document version:** v1.0 (draft for approval).
