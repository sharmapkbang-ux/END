import { supabaseServer } from '../../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const body = req.body || {};
  const ins = await supabaseServer.from('user_goals').insert([{ user_id: body.user_id || null, role_key: body.role_key || 'product_manager', timeframe_days: body.timeframe_days || 180, budget_inr: body.budget_inr || 50000, mode: body.mode || 'self-paced', course_type: body.course_type || 'certificate' }]).select().maybeSingle();
  res.json(ins.data || null);
}
