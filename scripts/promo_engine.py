import os
import requests
import json
from atproto import Client

GROQ_KEY = os.getenv("GROQ_KEY")
BSKY_HANDLE = os.getenv("BSKY_HANDLE")
BSKY_PASS = os.getenv("BSKY_PASS")
MAST_TOKEN = os.getenv("MASTODON_TOKEN")
MAST_INSTANCE = "https://mastodon.social"

def get_ai_response(system_prompt, user_input):
    res = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {GROQ_KEY}"},
        json={
            "model": "mixtral-8x7b-32768",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ]
        }
    )
    return res.json()['choices'][0]['message']['content']

def marketing_run():
    # 1. Post Content (3 per day total - handled by cron schedule)
    post_prompt = "Write a high-value, futuristic tip for devs using AI agents. Keep it under 200 chars. No hashtags."
    daily_post = get_ai_response("You are an AI SaaS Founder.", post_prompt)
    
    # Bluesky Post
    bsky = Client()
    bsky.login(BSKY_HANDLE, BSKY_PASS)
    bsky.send_post(text=f"{daily_post} #BuildInPublic")

    # Mastodon Post
    requests.post(f"{MAST_INSTANCE}/api/v1/statuses", 
                  headers={"Authorization": f"Bearer {MAST_TOKEN}"},
                  data={"status": daily_post})

    # 2. Contextual Replies (10 replies per session = 30 total)
    # Search for relevant posts (Simple simulation for brevity)
    topics = ["AI Agents", "Python Dev", "Open Source", "SaaS Growth"]
    for topic in topics:
        # Step: Analyze & Reply
        post_to_reply = f"I think AI agents are overrated..." # Simulated search result
        reply_prompt = f"Analyze this user post: '{post_to_reply}'. Write a short, contextual, and slightly spicy reply mentioning KRIYEX without being spammy."
        smart_reply = get_ai_response("You are a helpful peer in the AI community.", reply_prompt)
        
        # Post the smart reply to Mastodon/BSKY (Simplified)
        print(f"Replying to {topic}: {smart_reply}")
        # In real logic, you'd fetch IDs and post as a thread reply

if __name__ == "__main__":
    marketing_run()
