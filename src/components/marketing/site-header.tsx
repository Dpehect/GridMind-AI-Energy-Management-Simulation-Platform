import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/70 bg-background/75 px-4 py-2 shadow-sm backdrop-blur-xl">
        <Link href="/" aria-label="GridMind home"><Logo /></Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
          <a href="#architecture" className="hover:text-foreground">Architecture</a>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm"><Link href="/dashboard">Open demo <ArrowUpRight className="size-3.5" /></Link></Button>
        </div>
      </div>
    </header>
  );
}
