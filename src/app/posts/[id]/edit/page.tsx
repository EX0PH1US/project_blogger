import { createClient } from "@/app/utils/supabase/server";
import Navbar from "@/components/NavBar";
import { redirect } from "next/navigation";
import editPost from "./action";
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
import { Textarea } from "@/components/ui/textarea";

export default async function EditPost({params} : {params: Promise<{id: string}>}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    redirect("/login");
  }

  const { id } = await params

  const { data: post, error: err } = await supabase.from('blogs').select('id, title, body').eq('id', id).eq('user_id', user?.id).single()

  if (err) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar email={user?.email} />

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-2xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Edit Post 
            </CardTitle>
            <CardDescription>
              Share your thoughts, stories, or ideas with the world.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={editPost} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="title">Title</Label>
                  <span className="text-xs text-muted-foreground">
                    Max 50 chars
                  </span>
                </div>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="Enter a catchy title..."
                  defaultValue={post?.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Content</Label>
                <Textarea
                  name="body"
                  id="body"
                  placeholder="Write your blog post content here..."
                  rows={8}
                  className="resize-y min-h-[160px]"
                  defaultValue={post?.body}
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="w-full sm:w-auto px-8">
                  Publish Post
                </Button>
              </div>
              <input type="hidden" name="id" value={post?.id} />
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
