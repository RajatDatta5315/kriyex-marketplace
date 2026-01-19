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
      setLoading(true);
      const res = await fetch('/api/github/repos');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRepos(data);
      } else {
        setStatus("Error: Could not fetch repos. Re-login might help.");
      }
    } catch (e) {
      setStatus("Network error fetching repos.");
    } finally {
      setLoading(false);
    }
  }

  const handleConnect = async (repo: any) => {
    setStatus(`⏳ Connecting ${repo.name} to KRIYEX...`);
    try {
      const res = await fetch('/api/agents/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: repo.name, 
          repoUrl: repo.html_url 
        })
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setStatus(`✅ Success! ${repo.name} is now listed on Marketplace.`);
      } else {
        setStatus(`❌ DB Error: ${result.error || "Table not found"}`);
      }
    } catch (error) {
      setStatus("❌ Failed to connect. Check Turso credentials.");
    }
  };

  if (!isSignedIn) return <div className="text-center py-20 text-white">Please Sign In with GitHub</div>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">List Your Agent</h1>
          <p className="text-[#8b949e]">Select a repository to deploy on KRIYEX Marketplace.</p>
        </div>
        <button 
          onClick={() => window.location.href = "https://github.com/settings/installations"}
          className="text-xs bg-[#21262d] border border-[#30363d] px-3 py-2 rounded text-[#8b949e] hover:text-white"
        >
          Can't see private repos? Fix here ↗
        </button>
      </div>

      {status && (
        <div className={`mb-6 p-4 rounded-lg border ${status.includes('✅') ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-blue-500/10 border-blue-500/50 text-blue-400'}`}>
          {status}
        </div>
      )}
      
      <div className="grid gap-3">
        {loading ? (
          <div className="text-center py-10 text-[#8b949e]">Loading your GitHub repositories...</div>
        ) : (
          repos.map((repo: any) => (
            <div key={repo.id} className="flex justify-between items-center p-5 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#8b949e] transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#238636]"></div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-[#2ea043] transition">{repo.name}</h3>
                  <p className="text-xs text-[#8b949e]">{repo.private ? "🔒 Private" : "🌐 Public"}</p>
                </div>
              </div>
              <button 
                onClick={() => handleConnect(repo)}
                className="bg-[#238636] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#2ea043] shadow-lg shadow-green-900/20 transition"
              >
                Connect Agent
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
