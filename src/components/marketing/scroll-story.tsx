"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const scope = gsap.context(() => {
      const heading = root.current?.querySelector("[data-split]");
      if (!heading) return;
      const split = new SplitType(heading as HTMLElement, { types: "words,chars" });
      gsap.from(split.chars, {
        opacity: 0.12,
        stagger: 0.018,
        scrollTrigger: {
          trigger: heading,
          start: "top 78%",
          end: "bottom 48%",
          scrub: 0.8,
        },
      });
      return () => split.revert();
    }, root);

    return () => scope.revert();
  }, []);

  return (
    <section ref={root} className="px-4 py-24 md:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">One operational language</p>
        <h2 data-split className="mt-6 max-w-5xl text-balance text-4xl font-semibold tracking-[-0.055em] md:text-7xl">
          Turn fragmented energy data into decisions your whole facility can act on.
        </h2>
      </div>
    </section>
  );
}
