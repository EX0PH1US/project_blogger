import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <main className="flex max-w-xl flex-col items-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Blogger
        </h1>

        <p className="text-lg text-muted-foreground">
          A minimalistic space for your thoughts, ideas, and stories. Start
          reading or publishing today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>

          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>

          <Link href="/posts">
            <Button variant="secondary">Browse Posts</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
