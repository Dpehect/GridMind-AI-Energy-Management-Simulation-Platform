import { PrismaClient, EnergySource, DeviceStatus, AlertSeverity } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.workspace.deleteMany();

  const workspace = await prisma.workspace.create({
    data: {
      name: 'GridMind Demo Campus',
      slug: 'gridmind-demo-campus',
      description: 'Deterministic local dataset for GridMind product evaluation.',
      buildings: {
        create: [
          {
            name: 'North Operations Center', code: 'NOC-01', type: 'Office', floorAreaM2: 12400, occupancy: 680,
            floors: { create: [
              { name: 'Ground Floor', level: 0, areaM2: 4100, zones: { create: [
                { name: 'Operations Hall', code: 'OPS', category: 'Operations', areaM2: 2100, targetKwh: 620 },
                { name: 'Reception & Common', code: 'COMMON', category: 'Common', areaM2: 900, targetKwh: 180 }
              ]}},
              { name: 'First Floor', level: 1, areaM2: 4200, zones: { create: [
                { name: 'Engineering', code: 'ENG', category: 'Office', areaM2: 2300, targetKwh: 440 },
                { name: 'Meeting Wing', code: 'MEET', category: 'Meeting', areaM2: 800, targetKwh: 130 }
              ]}}
            ]}
          },
          { name: 'South Research Lab', code: 'SRL-02', type: 'Laboratory', floorAreaM2: 8600, occupancy: 240 }
        ]
      },
      tariffs: { create: [{ name: '2026 Commercial Tariff', pricePerKwh: 4.65, peakPrice: 6.2, offPeakPrice: 3.1, validFrom: new Date('2026-01-01') }] },
      goals: { create: [{ name: 'Reduce annual grid consumption', metric: 'kWh', baseline: 2480000, target: 2150000, startsAt: new Date('2026-01-01'), endsAt: new Date('2026-12-31') }] },
      settings: { create: [{ key: 'carbon_factor_kg_per_kwh', value: 0.442 }, { key: 'data_retention_days', value: 1095 }] },
      scenarios: { create: [{ name: 'Night load reduction', description: 'Reduce non-critical overnight loads by 18%.', assumptions: { reductionPercent: 18, window: '22:00-06:00' } }] },
      recommendations: { create: [{ title: 'Optimize overnight HVAC schedule', summary: 'Align HVAC setback periods with verified occupancy.', category: 'HVAC', impactScore: 8.8, effortScore: 3.2, confidence: 0.86, estimatedSavingsKwh: 74200, estimatedSavingsCost: 345030 }] }
    },
    include: { buildings: { include: { floors: { include: { zones: true } } } } }
  });

  const building = workspace.buildings[0];
  const zone = building.floors[0]?.zones[0];
  if (!building || !zone) throw new Error('Seed building or zone was not created.');

  const meter = await prisma.meter.create({ data: { buildingId: building.id, zoneId: zone.id, name: 'Main Operations Meter', serialNumber: 'GM-NOC-0001', source: EnergySource.GRID } });
  const device = await prisma.device.create({ data: { buildingId: building.id, zoneId: zone.id, name: 'Operations HVAC AHU-1', assetTag: 'HVAC-AHU-001', category: 'HVAC', ratedPowerKw: 92, status: DeviceStatus.ACTIVE, operatingHours: 16320 } });

  const readings = Array.from({ length: 72 }, (_, index) => {
    const capturedAt = new Date(Date.UTC(2026, 6, 18, index));
    const hour = capturedAt.getUTCHours();
    const occupied = hour >= 7 && hour <= 20;
    const dailyWave = Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2);
    return { meterId: meter.id, capturedAt, value: Number((occupied ? 128 + dailyWave * 24 : 54 + dailyWave * 7).toFixed(2)), quality: 0.99, source: 'seed' };
  });
  await prisma.reading.createMany({ data: readings });
  await prisma.alert.create({ data: { buildingId: building.id, zoneId: zone.id, meterId: meter.id, deviceId: device.id, title: 'Persistent overnight baseload', description: 'Consumption remained above the learned overnight baseline for three consecutive periods.', severity: AlertSeverity.MEDIUM, confidence: 0.84, evidence: { baselineKwh: 42.5, observedKwh: 56.1 } } });
  await prisma.activityLog.create({ data: { workspaceId: workspace.id, action: 'SEED_COMPLETED', entityType: 'Workspace', entityId: workspace.id, metadata: { phase: 4, deterministic: true } } });

  console.log(`Seeded ${workspace.name} with ${readings.length} readings.`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
