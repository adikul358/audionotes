import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import moment from "moment";
require('dotenv').config()

export async function POST(request: Request) {
	const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
	if (!user) { return NextResponse.redirect("/signin") }

	const data = await request.formData();
	const fileBlob = data.get('file') as Blob;

	// Transcript API Call
	var formData = new FormData()
  formData.append("file", fileBlob);
  formData.append("model", "whisper-1");
  var heads = new Headers({
    "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`,
  })
  var transcript = await (await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: heads,
    body: formData
  })).json()

	// Summary API Call
  var heads = new Headers({
    "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`,
    "Content-Type": "application/json"
  })
  var summary = await (await fetch(" https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: heads,
    body: JSON.stringify({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: "You are an intelligent assistant that summarises large transcripts very accurately into a very short and brief summary, detailing all the important points."
        },
        {
          role: "user",
          content: transcript.text
        }
      ]
    })
  })).json()

  console.log(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    process.env.AWS_REGION,
    process.env.AWS_BUCKET_NAME
  )

  // S3 API Call
  const s3Client = new S3Client({ 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION 
  })
  const filename = moment(new Date()).format("x") + ".wav"
  console.log(filename)
  const arrayBuffer = await fileBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: 'audio/wav',
    ACL: "public-read"
  })


  const s3res = await s3Client.send(uploadCommand)
  console.log(s3res)

	return NextResponse.json({
		transcript: transcript.text,
		summary: summary.choices[0].message.content,
    audio_url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
	})

}