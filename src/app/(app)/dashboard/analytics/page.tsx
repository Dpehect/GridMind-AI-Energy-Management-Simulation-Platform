import { BrainCircuit, Building2, Gauge, LineChart, Network, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getAnalyticsSuite } from "@/features/analytics/analytics-service";
import { BenchmarkTable } from "@/features/analytics/benchmark-table";
import { CorrelationCards } from "@/features/analytics/correlation-cards";
import { ForecastChart } from "@/features/analytics/forecast-chart";
import { RootCausePanel } from "@/features/analytics/root-cause-panel";
import { OptimizationPortfolio } from "@/features/analytics/optimization-portfolio";

export default function AnalyticsPage(){
 const data=getAnalyticsSuite();
 return <main className="space-y-6 p-5 md:p-8">
  <PageHeader eyebrow="Phase 20" title="Intelligence & Analytics Suite" description="Benchmark facilities, discover correlations, forecast demand, explain root causes and optimize action portfolios locally."/>
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
   <MetricCard label="Benchmarked facilities" value={String(data.benchmarks.length)} trend="Normalized metrics" icon={Building2}/>
   <MetricCard label="Top facility score" value={`${data.benchmarks[0].score}/100`} trend={data.benchmarks[0].building} icon={Gauge}/>
   <MetricCard label="Correlations" value={String(data.correlations.length)} trend="Weather and occupancy" icon={Network}/>
   <MetricCard label="Forecast horizon" value="24 h" trend="90% interval" icon={LineChart}/>
   <MetricCard label="Root causes" value={String(data.rootCauses.length)} trend="Explainable hypotheses" icon={BrainCircuit}/>
   <MetricCard label="Optimized actions" value={String(data.optimization.selected.length)} trend="Budget constrained" icon={Sparkles}/>
  </div>
  <BenchmarkTable items={data.benchmarks}/>
  <div className="grid gap-6 xl:grid-cols-2"><CorrelationCards items={data.correlations}/><RootCausePanel items={data.rootCauses}/></div>
  <ForecastChart points={data.forecast}/>
  <OptimizationPortfolio result={data.optimization}/>
 </main>
}
