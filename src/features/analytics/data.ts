import type { BenchmarkRecord, TimePoint } from "./types";

export const benchmarkRecords: BenchmarkRecord[] = [
  { id:"b1",building:"GridMind HQ",type:"Office",areaM2:12800,energyKwh:428600,cost:169800,carbonKg:151900,occupancy:740 },
  { id:"b2",building:"Atlas Factory",type:"Factory",areaM2:21600,energyKwh:1184000,cost:448000,carbonKg:462000,occupancy:360 },
  { id:"b3",building:"North Campus",type:"Campus",areaM2:34200,energyKwh:932000,cost:361500,carbonKg:341000,occupancy:2850 },
  { id:"b4",building:"Harbor Hotel",type:"Hotel",areaM2:18900,energyKwh:774000,cost:304000,carbonKg:287000,occupancy:420 },
  { id:"b5",building:"Retail One",type:"Retail",areaM2:7600,energyKwh:286000,cost:119500,carbonKg:102000,occupancy:160 }
];

export const hourlyEnergy: TimePoint[] = Array.from({length:168},(_,i)=>({
  timestamp:new Date(Date.UTC(2026,6,15,0,0,0)+i*3600000).toISOString(),
  value:Math.round(420 + Math.sin(i/5)*110 + Math.cos(i/13)*55 + (i%24>=8&&i%24<=19?190:0) + (i%37===0?150:0))
}));

export const weatherSeries = hourlyEnergy.map((p,i)=>({
  timestamp:p.timestamp,
  value:Number((24 + Math.sin(i/12)*6 + Math.cos(i/31)*2).toFixed(2))
}));

export const occupancySeries = hourlyEnergy.map((p,i)=>({
  timestamp:p.timestamp,
  value:(i%24>=8&&i%24<=18)?Math.round(520 + Math.sin(i/4)*90):Math.round(30 + Math.abs(Math.sin(i))*20)
}));
