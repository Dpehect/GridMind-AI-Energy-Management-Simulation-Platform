import { SectionCard } from "@/components/ui/section-card";

export function JobTable({ items }: { items: Array<any> }) {
  return (
    <SectionCard
      title="Job history"
      description="Queued, running, completed and failed background work."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr className="border-b">
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Attempts</th>
              <th className="pb-3">Run at</th>
              <th className="pb-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {items.map((job) => (
              <tr key={job.id} className="border-b border-border/60">
                <td className="py-4 font-medium">{job.type}</td>
                <td className="py-4 capitalize">{job.status}</td>
                <td className="py-4">{job.attempts}/{job.maxAttempts}</td>
                <td className="py-4">{new Date(job.runAt).toLocaleString("tr-TR")}</td>
                <td className="py-4">{new Date(job.createdAt).toLocaleString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
