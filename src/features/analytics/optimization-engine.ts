import type { OptimizationAction } from "./types";

export const optimizationActions:OptimizationAction[]=[
 {id:"o1",title:"AHU schedule optimization",category:"HVAC",annualSavingsKwh:28600,annualSavingsCost:112400,carbonSavedKg:10120,implementationCost:18000,paybackMonths:2,confidence:.89,selected:true},
 {id:"o2",title:"Primary chiller maintenance",category:"Maintenance",annualSavingsKwh:13100,annualSavingsCost:51700,carbonSavedKg:4630,implementationCost:14500,paybackMonths:4,confidence:.82,selected:true},
 {id:"o3",title:"Occupancy lighting controls",category:"Lighting",annualSavingsKwh:8400,annualSavingsCost:33200,carbonSavedKg:2970,implementationCost:48000,paybackMonths:18,confidence:.76,selected:false},
 {id:"o4",title:"Off-peak charging profile",category:"Tariff",annualSavingsKwh:0,annualSavingsCost:46800,carbonSavedKg:0,implementationCost:6000,paybackMonths:2,confidence:.87,selected:true}
];

export function optimizePortfolio(actions:OptimizationAction[],budget:number){
 const ranked=[...actions].sort((a,b)=>(b.annualSavingsCost*b.confidence/b.implementationCost)-(a.annualSavingsCost*a.confidence/a.implementationCost));
 let spent=0; const selected:OptimizationAction[]=[];
 for(const action of ranked){if(spent+action.implementationCost<=budget){selected.push(action);spent+=action.implementationCost}}
 return {
  selected,spent,
  annualSavingsCost:selected.reduce((s,a)=>s+a.annualSavingsCost,0),
  annualSavingsKwh:selected.reduce((s,a)=>s+a.annualSavingsKwh,0),
  carbonSavedKg:selected.reduce((s,a)=>s+a.carbonSavedKg,0)
 };
}
