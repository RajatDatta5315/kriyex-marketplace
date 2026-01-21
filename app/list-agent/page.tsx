"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";

export default function ListAgentPage() {
  const { isSignedIn } = useUser();
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ desc: "", price: "10", avatar: "" });
  const [status, setStatus] = useState("");

  useEffect(() => { if (isSignedIn) fetchRepos(); }, [isSignedIn]);

  async function fetchRepos() {
    const res = await fetch('/api/github/repos');
    const data = await res.json();
    if (Array.isArray(data)) setRepos(data);
    setLoading(false);
  }

  const handleFinalList = async (e: any) => {
    e.preventDefault(); // Added to prevent any browser default action
    if (!formData.avatar) return setStatus("⚠️ Please upload avatar first!");
    
    setStatus("🚀 Listing your Agent...");
    try {
      const res = await fetch('/api/agents/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: selectedRepo.name, 
          repoUrl: selectedRepo.html_url,
          desc: formData.desc,
          price: formData.price,
          avatar: formData.avatar
        })
      });
      if (res.ok) {
        setStatus("✅ Agent is Live! Redirecting...");
        setTimeout(() => window.location.href = "/", 2000);
      } else {
        setStatus("❌ Error: Check all fields.");
      }
    } catch (e) { setStatus("❌ Connection failed."); }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-6 rounded-2xl border border-[#30363d] mt-6 mb-20 shadow-2xl mx-4">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Setup {selectedRepo.name}</h2>
        <div className="space-y-4">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center p-4 bg-[#0d1117] rounded-xl border border-dashed border-[#30363d]">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFormData({ ...formData, avatar: res[0].url });
                setStatus("✅ Image Uploaded!");
              }}
              onUploadError={(error: Error) => setStatus(`❌ Error: ${error.message}`)}
            />
            {formData.avatar && <img src={formData.avatar} className="mt-2 w-16 h-16 rounded-full border-2 border-green-500 object-cover" />}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8b949e] uppercase mb-1">Description</label>
            <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white text-sm focus:border-green-500 outline-none h-20" 
              placeholder="What does it do?" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8b949e] uppercase mb-1">Price ($)</label>
            <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
              value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>

          <p className="text-center text-xs text-yellow-500 min-h-[1rem]">{status}</p>

          <div className="flex gap-2 pb-4">
            <button onClick={() => setSelectedRepo(null)} className="flex-1 bg-red-900/20 text-red-500 py-3 rounded-lg font-bold text-sm">Back</button>
            <button onClick={handleFinalList} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition">List Agent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mb-20">
      <h1 className="text-2xl font-bold text-white mb-6">Select Agent Repo</h1>
      <div className="grid gap-3">
        {loading ? <div className="text-center text-[#8b949e] py-10 animate-pulse">Scanning GitHub...</div> : repos.map((repo: any) => (
          <div key={repo.id} className="flex justify-between items-center p-4 bg-[#161b22] border border-[#30363d] rounded-xl">
            <span className="text-white font-bold text-sm truncate mr-2">{repo.name}</span>
            <button onClick={() => setSelectedRepo(repo)} className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold text-xs shrink-0">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}
