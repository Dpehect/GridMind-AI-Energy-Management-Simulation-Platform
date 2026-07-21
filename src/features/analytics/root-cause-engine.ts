import type { RootCauseCandidate } from "./types";

export function generateRootCauseCandidates(input:{
 peakHour:number; temperatureCorrelation:number; occupancyCorrelation:number; nightLoadShare:number; anomalyCount:number;
}):RootCauseCandidate[]{
 const candidates:RootCauseCandidate[]=[];
 if(input.temperatureCorrelation>0.65)candidates.push({
  id:"rc-hvac",title:"Weather-sensitive HVAC demand",confidence:Math.min(.95,.68+input.temperatureCorrelation*.2),impactScore:88,
  evidence:[`Temperature correlation ${input.temperatureCorrelation.toFixed(2)}`,`Peak occurs at ${input.peakHour}:00`],
  recommendedAction:"Review cooling setpoints, staging logic and morning pre-cooling."
 });
 if(input.occupancyCorrelation<0.35&&input.nightLoadShare>.22)candidates.push({
  id:"rc-baseload",title:"Persistent non-occupancy baseload",confidence:.84,impactScore:76,
  evidence:[`Night load share ${Math.round(input.nightLoadShare*100)}%`,`Occupancy correlation ${input.occupancyCorrelation.toFixed(2)}`],
  recommendedAction:"Audit always-on devices, lighting schedules and standby loads."
 });
 if(input.anomalyCount>8)candidates.push({
  id:"rc-equipment",title:"Equipment instability",confidence:.79,impactScore:82,
  evidence:[`${input.anomalyCount} anomalies detected`,`Repeated short-duration spikes`],
  recommendedAction:"Inspect high-load equipment and compare maintenance records."
 });
 return candidates.sort((a,b)=>b.impactScore-a.impactScore);
}
