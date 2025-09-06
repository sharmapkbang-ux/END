'use client';
import { useState } from 'react';
export default function GoalPage(){
  const [q,setQ] = useState('Become a product manager in 6 months, budget 50000');
  async function run(){
    const r = await fetch('/api/goals/parse',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ q })});
    const j = await r.json();
    alert('Parsed goal:\\n' + JSON.stringify(j.parsed,null,2));
  }
  return (<div className="card"><h2 className="text-xl font-semibold">Goal Search</h2><p className="mt-2 text-slate-600">Enter role, timeline, budget or paste your resume.</p><textarea className="w-full border rounded p-2 mt-3" rows={3} value={q} onChange={e=>setQ(e.target.value)} /><div className="mt-3"><button className="bg-cyan-600 text-white px-4 py-2 rounded" onClick={run}>Parse Goal</button></div></div>);
}
