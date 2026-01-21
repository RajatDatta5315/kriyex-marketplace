import os
import requests
import json
from atproto import Client, models

# Secrets from GitHub
GROQ_KEY = os.getenv("GROQ_KEY")
BSKY_HANDLE = os.getenv("BSKY_HANDLE")
BSKY_PASS = os.getenv("BSKY_PASS")
MAST_TOKEN = os.getenv("MASTODON_TOKEN")
MAST_INSTANCE = "https://mastodon.social"

def get_ai_content(prompt):
    res = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {GROQ_KEY}"},
        json={
            "model": "mixtral-8x7b-32768",
            "messages": [{"role": "user", "content": prompt}]
        }
    )
    return res.json()['choices'][0]['message']['content']

def post_to_social():
    # 1. Generate Insightful Post
    post_text = get_ai_content("Write a 1-sentence thought about AI agents monetization. High value, no hashtags.")
    full_post = f"{post_text}\n\nBuild & Rent Agents: https://kriyex.kryv.network"

    # Post to Bluesky
    client = Client()
    client.login(BSKY_HANDLE, BSKY_PASS)
    client.send_post(text=full_post)

    # Post to Mastodon
    requests.post(f"{MAST_INSTANCE}/api/v1/statuses", 
                  headers={"Authorization": f"Bearer {MAST_TOKEN}"},
                  data={"status": full_post})

def reply_engine():
    # Ye 10 comments har session mein karega (Din mein 3 session = 30 replies)
    topics = ["AI Agents", "Passive Income", "SaaS", "Open Source"]
    for topic in topics[:3]:
        # Context building
        context = get_ai_content(f"Analyze this topic: {topic}. Give a 1-sentence smart reply to someone talking about it.")
        reply_text = f"{context} This is why we built KRIYEX."
        
        # Mastodon Public Timeline se context lena mushkil hai, toh hum 'Search' ke results pe reply karenge
        # Note: Production mein yahan specific ID fetch karke reply_to_id lagta hai. 
        # Abhi ke liye ye direct post karega taaki reach badhe.
        requests.post(f"{MAST_INSTANCE}/api/v1/statuses", 
                      headers={"Authorization": f"Bearer {MAST_TOKEN}"},
                      data={"status": f"@{topic}_fan {reply_text}"})

if __name__ == "__main__":
    post_to_social()
    reply_engine()
    print("Promotion Cycle Complete!")
