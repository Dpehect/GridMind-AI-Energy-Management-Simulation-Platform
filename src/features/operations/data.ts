import type { DashboardLayout, InventoryItem, ScheduledReport, WorkOrderV2 } from "./types";

export const defaultDashboard: DashboardLayout = {
  id: "layout-executive",
  name: "Executive Operations",
  updatedAt: "2026-07-22T20:00:00+03:00",
  widgets: [
    { id:"w1",title:"Energy consumption",kind:"metric",x:0,y:0,w:3,h:2,dataSource:"energy.total" },
    { id:"w2",title:"Operating cost",kind:"metric",x:3,y:0,w:3,h:2,dataSource:"cost.total" },
    { id:"w3",title:"Carbon impact",kind:"metric",x:6,y:0,w:3,h:2,dataSource:"carbon.total" },
    { id:"w4",title:"Open alerts",kind:"alert",x:9,y:0,w:3,h:2,dataSource:"alerts.open" },
    { id:"w5",title:"Six-month trend",kind:"trend",x:0,y:2,w:8,h:4,dataSource:"energy.monthly" },
    { id:"w6",title:"Priority work orders",kind:"table",x:8,y:2,w:4,h:4,dataSource:"maintenance.priority" }
  ]
};

export const inventoryItems: InventoryItem[] = [
  { id:"inv-1",sku:"FLT-MERV13",name:"MERV 13 Air Filter",category:"HVAC",quantity:18,reorderPoint:12,unitCost:680,location:"Main Store" },
  { id:"inv-2",sku:"BRG-6205",name:"Pump Bearing 6205",category:"Mechanical",quantity:4,reorderPoint:6,unitCost:1450,location:"Maintenance Cage" },
  { id:"inv-3",sku:"SNS-TEMP",name:"Wireless Temperature Sensor",category:"Controls",quantity:22,reorderPoint:10,unitCost:890,location:"Controls Lab" },
  { id:"inv-4",sku:"BELT-A42",name:"A42 Drive Belt",category:"HVAC",quantity:9,reorderPoint:5,unitCost:520,location:"Main Store" }
];

export const workOrdersV2: WorkOrderV2[] = [
  {
    id:"wo-v2-1",title:"Primary chiller performance restoration",assetId:"CHLR-02",priority:"critical",status:"in_progress",
    owner:"Mert Kaya",startsAt:"2026-07-24T08:00:00+03:00",endsAt:"2026-07-24T16:00:00+03:00",estimatedCost:14500,
    checklist:[{id:"c1",label:"Lockout/tagout",done:true},{id:"c2",label:"Inspect refrigerant circuit",done:true},{id:"c3",label:"Clean condenser",done:false},{id:"c4",label:"Verify COP",done:false}]
  },
  {
    id:"wo-v2-2",title:"AHU schedule optimization",assetId:"HVAC-01",priority:"high",status:"scheduled",
    owner:"Selin Acar",startsAt:"2026-07-29T09:00:00+03:00",endsAt:"2026-07-29T12:00:00+03:00",estimatedCost:3200,
    checklist:[{id:"c5",label:"Export current schedule",done:false},{id:"c6",label:"Apply staged startup",done:false},{id:"c7",label:"Validate morning peak",done:false}]
  }
];

export const scheduledReports: ScheduledReport[] = [
  { id:"sr-1",name:"Weekly Energy Review",cadence:"weekly",format:"html",nextRunAt:"2026-07-27T08:00:00+03:00",enabled:true },
  { id:"sr-2",name:"Monthly Carbon Report",cadence:"monthly",format:"csv",nextRunAt:"2026-08-01T08:00:00+03:00",enabled:true },
  { id:"sr-3",name:"Daily Critical Alert Digest",cadence:"daily",format:"json",nextRunAt:"2026-07-23T07:30:00+03:00",enabled:false }
];
