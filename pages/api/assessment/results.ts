import { supabaseServer } from '../../lib/supabaseServer';
import { thetaToScore } from '../../lib/irt';
export default async function handler(req, res){
  const { assessmentId } = req.query;
  const ae = await supabaseServer.from('ability_estimates').select('*').limit(1).maybeSingle();
  const theta = ae.data?.theta || 0;
  const overall = thetaToScore(theta);
  const breakdown = { SQL: Math.floor(Math.random()*50)+50, Communication: Math.floor(Math.random()*50)+40, 'Problem Solving': Math.floor(Math.random()*50)+45 };
  await supabaseServer.from('readiness_scores').insert([{ user_id: ae.data?.user_id || null, assessment_id: assessmentId, overall_score: overall, breakdown }]).catch(()=>{});
  res.json({ overall, breakdown, recommendations: { courses: [], coaches: [] } });
}
