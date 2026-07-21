import type { ReportDataset, ReportTemplate } from "./types";

export function generateExecutiveSummary(dataset: ReportDataset) {
  const energyDirection = dataset.energyChangePercent < 0 ? "decreased" : "increased";
  const costDirection = dataset.costChangePercent < 0 ? "decreased" : "increased";
  const carbonDirection = dataset.carbonChangePercent < 0 ? "decreased" : "increased";

  return [
    `Energy consumption ${energyDirection} by ${Math.abs(dataset.energyChangePercent).toFixed(1)}% during the selected period.`,
    `Operating cost ${costDirection} by ${Math.abs(dataset.costChangePercent).toFixed(1)}%, while peak demand reached ${dataset.peakDemandKw.toLocaleString()} kW.`,
    `Operational carbon ${carbonDirection} by ${Math.abs(dataset.carbonChangePercent).toFixed(1)}%.`,
    `${dataset.anomalies} anomalies were identified and ${dataset.recommendations.length} prioritized actions remain available.`
  ].join(" ");
}

export function enabledBlocks(template: ReportTemplate) {
  return template.blocks.filter((block) => block.enabled).sort((a, b) => a.order - b.order);
}

export function serializeReport(input: {
  title: string;
  building: string;
  periodStart: string;
  periodEnd: string;
  template: ReportTemplate;
  dataset: ReportDataset;
  notes?: string;
}) {
  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    title: input.title,
    building: input.building,
    period: { start: input.periodStart, end: input.periodEnd },
    template: input.template.name,
    summary: generateExecutiveSummary(input.dataset),
    metrics: input.dataset,
    notes: input.notes ?? "",
    blocks: enabledBlocks(input.template)
  }, null, 2);
}

export function reportToHtml(title: string, summary: string, dataset: ReportDataset) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;color:#172033}h1{font-size:32px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card{border:1px solid #d8dee8;border-radius:14px;padding:16px}.muted{color:#687386}</style></head>
<body><h1>${title}</h1><p class="muted">${summary}</p>
<div class="grid"><div class="card"><b>Energy</b><p>${dataset.totalEnergyKwh.toLocaleString()} kWh</p></div>
<div class="card"><b>Cost</b><p>₺${dataset.totalCost.toLocaleString()}</p></div>
<div class="card"><b>Carbon</b><p>${dataset.carbonKg.toLocaleString()} kg</p></div>
<div class="card"><b>Peak demand</b><p>${dataset.peakDemandKw.toLocaleString()} kW</p></div></div></body></html>`;
}
