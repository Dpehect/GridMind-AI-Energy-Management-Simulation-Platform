import Link from "next/link";
import { ArrowLeft, Braces, Database, Gauge, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const principles = [
  { icon: Database, title: "Local-first data", copy: "SQLite-backed persistence is introduced behind repository interfaces in the next domain phase." },
  { icon: Braces, title: "Typed boundaries", copy: "Strict TypeScript and Zod schemas keep external input and domain behavior explicit." },
  { icon: Gauge, title: "Performance budgets", copy: "Heavy motion and visualization capabilities are lazy-loaded and progressively enhanced." },
  { icon: LockKeyhole, title: "Secure defaults", copy: "No mandatory cloud account, API key or third-party identity provider is required." },
];

export default function TechnologyPage() {
  return <main className="min-h-screen px-4 py-8 md:py-14"><div className="mx-auto max-w-6xl"><Button asChild variant="ghost"><Link href="/"><ArrowLeft className="size-4"/>Back</Link></Button><p className="eyebrow mt-16">Technology</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl">A modern product stack without mandatory cloud dependence.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">GridMind combines a production-oriented Next.js architecture with accessible motion, typed domain boundaries and local intelligence.</p><div className="mt-14 grid gap-4 md:grid-cols-2">{principles.map(item=><Card key={item.title} className="rounded-[1.75rem] p-7"><item.icon className="size-5 text-primary"/><h2 className="mt-10 text-2xl font-semibold">{item.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{item.copy}</p></Card>)}</div></div></main>;
}
