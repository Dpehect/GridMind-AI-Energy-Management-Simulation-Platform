import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { slug: "gridmind-hq" },
    update: {},
    create: {
      name: "GridMind HQ",
      slug: "gridmind-hq",
      description: "GridMind local demo workspace"
    }
  });

  const building = await prisma.building.upsert({
    where: {
      workspaceId_code: {
        workspaceId: workspace.id,
        code: "HQ-01"
      }
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: "GridMind HQ",
      code: "HQ-01",
      type: "Office",
      floorAreaM2: 12800,
      occupancy: 740
    }
  });

  const devices = [
    ["HVAC-01", "North Wing Air Handler", "HVAC", 38, 8240, 91, 1, 2.4],
    ["CHLR-02", "Primary Chiller", "Cooling", 220, 14310, 58, 8, 14.8],
    ["PUMP-04", "Hydronic Loop Pump", "Pump", 18, 16880, 42, 12, 21.3],
    ["LGT-07", "Office Lighting Controller", "Lighting", 12, 5610, 77, 3, 6.1]
  ] as const;

  for (const [assetTag, name, category, ratedPowerKw, operatingHours, healthScore, anomalyCount30d, efficiencyLossPercent] of devices) {
    await prisma.device.upsert({
      where: { assetTag },
      update: {
        name,
        category,
        ratedPowerKw,
        operatingHours,
        healthScore,
        anomalyCount30d,
        efficiencyLossPercent
      },
      create: {
        buildingId: building.id,
        name,
        assetTag,
        category,
        ratedPowerKw,
        operatingHours,
        healthScore,
        anomalyCount30d,
        efficiencyLossPercent
      }
    });
  }

  const chiller = await prisma.device.findUnique({ where: { assetTag: "CHLR-02" } });
  const pump = await prisma.device.findUnique({ where: { assetTag: "PUMP-04" } });

  if (chiller) {
    await prisma.workOrder.upsert({
      where: { id: "wo-seed-1" },
      update: {},
      create: {
        id: "wo-seed-1",
        buildingId: building.id,
        deviceId: chiller.id,
        title: "Inspect compressor cycling",
        description: "Inspect short cycling and condenser approach temperature.",
        owner: "Mert Kaya",
        status: "SCHEDULED",
        priority: "HIGH",
        startsAt: new Date("2026-08-02T08:30:00+03:00"),
        endsAt: new Date("2026-08-02T12:00:00+03:00"),
        estimatedCost: 14500,
        checklist: [
          { id: "c1", label: "Lockout/tagout", done: false },
          { id: "c2", label: "Inspect refrigerant circuit", done: false }
        ]
      }
    });
  }

  if (pump) {
    await prisma.workOrder.upsert({
      where: { id: "wo-seed-2" },
      update: {},
      create: {
        id: "wo-seed-2",
        buildingId: building.id,
        deviceId: pump.id,
        title: "Replace pump bearing",
        description: "Replace worn bearing and verify vibration after alignment.",
        owner: "Selin Acar",
        status: "OVERDUE",
        priority: "CRITICAL",
        startsAt: new Date("2026-07-25T10:00:00+03:00"),
        endsAt: new Date("2026-07-25T14:00:00+03:00"),
        estimatedCost: 8200
      }
    });
  }

  const goals = [
    {
      id: "goal-energy-01",
      name: "Reduce annual electricity intensity",
      metric: "energy",
      baseline: 126,
      target: 104,
      current: 112,
      unit: "kWh/m²",
      owner: "Energy Operations",
      status: "ON_TRACK" as const
    },
    {
      id: "goal-cost-01",
      name: "Lower monthly operating cost",
      metric: "cost",
      baseline: 184000,
      target: 156000,
      current: 169800,
      unit: "TRY",
      owner: "Finance & Facilities",
      status: "AT_RISK" as const
    }
  ];

  for (const goal of goals) {
    await prisma.energyGoal.upsert({
      where: { id: goal.id },
      update: {},
      create: {
        ...goal,
        workspaceId: workspace.id,
        startsAt: new Date("2026-01-01"),
        endsAt: new Date("2026-12-31")
      }
    });
  }

  const recommendation = await prisma.recommendation.upsert({
    where: { id: "rec-hvac-01" },
    update: {},
    create: {
      id: "rec-hvac-01",
      workspaceId: workspace.id,
      title: "Optimize AHU scheduling",
      summary: "Shift AHU start times and reduce simultaneous morning ramp-up.",
      category: "HVAC",
      impactScore: 91,
      effortScore: 34,
      confidence: 0.89,
      estimatedSavingsKwh: 28600,
      estimatedSavingsCost: 112400,
      evidence: [
        "Morning peak exceeds baseline by 18%",
        "Four AHUs start within the same 10-minute window"
      ]
    }
  });

  await prisma.actionItem.upsert({
    where: { id: "act-seed-1" },
    update: {},
    create: {
      id: "act-seed-1",
      recommendationId: recommendation.id,
      title: "Review AHU start sequence",
      owner: "Energy Operations",
      dueDate: new Date("2026-08-01"),
      expectedSavingsKwh: 28600
    }
  });

  for (const item of [
    ["FLT-MERV13", "MERV 13 Air Filter", "HVAC", 18, 12, 680, "Main Store"],
    ["BRG-6205", "Pump Bearing 6205", "Mechanical", 4, 6, 1450, "Maintenance Cage"],
    ["SNS-TEMP", "Wireless Temperature Sensor", "Controls", 22, 10, 890, "Controls Lab"]
  ] as const) {
    const [sku, name, category, quantity, reorderPoint, unitCost, location] = item;
    await prisma.inventoryItem.upsert({
      where: {
        workspaceId_sku: {
          workspaceId: workspace.id,
          sku
        }
      },
      update: {},
      create: {
        workspaceId: workspace.id,
        sku,
        name,
        category,
        quantity,
        reorderPoint,
        unitCost,
        location
      }
    });
  }

  await prisma.dashboardLayout.upsert({
    where: { id: "layout-executive" },
    update: {},
    create: {
      id: "layout-executive",
      workspaceId: workspace.id,
      name: "Executive Operations",
      isDefault: true,
      widgets: [
        { id: "w1", title: "Energy consumption", kind: "metric", x: 0, y: 0, w: 3, h: 2, dataSource: "energy.total" },
        { id: "w2", title: "Operating cost", kind: "metric", x: 3, y: 0, w: 3, h: 2, dataSource: "cost.total" }
      ]
    }
  });

  await prisma.scheduledReport.upsert({
    where: { id: "scheduled-weekly-energy" },
    update: {},
    create: {
      id: "scheduled-weekly-energy",
      workspaceId: workspace.id,
      name: "Weekly Energy Review",
      cadence: "weekly",
      format: "html",
      nextRunAt: new Date("2026-07-27T08:00:00+03:00"),
      enabled: true
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
