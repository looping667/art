import { NextResponse } from "next/server";

export async function GET() {
  // Test OpenAI API key validity
  let openaiStatus = "NOT SET";
  if (process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      });
      if (res.ok) {
        openaiStatus = `VALID (${process.env.OPENAI_API_KEY.slice(0, 8)}...)`;
      } else {
        const data = await res.json();
        openaiStatus = `INVALID (${res.status}): ${data?.error?.message || "Unknown error"}`;
      }
    } catch (e) {
      openaiStatus = `ERROR: ${e instanceof Error ? e.message : "fetch failed"}`;
    }
  }

  return NextResponse.json({
    OPENAI_API_KEY: openaiStatus,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "NOT SET",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "set" : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "NOT SET",
  });
}
