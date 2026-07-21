import { NextResponse } from "next/server";
import { z } from "zod";
import { reviewReport } from "@/features/reports/report-approval-service";

const schema = z.object({
  decision: z.enum(["approve", "reject", "request_changes"]),
  comment: z.string().trim().max(2000).optional()
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsed = schema.parse(await request.json());

  const approval = await reviewReport({
    reportId: id,
    decision: parsed.decision,
    comment: parsed.comment
  });

  return NextResponse.json(approval, { status: 201 });
}
