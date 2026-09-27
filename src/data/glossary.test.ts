import {test}from'node:test';import assert from'node:assert/strict';import{getGloss}from'./glossary';import{lessons}from'./lessons';
test('all 400 lessons have explicit Bengali and English vocabulary meanings',()=>{const words=[...new Set(lessons.flatMap(l=>l.vocabulary))];assert.deepEqual(words.filter(w=>!getGloss(w).bn||!getGloss(w).en||!getGloss(w).translit),[]);});
test('unknown vocabulary remains explicitly unknown',()=>{assert.equal(getGloss('اختبارغيرمعروف').en,'');});
test('vowelled homographs remain distinct',()=>{assert.equal(getGloss('كَتَبَ').translit,'kataba');assert.equal(getGloss('كُتُب').en,'books');assert.equal(getGloss('مِنْ').en,'from');assert.equal(getGloss('مَنْ').en,'who');});
test('Unicode ordering and inflected pronunciation are preserved',()=>{assert.equal(getGloss('مُدرِّس'.normalize('NFD')).en,getGloss('مُدرِّس').en);assert.equal(getGloss('قلمٍ').translit,'qalamin');assert.equal(getGloss('بيتاً').translit,'baytan');});
