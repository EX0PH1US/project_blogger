import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

async function logout() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

interface NavbarProps {
  email?: string | null;
}

export default function Navbar({ email }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand / Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Blogger
        </Link>

        {/* Auth Section */}
        <nav className="flex items-center gap-3">
          {email ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium hover:bg-secondary/80 focus:outline-none">
                  <span className="max-w-[150px] truncate sm:max-w-xs">
                    {email}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <form action={logout} className="w-full">
                      <button type="submit" className="w-full text-left">
                        Sign Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}