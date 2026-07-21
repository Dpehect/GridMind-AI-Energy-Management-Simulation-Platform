import { PageHeader } from "@/components/ui/page-header";
import { getTenantContext } from "@/features/tenancy/context";
import { prisma } from "@/lib/prisma";
import { TechnicianMobileView } from "@/features/ux/technician-mobile";

export default async function TechnicianPage() {
  const context = await getTenantContext();

  const workOrders = await prisma.workOrder.findMany({
    where: {
      building: { workspaceId: context.workspaceId },
      status: { in: ["SCHEDULED", "IN_PROGRESS", "BLOCKED"] }
    },
    include: {
      building: true,
      device: true
    },
    orderBy: [
      { priority: "desc" },
      { startsAt: "asc" }
    ],
    take: 50
  });

  return (
    <main className="space-y-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Field operations"
        title="Technician Workspace"
        description="Mobile-first maintenance queue and task navigation."
      />
      <TechnicianMobileView workOrders={workOrders} />
    </main>
  );
}
