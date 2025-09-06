import { supabaseServer } from '../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const body = req.body || {};
  await supabaseServer.from('ads_events').insert([{ user_id: body.userId || null, ad_provider: body.provider || 'demo', watch_time_seconds: body.watchTime || 0, ad_length_seconds: body.length || 60, clicked: body.clicked || false, skipped: body.skipped || false }]).catch(()=>{});
  res.json({ ok:true });
}
