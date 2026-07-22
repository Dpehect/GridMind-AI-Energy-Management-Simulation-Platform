import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() { return <div className="grid min-h-screen place-items-center px-4"><div className="text-center"><p className="text-sm font-medium text-primary">404</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">This energy path does not exist.</h1><p className="mt-3 text-muted-foreground">Return to the GridMind command center.</p><Button asChild className="mt-6"><Link href="/dashboard">Open dashboard</Link></Button></div></div>; }
