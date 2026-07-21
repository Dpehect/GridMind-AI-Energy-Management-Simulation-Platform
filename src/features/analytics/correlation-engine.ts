import { pearson } from "./math";
import type { CorrelationResult } from "./types";

export function analyzeCorrelation(left:string,a:number[],right:string,b:number[]):CorrelationResult{
 const coefficient=Number(pearson(a,b).toFixed(3));
 const abs=Math.abs(coefficient);
 return {
  left,right,coefficient,
  strength:abs>=0.7?"strong":abs>=0.4?"moderate":"weak",
  direction:coefficient>=0?"positive":"negative"
 };
}
