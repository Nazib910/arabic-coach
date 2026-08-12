"use client";

import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { BookOpen, Eye, LoaderCircle, LockKeyhole, Mail, Sparkles } from "lucide-react";
import ArabicCoach from "@/components/ArabicCoach";
import LanguageToggle from "@/components/LanguageToggle";
import { useToast } from "@/components/ToastProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DEFAULT_LOCALE, isLocale, LOCALE_STORAGE_KEY, pick, type Locale } from "@/lib/i18n";

type Props = { demoEmail: string; demoPassword: string };

export default function AuthGate({ demoEmail, demoPassword }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const { toast } = useToast();
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(saved)) setLocale(saved);
      setLocaleReady(true);
    });
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => { setUser(data.user); setLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => { setUser(session?.user ?? null); setLoading(false); });
    return () => { window.cancelAnimationFrame(frame); data.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!localeReady) return;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale, localeReady]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    if (email.trim().toLowerCase() === "admin") {
      const response = await fetch("/api/auth/admin-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password }) });
      const result = await response.json();
      if (!response.ok) { toast({ variant: "error", title: pick(locale, { bn: "সাইন ইন করা যায়নি", en: "Unable to sign in" }), description: locale === "bn" ? "ইউজারনেম বা পাসওয়ার্ড সঠিক নয়।" : (result.error ?? "Please check your username and password.") }); setSubmitting(false); return; }
      window.location.reload();
      return;
    }
    const result = await getSupabaseBrowserClient().auth.signInWithPassword({ email, password });
    if (result.error) toast({ variant: "error", title: pick(locale, { bn: "সাইন ইন করা যায়নি", en: "Unable to sign in" }), description: locale === "bn" ? "ইউজারনেম ও পাসওয়ার্ড দেখে আবার চেষ্টা করুন।" : result.error.message });
    setSubmitting(false);
  }

  async function enterDemo() {
    setDemoSubmitting(true);
    const result = await getSupabaseBrowserClient().auth.signInWithPassword({ email: demoEmail, password: demoPassword });
    if (result.error) toast({ variant: "error", title: pick(locale, { bn: "ডেমো খোলা যায়নি", en: "Unable to open demo" }), description: pick(locale, { bn: "ডেমোটি এখন খোলা যাচ্ছে না। একটু পর আবার চেষ্টা করুন।", en: "Demo is temporarily unavailable. Please try again." }) });
    setDemoSubmitting(false);
  }

  if (loading) return <div className="authLoading"><LoaderCircle/><span>{pick(locale, { bn: "আপনার আরবি শেখার জায়গাটি তৈরি হচ্ছে…", en: "Preparing your Arabic classroom…" })}</span></div>;
  if (user) return <ArabicCoach user={user} isDemo={Boolean(user.user_metadata?.is_demo)} locale={locale} onLocaleChange={setLocale}/>;

  return <main className={`authPage locale-${locale}`}>
    <div className="authLanguage"><LanguageToggle locale={locale} onChange={setLocale}/></div>
    <section className="authStory"><span className="brandMark authBrand">ض</span><span className="eyebrow"><Sparkles size={14}/> {pick(locale, { bn: "আপনার নিজের আরবি শেখার জায়গা", en: "Your private Arabic studio" })}</span><h1>{pick(locale, { bn: <>মন দিয়ে শিখুন।<br/><em>মনে রাখুন দীর্ঘদিন।</em></>, en: <>Learn deeply.<br/><em>Remember permanently.</em></> })}</h1><p>{pick(locale, { bn: "পাঠ, শব্দ, ভুলের সংশোধন আর আপনার অগ্রগতি—সবকিছু নিরাপদে এক জায়গায় থাকবে।", en: "Your lessons, corrections, vocabulary and progress now follow you securely across devices." })}</p><div className="authFeatures"><span><BookOpen/>{pick(locale, { bn: "২০ ধাপে ৪০০ দিনের কোর্স", en: "400-day guided curriculum" })}</span><span><Sparkles/>{pick(locale, { bn: "আপনার জন্য AI পরামর্শ", en: "Personalized AI feedback" })}</span><span><LockKeyhole/>{pick(locale, { bn: "অগ্রগতি থাকবে নিরাপদ", en: "Private learner memory" })}</span></div><div className="authArabic" dir="rtl">العِلْمُ نُورٌ</div></section>
    <section className="authPanel"><div className="authFormWrap"><span className="eyebrow">{pick(locale, { bn: "আপনার অ্যাকাউন্ট", en: "Private learner login" })}</span><h2>{pick(locale, { bn: "যেখান থেকে থেমেছিলেন, সেখান থেকেই শুরু করুন", en: "Continue your journey" })}</h2><p>{pick(locale, { bn: "আপনার ইউজারনেম ও পাসওয়ার্ড দিন। নতুন অ্যাকাউন্ট এখন শুধু আমন্ত্রণের মাধ্যমে খোলা হচ্ছে।", en: "Use your private username and password. New public registrations are disabled." })}</p><form onSubmit={submit}><label>{pick(locale, { bn: "ইউজারনেম অথবা ইমেইল", en: "Username or email" })}<div><Mail/><input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} required autoComplete="username"/></div></label><label>{pick(locale, { bn: "পাসওয়ার্ড", en: "Password" })}<div><LockKeyhole/><input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} minLength={5} required autoComplete="current-password"/></div></label><button className="primaryButton authSubmit" disabled={submitting}>{submitting ? <><LoaderCircle className="spinnerIcon"/>{pick(locale, { bn: "প্রবেশ করা হচ্ছে…", en: "Signing in…" })}</> : pick(locale, { bn: "সাইন ইন করুন", en: "Sign in" })}</button></form><div className="demoDivider"><span>{pick(locale, { bn: "অথবা কোর্সটি দেখে নিন", en: "or preview the course" })}</span></div><button className="demoButton" onClick={enterDemo} disabled={demoSubmitting}><span><Eye/></span><div><b>{demoSubmitting ? pick(locale, { bn: "ডেমো খোলা হচ্ছে…", en: "Opening demo…" }) : pick(locale, { bn: "আগে ডেমোটি দেখে নিন", en: "Explore as demo learner" })}</b><small>{pick(locale, { bn: "কোনো অ্যাকাউন্ট লাগবে না", en: "No account or email confirmation required" })}</small></div></button><p className="demoPrivacy">{pick(locale, { bn: "ডেমোর অগ্রগতি এই ব্রাউজারেই থাকে। ব্যক্তিগত শিক্ষার্থীর তথ্য গোপন ও নিরাপদ।", en: "Demo progress stays in this browser. Personal learner records remain private." })}</p></div></section>
  </main>;
}
