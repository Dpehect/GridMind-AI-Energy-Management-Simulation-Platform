# Phase 32 — Real Operations Workflows

Delivered:

- Work-order comments
- Work-order close validation
- Checklist completion enforcement
- Actual maintenance cost recording
- Inventory receipt, issue, return and adjustment
- Work-order part consumption
- Purchase request creation and approval
- Goal milestones
- Goal progress history
- Automatic goal status recalculation
- Report review and approval
- Recurring maintenance plans
- Workflow summary dashboard
- Tenant-aware workflow APIs
- Workflow seed data
- Unit-test coverage starters

## Required schema integration

Merge `prisma/phase32-additions.prisma` into the active schema.

Add relations to existing models:

```prisma
WorkOrder {
  comments    WorkOrderComment[]
  attachments WorkOrderAttachment[]
  movements   InventoryMovement[]
}

InventoryItem {
  movements InventoryMovement[]
}

EnergyGoal {
  milestones GoalMilestone[]
  progressEntries GoalProgressEntry[]
}

Report {
  approvals ReportApproval[]
}

Workspace {
  inventoryMovements InventoryMovement[]
  purchaseRequests PurchaseRequest[]
  recurringMaintenancePlans RecurringMaintenancePlan[]
}

Building {
  recurringMaintenancePlans RecurringMaintenancePlan[]
}

Device {
  recurringMaintenancePlans RecurringMaintenancePlan[]
}
```

## Important

Existing repositories must already enforce tenant context before these workflows are considered production-safe.
