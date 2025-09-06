import { getClient, hasOpenAIKey } from '../../../lib/openaiClient';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { q } = req.body || req.query || {};
  if(hasOpenAIKey()){
    try{
      const client = getClient();
      const completion = await client.chat.completions.create({ model:'gpt-4o-mini', messages:[{role:'system',content:'Extract role_key, timeframe_days, budget_inr, mode, course_type from this goal text as JSON.'},{role:'user',content:q}], max_tokens:200 });
      const text = completion.choices?.[0]?.message?.content || '';
      try{ const parsed = JSON.parse(text); return res.json({ parsed }); }catch(e){ return res.json({ parsed: { role_key:'product_manager', timeframe_days:180, budget_inr:50000, mode:'self-paced', course_type:'certificate' } }); }
    }catch(e){ return res.json({ parsed: { role_key:'product_manager', timeframe_days:180, budget_inr:50000, mode:'self-paced', course_type:'certificate' } }); }
  } else {
    const goal = (q||'').toLowerCase();
    const role = goal.match(/product manager|data analyst|software engineer|pm|developer/)?.[0] || 'product_manager';
    return res.json({ parsed: { role_key: role.replace(' ','_'), timeframe_days:180, budget_inr:50000, mode:'self-paced', course_type:'certificate' } });
  }
}
