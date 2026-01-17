"use client";
import { useEffect, useState } from "react";

export default function ListAgentPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/github/repos');
        const data = await res.json();
        setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Deploy an Agent</h1>
      <p className="text-[#8b949e] mb-8">Select a GitHub repository to transform into a KRIYEX agent.</p>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-[#161b22] rounded-lg border border-[#30363d]"></div>)}
        </div>
      ) : (
        <div className="grid gap-4">
          {repos.map((repo: any) => (
            <div key={repo.id} className="flex justify-between items-center p-4 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#8b949e] transition">
              <div>
                <h3 className="text-white font-bold">{repo.name}</h3>
                <p className="text-xs text-[#8b949e]">{repo.description || "No description provided"}</p>
              </div>
              <button className="text-xs bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-md font-semibold text-[#c9d1d9] hover:bg-[#30363d]">
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
