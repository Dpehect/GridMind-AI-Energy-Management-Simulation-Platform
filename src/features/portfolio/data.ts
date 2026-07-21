import type { PortfolioScene } from "./types";

export const portfolioScenes: PortfolioScene[] = [
  { id:"p1",title:"Energy Command Center",description:"Real-time operational overview with deterministic local analytics.",href:"/dashboard",metric:"Annual savings potential",value:"₺244K" },
  { id:"p2",title:"Intelligence Suite",description:"Correlation, forecasting, root-cause and optimization engines.",href:"/dashboard/analytics",metric:"Forecast confidence",value:"90%" },
  { id:"p3",title:"Digital Twin",description:"Interactive 3D building energy model with performance modes.",href:"/dashboard/digital-twin",metric:"Modeled zones",value:"6" },
  { id:"p4",title:"Operations Suite",description:"Dashboard builder, work orders, calendar, inventory and automation.",href:"/dashboard/operations",metric:"Open work orders",value:"2" },
  { id:"p5",title:"Reporting Studio",description:"Configurable reports with local JSON, HTML and PDF workflows.",href:"/dashboard/reports",metric:"Templates",value:"3" }
];
