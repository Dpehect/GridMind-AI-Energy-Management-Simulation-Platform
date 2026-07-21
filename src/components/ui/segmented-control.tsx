"use client";
import { cn } from "@/lib/utils";
export function SegmentedControl({ value, options, onChange }: { value: string; options: {label:string; value:string}[]; onChange: (value:string)=>void }) {
 return <div className="inline-flex rounded-xl bg-muted p-1">{options.map((option)=><button key={option.value} onClick={()=>onChange(option.value)} className={cn("rounded-lg px-3 py-1.5 text-sm transition", value===option.value ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground")}>{option.label}</button>)}</div>;
}
