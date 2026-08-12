import { BookHeart, Quote } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

const hadiths = [
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    bn: "তোমাদের মধ্যে সবচেয়ে ভালো সে, যে কুরআন শেখে এবং অন্যকে শেখায়।",
    en: "The best among you are those who learn the Qur’an and teach it.",
    sourceBn: "সহিহ বুখারি · হাদিস ৫০২৭ · কুরআনের মর্যাদা অধ্যায়",
    sourceEn: "Sahih al-Bukhari 5027 · Book: Virtues of the Qur’an",
    noteBn: "হাদিসটি কুরআন শেখার গুরুত্ব নিয়ে। এটি সরাসরি আরবি ভাষা শেখার নির্দেশ নয়। তবে কুরআনের ভাষা বুঝতে আরবি শেখার আগ্রহ তৈরি করতে পারে।",
    noteEn: "This hadith concerns the virtue of learning the Qur’an. It is not a direct command to learn Arabic, though it inspires study of the Qur’an’s language.",
  },
  {
    arabic: "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    bn: "আল্লাহ যার ভালো চান, তাকে দ্বীন ভালোভাবে বোঝার জ্ঞান দেন।",
    en: "When Allah intends good for someone, He grants them understanding of the religion.",
    sourceBn: "সহিহ বুখারি · হাদিস ৭১ · জ্ঞান অধ্যায়",
    sourceEn: "Sahih al-Bukhari 71 · Book: Knowledge",
    noteBn: "হাদিসটি দ্বীন বুঝে শেখার গুরুত্ব মনে করিয়ে দেয়। আরবি জানা কুরআন ও সুন্নাহ আরও কাছ থেকে বুঝতে সাহায্য করতে পারে।",
    noteEn: "It highlights the virtue of religious understanding; Arabic can be a valuable means of engaging more deeply with the Qur’an and Sunnah.",
  },
];

export default function HadithShowcase({ locale }: { locale: Locale }) {
  return <section className="hadithSection" aria-labelledby="hadith-heading">
    <div className="hadithHeading"><div><span className="eyebrow"><BookHeart/>{pick(locale,{bn:"শেখার পথে প্রেরণা",en:"Inspiration for learning"})}</span><h2 id="hadith-heading">{pick(locale,{bn:"হাদিস থেকে একটি সুন্দর স্মরণ",en:"Guidance from authentic hadith"})}</h2></div><p>{pick(locale,{bn:"একটি ছোট কথা: ‘সহিহ’ আর ‘মুতাওয়াতির’ একই বিষয় নয়। এখানে সহিহ বুখারি থেকে যাচাই করা হাদিস দেওয়া হয়েছে। নির্ভরযোগ্য প্রমাণ ছাড়া কোনো হাদিসকে মুতাওয়াতির বলা হয়নি।",en:"‘Sahih’ and ‘mutawatir’ are distinct classifications. These narrations are verified from Sahih al-Bukhari and are not labelled mutawatir without specific scholarly evidence."})}</p></div>
    <div className="hadithGrid">{hadiths.map((hadith)=><article className="hadithCard" key={hadith.sourceEn}><Quote className="hadithQuote"/><blockquote dir="rtl">{hadith.arabic}</blockquote><p>{locale === "bn" ? hadith.bn : hadith.en}</p><strong>{locale === "bn" ? hadith.sourceBn : hadith.sourceEn}</strong><small>{locale === "bn" ? hadith.noteBn : hadith.noteEn}</small></article>)}</div>
  </section>;
}
