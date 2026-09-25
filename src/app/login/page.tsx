"use client";

import { login } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/NavBar";
import NProgress from "nprogress";
import { useActionState, useEffect } from "react";

export default function Login() {
  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isPending]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}