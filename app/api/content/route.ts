import OpenAI from "openai";
require('dotenv').config()

const openai = new OpenAI();

export async function POST(request: Request) {
  const reqData = await request.json()
  const { type, transcript } = reqData

  const completion = await openai.chat.completions.create({
    messages: [
			{ 
				role: "system", 
				content: "You are a helpful assistant. You help people form different types of written content from their voice notes."
			},
			{ 
				role: "system", 
				content: `The transcript of their note is: ${transcript}`
			},
			{ 
				role: "user", 
				content: `Generate a great ${type} from the transcript of my audio note`
			},
		],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(completion.choices[0]);
	return new Response(completion.choices[0].message.content)
}