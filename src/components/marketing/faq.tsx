const faq = [
  ["Does GridMind require a paid AI API?", "No. The planned intelligence engine uses explainable local algorithms and deterministic rules by default."],
  ["Can it work without an online account?", "Yes. GridMind is designed around local workspaces and portable data, with no mandatory third-party registration."],
  ["Is this only a visual prototype?", "No. The roadmap includes persistent data, ingestion, simulation, reporting, permissions, testing and deployment hardening."],
  ["How is motion handled accessibly?", "Every major animation respects reduced-motion preferences and the product remains fully usable without animation."],
];

export function FAQ() {
  return <section id="faq" className="px-4 py-24 md:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow">Questions, answered</p><div className="mt-8 divide-y divide-border border-y border-border">{faq.map(([q,a],i)=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium"><span>{q}</span><span className="text-muted-foreground transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 leading-7 text-muted-foreground">{a}</p></details>)}</div></div></section>;
}
