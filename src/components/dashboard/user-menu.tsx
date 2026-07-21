import { LogOut, ShieldCheck, UserCircle2 } from "lucide-react";
import { logoutAction } from "@/features/auth/actions";
import type { AuthenticatedUser } from "@/features/auth/types";
import { Button } from "@/components/ui/button";

export function UserMenu({ user }: { user: AuthenticatedUser }) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right md:block">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {user.role.replaceAll("_", " ")}
        </p>
      </div>
      <div className="grid size-9 place-items-center rounded-full border border-border bg-card">
        <UserCircle2 className="size-5 text-primary" />
      </div>
      <form action={logoutAction}>
        <Button size="icon" variant="ghost" aria-label="Sign out">
          <LogOut className="size-4" />
        </Button>
      </form>
    </div>
  );
}
