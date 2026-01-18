import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from "@libsql/client";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, repoUrl } = await req.json();

  const db = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
  });

  try {
    await db.execute({
      sql: "INSERT INTO agents (userId, name, repoUrl, price) VALUES (?, ?, ?, ?)",
      args: [userId, name, repoUrl, 10.00] // Default price
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
