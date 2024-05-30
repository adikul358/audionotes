import NoteView from '@/views/NoteView';
import { createClient } from '@/utils/supabase/server';

interface NoteItem {
	title: string,
	transcript: string,
	summary: string,
	audio_url: string,
	timestamp: string
}

export default async function NotePage({ params }: { params: { id: string } }) {
	const supabase = createClient();
  const { data: notes } = await supabase
		.from("notes")
		.select()
		.eq('id', params.id)
  const { data: messagesRaw } = await supabase
		.from("note_chats")
		.select()
		.eq('note_id', params.id)
		.order('timestamp', { ascending: true })

	console.log(messagesRaw)
	const { title, transcript, summary, audio_url, timestamp } = notes[0]
	var messages = messagesRaw.map(v => {
		return {
			type: v.role,
			message: v.body
		}
	})

	messages = [{
		type: "system",
		message: "Hi there! How can I assist you today?"
	}, ...messages]

  return (
		<NoteView
			id={params.id} 
			title={title} 
			date={new Date(timestamp)} 
			summary={summary} 
			transcript={transcript}
			audio_url={audio_url}
			chat={messages}
		/>
	)
}