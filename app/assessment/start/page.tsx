'use client';
import { useRouter } from 'next/navigation';
export default function Start({searchParams}:{searchParams:any}){
  const role = searchParams.role || '';
  const router = useRouter();
  async function start(){
    const r = await fetch('/api/assessment/start',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({ role_key: role })});
    const j = await r.json();
    if(j.assessmentId) router.push('/assessment/flow?aid=' + j.assessmentId);
  }
  return (<div className="card"><h3 className="text-lg font-semibold">Start Assessment</h3><p className="mt-2">Role: {role}</p><div className="mt-3"><button className="bg-cyan-600 text-white px-4 py-2 rounded" onClick={start}>Begin</button></div></div>);
}
