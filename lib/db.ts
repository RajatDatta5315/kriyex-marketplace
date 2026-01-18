// lib/db.ts
import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_URL?.trim() || "",
  authToken: process.env.TURSO_TOKEN?.trim() || "",
});
