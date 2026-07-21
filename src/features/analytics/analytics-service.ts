import { benchmarkRecords, hourlyEnergy, occupancySeries, weatherSeries } from "./data";
import { rankBenchmarks } from "./benchmark-engine";
import { analyzeCorrelation } from "./correlation-engine";
import { forecastSeries } from "./forecast-engine";
import { generateRootCauseCandidates } from "./root-cause-engine";
import { optimizationActions, optimizePortfolio } from "./optimization-engine";

export function getAnalyticsSuite(){
 const energy=hourlyEnergy.map(i=>i.value),weather=weatherSeries.map(i=>i.value),occupancy=occupancySeries.map(i=>i.value);
 const weatherCorr=analyzeCorrelation("Energy",energy,"Temperature",weather);
 const occupancyCorr=analyzeCorrelation("Energy",energy,"Occupancy",occupancy);
 const peak=Math.max(...energy),peakIndex=energy.indexOf(peak),night=energy.filter((_,i)=>i%24<6).reduce((s,v)=>s+v,0)/energy.reduce((s,v)=>s+v,0);
 return {
  benchmarks:rankBenchmarks(benchmarkRecords),
  correlations:[weatherCorr,occupancyCorr],
  forecast:forecastSeries(energy,24),
  rootCauses:generateRootCauseCandidates({peakHour:peakIndex%24,temperatureCorrelation:weatherCorr.coefficient,occupancyCorrelation:occupancyCorr.coefficient,nightLoadShare:night,anomalyCount:14}),
  optimization:optimizePortfolio(optimizationActions,50000),
  actions:optimizationActions
 };
}
