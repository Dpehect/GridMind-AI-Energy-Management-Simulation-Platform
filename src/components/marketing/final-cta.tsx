import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-foreground px-6 py-16 text-background md:px-14 md:py-24"><p className="text-sm font-medium opacity-65">GridMind local energy intelligence</p><div className="mt-6 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] md:text-7xl">See the energy decisions hiding inside your data.</h2><Button asChild size="lg" className="shrink-0 bg-background text-foreground hover:bg-background/90"><Link href="/dashboard">Open command center <ArrowUpRight className="size-4" /></Link></Button></div></div></section>;
}
