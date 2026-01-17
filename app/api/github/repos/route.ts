import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 2026 Update: clerkClient is an object, not a function
    const client = await clerkClient; 
    
    // User ka GitHub token fetch kar rahe hain
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_github');
    
    const token = tokenResponse.data[0]?.token;
    if (!token) {
      return NextResponse.json({ error: "GitHub not connected" }, { status: 400 });
    }

    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=20', {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
