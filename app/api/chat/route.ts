import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    return new Response("Profile not found", { status: 404 });
  }

  if (profile.credits <= 0) {
    return new Response("Insufficient credits", { status: 403 });
  }

  const result = streamText({
    model: google("gemini-pro"),
    messages,
    temperature: 0.7,
    maxTokens: 800,
  });

  // Update credits and save conversation
  await supabase
    .from("profiles")
    .update({ credits: profile.credits - 1 })
    .eq("id", session.user.id);
  await supabase.from("conversations").insert({
    user_id: session.user.id,
    model_used: "gemini-pro",
    conversation: messages,
    title: messages[0].content.substring(0, 50) + "...",
    type: "general",
  });

  return result.toDataStreamResponse();
}
