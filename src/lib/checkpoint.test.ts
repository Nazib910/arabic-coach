import{test}from'node:test';import assert from'node:assert/strict';
import{checkItems,evaluateCheck,parseChecks,nextCheckDay,repairDay}from'./checkpoint';
test('blank or partly correct answers never pass',()=>{for(const day of [1,2,7,20,100,400])assert.equal(evaluateCheck(day,{}).passed,false);});
test('each course check can be answered using its supplied criteria',()=>{for(let day=1;day<=400;day++){const items=checkItems(day);assert.ok(items.length);const answers=Object.fromEntries(items.map(i=>[i.id,i.expected[0]]));assert.equal(evaluateCheck(day,answers).passed,true);}});
test('checkpoint contains earlier taught material, never future days',()=>{const items=checkItems(20);assert.ok(items.some(i=>i.day<20));assert.ok(items.every(i=>i.day<=20));});
test('repair route and next lesson follow evidence, not submission count',()=>{const fail=evaluateCheck(7,{});assert.equal(repairDay({7:fail}),1);assert.equal(nextCheckDay({7:fail}),1);});
test('malformed persisted results cannot create success',()=>{const result=evaluateCheck(2,{});assert.equal(parseChecks({2:{...result,passed:true}})[2].passed,false);assert.deepEqual(parseChecks({401:result,2:{...result,total:100}}),{});});
