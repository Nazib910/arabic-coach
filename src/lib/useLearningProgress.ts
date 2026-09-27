"use client";

import { useEffect, useRef, useState } from "react";
import type { ProgressMap } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { mergeProgress, parseProgress } from "@/lib/progress";
import { lessons } from "@/data/lessons";
import { COURSE_LENGTH } from "@/data/phases";

export function useLearningProgress(userId: string, isDemo: boolean) {
  const storageKey = `arabic-coach-progress-v1:${userId}`;
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [cloudLoaded, setCloudLoaded] = useState(isDemo);
  const [syncState, setSyncState] = useState<"loading" | "saved" | "saving" | "offline">(isDemo ? "offline" : "loading");
  const [retry, setRetry] = useState(0);
  const saved = useRef<Record<number, string>>({});
  const writes = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      let local: ProgressMap = {};
      try { local = parseProgress(JSON.parse(localStorage.getItem(storageKey) ?? "{}"), COURSE_LENGTH); } catch { /* unavailable or corrupt storage */ }
      setProgress(current => mergeProgress(current, local));
      setHydrated(true);
      if (isDemo) return;
      setCloudLoaded(false);
      try {
        const supabase = getSupabaseBrowserClient();
        const fields = "day,answers,confidence,completed,feedback,updated_at,attempt_number";
        const [drafts, attempts] = await Promise.all([
          supabase.from("lesson_attempts").select(fields).eq("user_id", userId).eq("attempt_number", 1),
          supabase.from("lesson_attempts").select(fields).eq("user_id", userId).gt("attempt_number", 1).order("updated_at", { ascending: false }).limit(400),
        ]);
        if (cancelled) return;
        if (drafts.error || attempts.error) throw drafts.error ?? attempts.error;
        const remote: ProgressMap = {};
        for (const row of [...(drafts.data ?? []), ...(attempts.data ?? [])]) {
          const entry = parseProgress({ [row.day]: { completed: row.completed, answers: row.answers, confidence: row.confidence, feedback: row.feedback, updatedAt: row.updated_at } }, COURSE_LENGTH)[row.day];
          if (entry && (!remote[row.day] || Date.parse(entry.updatedAt) > Date.parse(remote[row.day].updatedAt))) remote[row.day] = entry;
        }
        setProgress(current => mergeProgress(current, remote));
        // Reconcile remote records back to the draft slot once; history stays immutable.
        setSyncState("saved");
        setCloudLoaded(true);
      } catch { if (!cancelled) setSyncState("offline"); }
    }
    void load();
    return () => { cancelled = true; };
  }, [isDemo, retry, storageKey, userId]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
    catch { const frame = window.requestAnimationFrame(() => setSyncState("offline")); return () => window.cancelAnimationFrame(frame); }
  }, [hydrated, progress, storageKey]);

  useEffect(() => {
    const online = () => { setCloudLoaded(false); setRetry(value => value + 1); };
    window.addEventListener("online", online);
    return () => window.removeEventListener("online", online);
  }, []);

  useEffect(() => {
    if (isDemo || !hydrated || !cloudLoaded) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      const snapshot = Object.entries(progress);
      // Serialize writes so an older in-flight draft cannot win over a newer draft.
      writes.current = writes.current.catch(() => {}).then(async () => {
        if (cancelled) return;
        const dirty = snapshot.filter(([day, item]) => saved.current[Number(day)] !== JSON.stringify(item));
        if (!dirty.length) return;
        setSyncState("saving");
        try {
          const supabase = getSupabaseBrowserClient();
          for (const [key, item] of dirty) {
            if (cancelled) return;
            const day = Number(key);
            const { error } = await supabase.from("lesson_attempts").upsert({
              user_id: userId, day, lesson_title: lessons[day - 1].title,
              answers: item.answers, confidence: item.confidence, completed: item.completed,
              feedback: item.feedback ?? null, score: item.feedback?.score ?? null,
              model_id: item.feedback?.source === "ai" ? "ai" : null,
              attempt_number: 1, updated_at: item.updatedAt,
            }, { onConflict: "user_id,day,attempt_number" });
            if (error) throw error;
            saved.current[day] = JSON.stringify(item);
          }
          if (!cancelled) setSyncState("saved");
        } catch { if (!cancelled) setSyncState("offline"); }
      });
    }, 500);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [cloudLoaded, hydrated, isDemo, progress, retry, userId]);

  return { progress, setProgress, hydrated, syncState, retrySync: () => { setCloudLoaded(false); setRetry(value => value + 1); } };
}
