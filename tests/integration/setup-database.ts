import { PrismaClient } from "@prisma/client";

export const integrationPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL ?? "file:./integration-test.db"
    }
  }
});

export async function resetIntegrationDatabase() {
  await integrationPrisma.$transaction([
    integrationPrisma.jobAttempt.deleteMany(),
    integrationPrisma.backgroundJob.deleteMany(),
    integrationPrisma.runtimeLog.deleteMany(),
    integrationPrisma.errorIncident.deleteMany(),
    integrationPrisma.activityLog.deleteMany(),
    integrationPrisma.localSession.deleteMany(),
    integrationPrisma.workspaceMembership.deleteMany(),
    integrationPrisma.organizationMembership.deleteMany(),
    integrationPrisma.localUser.deleteMany(),
    integrationPrisma.workspaceFeatureFlag.deleteMany(),
    integrationPrisma.workspaceLocale.deleteMany(),
    integrationPrisma.buildingAccess.deleteMany(),
    integrationPrisma.device.deleteMany(),
    integrationPrisma.building.deleteMany(),
    integrationPrisma.workspace.deleteMany(),
    integrationPrisma.organization.deleteMany()
  ]);
}
