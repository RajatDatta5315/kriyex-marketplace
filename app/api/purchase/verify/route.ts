import { db } from "../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get('agentId');
  const email = searchParams.get('email') || "buyer@kriyex.com";

  try {
    const apiKey = "KRYV-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    await db.execute({
      sql: "INSERT INTO purchases (buyerEmail, agentId, apiKey) VALUES (?, ?, ?)",
      args: [email, agentId, apiKey]
    });

    return NextResponse.json({ key: apiKey });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
