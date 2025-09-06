'use client';
import Link from 'next/link';
export default function Dashboard(){
  return (<div className="grid grid-cols-3 gap-6">
    <div className="card"><h3 className="font-semibold">Learner Dashboard</h3><p className="mt-2 text-slate-600">Overview, readiness, roadmap</p><div className="mt-3"><a className="text-cyan-600" href="/dashboard/learner">Open</a></div></div>
    <div className="card"><h3 className="font-semibold">Coach Dashboard</h3><p className="mt-2 text-slate-600">Assigned learners, reports</p><div className="mt-3"><a className="text-cyan-600" href="/dashboard/coach">Open</a></div></div>
    <div className="card"><h3 className="font-semibold">Admin</h3><p className="mt-2 text-slate-600">Manage questions, calibration</p><div className="mt-3"><a className="text-cyan-600" href="/admin/questions">Open</a></div></div>
  </div>);
}
