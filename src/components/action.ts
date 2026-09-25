'use server'

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function logout() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}