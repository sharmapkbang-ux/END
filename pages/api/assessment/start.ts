import crypto from 'crypto';
import { supabaseServer } from '../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const aid = crypto.randomUUID();
  const { role_key } = req.body || {};
  await supabaseServer.from('assessments').insert([{ id: aid, user_id: null, role_key: role_key || 'data_analyst' }]).catch(()=>{});
  await supabaseServer.from('ability_estimates').insert([{ user_id: null, role_key: role_key || 'data_analyst', theta:0, se:1 }]).catch(()=>{});
  res.json({ assessmentId: aid });
}
