'use server'
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string
    })

    if (error) {
        redirect('/error')
    }

    redirect('/dashboard')
}