import { linearRegression, std } from "./math";
import type { ForecastPoint } from "./types";

export function forecastSeries(values:number[],future=12):ForecastPoint[]{
 const {slope,intercept}=linearRegression(values);
 const sigma=std(values.map((v,i)=>v-(intercept+slope*i)));
 const history=values.slice(-12).map((value,i)=>({label:`T-${11-i}`,actual:value,forecast:value,lower:value,upper:value}));
 const projected=Array.from({length:future},(_,i)=>{
  const x=values.length+i;
  const forecast=Math.max(0,intercept+slope*x);
  return {label:`T+${i+1}`,forecast:Number(forecast.toFixed(1)),lower:Number(Math.max(0,forecast-1.64*sigma).toFixed(1)),upper:Number((forecast+1.64*sigma).toFixed(1))}
 });
 return [...history,...projected];
}
