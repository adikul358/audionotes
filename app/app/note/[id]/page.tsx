import NoteView from '@/components/NoteView';
import { createClient } from '@/utils/supabase/server';

export default async function NotePage({ params }: { params: { id: string } }) {
	const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
		<NoteView
			id={'134532'} 
			title={'Gratitude for viewing'} 
			date={new Date()} 
			summary={"You're welcome! If you have any text you'd like me to help with, just let me know. I'm here to assist you. You're welcome! If you have any text you'd like me to help with, just let me know. I'm here to assist you. You're welcome! If you have any text you'd like me to help with, just let me know. I'm here to assist you. "} 
			transcript={"Thank you for watching."} 
		/>
	)
}