import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import { withTransaction } from "@/lib/data-integrity/transaction";
import type { ReportApprovalInput } from "@/features/operations/workflows/types";

export async function submitReportForReview(
  reportId: string
) {
  const context = await getTenantContext();

  return prisma.report.update({
    where: {
      id: reportId,
      workspaceId: context.workspaceId
    },
    data: {
      status: "in_review"
    }
  });
}

export async function reviewReport(
  input: ReportApprovalInput
) {
  const context = await getTenantContext();

  return withTransaction("report.review", async (tx) => {
    const report = await tx.report.findFirst({
      where: {
        id: input.reportId,
        workspaceId: context.workspaceId
      }
    });

    if (!report) throw new Error("Report not found");

    const approval = await tx.reportApproval.create({
      data: {
        reportId: report.id,
        reviewerId: context.userId,
        reviewer: context.userId,
        decision: input.decision,
        comment: input.comment
      }
    });

    await tx.report.update({
      where: { id: report.id },
      data: {
        status:
          input.decision === "approve"
            ? "approved"
            : input.decision === "reject"
              ? "rejected"
              : "changes_requested"
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: context.workspaceId,
        actor: context.userId,
        action: "report.reviewed",
        entityType: "Report",
        entityId: report.id,
        metadata: {
          decision: input.decision
        }
      }
    });

    return approval;
  });
}
