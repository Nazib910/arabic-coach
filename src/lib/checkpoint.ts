import { lessons } from "@/data/lessons";
import { getLearningMaterial } from "@/data/learningMaterials";
import { recallCards, sameSpelling } from "@/lib/review";
export type CheckItem = {id:string;day:number;kind:"recall"|"recognition";prompt:{bn:string;en:string};expected:string[];options?:string[];explanation:{bn:string;en:string}};
export type LessonCheck = {version:1;day:number;attemptedAt:string;passed:boolean;correct:number;total:number;missedDays:number[]};
export type CheckMap = Record<number, LessonCheck>;
export function checkItems(day:number):CheckItem[]{
  const lesson=lessons[day-1];
  if(!lesson) return [];
  const days = lesson.checkpoint ? [...new Set([Math.max(1,day-6),Math.max(1,day-3),day])] : [day];
  const result:CheckItem[]=[];
  for(const sourceDay of days){
    const source=lessons[sourceDay-1], material=getLearningMaterial(sourceDay)!;
    const available=recallCards(source);
    const words=available.filter(c=>!/\s|[()/]/.test(c.word)).slice(0,lesson.checkpoint?2:3);
    // Avoid first-day oral-imitation material being treated as independent script recall.
    if(sourceDay>1) words.forEach((card,i)=>result.push({id:`${sourceDay}-word-${i}`,day:sourceDay,kind:sourceDay<=4?"recognition":"recall",prompt:{bn:`আরবিতে দিন: ${card.bn}`,en:`Give the Arabic for: ${card.en}`},expected:[card.word],options:sourceDay<=4?available.map(c=>c.word):undefined,explanation:{bn:`পাঠ ${sourceDay}-এর শব্দতালিকা দেখে শিখুন, তারপর ঢেকে আবার লিখুন।`,en:`Review the vocabulary in lesson ${sourceDay}, then cover it and retry.`}}));
    result.push({id:`${sourceDay}-model`,day:sourceDay,kind:"recognition",prompt:material.question,expected:material.expected,options:material.lines.map(l=>l.ar),explanation:material.explanation});
  }
  return result;
}
export function evaluateCheck(day:number, answers:Record<string,string>, now=new Date()):LessonCheck{
  const items=checkItems(day);
  const missed=items.filter(item=>!item.expected.some(expected=>sameSpelling(answers[item.id]??"",expected)));
  const correct=items.length-missed.length;
  return {version:1,day,attemptedAt:now.toISOString(),passed:items.length>0&&missed.length===0,correct,total:items.length,missedDays:[...new Set(missed.map(item=>item.day))]};
}
export function parseChecks(input:unknown):CheckMap{
  if(!input||typeof input!=="object"||Array.isArray(input))return{};
  const output:CheckMap={};
  for(const [key,value]of Object.entries(input)){
    if(!value||typeof value!=="object")continue;
    const item=value as LessonCheck,day=Number(key);
    if(item.version!==1||item.day!==day||!Number.isInteger(day)||day<1||day>400||!Number.isFinite(Date.parse(item.attemptedAt))||!Number.isInteger(item.total)||item.total!==checkItems(day).length||!Number.isInteger(item.correct)||item.correct<0||item.correct>item.total||!Array.isArray(item.missedDays)||item.missedDays.some(d=>!Number.isInteger(d)||d<1||d>day))continue;
    output[day]={...item,passed:item.correct===item.total&&item.total>0};
  }
  return output;
}
export function nextCheckDay(checks:CheckMap):number{
  for(let day=1;day<=400;day++)if(!checks[day]?.passed)return day;
  return 400;
}
export function repairDay(checks:CheckMap):number|undefined{
  const latest=Object.values(checks).sort((a,b)=>Date.parse(b.attemptedAt)-Date.parse(a.attemptedAt))[0];
  return latest&&!latest.passed?latest.missedDays[0]:undefined;
}
