"use client";
import { useMemo, useState } from "react";
import { Search, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { localUsers } from "./data";
import { permissionMatrix } from "./permissions";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";

export function UserManagement() {
  const [query,setQuery]=useState("");
  const users=useMemo(()=>localUsers.filter(u=>`${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return (
    <SectionCard title="Local users" description="Manage offline identities and role-based access without third-party authentication.">
      <div className="mb-4 flex items-center gap-2"><Search className="size-4 text-muted-foreground"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search users…"/></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="text-xs uppercase text-muted-foreground"><tr className="border-b"><th className="pb-3">User</th><th className="pb-3">Role</th><th className="pb-3">Permissions</th><th className="pb-3">Last seen</th><th className="pb-3">Status</th></tr></thead><tbody>{users.map((u)=><tr key={u.id} className="border-b border-border/60"><td className="py-4"><p className="font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></td><td className="py-4 capitalize">{u.role.replaceAll("_"," ")}</td><td className="py-4"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary"/>{permissionMatrix[u.role].length}</span></td><td className="py-4">{new Date(u.lastSeenAt).toLocaleString("tr-TR")}</td><td className="py-4"><StatusBadge status={u.active?"success":"warning"}>{u.active?"active":"inactive"}</StatusBadge></td></tr>)}</tbody></table></div>
    </SectionCard>
  );
}
