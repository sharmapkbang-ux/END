'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function AdBreak({searchParams}:{searchParams:any}){
  const aid = searchParams.assessmentId; const router = useRouter();
  const [t,setT]=useState(60);
  useEffect(()=>{ if(t<=0) { router.push('/results?assessmentId='+aid); return; } const id=setTimeout(()=>setT(t-1),1000); return ()=>clearTimeout(id); },[t]);
  return (<div className="card"><h3 className="text-lg font-semibold">Sponsored</h3><p className="mt-2">This ad is shown before your results. It is skippable after 15 seconds.</p><div className="mt-4 border rounded p-6 text-center">Ad Placeholder — <span className="font-semibold">{t}s</span> remaining</div><div className="mt-3"><button className="mt-3 border px-3 py-2 rounded" onClick={()=>router.push('/results?assessmentId='+aid)}>Skip / Continue</button></div></div>);
}
