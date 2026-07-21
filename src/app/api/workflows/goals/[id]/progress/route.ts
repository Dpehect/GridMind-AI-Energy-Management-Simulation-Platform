import { NextResponse } from "next/server";
import { z } from "zod";
import { recordGoalProgress } from "@/features/goals/goal-workflow-service";

const schema = z.object({
  value: z.coerce.number(),
  note: z.string().trim().max(1000).optional()
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsed = schema.parse(await request.json());

  const entry = await recordGoalProgress({
    goalId: id,
    value: parsed.value,
    note: parsed.note
  });

  return NextResponse.json(entry, { status: 201 });
}
