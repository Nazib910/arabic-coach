"use client";

import { useEffect, useRef, useState } from "react";
import { Delete, Keyboard, Languages, Mic, Plus, Sparkles, Space } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

type SpeechRecognitionEventLike = { results: ArrayLike<{ 0: { transcript: string } }> };
type SpeechRecognitionInstance = { lang: string; interimResults: boolean; continuous: boolean; onresult: ((event: SpeechRecognitionEventLike) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start: () => void; stop: () => void };
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;
type SpeechWindow = Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor };

const keyboardRows = [
  ["ض","ص","ث","ق","ف","غ","ع","ه","خ","ح","ج","د"],
  ["ش","س","ي","ب","ل","ا","ت","ن","م","ك","ط"],
  ["ئ","ء","ؤ","ر","ى","ة","و","ز","ظ"],
  ["َ","ِ","ُ","ْ","ّ","ً","ٍ","ٌ","؟","،"],
];

const words: Record<string,string> = {
  ana:"أنا", anta:"أنتَ", anti:"أنتِ", huwa:"هو", hiya:"هي", nahnu:"نحن", ismi:"اسمي", ism:"اسم", min:"من", fi:"في", ila:"إلى", ala:"على", ma:"ما", man:"مَن", ayna:"أين", mata:"متى", kayfa:"كيف", limadha:"لماذا", kam:"كم",
  arabia:"العربية", arabiyya:"العربية", lugha:"لغة", allugha:"اللغة", talib:"طالب", taalib:"طالب", taliba:"طالبة", muallim:"معلّم", muallima:"معلّمة", kitab:"كتاب", bayt:"بيت", jamia:"جامعة", madina:"مدينة", madrasa:"مدرسة",
  uhib:"أحب", ohib:"أحب", urid:"أريد", ureed:"أريد", adrusu:"أدرس", askun:"أسكن", aamal:"أعمل", la:"لا", naam:"نعم", shukran:"شكراً", afwan:"عفواً", marhaban:"مرحباً", ahlan:"أهلاً", wa:"و", lakin:"لكن", lianna:"لأنّ", ghadan:"غداً", ams:"أمس", alyawm:"اليوم",
  qahwa:"قهوة", shay:"شاي", maa:"ماء", khubz:"خبز", taam:"طعام", sadiq:"صديق", jamil:"جميل", jamila:"جميلة", kabir:"كبير", kabira:"كبيرة", jadid:"جديد", jadida:"جديدة", sahih:"صحيح", khata:"خطأ",
  bangladesh:"بنغلاديش", america:"أمريكا", english:"الإنجليزية", bengali:"البنغالية", nazib:"نزيب", sayed:"سيّد", syed:"سيّد"
};

function fallbackWord(source: string) {
  const initial = source.toLowerCase();
  const tokens: Array<[string,string]> = [["sh","ش"],["th","ث"],["kh","خ"],["dh","ذ"],["gh","غ"],["aa","ا"],["ee","ي"],["ii","ي"],["oo","و"],["ou","و"],["3","ع"],["7","ح"],["5","خ"],["2","ء"],["9","ص"]];
  const singles: Record<string,string> = { b:"ب",t:"ت",j:"ج",h:"ه",d:"د",r:"ر",z:"ز",s:"س",f:"ف",q:"ق",k:"ك",l:"ل",m:"م",n:"ن",w:"و",y:"ي",g:"غ",x:"خ",p:"ب",c:"ك" };
  let result=""; let index=0;
  if (initial[0]==="a") { result="ا"; index=1; }
  else if (initial[0]==="i") { result="إ"; index=1; }
  else if (initial[0]==="u") { result="أ"; index=1; }
  while (index<initial.length) {
    const pair=tokens.find(([latin])=>initial.startsWith(latin,index));
    if (pair) { result+=pair[1]; index+=pair[0].length; continue; }
    const char=initial[index];
    if (singles[char]) result+=singles[char];
    else if (char==="a" && index===initial.length-1) result+="ا";
    else if (!["a","e","i","o","u","'","-"].includes(char)) result+=char;
    index+=1;
  }
  return result;
}

function transliterate(text: string) {
  return text.split(/(\s+|[.,!?])/).map((part)=>{
    const key=part.toLowerCase().replace(/[^a-z0-9]/g,"");
    if (!key) return part;
    return words[key] ?? fallbackWord(key);
  }).join("").replace(/\?/g,"؟").replace(/,/g,"،").replace(/ال\s+(?=[\u0600-\u06ff])/g,"ال");
}

type Props = { value: string; onChange: (value: string) => void; placeholder: string; rows: number; vocabulary: string[]; locale: Locale };

export default function ArabicInputAssistant({ value, onChange, placeholder, rows, vocabulary, locale }: Props) {
  const textareaRef=useRef<HTMLTextAreaElement>(null);
  const [keyboardOpen,setKeyboardOpen]=useState(false);
  const [phoneticOpen,setPhoneticOpen]=useState(false);
  const [phonetic,setPhonetic]=useState("");
  const [listening,setListening]=useState(false);
  const [voiceSupported,setVoiceSupported]=useState(false);

  useEffect(()=>{ const frame=window.requestAnimationFrame(()=>{ const speech=window as SpeechWindow; setVoiceSupported(Boolean(speech.SpeechRecognition||speech.webkitSpeechRecognition)); }); return ()=>window.cancelAnimationFrame(frame); },[]);

  function insert(text: string, addWordSpacing = false) {
    const element=textareaRef.current;
    const start=element?.selectionStart ?? value.length;
    const end=element?.selectionEnd ?? value.length;
    const spacing=addWordSpacing && start>0 && !/\s$/.test(value.slice(0,start)) ? " " : "";
    const next=value.slice(0,start)+spacing+text+value.slice(end);
    onChange(next);
    requestAnimationFrame(()=>{ const position=start+spacing.length+text.length; element?.focus(); element?.setSelectionRange(position,position); });
  }

  function backspace() {
    const element=textareaRef.current; const start=element?.selectionStart ?? value.length; const end=element?.selectionEnd ?? value.length;
    if (start!==end) onChange(value.slice(0,start)+value.slice(end)); else if (start>0) onChange(value.slice(0,start-1)+value.slice(start));
    requestAnimationFrame(()=>element?.focus());
  }

  function convertPhonetic() {
    const converted=transliterate(phonetic.trim());
    if (converted) insert(converted, true);
    setPhonetic("");
  }

  const phoneticPreview=phonetic.trim() ? transliterate(phonetic.trim()) : "";
  const containsLatin=/[A-Za-z]/.test(value);

  function startVoice() {
    const speech=window as SpeechWindow; const Recognition=speech.SpeechRecognition||speech.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition=new Recognition(); recognition.lang="ar-SA"; recognition.interimResults=false; recognition.continuous=false;
    recognition.onresult=(event)=>{ const transcript=event.results[0]?.[0]?.transcript; if (transcript) insert(transcript, true); };
    recognition.onerror=()=>setListening(false); recognition.onend=()=>setListening(false); setListening(true); recognition.start();
  }

  return <div className="arabicInput"><textarea ref={textareaRef} value={value} onChange={(event)=>onChange(event.target.value)} placeholder={placeholder} dir="auto" rows={rows}/>{containsLatin&&<div className="latinDetected"><div><Sparkles/><span><b>{pick(locale,{bn:"আপনি ইংরেজি অক্ষরে লিখেছেন",en:"English letters detected"})}</b><small>{pick(locale,{bn:"চাইলে লেখাটি আরবি অক্ষরে বদলে নিতে পারেন।",en:"Convert your phonetic answer into Arabic script."})}</small></span></div><button type="button" onClick={()=>onChange(transliterate(value))}>{pick(locale,{bn:"আরবিতে বদলে নিন",en:"Convert this answer"})}</button></div>}<div className="inputToolbar"><button className={keyboardOpen?"active":""} onClick={()=>setKeyboardOpen(!keyboardOpen)} type="button"><Keyboard/>{pick(locale,{bn:"আরবি কিবোর্ড",en:"Arabic keyboard"})}</button><button className={phoneticOpen?"active":""} onClick={()=>setPhoneticOpen(!phoneticOpen)} type="button"><Languages/>{pick(locale,{bn:"English → আরবি",en:"English → Arabic"})}</button><button onClick={startVoice} disabled={!voiceSupported||listening} className={listening?"active":""} type="button"><Mic/>{listening?pick(locale,{bn:"শোনা হচ্ছে…",en:"Listening…"}):pick(locale,{bn:"আরবি বলুন",en:"Speak Arabic"})}</button></div>{phoneticOpen&&<div className="phoneticBox"><div><input value={phonetic} onChange={(event)=>setPhonetic(event.target.value)} onKeyDown={(event)=>{if(event.key==="Enter"){event.preventDefault();convertPhonetic();}}} placeholder="Example: ana talib fi al jamia"/><button type="button" onClick={convertPhonetic}><Sparkles/>{pick(locale,{bn:"উত্তরে যোগ করুন",en:"Use Arabic"})}</button></div>{phoneticPreview&&<div className="phoneticPreview"><span>{pick(locale,{bn:"আরবিতে এমন হবে",en:"Live preview"})}</span><b dir="rtl">{phoneticPreview}</b></div>}<small>{pick(locale,{bn:"আরবি শব্দটি যেভাবে শোনেন, ইংরেজি অক্ষরে সেভাবে লিখুন। ঠিক মনে হলে উত্তরে যোগ করুন।",en:"Type how Arabic sounds. Review the live preview, then insert it into your answer."})}</small></div>}{keyboardOpen&&<div className="virtualKeyboard" dir="rtl">{keyboardRows.map((row,index)=><div key={index}>{row.map((letter)=><button type="button" key={letter} onClick={()=>insert(letter)}>{letter}</button>)}</div>)}<div className="keyboardActions"><button type="button" onClick={()=>insert(" ")}><Space/>{pick(locale,{bn:"স্পেস",en:"Space"})}</button><button type="button" onClick={backspace}><Delete/>{pick(locale,{bn:"মুছুন",en:"Delete"})}</button></div></div>}<div className="quickInsert"><span>{pick(locale,{bn:"ছুঁয়ে যোগ করুন",en:"Tap to insert"})}</span>{vocabulary.slice(0,10).map((word,index)=><button type="button" onClick={()=>insert(word, true)} key={`${word}-${index}`}><Plus/>{word}</button>)}</div></div>;
}
