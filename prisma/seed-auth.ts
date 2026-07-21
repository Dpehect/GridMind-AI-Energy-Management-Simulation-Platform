import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/features/auth/password";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { slug: "gridmind-hq" },
    update: {},
    create: {
      name: "GridMind HQ",
      slug: "gridmind-hq"
    }
  });

  const users = [
    {
      name: "GridMind Administrator",
      email: "admin@gridmind.local",
      password: "GridMindAdmin2026!",
      role: "admin"
    },
    {
      name: "Energy Manager",
      email: "energy@gridmind.local",
      password: "GridMindEnergy2026!",
      role: "energy_manager"
    },
    {
      name: "Facility Manager",
      email: "facility@gridmind.local",
      password: "GridMindFacility2026!",
      role: "facility_manager"
    },
    {
      name: "Read Only Viewer",
      email: "viewer@gridmind.local",
      password: "GridMindViewer2026!",
      role: "viewer"
    }
  ];

  for (const user of users) {
    await prisma.localUser.upsert({
      where: {
        workspaceId_email: {
          workspaceId: workspace.id,
          email: user.email
        }
      },
      update: {
        name: user.name,
        role: user.role,
        active: true,
        passwordHash: hashPassword(user.password)
      },
      create: {
        workspaceId: workspace.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: true,
        passwordHash: hashPassword(user.password)
      }
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
