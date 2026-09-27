import{test}from'node:test';import assert from'node:assert/strict';import{phaseReadings}from'./phaseReadings';import{phaseSpecs}from'./phases';
test('every advanced phase has supplied bilingual source and explicit answer',()=>{
 assert.deepEqual(Object.keys(phaseReadings).sort(),phaseSpecs.slice(4).map(p=>p.key).sort());
 for(const reading of Object.values(phaseReadings)){assert.equal(reading.lines.length,3);assert.ok(reading.lines.every(l=>l.ar&&l.bn&&l.en));assert.ok(reading.answers.length);assert.ok(reading.question.bn&&reading.question.en&&reading.explanation.bn&&reading.explanation.en);}
});
test('reading answers are grounded in their source text',()=>{
 const clean=(s:string)=>s.normalize('NFC').replace(/[\u064B-\u0652\u0670ـ]/g,'').replace(/\s+/g,' ').trim();
 for(const [key,r]of Object.entries(phaseReadings)){const source=clean(r.lines.map(l=>l.ar).join(' '));assert.ok(source.includes(clean(r.answers[0])),`${key}: ${r.answers[0]}`);}
});
