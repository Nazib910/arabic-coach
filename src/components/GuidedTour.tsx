"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Cloud, Compass, Sparkles, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

const steps = [
  { icon: Compass, label: { bn: "আপনার শেখার পথ", en: "Your learning map" }, title: { bn: "২০ ধাপে ৪০০ দিনের একটি পূর্ণ পথ", en: "Twenty phases, one 400-day path" }, text: { bn: "বাঁ পাশের কোর্স তালিকায় পাঠগুলো ২০টি ধাপে সাজানো। প্রতি ৭ দিনে যাচাই, প্রতি ২০ দিনে ধাপ-পরীক্ষা এবং ১০০/২০০/৩০০/৪০০তম দিনে বড় মূল্যায়ন থাকবে।", en: "The left map groups lessons into 20 phases. Weekly checkpoints, a phase task every 20 days, and cumulative benchmarks on Days 100/200/300/400 measure retained skill." }, accent: "01" },
  { icon: BookOpen, label: { bn: "প্রতিদিন যেভাবে শিখবেন", en: "Daily learning cycle" }, title: { bn: "দেখুন, বুঝুন, অনুশীলন করুন, নিজে লিখুন", en: "Learn, notice, practise, produce" }, text: { bn: "প্রতিটি পাঠে সময় লাগবে প্রায় ৪৫–৬০ মিনিট। আগে একটু ঝালিয়ে নেবেন, তারপর উদাহরণ দেখবেন এবং শেষে নিজের আরবি ব্যবহার করবেন। লেখার সময় উত্তর নিজে থেকেই সেভ হবে।", en: "Each 45–60 minute lesson moves from retrieval and models into your own Arabic. Your draft is saved while you work." }, accent: "02" },
  { icon: Sparkles, label: { bn: "আপনার AI শিক্ষক", en: "Adaptive AI teacher" }, title: { bn: "উত্তর দিন, কাজে লাগবে এমন পরামর্শ পান", en: "Submit evidence, receive a prescription" }, text: { bn: "আপনার আগের কাজ দেখে AI শিক্ষক ভুলগুলো সহজ করে বুঝিয়ে দেবেন, ভালো দিকগুলো বলবেন এবং এরপর কী অনুশীলন করবেন তা জানাবেন।", en: "Personal learners receive precise evaluation, corrections, repair codes and next steps based on previous performance." }, accent: "03" },
  { icon: Cloud, label: { bn: "অগ্রগতি ও গোপনীয়তা", en: "Progress and privacy" }, title: { bn: "আপনার শেখার অগ্রগতি নিরাপদে থাকবে", en: "Your memory follows your account" }, text: { bn: "ব্যক্তিগত অ্যাকাউন্টে আপনার অগ্রগতি সব ডিভাইসে দেখা যাবে। ডেমোতে করা কাজ শুধু এই ব্রাউজারেই থাকবে।", en: "Personal progress syncs securely across devices. Demo progress stays only in the current browser and uses sample feedback." }, accent: "04" },
];

export default function GuidedTour({ isDemo, onFinish, locale }: { isDemo: boolean; onFinish: () => void; locale: Locale }) {
  const [step, setStep] = useState(0);
  const item = steps[step];
  const Icon = item.icon;
  return <div className="tourBackdrop" role="dialog" aria-modal="true" aria-label={pick(locale, { bn: "অ্যাপটি ঘুরে দেখুন", en: "Arabic Coach guided tour" })}><section className="tourCard"><button className="tourClose" onClick={onFinish} aria-label={pick(locale, { bn: "বন্ধ করুন", en: "Skip tour" })}><X/></button><div className="tourVisual"><span>{item.accent}</span><Icon/><b dir="rtl">{["خُطَّتُكَ", "دَرْسُكَ", "مُعَلِّمُكَ", "تَقَدُّمُكَ"][step]}</b></div><div className="tourCopy"><span className="eyebrow">{pick(locale, item.label)}</span><h2>{pick(locale, item.title)}</h2><p>{step === 3 && isDemo ? pick(locale, { bn: "আপনি এখন ডেমো ব্যবহার করছেন। ", en: "You are in demo mode. " }) : ""}{pick(locale, item.text)}</p><div className="tourDots">{steps.map((_,index)=><button key={index} className={index===step?"active":""} onClick={()=>setStep(index)} aria-label={pick(locale, { bn: `${index+1} নম্বর ধাপে যান`, en: `Go to tour step ${index+1}` })}/>)}</div><div className="tourActions"><button className="tourSecondary" onClick={step===0?onFinish:()=>setStep(step-1)}>{step===0?pick(locale, { bn: "এখন নয়", en: "Skip tour" }):<><ArrowLeft/>{pick(locale, { bn: "আগেরটি", en: "Back" })}</>}</button><button className="primaryButton" onClick={step===steps.length-1?onFinish:()=>setStep(step+1)}>{step===steps.length-1?pick(locale, { bn: "চলুন শুরু করি", en: "Start learning" }):<>{pick(locale, { bn: "পরেরটি", en: "Next" })}<ArrowRight/></>}</button></div></div></section></div>;
}
