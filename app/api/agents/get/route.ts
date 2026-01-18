import { db } from "../../../../lib/db"; 
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const result = await db.execute("SELECT * FROM agents ORDER BY id DESC");
    // Turso result.rows mein data bhejta hai
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
