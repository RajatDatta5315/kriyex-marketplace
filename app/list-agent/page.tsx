"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ListAgentPage() {
  const { isSignedIn } = useUser();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isSignedIn) fetchRepos();
  }, [isSignedIn]);

  async function fetchRepos() {
    try {
      const res = await fetch('/api/github/repos');
      const data = await res.json();
      if (Array.isArray(data)) setRepos(data);
    } catch (e) {
      setStatus("Error fetching repos.");
    } finally {
      setLoading(false);
    }
  }

  const handleConnect = async (repo: any) => {
    setStatus(`Connecting ${repo.name} to Turso...`);
    try {
      const res = await fetch('/api/agents/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: repo.name, repoUrl: repo.html_url })
      });
      if (res.ok) {
        setStatus(`Successfully listed ${repo.name}! Check Explore page.`);
      } else {
        setStatus("Failed to save to database. Check Turso credentials.");
      }
    } catch (error) {
      setStatus("Connection error.");
    }
  };

  if (!isSignedIn) return <div className="text-center py-20 text-white">Please Sign In with GitHub</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Your Repositories</h1>
      {status && <div className="mb-4 p-3 bg-[#1c2128] border border-[#238636] text-[#238636] rounded">{status}</div>}
      
      <div className="grid gap-3">
        {loading ? <p>Loading repos...</p> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
            <span className="text-white font-medium">{repo.name}</span>
            <button 
              onClick={() => handleConnect(repo)}
              className="bg-[#21262d] border border-[#30363d] px-4 py-1.5 rounded text-sm hover:bg-[#30363d]"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
