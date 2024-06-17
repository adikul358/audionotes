"use server"

import { createClient } from "./server"

export default async function checkUnlocked() {
	const supabase = createClient()
  const {data} = await supabase.from("users").select()
	return data[0].unlocked
}