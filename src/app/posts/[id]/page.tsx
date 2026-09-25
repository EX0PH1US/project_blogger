import { createClient } from "@/app/utils/supabase/server";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/NavBar";

export default async function ShowPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error } = await supabase
    .from("blogs")
    .select("title, body")
    .eq("id", id)
    .single();

  return (
    <>
      <Navbar email={user?.email} />
      <article className="container mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <header className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl break-words leading-tight">
            {post?.title || "Untitled Post"}
          </h1>
        </header>

        <Separator className="my-8" />

        <main>
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground break-words">
            {post?.body || "No content available."}
          </div>
        </main>
      </article>
    </>
  );
}
