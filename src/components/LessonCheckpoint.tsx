"use client";
import { useState } from "react";
import { checkItems,evaluateCheck,type LessonCheck } from "@/lib/checkpoint";
import { pick,type Locale } from "@/lib/i18n";
export default function LessonCheckpoint({day,locale,onResult,onRepair}:{day:number;locale:Locale;onResult:(result:LessonCheck)=>void;onRepair:(day:number)=>void}){
 const [active,setActive]=useState(false),[answers,setAnswers]=useState<Record<string,string>>({}),[result,setResult]=useState<LessonCheck|null>(null);
 const items=checkItems(day);
 function start(){setAnswers({});setResult(null);setActive(true);}
 function submit(){const next=evaluateCheck(day,answers);setResult(next);onResult(next);}
 return <section className="contentCard lessonCheckpoint"><h2>{pick(locale,{bn:"পাঠের ছোট যাচাই",en:"Local lesson check"})}</h2><p>{pick(locale,{bn:"নোট না দেখে চেষ্টা করুন। এটি শব্দের বানান ও model চেনা যাচাই করে—উচ্চারণ, মুক্ত কথন বা সার্বিক দক্ষতা নয়। ফল এই ব্রাউজারে থাকে। সব উত্তর মিললে মূল session-এর অগ্রগতি হবে; ভুল হলে repair করুন।",en:"Try without notes. This checks word spelling and model recognition—not pronunciation, free speaking or overall proficiency. Results stay in this browser. Matching all answers advances the core session; missed items suggest repair."})}</p>
 {!active?<button className="primaryButton" onClick={start}>{pick(locale,{bn:"যাচাই শুরু",en:"Start lesson check"})}</button>:<>
 {items.map(item=><fieldset className="checkpointItem" key={item.id}><legend>{pick(locale,item.prompt)}</legend>{item.options?<div>{item.options.map((option,index)=><label className="choiceRow" key={index}><input type="radio" name={item.id} value={option} checked={answers[item.id]===option} disabled={!!result} onChange={()=>setAnswers(previous=>({...previous,[item.id]:option}))}/><span lang="ar" dir="rtl">{option}</span></label>)}</div>:<input aria-label={pick(locale,item.prompt)} dir="rtl" lang="ar" value={answers[item.id]??""} disabled={!!result} onChange={e=>setAnswers(previous=>({...previous,[item.id]:e.target.value}))}/>} {result&&<p className="grammarNote"><span lang="ar" dir="rtl">{item.expected[0]}</span> — {pick(locale,item.explanation)}</p>}</fieldset>)}
 <div className="practiceActions"><button onClick={submit} disabled={!!result||items.some(item=>!answers[item.id]?.trim())}>{pick(locale,{bn:"উত্তর মিলিয়ে দেখুন",en:"Check lesson answers"})}</button>{result&&<button onClick={start}>{pick(locale,{bn:"শিখে আবার পরীক্ষা",en:"Study then retry"})}</button>}</div>
 {result&&<div role="status"><p>{result.correct}/{result.total} — {pick(locale,{bn:result.passed?"এই ছোট check-এর উত্তর মিলেছে। আগামীকাল recall-এ আবার দেখুন।":"কিছু উত্তর এখনো মেলেনি। আগে নিচের পাঠে ফিরে অনুশীলন করুন।",en:result.passed?"All answers match in this small check. Revisit them in tomorrow's recall.":"Some items need practice. Revisit the lessons below before advancing."})}</p><div className="practiceActions">{result.missedDays.map(d=><button key={d} onClick={()=>onRepair(d)}>{pick(locale,{bn:`পাঠ ${d}-এ ফিরে শিখুন`,en:`Repair lesson ${d}`})}</button>)}</div></div>}</>}
 </section>;
}
