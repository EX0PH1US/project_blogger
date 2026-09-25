'use server'
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function editPost(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    const { data: post, error } = await supabase.from('blogs').update({ title: formData.get('title') as string, body: formData.get('body') as string }).eq('id', formData.get('id') as string).eq('user_id', user?.id).select('id').single()

    if (error) {
        console.error(error)
        redirect('/dashboard')
    }

    redirect(`/posts/${post?.id}`)
}