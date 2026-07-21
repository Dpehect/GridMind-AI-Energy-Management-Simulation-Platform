"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="grid min-h-[60vh] place-items-center p-6"><div className="max-w-md text-center"><h1 className="text-2xl font-semibold">Release Center could not be loaded</h1><p className="mt-3 text-sm text-muted-foreground">A local release verification step failed.</p><Button className="mt-5" onClick={reset}>Try again</Button></div></main>}
