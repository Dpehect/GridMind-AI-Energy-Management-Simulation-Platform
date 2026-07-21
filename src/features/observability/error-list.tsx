import { AlertOctagon } from "lucide-react";
import type { ErrorIncident } from "@prisma/client";
import { SectionCard } from "@/components/ui/section-card";

export function ErrorList({
  items
}: {
  items: ErrorIncident[];
}) {
  return (
    <SectionCard
      title="Error incidents"
      description="Grouped application failures with occurrence history."
    >
      <div className="space-y-3">
        {items.length ? (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border p-4"
            >
              <div className="flex items-start gap-3">
                <AlertOctagon className="mt-0.5 size-5 text-destructive" />
                <div className="min-w-0">
                  <p className="font-medium">
                    {item.code}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.message}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.occurrences} occurrence(s) · Last seen{" "}
                    {item.lastSeenAt.toLocaleString(
                      "tr-TR"
                    )}
                  </p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No open incidents.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
