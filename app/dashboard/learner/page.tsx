'use client';
import { useEffect, useState } from 'react';
export default function LearnerDash(){
  const [data,setData]=useState<any>(null);
  useEffect(()=>{ (async ()=>{ const r = await fetch('/api/dashboard/learner'); const j = await r.json(); setData(j); })(); },[]);
  if(!data) return <div className="card">Loading...</div>;
  return (<div className="card"><h2 className="text-xl font-semibold">Learner — Demo Learner</h2><div className="mt-3 grid grid-cols-3 gap-4"><div className="card"><div className="text-sm text-slate-600">Readiness</div><div className="text-3xl mt-2">{data.overall}</div></div><div className="card"><div className="text-sm text-slate-600">Goal Clarity</div><div className="text-3xl mt-2">{data.clarity}%</div></div><div className="card"><div className="text-sm text-slate-600">Active Roadmap</div><div className="mt-2">{data.roadmap.map((m:any,i:number)=>(<div key={i} className="mt-1">{m.milestone} — {m.status}</div>))}</div></div></div><div className="mt-4"><h3 className="font-semibold">Skill breakdown</h3><pre className="mt-2">{JSON.stringify(data.breakdown,null,2)}</pre></div></div>);
}
