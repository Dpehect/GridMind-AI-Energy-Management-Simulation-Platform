"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, FileSpreadsheet, ShieldAlert, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { parseReadingCsv } from "@/lib/ingestion/csv";
import type { ReadingImportPreview } from "@/lib/ingestion/types";
import { toast } from "sonner";

const empty: ReadingImportPreview={rows:[],issues:[],validRows:0,rejectedRows:0,qualityScore:0};
export function CsvImporter(){
  const [fileName,setFileName]=useState(""); const [preview,setPreview]=useState(empty); const [busy,setBusy]=useState(false);
  const canImport=preview.validRows>0&&!preview.issues.some(issue=>issue.severity==="error");
  const summary=useMemo(()=>[{label:"Valid rows",value:preview.validRows},{label:"Rejected",value:preview.rejectedRows},{label:"Quality",value:`${preview.qualityScore}%`}],[preview]);
  async function choose(file?:File){if(!file)return;if(file.size>2_000_000){toast.error("CSV must be smaller than 2 MB");return;}setFileName(file.name);setPreview(parseReadingCsv(await file.text()));}
  async function commit(){setBusy(true);const response=await fetch("/api/readings/import",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({rows:preview.rows})});const payload=await response.json();setBusy(false);response.ok?toast.success(`${payload.inserted} readings imported`):toast.error(payload.unknownMeters?.length?`Unknown meters: ${payload.unknownMeters.join(", ")}`:payload.message);}
  return <div className="space-y-5"><label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-8 text-center transition hover:border-primary/50 hover:bg-primary/5"><UploadCloud className="size-8 text-primary"/><span className="mt-4 font-medium">Drop a CSV or select a file</span><span className="mt-1 text-sm text-muted-foreground">Maximum 2 MB. Data remains on this installation.</span><input className="sr-only" type="file" accept=".csv,text/csv" onChange={(event)=>choose(event.target.files?.[0])}/></label>{fileName&&<Card className="p-5"><div className="flex items-center gap-3"><FileSpreadsheet className="size-5 text-primary"/><div><p className="font-medium">{fileName}</p><p className="text-sm text-muted-foreground">Validation preview complete</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{summary.map(item=><div key={item.label} className="rounded-2xl bg-muted/50 p-4"><p className="text-xs text-muted-foreground">{item.label}</p><p className="mt-1 text-2xl font-semibold">{item.value}</p></div>)}</div><Progress className="mt-5" value={preview.qualityScore}/>{preview.issues.length>0&&<div className="mt-5 max-h-40 space-y-2 overflow-auto">{preview.issues.slice(0,20).map((issue,index)=><div key={`${issue.row}-${index}`} className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm">{issue.severity==="error"?<ShieldAlert className="mt-0.5 size-4 text-destructive"/>:<CheckCircle2 className="mt-0.5 size-4 text-amber-500"/>}<span>Row {issue.row}: {issue.message}</span></div>)}</div>}<div className="mt-5 flex justify-end"><Button disabled={!canImport||busy} onClick={commit}>{busy?"Importing…":"Import validated rows"}</Button></div></Card>}</div>
}
