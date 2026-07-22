"use client";

import { motion } from "framer-motion";
import { Activity, ArrowDownRight, Zap } from "lucide-react";

export function EnergyOrb() {
  return (
    <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[7%] rounded-full border border-primary/20 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,.85),rgba(122,244,207,.2)_24%,rgba(68,128,255,.13)_54%,transparent_72%)] shadow-[inset_0_0_70px_rgba(75,219,176,.17),0_40px_120px_-50px_rgba(68,128,255,.7)] dark:bg-[radial-gradient(circle_at_35%_30%,rgba(156,255,226,.35),rgba(31,91,77,.35)_30%,rgba(24,48,88,.25)_55%,transparent_72%)]" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute inset-[2%] rounded-full border border-dashed border-primary/25" />
      <div className="absolute left-[7%] top-[18%] rounded-2xl border border-border bg-background/80 p-4 shadow-xl backdrop-blur-xl"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary"><Zap className="size-4" /></span><div><p className="text-xs text-muted-foreground">Live demand</p><p className="font-semibold">124.2 kW</p></div></div></div>
      <div className="absolute bottom-[12%] right-[2%] rounded-2xl border border-border bg-background/80 p-4 shadow-xl backdrop-blur-xl"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600"><ArrowDownRight className="size-4" /></span><div><p className="text-xs text-muted-foreground">Efficiency gain</p><p className="font-semibold">8.4%</p></div></div></div>
      <div className="absolute inset-0 grid place-items-center"><div className="text-center"><Activity className="mx-auto size-8 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Grid health</p><p className="text-5xl font-semibold tracking-tight">91</p></div></div>
    </motion.div>
  );
}
