import { supabaseServer } from '../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { user_id, goal, weak_skills, budget_inr, timeframe_days, industry } = req.body || {};
  const sk = (weak_skills || []).slice(0,3).map(s=>s.toLowerCase());
  const q = await supabaseServer.from('courses').select('*').limit(500);
  const items = q.data || [];
  const scored = items.map(c=>{ const tags = (c.tags||[]).map(t=>t.toLowerCase()); const overlap = sk.filter(s=>tags.includes(s)).length; const industryFit = industry && c.tags && c.tags.includes(industry) ? 1 : 0; const providerScore = c.provider && c.provider.length>0 ? 0.7 : 0.3; const score = overlap*2 + industryFit + providerScore; return { course: c, score }; }).sort((a,b)=>b.score-a.score);
  const top = scored.slice(0,3).map(s=>({ ...s.course, reason: `Matches skills: ${sk.join(', ')}` }));
  const coach = (await supabaseServer.from('coaches').select('*').limit(5)).data || [];
  const chosenCoach = coach[0] || null;
  await supabaseServer.from('rec_events').insert([{ user_id: user_id || null, query: goal || null, role_key: goal || null, inputs: { weak_skills, budget_inr, timeframe_days, industry }, results: { courses: top, coach: chosenCoach } }]).catch(()=>{});
  res.json({ courses: top, coach: chosenCoach, ai_tutor: { title:'CareerPath AI Tutor', provider:'LNS', link:'/ai-tutor', is_ai_path:true } });
}
