"use client";

import { Languages } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

export default function LanguageToggle({ locale, onChange, compact = false }: { locale: Locale; onChange: (locale: Locale) => void; compact?: boolean }) {
  return (
    <div className={`languageToggle ${compact ? "compact" : ""}`} role="group" aria-label={pick(locale, { bn: "ভাষা নির্বাচন", en: "Choose language" })}>
      {!compact && <Languages aria-hidden="true" />}
      <button type="button" className={locale === "bn" ? "active" : ""} onClick={() => onChange("bn")} aria-pressed={locale === "bn"}>বাংলা</button>
      <button type="button" className={locale === "en" ? "active" : ""} onClick={() => onChange("en")} aria-pressed={locale === "en"}>English</button>
    </div>
  );
}
