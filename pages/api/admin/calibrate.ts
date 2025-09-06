import { supabaseServer } from '../../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const qs = await supabaseServer.from('questions').select('*');
  const results = [];
  for(const q of qs.data || []){
    const items = await supabaseServer.from('assessment_items').select('score_obtained').eq('question_id', q.id);
    const correct = (items.data || []).filter(x=>x.score_obtained>0).length;
    const total = (items.data || []).length || 1;
    const p = Math.max(0.01, Math.min(0.99, correct/total));
    const b_new = -Math.log((1-p)/p);
    await supabaseServer.from('questions').update({ b: b_new }).eq('id', q.id);
    results.push({ id: q.id, p, b_new });
  }
  res.json({ ok:true, updates: results });
}
