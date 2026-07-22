"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnergyOrb } from "./energy-orb";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-36 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(93,227,191,.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(92,145,255,.14),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"><Sparkles className="size-3.5 text-primary" /> Local-first energy intelligence</div>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl lg:text-[5.8rem]">See energy as a living system.</h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">GridMind transforms building consumption into operational clarity, anomaly signals, and measurable efficiency scenarios—without API keys or external accounts.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/dashboard">Explore command center <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href="#platform">View platform</a></Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> No account required</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> No paid API dependency</span>
          </div>
        </motion.div>
        <EnergyOrb />
      </div>
    </section>
  );
}
