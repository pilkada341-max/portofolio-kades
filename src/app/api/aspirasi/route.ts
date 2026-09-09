import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Simple in-memory rate limiting (resets on cold start)
// For production, use Redis or Supabase-based rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;           // max submissions
const RATE_LIMIT_WINDOW_MS = 3600000; // per 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak pengiriman. Silakan coba lagi dalam 1 jam." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, category, message } = body;

    // Validate
    if (!name || !category || !message) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Nama tidak valid." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: "Isi aspirasi tidak valid." },
        { status: 400 }
      );
    }

    const validCategories = [
      "infrastruktur",
      "pelayanan",
      "pemuda",
      "umkm",
      "pertanian",
      "sosial",
      "pendidikan",
      "lainnya",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Kategori tidak valid." },
        { status: 400 }
      );
    }

    // Sanitize — strip dangerous characters
    const safeName = name.replace(/[<>]/g, "").trim();
    const safeMessage = message.replace(/[<>]/g, "").trim();

    // Insert to Supabase
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: () => {},
        },
      }
    );

    const { error } = await supabase.from("aspirations").insert([
      {
        name: safeName,
        category,
        message: safeMessage,
        status: "pending",
        is_public: false,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan aspirasi. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
