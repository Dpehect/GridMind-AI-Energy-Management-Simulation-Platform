import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return <footer className="border-t border-border px-4 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><Logo/><nav className="flex flex-wrap gap-5 text-sm text-muted-foreground"><Link href="#platform">Platform</Link><Link href="#use-cases">Use cases</Link><Link href="/technology">Technology</Link><Link href="/dashboard">Dashboard</Link></nav></div><div className="flex flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row"><span>GridMind Phase 03</span><span>Local-first energy operations</span></div></div></footer>;
}
