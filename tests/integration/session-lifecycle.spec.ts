import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { integrationPrisma, resetIntegrationDatabase } from "./setup-database";
import { hashPassword } from "@/features/auth/password";
import { hashSessionToken } from "@/features/auth/token";

describe("session lifecycle", () => {
  beforeEach(resetIntegrationDatabase);
  afterAll(() => integrationPrisma.$disconnect());

  it("revokes active sessions", async () => {
    const workspace = await integrationPrisma.workspace.create({
      data: { name: "Session Workspace", slug: "session-workspace" }
    });

    const user = await integrationPrisma.localUser.create({
      data: {
        workspaceId: workspace.id,
        name: "Session User",
        email: "session@example.com",
        passwordHash: hashPassword("GridMindSession2026!"),
        role: "admin"
      }
    });

    const session = await integrationPrisma.localSession.create({
      data: {
        userId: user.id,
        tokenHash: hashSessionToken("session-token"),
        expiresAt: new Date(Date.now() + 3600000)
      }
    });

    await integrationPrisma.localSession.update({
      where: { id: session.id },
      data: { revokedAt: new Date() }
    });

    const revoked = await integrationPrisma.localSession.findUnique({
      where: { id: session.id }
    });

    expect(revoked?.revokedAt).toBeInstanceOf(Date);
  });
});
