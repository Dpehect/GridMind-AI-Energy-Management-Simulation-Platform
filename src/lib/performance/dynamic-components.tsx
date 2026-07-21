"use client";

import dynamic from "next/dynamic";

export const LazyDigitalTwin = dynamic(
  () =>
    import("@/features/digital-twin/digital-twin-view").then(
      (module) => module.DigitalTwinView
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[520px] place-items-center rounded-3xl border border-border bg-muted/30 text-sm text-muted-foreground">
        Loading digital twin…
      </div>
    )
  }
);

export const LazyAnalyticsChart = dynamic(
  () =>
    import("@/features/analytics/forecast-chart").then(
      (module) => module.ForecastChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 animate-pulse rounded-2xl bg-muted" />
    )
  }
);
