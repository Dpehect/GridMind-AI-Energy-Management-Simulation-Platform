import { Hero } from "@/components/marketing/hero";
import { PlatformSection } from "@/components/marketing/platform-section";
import { SiteHeader } from "@/components/marketing/site-header";

export default function HomePage() {
  return <main><SiteHeader /><Hero /><PlatformSection /><section id="architecture" className="px-4 py-24"><div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-card p-8 md:p-14"><p className="text-sm font-medium text-primary">Designed for trust</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.04em] md:text-5xl">Local by default. Transparent by design.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">GridMind keeps its core analysis understandable and portable. No hidden cloud dependency is required for the product to remain useful.</p></div></section><footer className="border-t border-border px-4 py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row"><span>GridMind Phase 01</span><span>Local-first energy operations</span></div></footer></main>;
}
