"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Eye, FileJson, FileText, Printer, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/ui/section-card";
import { reportDataset, reportTemplates } from "./data";
import { generateExecutiveSummary, reportToHtml, serializeReport } from "./engine";
import { useReportStore } from "./report-store";
import { ReportPreview } from "./report-preview";

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ReportStudio() {
  const [title, setTitle] = useState("June Executive Energy Review");
  const { templateId, blocks, setTemplate, toggleBlock, moveBlock } = useReportStore();
  const template = useMemo(() => reportTemplates.find((item) => item.id === templateId) ?? reportTemplates[0], [templateId]);

  const exportJson = () => {
    download("gridmind-report.json", serializeReport({
      title, building: "GridMind HQ", periodStart: "2026-06-01", periodEnd: "2026-06-30",
      template: { ...template, blocks }, dataset: reportDataset
    }), "application/json");
    toast.success("JSON report exported");
  };

  const exportHtml = () => {
    download("gridmind-report.html", reportToHtml(title, generateExecutiveSummary(reportDataset), reportDataset), "text/html");
    toast.success("HTML report exported");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="space-y-5">
        <SectionCard title="Report configuration" description="Configure template, title and reporting period.">
          <div className="grid gap-4">
            <div className="grid gap-2"><Label htmlFor="report-title">Title</Label><Input id="report-title" value={title} onChange={(event)=>setTitle(event.target.value)} /></div>
            <div className="grid gap-2"><Label htmlFor="template">Template</Label><select id="template" value={templateId} onChange={(event)=>setTemplate(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm">{reportTemplates.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3"><div className="grid gap-2"><Label>Start</Label><Input type="date" defaultValue="2026-06-01"/></div><div className="grid gap-2"><Label>End</Label><Input type="date" defaultValue="2026-06-30"/></div></div>
          </div>
        </SectionCard>

        <SectionCard title="Report blocks" description="Enable, disable and reorder sections.">
          <div className="space-y-3">
            {[...blocks].sort((a,b)=>a.order-b.order).map((block)=>(
              <div key={block.id} className="rounded-2xl border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={block.enabled} onChange={()=>toggleBlock(block.id)} className="size-4 accent-[hsl(var(--primary))]"/>{block.title}</label>
                  <div className="flex gap-1"><Button size="icon" variant="ghost" onClick={()=>moveBlock(block.id,-1)} aria-label={`Move ${block.title} up`}><ArrowUp className="size-4"/></Button><Button size="icon" variant="ghost" onClick={()=>moveBlock(block.id,1)} aria-label={`Move ${block.title} down`}><ArrowDown className="size-4"/></Button></div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Export" description="Download portable local report formats.">
          <div className="grid gap-2">
            <Button variant="outline" onClick={exportJson}><FileJson className="mr-2 size-4"/>Export JSON</Button>
            <Button variant="outline" onClick={exportHtml}><FileText className="mr-2 size-4"/>Export HTML</Button>
            <Button variant="outline" onClick={()=>window.print()}><Printer className="mr-2 size-4"/>Print / Save PDF</Button>
          </div>
        </SectionCard>
      </aside>

      <section className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm font-semibold">Live report preview</p><p className="text-xs text-muted-foreground">Changes update immediately without external services.</p></div>
          <div className="flex gap-2"><Button variant="outline"><Settings2 className="mr-2 size-4"/>Layout</Button><Button><Eye className="mr-2 size-4"/>Preview</Button></div>
        </div>
        <ReportPreview title={title} blocks={blocks}/>
      </section>
    </div>
  );
}
