import { NextResponse } from "next/server";
import { z } from "zod";
import { createPurchaseRequest } from "@/features/operations/workflows/purchase-request-service";

const schema = z.object({
  justification: z.string().trim().min(5).max(2000),
  items: z.array(
    z.object({
      inventoryItemId: z.string().optional(),
      description: z.string().trim().min(2).max(200),
      quantity: z.coerce.number().int().positive(),
      estimatedUnitCost: z.coerce.number().min(0)
    })
  ).min(1)
});

export async function POST(request: Request) {
  const parsed = schema.parse(await request.json());
  const created = await createPurchaseRequest(parsed);

  return NextResponse.json(created, { status: 201 });
}
