"use client";
import {useState} from "react";
import {parseChecks} from "@/lib/checkpoint";
import {parseReviews} from "@/lib/review";
import {parseProgress,mergeProgress} from "@/lib/progress";
import {pick,type Locale} from "@/lib/i18n";
export default function LearningBackup({userId,locale}:{userId:string;locale:Locale}){
 const [message,setMessage]=useState("");
 const keys={checks:`arabic-coach-checks-v1:${userId}`,reviews:`arabic-coach-recall-v1:${userId}`,drafts:`arabic-coach-progress-v1:${userId}`};
 function download(){try{
  const data={version:1,createdAt:new Date().toISOString(),checks:parseChecks(JSON.parse(localStorage.getItem(keys.checks)??"{}")),reviews:parseReviews(JSON.parse(localStorage.getItem(keys.reviews)??"{}")),drafts:parseProgress(JSON.parse(localStorage.getItem(keys.drafts)??"{}"),400)};
  const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="arabic-learning-backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }catch{setMessage(pick(locale,{bn:"ব্যাকআপ তৈরি করা যায়নি। ব্রাউজারের storage অনুমতি দেখুন।",en:"Backup failed. Check browser storage permissions."}));}}
 async function restore(file?:File){if(!file)return;try{
  if(file.size>2_000_000)throw new Error("oversized");
  const data=JSON.parse(await file.text());if(data.version!==1||!data.checks||!data.reviews||!data.drafts)throw new Error("invalid");
  const checks=parseChecks(JSON.parse(localStorage.getItem(keys.checks)??"{}"));
  for(const [day,item]of Object.entries(parseChecks(data.checks))){const d=Number(day);if(!checks[d]||Date.parse(item.attemptedAt)>Date.parse(checks[d].attemptedAt))checks[d]=item;}
  const reviews=parseReviews(JSON.parse(localStorage.getItem(keys.reviews)??"{}"));
  for(const [word,item]of Object.entries(parseReviews(data.reviews))){if(!reviews[word]||Date.parse(item.lastReviewed)>Date.parse(reviews[word].lastReviewed))reviews[word]=item;}
  const drafts=mergeProgress(parseProgress(data.drafts,400),parseProgress(JSON.parse(localStorage.getItem(keys.drafts)??"{}"),400));
  localStorage.setItem(keys.checks,JSON.stringify(checks));localStorage.setItem(keys.reviews,JSON.stringify(reviews));localStorage.setItem(keys.drafts,JSON.stringify(drafts));
  window.location.reload();
 }catch{setMessage(pick(locale,{bn:"সঠিক JSON backup দিন (সর্বোচ্চ ২ MB)। Import করা যায়নি।",en:"Could not import. Use a valid JSON backup (maximum 2 MB)."}));}}
 return <details className="contentCard"><summary>{pick(locale,{bn:"অগ্রগতির backup / অন্য ডিভাইসে নেওয়া",en:"Back up / transfer learning progress"})}</summary><p>{pick(locale,{bn:"নতুন review ও check history এখন এই ব্রাউজারেই। Backup-এ আপনার লেখা থাকতে পারে—ব্যক্তিগতভাবে রাখুন। Import করলে শুধু নতুন তারিখের তথ্য যুক্ত হবে এবং পাতা reload হবে।",en:"New reviews and checks currently stay in this browser. Backups can include your writing; keep them private. Import merges newer records and reloads the page."})}</p><div className="practiceActions"><button onClick={download}>{pick(locale,{bn:"JSON backup রাখুন",en:"Download JSON backup"})}</button><label>{pick(locale,{bn:"নিজের backup import করুন",en:"Import your backup"})}<input type="file" accept="application/json,.json" onChange={e=>void restore(e.target.files?.[0])}/></label></div>{message&&<p role="status">{message}</p>}</details>;
}
