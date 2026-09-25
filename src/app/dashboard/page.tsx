import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Navbar from "@/components/NavBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

async function deleteBlog(formData: FormData) {
    'use server'
    const supabase = await createClient()

    const { error } = await supabase.from('blogs').delete().eq('id', formData.get('id') as string)

    revalidatePath('/dashboard')
}

export default async function Dashboard() {
    const supabase = await createClient()

    const { data: { user }, error: err1 } = await supabase.auth.getUser()

    const { data: posts, error: err2 } = await supabase.from('blogs').select('id, title, body').eq('user_id', user?.id)

    if (err1) {
        console.error(err1)
        redirect('/login')
    }

    const hasPosts = posts && posts.length > 0

    return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar email={user?.email} />

      <main className="container mx-auto flex-1 max-w-4xl px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Posts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and view all your published stories.
            </p>
          </div>
          <Link href="/dashboard/create-post/">
            <Button>Create Post</Button>
          </Link>
        </div>

        {hasPosts ? (
          <div className="grid gap-4">
            {posts.map((pos) => (
              <Card
                key={pos.id}
                className="transition-colors hover:border-foreground/30 hover:bg-muted/30"
              >
                <CardHeader className="flex flex-row items-center justify-between p-5 space-y-0">
                  <Link
                    href={`/posts/${pos.id}`}
                    className="text-xl font-medium tracking-tight hover:underline flex-1 pr-4 truncate"
                  >
                    {pos.title}
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link href={`/posts/${pos.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <form action={deleteBlog}>
                      <input type="hidden" name="id" value={pos.id} />
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center bg-card">
            <h3 className="text-xl font-semibold tracking-tight">
              No posts written yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Your dashboard is looking a bit quiet. Share your first story and kickstart your blogging journey.
            </p>
            <div className="mt-6">
              <Link href="/dashboard/create-post/">
                <Button variant="outline">Write Your First Post</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}