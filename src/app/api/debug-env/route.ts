import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `set (${process.env.OPENAI_API_KEY.slice(0, 8)}...)` : "NOT SET",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? `set (${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 8)}...)` : "NOT SET",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `set (${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 8)}...)` : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "NOT SET",
  });
}
