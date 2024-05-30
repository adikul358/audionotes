"use client"

import moment from 'moment';
import { useState } from 'react';
import TabBar from '@/components/TabBar';
import ChatMessage, { ChatMessageProps } from '@/components/ChatMessage';

interface NoteViewProps {
  id: string
  title: string,
  date: Date,
  summary?: string,
  transcript?: string
}

const messages: ChatMessageProps[] = [
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
]

const NoteView: React.FC<NoteViewProps> = ({
  id,
  title,
  date,
  summary,
  transcript
}) => {
  
  const formatDate = (date: Date) => {
    const dateWrapper = moment(date)
    return dateWrapper.format("D MMM YYYY")
  }

  const [tab, setTab] = useState("summary")
  const tabs = [
		{
			key: "summary",
			label: "Summary",
			onClick: (key: string) => setTab(key),
		},
		{
			key: "transcript",
			label: "Transcript",
			onClick: (key: string) => setTab(key),
		},
		{
			key: "content",
			label: "Content",
			onClick: (key: string) => setTab(key),
		},
		{
			key: "chat",
			label: "Chat",
			onClick: (key: string) => setTab(key),
		},
	]

  return (
		<div className="flex flex-col flex-grow animate-in">
			<h1 className="text-3xl font-semibold">Gratitude for viewing</h1>
			<span className="text-gray-500 text-lg font-medium mt-2">{formatDate(date)}</span>
			<TabBar tabs={tabs} activeTab={tab} className="flex flex-row mt-8 text-lg space-x-2 mb-12" tabClassName="px-6 py-3" />

			{/* Summary Section */}
			{tab == "summary" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow max-w-[640px]">
						<p className="w-full">
							{summary}
						</p>
						<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
							</svg>
							Copy
						</button>
					</div>
					<div className="space-y-3 w-64">
						<button className="flex items-center justify-center w-full bg-blue-800 text-white rounded-lg p-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
							</svg>
							Download Audio
						</button>
						<button className="flex items-center justify-center w-full bg-blue-800 text-white rounded-lg p-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
							</svg>
							Regenerate
						</button>
					</div>
				</div>
			)}

			{/* Transcript Section */}
			{tab == "transcript" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow max-w-[640px]">
						<audio src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" controls className="w-full"></audio>
						<p className="w-full mt-8">
							{transcript}
						</p>
						<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
							</svg>
							Copy
						</button>
					</div>
				</div>
			)}

			{/* Content Section */}
			{tab == "content" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow max-w-[640px]">
						<div className="flex">
							<select name="content-type" id="content-type" className="w-64 border-2 border-blue-800 p-2 rounded-lg">
								<option value="" selected disabled>Select Content Type</option>
								<option value="email">Email</option>
								<option value="linkedin">LinkedIn Post</option>
								<option value="action">Action Items</option>
								<option value="tweet">Tweet</option>
								<option value="tweet-thread">Twitter Thread</option>
								<option value="blog">Blog</option>
							</select>
							<button className="flex items-center justify-center bg-blue-800 text-white rounded-lg px-6 py-2 ml-3">
								Generate
							</button>
						</div>
						<p className="w-full mt-8">
							{transcript}
						</p>
						<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
							</svg>
							Copy
						</button>
					</div>
				</div>
			)}

			{/* Chat Section */}
			{tab == "chat" && (
				<div className="flex flex-col animate-in flex-grow">
					<div className="flex flex-col flex-grow space-y-4 mb-6 px-3">
						{messages.map(({message, type}, i) => (
							<ChatMessage key={i} message={message} type={type} />
						))}
					</div>
					
					<form method="POST" className="flex mt-auto sticky bottom-0 rounded-xl bg-white">
						<input type="text" className="w-full px-6 py-2 border-2 border-gray-500 rounded-lg mr-3" placeholder="Enter message" />
						<button type="submit" className="w-12 h-12 rounded-lg bg-blue-800 text-white flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[28px]">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
							</svg>
						</button>
					</form>
				</div>
			)}


		</div>
  )
}

export default NoteView