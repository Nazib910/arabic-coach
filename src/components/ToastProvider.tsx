"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Info, Sparkles, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";
type ToastInput = { title: string; description?: string; variant?: ToastVariant; duration?: number };
type ToastItem = Required<Pick<ToastInput, "title" | "variant" | "duration">> & Pick<ToastInput, "description"> & { id: string };
type ToastContextValue = { toast: (input: ToastInput) => void; dismiss: (id: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: string) => setItems((current) => current.filter((item) => item.id !== id)), []);
  const toast = useCallback((input: ToastInput) => {
    const id = crypto.randomUUID();
    const item: ToastItem = { id, title: input.title, description: input.description, variant: input.variant ?? "info", duration: input.duration ?? 4800 };
    setItems((current) => [...current.slice(-3), item]);
    window.setTimeout(() => dismiss(id), item.duration);
  }, [dismiss]);
  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return <ToastContext.Provider value={value}>{children}<div className="toastViewport" aria-live="polite" aria-relevant="additions">{items.map((item) => <article className={`appToast ${item.variant}`} role={item.variant === "error" ? "alert" : "status"} key={item.id}><span className="toastIcon">{item.variant === "success" ? <CheckCircle2/> : item.variant === "error" ? <AlertCircle/> : item.title.includes("AI") ? <Sparkles/> : <Info/>}</span><div><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</div><button type="button" onClick={() => dismiss(item.id)} aria-label="Dismiss notification"><X/></button><i style={{ animationDuration: `${item.duration}ms` }}/></article>)}</div></ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
