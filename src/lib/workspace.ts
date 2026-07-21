import { prisma } from "@/lib/prisma";

export async function getDefaultWorkspace() {
  return prisma.workspace.upsert({
    where: { slug: "gridmind-hq" },
    update: {},
    create: {
      name: "GridMind HQ",
      slug: "gridmind-hq",
      description: "Default local-first GridMind workspace"
    }
  });
}
