"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildingFormSchema, type BuildingFormValues } from "@/lib/validation/assets";

export function BuildingForm({ onComplete }: { onComplete?: () => void }) {
 const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BuildingFormValues>({ resolver: zodResolver(buildingFormSchema), defaultValues: { type: "Corporate office", occupancy: 0 } });
 const submit = async (values: BuildingFormValues) => { await new Promise(r => setTimeout(r, 450)); toast.success(`${values.name} added to the local workspace.`); reset(); onComplete?.(); };
 return <form className="space-y-5" onSubmit={handleSubmit(submit)}>
  <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4"><Building2 className="size-5 text-primary"/><p className="mt-2 text-sm font-medium">Local asset registration</p><p className="mt-1 text-xs text-muted-foreground">Validated locally. No external service call is made.</p></div>
  <Field label="Building name" error={errors.name?.message}><Input placeholder="North Operations Center" {...register("name")}/></Field>
  <div className="grid gap-4 sm:grid-cols-2"><Field label="Building code" error={errors.code?.message}><Input placeholder="NOC-01" {...register("code")}/></Field><Field label="Building type" error={errors.type?.message}><Input placeholder="Corporate office" {...register("type")}/></Field></div>
  <Field label="Address" error={errors.address?.message}><Input placeholder="Facility address" {...register("address")}/></Field>
  <div className="grid gap-4 sm:grid-cols-2"><Field label="Floor area (m²)" error={errors.floorAreaM2?.message}><Input type="number" {...register("floorAreaM2")}/></Field><Field label="Occupancy" error={errors.occupancy?.message}><Input type="number" {...register("occupancy")}/></Field></div>
  <Button className="w-full" disabled={isSubmitting}>{isSubmitting&&<Loader2 className="size-4 animate-spin"/>}Create building</Button>
 </form>;
}
function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <div className="space-y-2"><Label>{label}</Label>{children}{error&&<p className="text-xs text-destructive">{error}</p>}</div>}
