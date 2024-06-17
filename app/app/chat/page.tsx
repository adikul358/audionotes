import ChatView from '@/views/ChatView';
import { createClient } from '@/utils/supabase/server';

export default async function ChatPage() {
	const supabase = createClient();
  const { data: notes } = await supabase
		.from("notes")
		.select()
		.order('timestamp', { ascending: true })

  const { data: messagesRaw } = await supabase
		.from("magic_chats")
		.select()
		.order('timestamp', { ascending: true })

	const transcripts = notes.map(v => v.transcript)

	const messages = [{
		type: "system",
		message: "Hi there! How can I assist you today?"
	}, ...messagesRaw]

	console.log("/app/chat", messages)

  return (
		<ChatView messages={messages} transcripts={transcripts} />
	)
}