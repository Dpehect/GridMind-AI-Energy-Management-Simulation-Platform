import { NextResponse } from "next/server";
import { z } from "zod";
import { addWorkOrderComment } from "@/features/operations/workflows/work-order-service";

const schema = z.object({
  body: z.string().trim().min(2).max(2000)
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsed = schema.parse(await request.json());

  const comment = await addWorkOrderComment({
    workOrderId: id,
    body: parsed.body
  });

  return NextResponse.json(comment, { status: 201 });
}
