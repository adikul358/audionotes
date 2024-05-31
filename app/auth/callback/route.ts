import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const { data: { user } } = await supabase.auth.getUser()
    const checkInserted = await supabase.from("users").select()
    if (checkInserted.data.length == 0) {
      const dbRes = await supabase
        .from("users")
        .insert([{
          id: user.id,
          email: user.email,
          name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        }])
      if (dbRes.error) { console.log(dbRes.error) }
    }
    if (checkInserted.error) { console.log(checkInserted.error) }
  }

  return NextResponse.redirect(`${origin}/app`);
}
