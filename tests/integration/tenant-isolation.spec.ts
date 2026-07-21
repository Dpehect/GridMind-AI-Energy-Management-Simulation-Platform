import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { integrationPrisma, resetIntegrationDatabase } from "./setup-database";

describe("tenant isolation", () => {
  beforeEach(resetIntegrationDatabase);
  afterAll(() => integrationPrisma.$disconnect());

  it("keeps buildings isolated by workspace", async () => {
    const organization = await integrationPrisma.organization.create({
      data: { name: "Test Organization", slug: "test-org" }
    });

    const [left, right] = await Promise.all([
      integrationPrisma.workspace.create({
        data: {
          organizationId: organization.id,
          name: "Left Workspace",
          slug: "left-workspace"
        }
      }),
      integrationPrisma.workspace.create({
        data: {
          organizationId: organization.id,
          name: "Right Workspace",
          slug: "right-workspace"
        }
      })
    ]);

    await integrationPrisma.building.createMany({
      data: [
        {
          workspaceId: left.id,
          name: "Left Building",
          code: "LEFT-01",
          type: "Office",
          floorAreaM2: 1000
        },
        {
          workspaceId: right.id,
          name: "Right Building",
          code: "RIGHT-01",
          type: "Factory",
          floorAreaM2: 2000
        }
      ]
    });

    const visible = await integrationPrisma.building.findMany({
      where: { workspaceId: left.id }
    });

    expect(visible).toHaveLength(1);
    expect(visible[0].name).toBe("Left Building");
  });
});
