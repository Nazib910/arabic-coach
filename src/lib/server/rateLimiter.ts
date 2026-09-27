import { createHmac } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
export function hashIpForLimit(ip: string, secret: string): string {
  if (secret.length < 32) throw new Error("Rate limit secret is not configured");
  return createHmac("sha256", secret).update(ip).digest("hex");
}
export function getClientIp(headers: Headers): string {
  // Vercel overwrites this trusted forwarding header; do not trust arbitrary XFF.
  return headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown";
}
export async function quotaResponse(supabase: SupabaseClient, action: "tutor" | "tts"): Promise<Response | null> {
  if (process.env.API_QUOTAS_ENABLED !== "true") return Response.json({ error: "AI services are paused until production protection is configured. Local exercises and checkpoints remain available." }, { status: 503 });
  try {
    const { data, error } = await supabase.rpc("consume_api_quota", { p_action: action });
    if (error || !data || typeof data.allowed !== "boolean" || !Number.isFinite(Date.parse(data.reset_at))) throw new Error("Quota unavailable");
    if (data.allowed) return null;
    return Response.json({ error: "Request limit reached. Please retry later." }, { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((Date.parse(data.reset_at)-Date.now())/1000))) } });
  } catch { return Response.json({ error: "Service protection is temporarily unavailable." }, { status: 503 }); }
}
