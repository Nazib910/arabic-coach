import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Noto_Sans_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const bengali = Noto_Sans_Bengali({ variable: "--font-bengali", subsets: ["bengali"] });
const arabic = Noto_Naskh_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Darija — আপনার বন্ধুসুলভ আরবি শিক্ষক",
  description: "বাংলা বা English-এ ধাপে ধাপে আরবি শিখুন, অনুশীলন করুন এবং AI শিক্ষকের সহজ পরামর্শ নিন।",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body className={`${sans.variable} ${bengali.variable} ${arabic.variable}`}>{children}</body></html>;
}
