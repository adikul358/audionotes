import ChatView from '@/views/ChatView';
import { createClient } from '@/utils/supabase/server';

export default async function NotePage({ params }: { params: { id: string } }) {
	const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
		<ChatView
			id={'134532'} 
			messages={[
				{
					message: "Hello I am your assisstant",
					type:"system"
				},
				{
					message: "write about johnny harris",
					type:"user"
				},
				{
					message: "Johnny Harris is a versatile and talented composer, arranger, and producer known for his contributions to film and television soundtracks, as well as his work as a solo artist. Born on November 15, 1932, in Edinburgh, Scotland, Harris began his musical journey at a young age, studying trumpet and piano.",
					type:"system"
				},
				{
					message: "no the journalist",
					type:"user"
				},
				{
					message: "Johnny Harris is an accomplished journalist, filmmaker, and correspondent known for his compelling storytelling and insightful reporting on global affairs. Born in Richmond, Virginia, Harris began his career as a journalist after studying international relations at Brigham Young University and earning a master's degree in international peace and conflict resolution from American University.",
					type:"system"
				},
				{
					message: "write about the origin of vox",
					type:"user"
				},
				{
					message: "Vox Media, the multimedia company behind Vox, traces its origins back to 2005 when it was founded by Jerome Armstrong, Tyler Bleszinski, and Markos Moulitsas. Initially, Vox Media operated under the name 'Gawker Media,' focusing on a network of blogs covering a wide range of topics, including politics, technology, and culture.",
					type:"system"
				},
				{
					message: "Thanks",
					type:"user"
				},
				{
					message: "No problem!",
					type:"system"
				},
			]}
		/>
	)
}