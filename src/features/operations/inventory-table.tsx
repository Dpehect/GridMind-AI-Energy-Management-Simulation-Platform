import { PackageCheck, PackageX } from "lucide-react";
import type { InventoryItem } from "./types";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function InventoryTable({items}:{items:InventoryItem[]}) {
  return <SectionCard title="Maintenance inventory" description="Track spare parts, stock position and reorder risk.">
    <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="text-xs uppercase text-muted-foreground"><tr className="border-b"><th className="pb-3">Item</th><th className="pb-3">SKU</th><th className="pb-3">Category</th><th className="pb-3">Quantity</th><th className="pb-3">Reorder point</th><th className="pb-3">Location</th><th className="pb-3">Status</th></tr></thead><tbody>{items.map(i=><tr key={i.id} className="border-b border-border/60"><td className="py-4 font-medium">{i.name}</td><td className="py-4">{i.sku}</td><td className="py-4">{i.category}</td><td className="py-4">{i.quantity}</td><td className="py-4">{i.reorderPoint}</td><td className="py-4">{i.location}</td><td className="py-4"><StatusBadge status={i.quantity<=i.reorderPoint?"warning":"success"}>{i.quantity<=i.reorderPoint?"reorder":"healthy"}</StatusBadge></td></tr>)}</tbody></table></div>
  </SectionCard>;
}
