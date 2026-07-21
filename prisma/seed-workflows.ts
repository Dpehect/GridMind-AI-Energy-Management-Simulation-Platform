import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.findFirst({
    where: { slug: "gridmind-hq" }
  });

  if (!workspace) throw new Error("Run base seed first");

  const building = await prisma.building.findFirst({
    where: {
      workspaceId: workspace.id,
      deletedAt: null
    }
  });

  if (!building) throw new Error("No building available");

  const device = await prisma.device.findFirst({
    where: {
      buildingId: building.id
    }
  });

  await prisma.recurringMaintenancePlan.upsert({
    where: { id: "rmp-seed-1" },
    update: {},
    create: {
      id: "rmp-seed-1",
      workspaceId: workspace.id,
      buildingId: building.id,
      deviceId: device?.id,
      title: "Monthly HVAC performance inspection",
      cadence: "monthly",
      interval: 1,
      nextRunAt: new Date("2026-08-01T09:00:00+03:00"),
      enabled: true,
      owner: "Facility Operations",
      checklist: [
        { id: "c1", label: "Inspect filters", done: false },
        { id: "c2", label: "Verify setpoints", done: false },
        { id: "c3", label: "Measure supply temperature", done: false }
      ]
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
