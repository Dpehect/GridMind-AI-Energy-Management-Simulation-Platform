"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createWorkOrderAction, type WorkOrderActionState } from "./actions";
import type { DeviceHealthSnapshot } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: WorkOrderActionState = { success: false, message: "" };

export function WorkOrderForm({ devices }: { devices: DeviceHealthSnapshot[] }) {
  const [state, action, pending] = useActionState(createWorkOrderAction, initialState);

  useEffect(() => {
    if (!state.message) return;
    state.success ? toast.success(state.message) : toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Work order title</Label>
        <Input id="title" name="title" placeholder="Inspect compressor cycling" required />
        {state.fieldErrors?.title?.map((error) => <p key={error} className="text-xs text-destructive">{error}</p>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="deviceId">Device</Label>
          <select id="deviceId" name="deviceId" className="h-10 rounded-xl border border-input bg-background px-3 text-sm" required>
            <option value="">Select device</option>
            {devices.map((device) => <option key={device.deviceId} value={device.deviceId}>{device.assetTag} — {device.deviceName}</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="technician">Technician</Label>
          <Input id="technician" name="technician" placeholder="Technician name" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="scheduledAt">Scheduled date</Label>
          <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priority">Priority</Label>
          <select id="priority" name="priority" className="h-10 rounded-xl border border-input bg-background px-3 text-sm">
            <option value="low">Low</option><option value="medium">Medium</option>
            <option value="high">High</option><option value="critical">Critical</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="estimatedCost">Estimated cost</Label>
          <Input id="estimatedCost" name="estimatedCost" type="number" min="0" step="100" defaultValue="0" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Scope</Label>
        <Textarea id="description" name="description" placeholder="Describe inspection steps, measurements and acceptance criteria." required />
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Create work order"}</Button>
    </form>
  );
}
