import { supabaseServer } from '../../lib/supabaseServer';
export default async function handler(req, res){
  if(req.method === 'GET'){
    const { assessmentId } = req.query;
    const qs = await supabaseServer.from('questions').select('*').limit(200);
    const question = qs.data?.[Math.floor(Math.random()*(qs.data?.length||1))] || null;
    if(!question) return res.json({ finished:true });
    return res.json({ nextItem: { questionId: question.id, prompt: question.prompt_template, options: (question.meta && question.meta.options) || null }, finished:false });
  } else if(req.method === 'POST'){
    const { assessmentId, response, questionId } = req.body;
    await supabaseServer.from('assessment_items').insert([{ assessment_id: assessmentId, question_id: questionId, response, score_obtained: (response && response.option)?1:0 }]).catch(()=>{});
    return res.json({ ok:true, finished:false });
  }
  res.status(405).end();
}
