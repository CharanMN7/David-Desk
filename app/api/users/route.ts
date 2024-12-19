// app/api/users/route.ts
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: data.email,
        password: crypto.randomUUID(), // Generate random initial password
        email_confirm: true,
        user_metadata: { full_name: data.full_name },
      });

    if (authError) throw authError;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      ...data,
    });

    if (profileError) throw profileError;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
