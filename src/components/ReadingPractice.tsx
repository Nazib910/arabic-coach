"use client";
import {useState}from"react";
import{phaseReadings}from"@/data/phaseReadings";
import{phaseForDay}from"@/data/phases";
import{sameSpelling}from"@/lib/review";
import{pick,type Locale}from"@/lib/i18n";
export default function ReadingPractice({day,locale}:{day:number;locale:Locale}){
 const [answer,setAnswer]=useState(""),[result,setResult]=useState<boolean|null>(null),[meaning,setMeaning]=useState(false);
 const phase=phaseForDay(day),reading=phaseReadings[phase.key];if(!reading)return null;
 const strict=phase.key==='case-awareness'||phase.key==='advanced-syntax';
 function check(){setResult(reading.answers.some(expected=>strict?answer.trim().normalize('NFC')===expected.normalize('NFC'):sameSpelling(answer,expected)));}
 return <section className="contentCard readingPractice"><h2>{pick(locale,reading.title)}</h2><p>{pick(locale,{bn:"এই ধাপের অনুশীলনী লেখা। একই লেখা পরে review-তে ফিরবে; এটি অদেখা proficiency test নয়। আগে অর্থ না খুলে পড়ুন।",en:"An authored practice text for this phase, revisited in review—not an unseen proficiency test. Try reading before revealing meanings."})}</p>{reading.lines.map((line,index)=><div className="readingLine" key={index}><p lang="ar" dir="rtl">{line.ar}</p>{meaning&&<small>{pick(locale,line)}</small>}</div>)}<button className="hearBtn" onClick={()=>setMeaning(value=>!value)} aria-expanded={meaning}>{pick(locale,{bn:meaning?"অর্থ লুকান":"অর্থ দেখুন",en:meaning?"Hide meanings":"Reveal meanings"})}</button><label className="readingAnswer">{pick(locale,reading.question)}<input lang="ar" dir="rtl" value={answer} disabled={result!==null} onChange={event=>setAnswer(event.target.value)}/></label><div className="practiceActions"><button onClick={check} disabled={!answer.trim()||result!==null}>{pick(locale,{bn:"পাঠের উত্তর মিলান",en:"Check reading answer"})}</button>{result!==null&&<button onClick={()=>{setResult(null);setAnswer('');}}>{pick(locale,{bn:"শিখে আবার চেষ্টা",en:"Study and retry"})}</button>}</div>{result!==null&&<div role="status"><b>{pick(locale,{bn:result?"উত্তর মিলেছে।":"এবার মেলেনি।",en:result?"Answer matches.":"Not yet."})}</b><p>{pick(locale,reading.explanation)}</p><span dir="rtl" lang="ar">{reading.answers[0]}</span></div>}</section>;
}
