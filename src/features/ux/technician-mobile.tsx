import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, Wrench } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

export function TechnicianMobileView({
  workOrders
}: {
  workOrders: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    startsAt: Date;
    building: { name: string };
    device?: { name: string } | null;
  }>;
}) {
  return (
    <SectionCard
      title="My maintenance queue"
      description="Mobile-first view for field technicians."
    >
      <div className="space-y-3">
        {workOrders.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/maintenance/${item.id}`}
            className="block rounded-2xl border border-border p-4 active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.device?.name ?? "Unassigned device"}
                </p>
              </div>
              {item.status === "COMPLETED" ? (
                <CheckCircle2 className="size-5 text-emerald-600" />
              ) : (
                <Wrench className="size-5 text-primary" />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {item.building.name}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-3.5" />
                {item.startsAt.toLocaleString("tr-TR")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
