"use client";

import { useTransition } from "react";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { switchWorkspaceAction } from "./workspace-cookie";

type Item = {
  workspaceId: string;
  workspace: {
    id: string;
    name: string;
    organization: {
      name: string;
    } | null;
  };
};

export function WorkspaceSwitcher({
  items,
  activeWorkspaceId
}: {
  items: Item[];
  activeWorkspaceId: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">
            Active workspace
          </p>
          <select
            disabled={pending}
            value={activeWorkspaceId}
            onChange={(event) => {
              const value = event.target.value;
              startTransition(() => {
                switchWorkspaceAction(value);
              });
            }}
            className="mt-1 w-full bg-transparent text-sm font-medium outline-none"
          >
            {items.map((item) => (
              <option
                key={item.workspaceId}
                value={item.workspaceId}
              >
                {item.workspace.organization?.name ?? "Organization"} — {item.workspace.name}
              </option>
            ))}
          </select>
        </div>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
