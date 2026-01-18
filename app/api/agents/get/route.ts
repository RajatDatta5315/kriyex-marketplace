import { db } from "@/lib/db"; // Humne jo naya lib banaya
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Taaki har baar naya data mile

export async function GET() {
  try {
    const result = await db.execute("SELECT * FROM agents ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
