"use server"

import { createClient } from "./server"

export default async function checkNoteCount() {
	const supabase = createClient()
  const {data} = await supabase.from("notes").select()
	return (data.length < 2)
}