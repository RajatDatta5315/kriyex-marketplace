import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 1. Clerk se user ka GitHub Token nikalna
    const client = await clerkClient();
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_github');
    
    const token = tokenResponse.data[0]?.token;
    if (!token) return NextResponse.json({ error: "No GitHub Token found" }, { status: 400 });

    // 2. GitHub API se Repos mangwana
    const response = await fetch('https://api.github.com/user/repos?sort=updated', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
