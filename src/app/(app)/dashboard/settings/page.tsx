import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage(){
  return <main className="space-y-6 p-5 md:p-8">
    <PageHeader eyebrow="Workspace" title="Settings" description="Configure local workspace identity, locale and accessibility defaults."/>
    <SectionCard title="Workspace settings" description="Stored locally and designed for offline operation.">
      <form className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2"><Label htmlFor="workspaceName">Workspace name</Label><Input id="workspaceName" defaultValue="GridMind HQ"/></div>
        <div className="grid gap-2"><Label htmlFor="timezone">Timezone</Label><Input id="timezone" defaultValue="Europe/Istanbul"/></div>
        <div className="grid gap-2"><Label htmlFor="currency">Currency</Label><select id="currency" className="h-10 rounded-xl border border-input bg-background px-3 text-sm"><option>TRY</option><option>EUR</option><option>USD</option></select></div>
        <div className="grid gap-2"><Label htmlFor="weekStart">Week starts on</Label><select id="weekStart" className="h-10 rounded-xl border border-input bg-background px-3 text-sm"><option>Monday</option><option>Sunday</option></select></div>
        <div className="md:col-span-2"><Button type="button">Save settings</Button></div>
      </form>
    </SectionCard>
  </main>;
}
