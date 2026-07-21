import { Skeleton } from "@/components/ui/skeleton";
export default function Loading(){return <main className="space-y-6 p-5 md:p-8"><Skeleton className="h-24"/><div className="grid gap-4 md:grid-cols-6">{Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-32"/>)}</div><Skeleton className="h-[720px]"/><Skeleton className="h-96"/></main>}
