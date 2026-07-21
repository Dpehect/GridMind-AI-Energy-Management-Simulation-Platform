export type WorkflowDecision = "approve" | "reject" | "request_changes";

export type InventoryMovementInput = {
  inventoryItemId: string;
  workOrderId?: string;
  type: "receipt" | "issue" | "adjustment" | "return";
  quantity: number;
  unitCost: number;
  reference?: string;
};

export type GoalProgressInput = {
  goalId: string;
  value: number;
  note?: string;
};

export type ReportApprovalInput = {
  reportId: string;
  decision: WorkflowDecision;
  comment?: string;
};
