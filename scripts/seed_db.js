const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL||'').replace(/\/$/,'');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url || !key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url,key);
(async ()=>{
  // load courses dataset
  const data = JSON.parse(fs.readFileSync('./data/courses.dataset.json','utf-8'));
  for(const roleKey of Object.keys(data)){
    await supabase.from('roles').insert([{ key: roleKey, label: roleKey.replace('_',' ') }]).catch(()=>{});
    for(const c of data[roleKey]){
      await supabase.from('courses').insert([{ role_key: roleKey, title: c.title, provider: c.provider, link: c.link, affiliate_url: c.affiliate_url || c.link, duration_text: c.duration_text, price_text: c.price_text, mode: c.mode, type: c.type, tags: c.tags || [] }]).catch(()=>{});
    }
  }
  // seed coaches
  await supabase.from('coaches').insert([{ name:'Priya Sharma', expertise:['Product Management','Interviews'], booking_url:'https://calendly.com/priya_demo', bio:'Senior PM coach' },{ name:'Ravi Kumar', expertise:['SQL','Data Analysis'], booking_url:'https://calendly.com/ravi_demo', bio:'Data coach' }]).catch(()=>{});
  console.log('DB seed complete');
  process.exit(0);
})();
