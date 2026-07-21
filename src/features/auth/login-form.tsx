"use client";

import { useActionState } from "react";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { loginAction, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {
  success: false,
  message: ""
};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            className="pl-10"
            placeholder="admin@gridmind.local"
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="pl-10"
            required
          />
        </div>
      </div>

      {state.message ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <Button className="w-full" disabled={pending}>
        <LogIn className="mr-2 size-4" />
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
