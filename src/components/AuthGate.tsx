"use client";

import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { BookOpen, Eye, LoaderCircle, LockKeyhole, Mail, Sparkles } from "lucide-react";
import ArabicCoach from "@/components/ArabicCoach";
import LanguageToggle from "@/components/LanguageToggle";
import { useToast } from "@/components/ToastProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DEFAULT_LOCALE, isLocale, LOCALE_STORAGE_KEY, pick, type Locale } from "@/lib/i18n";

const demoUser = { id: "local-demo", user_metadata: { is_demo: true }, app_metadata: {}, aud: "", created_at: "" } as User;

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [demo, setDemo] = useState(false);
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const { toast } = useToast();
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};
    const timeout = window.setTimeout(()=>{if(active)setLoading(false);},5000);
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (isLocale(saved)) setLocale(saved);
        setDemo(sessionStorage.getItem("arabic-coach-demo") === "true");
      } catch { /* browsing must work with storage blocked */ }
      setLocaleReady(true);
      try {
        const supabase = getSupabaseBrowserClient();
        void supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => { if (active) { setUser(data.user); setLoading(false); } }).catch(() => { if (active) setLoading(false); });
        const { data } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => { if (active) { setUser(session?.user ?? null); setLoading(false); } });
        unsubscribe = () => data.subscription.unsubscribe();
      } catch { setLoading(false); }
    });
    return () => { active = false; window.clearTimeout(timeout); window.cancelAnimationFrame(frame); unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!localeReady) return;
    try { localStorage.setItem(LOCALE_STORAGE_KEY, locale); } catch { /* session preference still works */ }
    document.documentElement.lang = locale;
  }, [locale, localeReady]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (email.trim().toLowerCase() === "admin") {
        const response = await fetch("/api/auth/admin-login", { method: "POST", signal: AbortSignal.timeout(15000), headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password }) });
        if (!response.ok) throw new Error("Login failed");
        window.location.reload();
      } else {
        const result = await getSupabaseBrowserClient().auth.signInWithPassword({ email: email.trim(), password });
        if (result.error) throw result.error;
      }
    } catch {
      toast({ variant: "error", title: pick(locale,{bn:"সাইন ইন করা যায়নি",en:"Unable to sign in"}), description: pick(locale,{bn:"তথ্য ও সংযোগ দেখে আবার চেষ্টা করুন। চাইলে স্থানীয় ডেমো ব্যবহার করুন।",en:"Check your credentials and connection, or try the local demo."}) });
    } finally { setSubmitting(false); }
  }

  function enterDemo() {
    try { sessionStorage.setItem("arabic-coach-demo", "true"); } catch { /* memory-only preview */ }
    setDemo(true);
  }

  function exitDemo() {
    try { sessionStorage.removeItem("arabic-coach-demo"); } catch { /* memory-only preview */ }
    setDemo(false);
  }

  if (demo) return <ArabicCoach key="local-demo" user={demoUser} isDemo locale={locale} onLocaleChange={setLocale} onExitDemo={exitDemo}/>;
  if (loading) return <div className="authLoading"><LoaderCircle/><span>{pick(locale, { bn: "আপনার আরবি শেখার জায়গাটি তৈরি হচ্ছে…", en: "Preparing your Arabic classroom…" })}</span></div>;
  if (user) return <ArabicCoach key={user.id} user={user} isDemo={Boolean(user.user_metadata?.is_demo)} locale={locale} onLocaleChange={setLocale}/>;

  return <main className={`authPage locale-${locale}`}>
    <div className="authLanguage"><LanguageToggle locale={locale} onChange={setLocale}/></div>
    <section className="authStory"><span className="brandMark authBrand">ض</span><span className="eyebrow"><Sparkles size={14}/> {pick(locale, { bn: "আপনার নিজের আরবি শেখার জায়গা", en: "Your private Arabic studio" })}</span><h1>{pick(locale, { bn: <>মন দিয়ে শিখুন।<br/><em>মনে রাখুন দীর্ঘদিন।</em></>, en: <>Learn deeply.<br/><em>Practise regularly.</em></> })}</h1><p>{pick(locale, { bn: "ছোট পাঠ, বাংলা অর্থ, নিজের কণ্ঠ শোনা ও local check দিয়ে শিখুন। নতুন review এই ব্রাউজারে থাকে; backup দিয়ে অন্য ডিভাইসে নিতে পারবেন।", en: "Learn with small lessons, meanings, voice replay and local checks. New reviews stay in this browser; transfer them with a backup." })}</p><div className="authFeatures"><span><BookOpen/>{pick(locale, { bn: "২০ ধাপে ৪০০ দিনের কোর্স", en: "400-day guided curriculum" })}</span><span><Sparkles/>{pick(locale, { bn: "উত্তরভিত্তিক local check", en: "Answer-based local checks" })}</span><span><LockKeyhole/>{pick(locale, { bn: "অগ্রগতি থাকবে নিরাপদ", en: "Private learner memory" })}</span></div><div className="authArabic" dir="rtl">العِلْمُ نُورٌ</div></section>
    <section className="authPanel"><div className="authFormWrap"><span className="eyebrow">{pick(locale, { bn: "আপনার অ্যাকাউন্ট", en: "Private learner login" })}</span><h2>{pick(locale, { bn: "যেখান থেকে থেমেছিলেন, সেখান থেকেই শুরু করুন", en: "Continue your journey" })}</h2><p>{pick(locale, { bn: "আপনার ইউজারনেম ও পাসওয়ার্ড দিন। নতুন অ্যাকাউন্ট এখন শুধু আমন্ত্রণের মাধ্যমে খোলা হচ্ছে।", en: "Use your private username and password. New public registrations are disabled." })}</p><form onSubmit={submit}><label>{pick(locale, { bn: "ইউজারনেম অথবা ইমেইল", en: "Username or email" })}<div><Mail/><input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} required autoComplete="username"/></div></label><label>{pick(locale, { bn: "পাসওয়ার্ড", en: "Password" })}<div><LockKeyhole/><input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} minLength={5} required autoComplete="current-password"/></div></label><button className="primaryButton authSubmit" disabled={submitting}>{submitting ? <><LoaderCircle className="spinnerIcon"/>{pick(locale, { bn: "প্রবেশ করা হচ্ছে…", en: "Signing in…" })}</> : pick(locale, { bn: "সাইন ইন করুন", en: "Sign in" })}</button></form><div className="demoDivider"><span>{pick(locale, { bn: "অথবা কোর্সটি দেখে নিন", en: "or preview the course" })}</span></div><button className="demoButton" onClick={enterDemo}><span><Eye/></span><div><b>{pick(locale, { bn: "আগে ডেমোটি দেখে নিন", en: "Explore as demo learner" })}</b><small>{pick(locale, { bn: "কোনো অ্যাকাউন্ট লাগবে না", en: "No account or email confirmation required" })}</small></div></button><p className="demoPrivacy">{pick(locale, { bn: "ডেমোর অগ্রগতি এই ব্রাউজারেই থাকে। ব্যক্তিগত শিক্ষার্থীর তথ্য গোপন ও নিরাপদ।", en: "Demo progress stays in this browser. Personal learner records remain private." })}</p></div></section>
  </main>;
}
