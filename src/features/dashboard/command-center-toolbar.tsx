"use client";
import { useState } from "react";
import { CalendarDays, Download, Play, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
export function CommandCenterToolbar() { const [live,setLive]=useState(false); return <div className="flex flex-wrap gap-2"><Button variant="outline"><CalendarDays className="size-4"/>Last 24 hours</Button><Button variant="outline" onClick={() => toast.success("Dashboard report prepared locally")}><Download className="size-4"/>Export</Button><Button variant={live ? "default" : "outline"} onClick={() => {setLive(v=>!v); toast(live ? "Live simulation paused" : "Live simulation started")}}>{live ? <RefreshCw className="size-4 animate-spin"/> : <Play className="size-4"/>}{live ? "Live demo" : "Run live demo"}</Button></div> }
