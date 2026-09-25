import Link from "next/link";
import Navbar from "@/components/NavBar";// Adjust path if necessary
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "../utils/supabase/server";

interface ShowPostProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ShowPost({ searchParams }: ShowPostProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  const supabase = await createClient();

  // Fetch posts from Supabase with optional title search
  let supabaseQuery = supabase
    .from("blogs")
    .select("id, body, title, created_at")
    .order("created_at", { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
  }

  const { data: posts } = await supabaseQuery;

  // Optional: Fetch user session if you want the navbar to show email
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar email={user?.email} />

      <main className="container mx-auto flex-1 max-w-4xl px-4 py-8 sm:py-12">
        {/* Page Header */}
        <div className="flex flex-col gap-6 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Blogs
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Discover stories, thoughts, and insights from our authors.
            </p>
          </div>

          {/* Search Bar Form */}
          <form action="" method="GET" className="flex gap-2">
            <Input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search posts by title..."
              className="max-w-md"
            />
            <Button type="submit" variant="secondary">
              Search
            </Button>
            {query && (
              <Link href="/">
                <Button variant="ghost">Clear</Button>
              </Link>
            )}
          </form>
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block group"
              >
                <Card className="transition-colors hover:border-foreground/30 hover:bg-muted/30">
                  <CardHeader className="p-5">
                    <CardTitle className="text-xl font-medium tracking-tight group-hover:underline">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  {post.body && (
                    <CardContent className="px-5 pb-5 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.body}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center bg-card">
            <h3 className="text-xl font-semibold tracking-tight">
              {query ? `No posts matching "${query}"` : "No posts found"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              {query
                ? "Try searching for another keyword or clear the search filter."
                : "Check back later for new content."}
            </p>
            {query && (
              <div className="mt-6">
                <Link href="/">
                  <Button variant="outline">Clear Search</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}