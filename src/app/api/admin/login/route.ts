import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "riva2025";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Nieprawidłowe hasło" }, { status: 401 });
}