import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const expectedUser = process.env.ADMIN_LOGIN_USERNAME ?? "admin";
    const expectedPassword = process.env.ADMIN_LOGIN_PASSWORD;
    if (!expectedPassword || username !== expectedUser || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }
    const email = process.env.INITIAL_ADMIN_EMAIL;
    const internalPassword = process.env.INITIAL_USER_PASSWORD;
    if (!email || !internalPassword) return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: internalPassword });
    if (error || !data.user) return NextResponse.json({ error: "Unable to establish the admin session." }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
