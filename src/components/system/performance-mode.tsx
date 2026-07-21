"use client";
import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";
import { shouldUseReducedEffects } from "@/lib/performance";

export function PerformanceMode() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(shouldUseReducedEffects({
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
      reducedMotion: media.matches
    }));
  }, []);
  return <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground"><Gauge className="size-3.5" />{reduced ? "Reduced effects" : "Full effects"}</span>;
}
