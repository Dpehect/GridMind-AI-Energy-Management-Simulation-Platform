import type { Prisma } from "@prisma/client";
import { getTenantContext } from "./context";

export async function workspaceWhere<
  T extends Record<string, unknown>
>(where: T = {} as T) {
  const context = await getTenantContext();

  return {
    workspaceId: context.workspaceId,
    ...where
  };
}

export async function buildingWhere<
  T extends Record<string, unknown>
>(where: T = {} as T) {
  const context = await getTenantContext();

  return {
    workspaceId: context.workspaceId,
    deletedAt: null,
    ...where
  };
}
