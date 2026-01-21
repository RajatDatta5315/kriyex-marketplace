"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core"; // Ye import must hai

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

  const handleFinalList = async () => {
    if (!formData.avatar) return setStatus("⚠️ Upload avatar first!");
    setStatus("🚀 Listing...");
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
        setStatus("✅ Live!");
        window.location.href = "/";
      }
    } catch (e) { setStatus("❌ Error"); }
  };

  if (selectedRepo) {
    return (
      <div className="max-w-xl mx-auto bg-[#161b22] p-6 rounded-2xl border border-[#30363d] mt-10 mx-4 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 text-center">List {selectedRepo.name}</h2>
        <div className="space-y-6">
          <div className="flex flex-col items-center p-4 bg-[#0d1117] rounded-xl border border-dashed border-[#30363d]">
             {/* Generic Fixed Here */}
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFormData({ ...formData, avatar: res[0].url });
                setStatus("✅ Image Uploaded!");
              }}
              onUploadError={(error: Error) => setStatus(`❌ Error: ${error.message}`)}
            />
            {formData.avatar && <img src={formData.avatar} className="mt-4 w-20 h-20 rounded-full border-2 border-green-500" />}
          </div>
          <textarea className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
            placeholder="Agent Description" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
          <input type="number" className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-white" 
            value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          <p className="text-center text-xs text-yellow-500">{status}</p>
          <div className="flex gap-2">
            <button onClick={() => setSelectedRepo(null)} className="flex-1 bg-red-900/20 text-red-500 py-3 rounded-lg font-bold">Back</button>
            <button onClick={handleFinalList} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">List Agent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Connect Repo</h1>
      {loading ? <p className="text-gray-400">Loading...</p> : repos.map((repo: any) => (
        <div key={repo.id} className="flex justify-between items-center p-4 bg-[#161b22] border border-[#30363d] rounded-xl mb-2">
          <span className="text-white font-bold">{repo.name}</span>
          <button onClick={() => setSelectedRepo(repo)} className="bg-green-600 px-4 py-2 rounded-lg text-white text-xs">Connect</button>
        </div>
      ))}
    </div>
  );
}
