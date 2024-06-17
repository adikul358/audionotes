import { NextResponse } from "next/server";
import ytdl from 'ytdl-core'

export async function POST(request: Request, res: Response) {
	const { url } = await request.json()
	console.log(url);
  
	const data = ytdl(url, {
			quality: "lowestaudio",
			filter: "audioonly"
	}) as any

	return new NextResponse(data, {
			headers: {
				"Content-Type": "audio/mpeg"
			},
	});
}