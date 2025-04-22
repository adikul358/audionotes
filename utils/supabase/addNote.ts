"use server"
import { createClient } from "@/utils/supabase/server";
import moment from "moment";

export default async function addNote(noteData: {
	title: string,
	summary: string,
	transcript: string,
	audio_url: string
}) {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();
	const { data, error } = await supabase
	  .from('notes')
	  .insert([
	    { 
				user_id: user.id,
				...noteData
			},
	  ])
	  .select()

	if (error) {
	  console.log(error)
	}
	return data
}