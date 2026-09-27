import { existsSync, readFileSync } from "node:fs";
import { lessons } from "../src/data/lessons";
import { getGloss } from "../src/data/glossary";
import { getAudioAsset } from "../src/data/audioManifest";
import { getPassage } from "../src/data/passages";
import { getModelMeaning } from "../src/data/learningMaterials";
import { phaseReadings } from "../src/data/phaseReadings";
import { phaseSpecs } from "../src/data/phases";

// Coverage is not evidence of linguistic accuracy or actual learning outcomes.
const phases = Array.from({ length: 20 }, (_, index) => {
  const group = lessons.slice(index * 20, (index + 1) * 20);
  const words = [...new Set(group.flatMap(lesson => lesson.vocabulary))];
  const models = [...new Set(group.flatMap(lesson => lesson.models))];
  return {
    phase: index + 1, days: `${group[0].day}–${group.at(-1)!.day}`, vocabularyEntries: words.length,
    missingMeanings: words.filter(word => !getGloss(word).en || !getGloss(word).bn).length,
    bundledWordAudio: words.filter(word => getAudioAsset(word)).length,
    distinctModels: models.length, bundledModelAudio: models.filter(model => getAudioAsset(model)).length,
    distinctExerciseSets: new Set(group.map(lesson => JSON.stringify(lesson.exercises))).size,
    lessonsWithPassages: group.filter(lesson => getPassage(lesson.day)).length,
    englishOnlyTitles: group.filter(lesson => lesson.titleBn === lesson.title).length,
    modelsWithAuthoredMeanings: group.reduce((sum, lesson) => sum + lesson.models.filter((_,i)=>getModelMeaning(lesson.day,i)).length, 0),
    reusablePhaseReadings: phaseReadings[phaseSpecs[index].key] ? 1 : 0,
  };
});
const manifest = readFileSync("src/data/audioManifest.ts", "utf8");
const assets = [...new Set(manifest.match(/\/audio\/[^"\s]+\.m4a/g) ?? [])];
console.table(phases);
console.log(JSON.stringify({ lessons: lessons.length, referencedAudioAssets: assets.length, missingAudioFiles: assets.filter(asset => !existsSync(`public${asset}`)), note: "Bundled audio coverage excludes runtime TTS fallback. Presence is not pronunciation-quality validation. A model/exercise count does not certify curriculum readiness." }, null, 2));
