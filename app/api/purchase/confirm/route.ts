import { db } from "../../../../lib/db";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, agentId } = await req.json();
    const apiKey = "KRYV-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    await db.execute({
      sql: "INSERT INTO purchases (buyerEmail, agentId, apiKey) VALUES (?, ?, ?)",
      args: [email, agentId, apiKey]
    });

    return NextResponse.json({ apiKey });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
