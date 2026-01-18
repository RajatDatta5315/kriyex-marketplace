import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, repoUrl } = await req.json();

    await db.execute({
      sql: "INSERT INTO agents (userId, name, repoUrl, price) VALUES (?, ?, ?, ?)",
      args: [userId, name, repoUrl, "10.00"]
    });
    
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
