import os
import requests
import json
from atproto import Client

# Fetching secrets
GROQ_KEY = os.getenv("GROQ_KEY")
BSKY_HANDLE = os.getenv("BSKY_HANDLE")
BSKY_PASS = os.getenv("BSKY_PASS")
MAST_TOKEN = os.getenv("MASTODON_TOKEN")
MAST_INSTANCE = "https://mastodon.social"

def get_ai_response(system_prompt, user_input):
    if not GROQ_KEY:
        return "Building the future of AI Agents with KRIYEX Marketplace."
    
    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_KEY}"},
            json={
                "model": "llama3-70b-8192", 
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_input}
                ]
            }
        )
        data = res.json()
        if 'choices' in data:
            return data['choices'][0]['message']['content']
        else:
            print(f"Groq API Error: {data}")
            return "Innovating GitHub monetization with KRIYEX AI Agents."
    except Exception as e:
        print(f"Request Exception: {e}")
        return "Deploying autonomous intelligence via KRIYEX."

def marketing_run():
    print("🚀 KRIYEX Marketing Engine Initialized")
    
    # Generate Post
    post_text = get_ai_response(
        "You are the founder of KRIYEX.network. Write a sharp, punchy tweet about monetizing GitHub repos.",
        "Write about how KRIYEX helps developers."
    )
    
    # 1. Post to Bluesky
    try:
        bsky = Client()
        bsky.login(BSKY_HANDLE, BSKY_PASS)
        bsky.send_post(text=f"{post_text} #BuildInPublic #AIAgents")
        print("✅ Posted to Bluesky")
    except Exception as e:
        print(f"❌ Bluesky Failed: {e}")

    # 2. Post to Mastodon
    try:
        requests.post(f"{MAST_INSTANCE}/api/v1/statuses", 
                      headers={"Authorization": f"Bearer {MAST_TOKEN}"},
                      data={"status": post_text})
        print("✅ Posted to Mastodon")
    except Exception as e:
        print(f"❌ Mastodon Failed: {e}")

if __name__ == "__main__":
    marketing_run()
