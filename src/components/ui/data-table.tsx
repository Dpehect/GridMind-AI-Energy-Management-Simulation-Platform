import type { ReactNode } from "react";
export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
 return <div className="overflow-hidden rounded-2xl border"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground"><tr>{headers.map(h=><th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y">{rows.map((row,i)=><tr key={i} className="transition hover:bg-muted/35">{row.map((cell,j)=><td key={j} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
