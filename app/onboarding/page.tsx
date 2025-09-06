'use client';
import { useState } from 'react';
export default function Onboard(){
  const [role,setRole]=useState('product_manager');
  async function start(){
    const r = await fetch('/api/goals/create',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ role_key: role })});
    const j = await r.json();
    alert('Goal created: ' + JSON.stringify(j));
    window.location.href = '/assessment/start?role=' + role;
  }
  return (<div className="card"><h2 className="text-xl font-semibold">Onboarding</h2><label className="block mt-3">Role (required)</label><input className="border p-2 rounded w-full mt-1" value={role} onChange={e=>setRole(e.target.value)} /><div className="mt-4"><button className="bg-cyan-600 text-white px-4 py-2 rounded" onClick={start}>Start</button></div></div>);
}
