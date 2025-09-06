'use client';
export default function SparkBar({value=50}:{value?:number}){
  const w = Math.max(10, Math.round((value/100)*120));
  return (<div style={{width:140}}><div style={{background:'#eef2ff',height:10,borderRadius:6,overflow:'hidden'}}><div style={{width:w,height:10,background:'#06b6d4'}} /></div><div style={{fontSize:12,marginTop:6}}>{value}%</div></div>);
}
