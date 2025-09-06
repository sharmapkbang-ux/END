export default async function handler(req, res){
  // return seeded dummy analytics for demo users
  res.json({ overall: 68, clarity: 72, breakdown: { SQL:62,'Data Viz':70,'Communication':80 }, roadmap: [{milestone:'Finish SQL module', status:'in_progress'},{milestone:'Mock interview', status:'pending'}] });
}
