import { NextResponse } from "next/server";
import { timingSafeEqual, createHash } from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { validateAdminLogin } from "@/lib/server/inputValidation";
import { readBoundedJson } from "@/lib/tutorContract";

export async function POST(request: Request) {
  try {
    let credentials: ReturnType<typeof validateAdminLogin>;
    try { credentials = validateAdminLogin(await readBoundedJson(request, 4096)); }
    catch { return NextResponse.json({ error: "Invalid login request." }, { status: 400 }); }
    const expectedUser = process.env.ADMIN_LOGIN_USERNAME ?? "admin";
    const expectedPassword = process.env.ADMIN_LOGIN_PASSWORD;
    const email = process.env.INITIAL_ADMIN_EMAIL;
    const internalPassword = process.env.INITIAL_USER_PASSWORD;
    if (!expectedPassword || !email || !internalPassword) return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    const digest = (value: string) => createHash("sha256").update(value).digest();
    const valid = timingSafeEqual(digest(credentials.password), digest(expectedPassword)) && credentials.username === expectedUser;
    const supabase = await getSupabaseServerClient();
    // Always use Supabase Auth for the password attempt, including invalid aliases,
    // so its native login abuse controls are not bypassed by a local password oracle.
    const result = await supabase.auth.signInWithPassword({ email, password: valid ? internalPassword : credentials.password });
    if (!valid || result.error || !result.data.user) {
      if (result.data.session) await supabase.auth.signOut();
      return NextResponse.json({ error: "Unable to sign in. Check credentials or retry later." }, { status: result.error?.status === 429 ? 429 : 401 });
    }
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Login service unavailable." }, { status: 503 }); }
}
