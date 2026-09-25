'use server'

import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const { error }  = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')

}