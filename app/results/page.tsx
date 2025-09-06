'use client';
import { useEffect, useState } from 'react';
export default function Results({searchParams}:{searchParams:any}){
  const aid = searchParams.assessmentId; const [data,setData]=useState<any>(null);
  useEffect(()=>{ if(!aid) return; (async ()=>{ const r=await fetch('/api/assessment/results?assessmentId='+aid); const j=await r.json(); setData(j); })(); },[aid]);
  if(!data) return <div className="card">Loading...</div>;
  return (<div className="card"><h2 className="text-xl font-semibold">Your Results</h2><div className="mt-4"><div className="grid grid-cols-3 gap-6"><div className="card"><h3 className="font-semibold">Overall Readiness</h3><div className="text-3xl mt-4">{data.overall}</div></div><div className="card col-span-2"><h3 className="font-semibold">Skill Breakdown</h3><pre className="mt-2">{JSON.stringify(data.breakdown,null,2)}</pre></div></div></div><div className="mt-4"><h3 className="font-semibold">Recommendations</h3>{(data.recommendations?.courses||[]).map((c:any,i:number)=>(<div key={i} className="card mt-3"><div className="flex justify-between"><div><div className="font-semibold">{c.title}</div><div className="text-sm text-slate-600">{c.provider}</div></div><div><a className="text-cyan-600" href={c.link} target="_blank">Open</a></div></div></div>))}</div></div>);
}
