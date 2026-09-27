import {test} from "node:test";
import assert from "node:assert/strict";
import {quranCourseContent} from "./quranCourse";
test("Quran language lessons have valid cited references and bilingual checks",()=>{
 assert.equal(quranCourseContent.length,8);
 for(const l of quranCourseContent){assert.match(l.reference,/^(1:[1-7]|112:[1-4])$/);assert.ok(l.ar&&l.meaning.bn&&l.meaning.en&&l.teaching.bn&&l.teaching.en);assert.equal(l.options.length,3);assert.ok(l.correct>=0&&l.correct<3);}
});
test("112:3 has no added initial conjunction and uses the passive form",()=>{const l=quranCourseContent.find(l=>l.reference==='112:3')!;assert.equal(l.ar,'لَمْ يَلِدْ وَلَمْ يُولَدْ');});
