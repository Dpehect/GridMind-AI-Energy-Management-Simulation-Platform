"use client";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({ meterSerial: z.string().min(3), capturedAt: z.string().min(1), value: z.coerce.number().nonnegative(), quality: z.coerce.number().min(0).max(1) });
export function ManualReadingForm(){
  const [busy,setBusy]=useState(false);
  async function submit(formData: FormData){
    const result=schema.safeParse(Object.fromEntries(formData));
    if(!result.success){toast.error("Check the reading fields");return;}
    setBusy(true);
    const response=await fetch("/api/readings/import",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({rows:[{...result.data,capturedAt:new Date(result.data.capturedAt).toISOString(),source:"manual"}]})});
    const payload=await response.json(); setBusy(false);
    response.ok?toast.success("Reading added"):toast.error(payload.message??"Reading could not be added");
  }
  return <form action={submit} className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="meterSerial">Meter serial</Label><Input id="meterSerial" name="meterSerial" defaultValue="GM-MTR-001"/></div><div><Label htmlFor="capturedAt">Captured at</Label><Input id="capturedAt" name="capturedAt" type="datetime-local"/></div><div><Label htmlFor="value">Reading (kWh)</Label><Input id="value" name="value" type="number" step="0.01" min="0"/></div><div><Label htmlFor="quality">Quality</Label><Input id="quality" name="quality" type="number" step="0.01" min="0" max="1" defaultValue="1"/></div><div className="sm:col-span-2"><Button disabled={busy}>{busy?"Saving…":"Add reading"}</Button></div></form>
}
