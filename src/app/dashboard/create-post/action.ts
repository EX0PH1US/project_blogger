'use server'

import { createClient } from "@/app/utils/supabase/server"
import { notFound, redirect } from "next/navigation"

export default async function createPost(formData: FormData) {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        redirect('/login')
    }

    const { data: post, error: creationError } = await supabase.from('blogs').insert({ 
        title: formData.get('title') as string,
        body: formData.get('body') as string,
        user_id: user?.id
    }).select('id').single()

    if (creationError) {
        notFound()
    }

    redirect(`/posts/${post?.id}`)
}