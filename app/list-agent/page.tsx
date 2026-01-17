"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ListAgentPage() {
  const { isSignedIn, user } = useUser();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isSignedIn) {
      fetchRepos();
    }
  }, [isSignedIn]);

  async function fetchRepos() {
    try {
      const res = await fetch('/api/github/repos');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRepos(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (e) {
      setStatus("Error fetching repos. Make sure GitHub is connected.");
    } finally {
      setLoading(false);
    }
  }

  const handleConnect = async (repo: any) => {
    setStatus(`Connecting ${repo.name}...`);
    // Agle step mein hum yahan Turso DB wala logic daalenge
    setTimeout(() => setStatus(`${repo.name} connected successfully!`), 2000);
  };

  if (!isSignedIn) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 text-white">Please Sign In with GitHub</h2>
        <p className="text-[#8b949e]">You need to be logged in to list your agents from GitHub.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Deploy your Agent</h1>
        <p className="text-[#8b949e]">Select a repository to import your agent's code.</p>
        {status && <p className="mt-4 p-3 bg-[#1c2128] border border-[#238636] text-[#238636] rounded">{status}</p>}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-[#161b22] border border-[#30363d] rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {repos.length === 0 ? (
            <p className="text-[#8b949e]">No repositories found. Check your GitHub permissions.</p>
          ) : (
            repos.map((repo: any) => (
              <div key={repo.id} className="flex justify-between items-center p-5 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#8b949e] transition">
                <div>
                  <h3 className="text-white font-bold text-lg">{repo.name}</h3>
                  <p className="text-sm text-[#8b949e]">{repo.language || "No language detected"}</p>
                </div>
                <button 
                  onClick={() => handleConnect(repo)}
                  className="bg-[#21262d] border border-[#30363d] px-4 py-2 rounded-md font-bold text-white hover:bg-[#30363d] transition"
                >
                  Connect
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
