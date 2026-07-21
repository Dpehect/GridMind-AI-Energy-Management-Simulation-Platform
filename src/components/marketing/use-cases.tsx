"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  { index: "01", title: "Corporate offices", copy: "Find base-load waste, compare zones and validate schedule changes without interrupting operations.", metric: "18% modeled reduction" },
  { index: "02", title: "Light manufacturing", copy: "Detect production anomalies, quantify idle-time consumption and rank maintenance opportunities.", metric: "11 alerts resolved" },
  { index: "03", title: "Retail portfolios", copy: "Benchmark sites, normalize opening hours and identify the locations with the highest savings potential.", metric: "42 locations compared" },
  { index: "04", title: "Education campuses", copy: "Understand building-level behavior across teaching, laboratory and residential zones.", metric: "6 buildings unified" },
];

export function UseCases() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  return (
    <section id="use-cases" className="overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div><p className="eyebrow">Operating contexts</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">One system, different energy realities.</h2></div>
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" aria-label="Previous use case" onClick={() => emblaApi?.scrollPrev()}><ArrowLeft className="size-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Next use case" onClick={() => emblaApi?.scrollNext()}><ArrowRight className="size-4" /></Button>
          </div>
        </div>
        <div ref={emblaRef} className="mt-12 overflow-hidden">
          <div className="flex gap-4">
            {cases.map((item) => (
              <article key={item.index} className="min-w-0 flex-[0_0_88%] rounded-[2rem] border border-border bg-card p-7 sm:flex-[0_0_58%] lg:flex-[0_0_38%]">
                <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{item.index}</span><span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{item.metric}</span></div>
                <h3 className="mt-20 text-3xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
