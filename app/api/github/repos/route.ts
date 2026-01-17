import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const client = await clerkClient();
    // User ka GitHub token fetch kar rahe hain
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_github');
    
    // Yahan hum sirf logged-in user ka token nikal rahe hain
    const token = tokenResponse.data[0]?.token;
    if (!token) {
      return NextResponse.json({ error: "Please reconnect GitHub" }, { status: 400 });
    }

    // GitHub API ko call kar rahe hain (Only for the current user)
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
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
