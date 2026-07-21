import { NextResponse } from "next/server";
import { z } from "zod";
import { closeWorkOrder } from "@/features/operations/workflows/work-order-service";

const schema = z.object({
  outcome: z.string().trim().min(4).max(3000),
  actualCost: z.coerce.number().min(0)
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsed = schema.parse(await request.json());

  const result = await closeWorkOrder({
    workOrderId: id,
    outcome: parsed.outcome,
    actualCost: parsed.actualCost
  });

  return NextResponse.json(result);
}
