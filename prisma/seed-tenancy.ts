import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: "softbridge-energy-group" },
    update: {},
    create: {
      name: "SoftBridge Energy Group",
      slug: "softbridge-energy-group",
      description: "Enterprise GridMind demo organization"
    }
  });

  const workspaces = [
    {
      slug: "gridmind-hq",
      name: "GridMind HQ",
      timezone: "Europe/Istanbul",
      currency: "TRY"
    },
    {
      slug: "atlas-factory",
      name: "Atlas Factory",
      timezone: "Europe/Istanbul",
      currency: "TRY"
    },
    {
      slug: "north-campus",
      name: "North Campus",
      timezone: "Europe/Istanbul",
      currency: "TRY"
    }
  ];

  for (const item of workspaces) {
    const workspace = await prisma.workspace.upsert({
      where: { slug: item.slug },
      update: {
        organizationId: organization.id,
        timezone: item.timezone,
        currency: item.currency
      },
      create: {
        organizationId: organization.id,
        name: item.name,
        slug: item.slug,
        timezone: item.timezone,
        currency: item.currency
      }
    });

    await prisma.workspaceLocale.upsert({
      where: { workspaceId: workspace.id },
      update: {},
      create: {
        workspaceId: workspace.id,
        locale: "tr-TR",
        timezone: item.timezone,
        currency: item.currency,
        unitSystem: "metric"
      }
    });

    for (const flag of [
      ["analytics", true],
      ["digital-twin", true],
      ["operations", true],
      ["portfolio", true]
    ] as const) {
      await prisma.workspaceFeatureFlag.upsert({
        where: {
          workspaceId_key: {
            workspaceId: workspace.id,
            key: flag[0]
          }
        },
        update: {
          enabled: flag[1]
        },
        create: {
          workspaceId: workspace.id,
          key: flag[0],
          enabled: flag[1]
        }
      });
    }
  }

  const users = await prisma.localUser.findMany();

  for (const user of users) {
    await prisma.organizationMembership.upsert({
      where: {
        organizationId_userId: {
          organizationId: organization.id,
          userId: user.id
        }
      },
      update: {},
      create: {
        organizationId: organization.id,
        userId: user.id,
        role:
          user.role === "admin"
            ? "organization_admin"
            : "member"
      }
    });

    const memberships = await prisma.workspace.findMany({
      where: {
        organizationId: organization.id
      }
    });

    for (const workspace of memberships) {
      await prisma.workspaceMembership.upsert({
        where: {
          workspaceId_userId: {
            workspaceId: workspace.id,
            userId: user.id
          }
        },
        update: {},
        create: {
          workspaceId: workspace.id,
          userId: user.id,
          role:
            user.role === "admin"
              ? "workspace_admin"
              : user.role
        }
      });
    }
  }
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
