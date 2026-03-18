import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = "riva2025";

export async function GET() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("id");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json([], { status: 500 });
  }

  const mapped = (data || []).map((row: any) => ({
    ...row,
    className: row.class_name,
  }));
  return NextResponse.json(mapped);
}

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { photos } = await req.json();

  await supabase.from("gallery").delete().neq("id", -1);

  if (photos.length > 0) {
    const rows = photos.map((p: any) => ({
      id: p.id,
      src: p.src,
      title: p.title,
      class_name: p.className,
    }));
    await supabase.from("gallery").insert(rows);
  }

  const { data } = await supabase.from("gallery").select("*").order("id");
  const mapped = (data || []).map((row: any) => ({
    ...row,
    className: row.class_name,
  }));
  return NextResponse.json(mapped);
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase.from("gallery").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}