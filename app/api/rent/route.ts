import { createClient } from "@libsql/client";

const db = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });

export async function POST(req: Request) {
  const { userId, agentId, duration } = await req.json();
  
  // Logic: Insert into Rentals table
  await db.execute({
    sql: "INSERT INTO rentals (buyer_id, agent_id, expires_at) VALUES (?, ?, datetime('now', '+? hours'))",
    args: [userId, agentId, duration]
  });

  return Response.json({ success: true, message: "Agent Rented Successfully!" });
}
