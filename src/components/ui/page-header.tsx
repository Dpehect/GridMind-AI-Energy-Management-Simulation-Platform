import type { ReactNode } from "react";
export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div>{eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}<h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>{description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}</div>{actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}</div>;
}
