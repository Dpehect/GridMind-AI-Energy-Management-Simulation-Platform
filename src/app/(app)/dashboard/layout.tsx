import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-background lg:flex"><Sidebar /><div className="min-w-0 flex-1"><Topbar />{children}</div></div>; }
