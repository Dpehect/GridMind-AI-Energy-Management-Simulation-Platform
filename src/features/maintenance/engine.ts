import type {AssetHealth} from './types';
export const assets:AssetHealth[]=[{id:'HVAC-01',health:91,risk:'low',nextMaintenance:'2026-09-12'},{id:'CHLR-02',health:58,risk:'high',nextMaintenance:'2026-08-02'}];
export function scoreTrend(v:number){return v>80?'Healthy':v>60?'Watch':'Service';}
