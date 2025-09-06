import { getClient, hasOpenAIKey } from '../../../lib/openaiClient';
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { message } = req.body || {};
  if(!hasOpenAIKey()) return res.json({ reply: 'Fallback persona: practice concise answers.' });
  try{
    const client = getClient();
    const completion = await client.chat.completions.create({ model:'gpt-4o-mini', messages:[{role:'system', content:'You are an interviewer persona.'},{role:'user', content: message}], max_tokens:200 });
    const reply = completion.choices?.[0]?.message?.content || '';
    return res.json({ reply });
  }catch(e){
    return res.json({ reply: 'AI error' });
  }
}
