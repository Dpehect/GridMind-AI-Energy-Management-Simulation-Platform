"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioScenes } from "./data";

export function PortfolioShowcase() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {portfolioScenes.map((scene,index)=>(
        <motion.article key={scene.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay:index*.05}} viewport={{once:true}} className="group rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Showcase {index+1}</p><h2 className="mt-2 text-xl font-semibold">{scene.title}</h2></div><Link href={scene.href} className="rounded-full border p-2 transition group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-4"/></Link></div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{scene.description}</p>
          <div className="mt-6 rounded-2xl bg-muted/50 p-4"><p className="text-xs text-muted-foreground">{scene.metric}</p><p className="mt-1 text-2xl font-semibold">{scene.value}</p></div>
        </motion.article>
      ))}
    </div>
  );
}
