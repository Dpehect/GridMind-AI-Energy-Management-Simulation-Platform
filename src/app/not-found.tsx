import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The requested GridMind route does not exist or may have been moved.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" />
            Return to dashboard
          </Link>
        </Button>
      </div>
    </main>
  );
}
