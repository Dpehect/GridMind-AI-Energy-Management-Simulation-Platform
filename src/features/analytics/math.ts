export function mean(values:number[]){return values.reduce((s,v)=>s+v,0)/Math.max(values.length,1)}
export function std(values:number[]){
 const m=mean(values);
 return Math.sqrt(mean(values.map(v=>(v-m)**2)));
}
export function pearson(a:number[],b:number[]){
 const n=Math.min(a.length,b.length); if(!n) return 0;
 const aa=a.slice(0,n),bb=b.slice(0,n),ma=mean(aa),mb=mean(bb);
 const num=aa.reduce((s,v,i)=>s+(v-ma)*(bb[i]-mb),0);
 const den=Math.sqrt(aa.reduce((s,v)=>s+(v-ma)**2,0)*bb.reduce((s,v)=>s+(v-mb)**2,0));
 return den?num/den:0;
}
export function linearRegression(values:number[]){
 const n=values.length; if(!n) return {slope:0,intercept:0};
 const xs=values.map((_,i)=>i),mx=mean(xs),my=mean(values);
 const num=xs.reduce((s,x,i)=>s+(x-mx)*(values[i]-my),0);
 const den=xs.reduce((s,x)=>s+(x-mx)**2,0);
 const slope=den?num/den:0;
 return {slope,intercept:my-slope*mx};
}
export function percentile(values:number[],p:number){
 const sorted=[...values].sort((a,b)=>a-b);
 const idx=Math.min(sorted.length-1,Math.max(0,Math.round((sorted.length-1)*p)));
 return sorted[idx]??0;
}
