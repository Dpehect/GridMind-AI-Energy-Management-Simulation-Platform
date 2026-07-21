"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuildingForm } from "./building-form";
export function CreateBuildingDialog(){const [open,setOpen]=useState(false);return <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><Button><Plus className="size-4"/>Add building</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm"/><Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><div><Dialog.Title className="text-xl font-semibold">Create building</Dialog.Title><Dialog.Description className="mt-1 text-sm text-muted-foreground">Register a managed facility and its operating context.</Dialog.Description></div><Dialog.Close className="rounded-lg p-2 hover:bg-accent"><X className="size-4"/></Dialog.Close></div><div className="mt-6"><BuildingForm onComplete={()=>setOpen(false)}/></div></Dialog.Content></Dialog.Portal></Dialog.Root>}
