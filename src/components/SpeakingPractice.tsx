"use client";
import { useEffect, useRef, useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

export default function SpeakingPractice({ locale }: { locale: Locale }) {
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const url = useRef<string | null>(null);
  const mounted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [recording, setRecording] = useState(false);
  const [pending, setPending] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [extension, setExtension] = useState("webm");
  const [error, setError] = useState("");
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      if (recorder.current?.state === "recording") recorder.current.stop();
      stream.current?.getTracks().forEach(track => track.stop());
      if (url.current) URL.revokeObjectURL(url.current);
    };
  }, []);
  function stop() {
    if (timer.current) clearTimeout(timer.current);
    if (recorder.current?.state === "recording") recorder.current.stop();
    stream.current?.getTracks().forEach(track => track.stop());
    setRecording(false);
  }
  async function start() {
    if (pending || recording) return;
    setPending(true); setError("");
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("unsupported");
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      const device = new MediaRecorder(media);
      recorder.current = device;
      const chunks: Blob[] = [];
      device.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      device.onerror = () => {
        stop();
        if (mounted.current) setError(pick(locale,{bn:"রেকর্ড করা যায়নি। ফোনের recorder দিয়েও অনুশীলন করতে পারেন।",en:"Recording failed. You can also practise with your phone recorder."}));
      };
      device.onstop = () => {
        media.getTracks().forEach(track => track.stop());
        if (!mounted.current || !chunks.length) return;
        if (url.current) URL.revokeObjectURL(url.current);
        url.current = URL.createObjectURL(new Blob(chunks, { type: device.mimeType }));
        setRecordingUrl(url.current); setExtension(device.mimeType.includes("mp4") ? "m4a" : device.mimeType.includes("ogg") ? "ogg" : "webm"); setRecording(false);
      };
      device.start(); setRecording(true);
      timer.current = setTimeout(stop, 120_000);
    } catch {
      stream.current?.getTracks().forEach(track => track.stop());
      if (mounted.current) setError(pick(locale,{bn:"মাইক্রোফোন পাওয়া যায়নি বা অনুমতি নেই। শুনে অনুকরণ করুন; recording বাধ্যতামূলক নয়।",en:"Microphone unavailable or permission denied. Listen and imitate; recording is optional."}));
    } finally { if (mounted.current) setPending(false); }
  }
  return <details className="contentCard speakingPractice"><summary>{pick(locale,{bn:"ঐচ্ছিক: নিজের কণ্ঠ শুনুন",en:"Optional: hear yourself speak"})}</summary>
    <p>{pick(locale,{bn:"একটি model শুনুন, তারপর ধীরে বলুন। নিজের recording শুনে ধ্বনি, দীর্ঘ/ছোট স্বর ও বিরতি তুলনা করুন। এটি self-check—AI মূল্যায়ন নয়। সর্বোচ্চ ২ মিনিট; upload হয় না, পাতা ছাড়লে recording হারাবে।",en:"Listen to one model, then say it slowly. Replay your recording and compare sounds, vowel length and pauses. This is self-check, not AI grading. Maximum 2 minutes; nothing is uploaded and leaving the page discards it."})}</p>
    <div className="practiceActions"><button onClick={recording ? stop : start} disabled={pending}>{pick(locale,{bn:pending?"অনুমতির অপেক্ষা…":recording?"রেকর্ড থামান":"রেকর্ড করুন",en:pending?"Waiting for permission…":recording?"Stop recording":"Record"})}</button></div>
    <p role="status">{recording ? pick(locale,{bn:"রেকর্ড চলছে…",en:"Recording…"}) : error}</p>
    {recordingUrl && <><audio controls src={recordingUrl} aria-label={pick(locale,{bn:"নিজের কণ্ঠের recording",en:"Your speaking recording"})}/><a href={recordingUrl} download={`arabic-practice.${extension}`}>{pick(locale,{bn:"নিজের ডিভাইসে রাখুন",en:"Download to your device"})}</a></>}
  </details>;
}
