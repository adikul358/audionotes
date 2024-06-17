import OpenAI from "openai";
require('dotenv').config()

const openai = new OpenAI();

export async function POST(request: Request) {
  const reqData = await request.json()
	console.log(reqData)
  const { messagesRaw, transcripts } = reqData

	const messages = JSON.parse(messagesRaw).map(v => {
		return {
			role: v.type == "system" ? "assistant" : "user",
			content: v.message
		}
	})
	const transcriptsParsed = JSON.parse(transcripts).map((v,i) => {
		return {
			role: "system",
			content: `Transcript number ${i+1} of their notes is: ${v}`
		}
	})
	console.log("magic-chat/transcriptsParsed", transcriptsParsed)
	console.log("magic-chat/messages", messages)

  const completion = await openai.chat.completions.create({
    messages: [
			{ 
				role: "system", 
				content: "You are a helpful assistant. You help people understand their audio notes via chat and get important and smart analysis with them."
			},
			...transcriptsParsed,
			...messages
		],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(completion.choices[0]);
	return new Response(completion.choices[0].message.content)
}