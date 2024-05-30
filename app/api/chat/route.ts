import OpenAI from "openai";
require('dotenv').config()

const openai = new OpenAI();

export async function POST(request: Request) {
  const reqData = await request.json()
	console.log(reqData)
  const { messagesRaw, transcript } = reqData

	const messages = JSON.parse(messagesRaw).map(v => {
		return {
			role: v.type == "system" ? "assistant" : "user",
			content: v.message
		}
	})
	console.log(messages)

  const completion = await openai.chat.completions.create({
    messages: [
			{ 
				role: "system", 
				content: "You are a helpful assistant. You help people understand their audio notes via chat and get important and smart analysis with them."
			},
			{ 
				role: "system", 
				content: `The transcript of their note is: ${transcript}`
			},
			...messages
		],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(completion.choices[0]);
	return new Response(completion.choices[0].message.content)
}