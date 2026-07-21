import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/features/auth/password";

const prisma = new PrismaClient();

async function main() {
  if (process.env.GRIDMIND_ENABLE_DEMO_USERS !== "true") {
    console.log("Demo user seed skipped. Set GRIDMIND_ENABLE_DEMO_USERS=true to enable it.");
    return;
  }

  const workspace = await prisma.workspace.upsert({
    where: { slug: "gridmind-hq" },
    update: {},
    create: {
      name: "GridMind HQ",
      slug: "gridmind-hq"
    }
  });

  const users = [
    ["GridMind Administrator", "admin@gridmind.local", "GridMindAdmin2026!", "admin"],
    ["Energy Manager", "energy@gridmind.local", "GridMindEnergy2026!", "energy_manager"],
    ["Facility Manager", "facility@gridmind.local", "GridMindFacility2026!", "facility_manager"],
    ["Read Only Viewer", "viewer@gridmind.local", "GridMindViewer2026!", "viewer"]
  ] as const;

  for (const [name, email, password, role] of users) {
    await prisma.localUser.upsert({
      where: {
        workspaceId_email: {
          workspaceId: workspace.id,
          email
        }
      },
      update: {
        name,
        role,
        active: true,
        passwordHash: hashPassword(password)
      },
      create: {
        workspaceId: workspace.id,
        name,
        email,
        role,
        active: true,
        passwordHash: hashPassword(password)
      }
    });
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
