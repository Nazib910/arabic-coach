import { test } from "node:test";
import assert from "node:assert/strict";
import { lessons } from "./lessons";
import { getLearningMaterial, getModelMeaning } from "./learningMaterials";
import { getGloss } from "./glossary";
test("every course vocabulary item has an explicit bilingual gloss", () => {
  assert.deepEqual([...new Set(lessons.flatMap(l=>l.vocabulary))].filter(w=>!getGloss(w).bn||!getGloss(w).en), []);
});
test("every model has a meaning aligned to the actual displayed sentence", () => {
  for(const lesson of lessons) {
    const material = getLearningMaterial(lesson.day)!;
    assert.equal(material.lines.length, lesson.models.length);
    material.lines.forEach((line,index)=>{assert.equal(line.ar,lesson.models[index]);assert.ok(line.bn&&line.en);assert.deepEqual(getModelMeaning(lesson.day,index),{bn:line.bn,en:line.en});});
    assert.ok(material.expected.every(answer=>material.lines.some(line=>line.ar===answer)));
  }
});
test("invalid material IDs never silently return another lesson",()=>{
  for(const id of [0,-1,401,1.5,NaN]) assert.equal(getLearningMaterial(id),undefined);
});
