import type { BenchmarkRecord } from "./types";

export function enrichBenchmark(record:BenchmarkRecord){
 const intensity=record.energyKwh/record.areaM2;
 const costIntensity=record.cost/record.areaM2;
 const carbonIntensity=record.carbonKg/record.areaM2;
 const energyPerOccupant=record.energyKwh/Math.max(record.occupancy,1);
 return {...record,intensity,costIntensity,carbonIntensity,energyPerOccupant};
}

export function rankBenchmarks(records:BenchmarkRecord[]){
 const enriched=records.map(enrichBenchmark);
 return enriched.map((record)=>({
  ...record,
  percentile:Math.round((enriched.filter(item=>item.intensity<=record.intensity).length/enriched.length)*100),
  score:Math.max(0,Math.round(100-record.intensity/1.8))
 })).sort((a,b)=>b.score-a.score);
}
