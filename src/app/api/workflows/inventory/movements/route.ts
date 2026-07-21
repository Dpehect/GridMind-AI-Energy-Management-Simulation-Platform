import { NextResponse } from "next/server";
import { z } from "zod";
import { recordInventoryMovement } from "@/features/operations/workflows/inventory-movement-service";

const schema = z.object({
  inventoryItemId: z.string().min(1),
  workOrderId: z.string().optional(),
  type: z.enum(["receipt", "issue", "adjustment", "return"]),
  quantity: z.coerce.number().int().positive(),
  unitCost: z.coerce.number().min(0),
  reference: z.string().trim().max(120).optional()
});

export async function POST(request: Request) {
  const parsed = schema.parse(await request.json());
  const movement = await recordInventoryMovement(parsed);

  return NextResponse.json(movement, { status: 201 });
}
