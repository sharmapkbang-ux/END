export default function Home() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">Welcome to LNS Unified</h1>
      <p className="mt-2 text-slate-600">Role-first goal engine · Adaptive assessments · Recommendation & Coaching</p>
      <div className="mt-4 space-x-2">
        <a className="bg-cyan-600 text-white px-4 py-2 rounded" href="/goal">Start Goal</a>
        <a className="border px-4 py-2 rounded" href="/onboarding">Onboard</a>
        <a className="border px-4 py-2 rounded" href="/dashboard">Dashboard</a>
      </div>
    </div>
  );
}
