"use client";
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { notifications } from "./data";
import { usePlatformStore } from "./platform-store";

const icons = { info: Info, warning: AlertTriangle, critical: XCircle, success: CheckCircle2 };

export function NotificationCenter() {
  const { notificationOpen, setNotificationOpen } = usePlatformStore();
  if (!notificationOpen) return null;
  return (
    <aside className="fixed right-4 top-20 z-50 w-[min(92vw,420px)] rounded-3xl border border-border bg-card p-4 shadow-2xl">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Bell className="size-4"/><h2 className="font-semibold">Notifications</h2></div><button onClick={()=>setNotificationOpen(false)} className="text-xs text-muted-foreground">Close</button></div>
      <div className="mt-4 space-y-3">
        {notifications.map((item)=>{const Icon=icons[item.type];return <article key={item.id} className="rounded-2xl border border-border p-4"><div className="flex gap-3"><Icon className="mt-0.5 size-4 text-primary"/><div><p className="text-sm font-medium">{item.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{item.message}</p><p className="mt-2 text-[11px] text-muted-foreground">{new Date(item.createdAt).toLocaleString("tr-TR")}</p></div></div></article>})}
      </div>
    </aside>
  );
}
