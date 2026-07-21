"use client";
import { useEffect, useState } from "react";
import { CloudOff, Wifi } from "lucide-react";

export function OfflineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border px-3 py-2 text-xs shadow-lg backdrop-blur ${online ? "bg-background/85 text-muted-foreground" : "bg-amber-50 text-amber-900"}`}>
      {online ? <Wifi className="size-3.5" /> : <CloudOff className="size-3.5" />}
      {online ? "Online" : "Offline mode"}
    </div>
  );
}
