"use server"
import { createClient } from "@/utils/supabase/server";

export default async function addNote() {
	const supabase = createClient();
	
	const { data, error } = await supabase
	  .from('notes')
	  .insert([
	    { 
				summary: summary,
				transcript: transcript,
			},
	  ])
	  .select()

	if (error) {
	  console.log(error)
	}
	return data
}