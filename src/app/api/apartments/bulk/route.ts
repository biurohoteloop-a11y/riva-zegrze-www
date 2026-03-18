import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = "riva2025";

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { apartments } = await req.json();
  for (const apt of apartments) {
    await supabase
      .from("apartments")
      .update({ status: apt.status, price: apt.price })
      .eq("id", apt.id);
  }

  const { data } = await supabase.from("apartments").select("*").order("id");
  return NextResponse.json(data);
}