import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <ShieldX className="size-8" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">Access denied</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your role does not include permission for this area.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard">Return to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
