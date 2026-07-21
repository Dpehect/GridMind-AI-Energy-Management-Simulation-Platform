import { ArrowLeft, Boxes, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { PortfolioShowcase } from "@/features/portfolio/portfolio-showcase";
import { ReleaseBanner } from "@/components/system/release-banner";
import { PerformanceMode } from "@/components/system/performance-mode";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <ReleaseBanner />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4"/>Back</Link>
        <div className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3"><span className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[.16em]">GridMind 1.0 RC</span><PerformanceMode/></div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">Enterprise energy intelligence without external APIs.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A full-stack, local-first platform combining energy analytics, scenario simulation, digital twins, maintenance, reporting, operations and portfolio-ready UX.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Local intelligence",BrainCircuit],["Energy simulation",Zap],["Digital twin",Boxes],["Enterprise security",ShieldCheck]].map(([label,Icon]:any)=><div key={label} className="rounded-2xl border border-border p-4"><Icon className="size-5 text-primary"/><p className="mt-3 text-sm font-medium">{label}</p></div>)}
        </div>
        <div className="mt-16"><PortfolioShowcase/></div>
      </section>
    </main>
  );
}
