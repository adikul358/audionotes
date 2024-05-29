"use client"

import moment from 'moment';
import { useState } from 'react';
import TabBar from '@/components/TabBar';

interface ChatViewProps {
  id: string
  messages: ChatMessageProps[],
}

interface ChatMessageProps {
  message: string
  type: "user" | "system",
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	type
}) => {
	return (
		<div className={`w-max max-w-[60%] rounded-md py-2 px-4 ${type == "user" ? "ml-auto bg-gray-200" : "bg-gray-800 text-white"}`}>
			<span className="">{message}</span>
		</div>
	)
}

const ChatView: React.FC<ChatViewProps> = ({
  id,
  messages
}) => {
  
  return (
		<div className="flex flex-col relative animate-in flex-grow justify-between items-between">
			<div className="flex flex-col flex-grow space-y-4 mb-6">
				<ChatMessage message="Hello I am your assisstant" type="system" />
				<ChatMessage message="write about johnny harris" type="user" />
				<ChatMessage message="Johnny Harris is a versatile and talented composer, arranger, and producer known for his contributions to film and television soundtracks, as well as his work as a solo artist. Born on November 15, 1932, in Edinburgh, Scotland, Harris began his musical journey at a young age, studying trumpet and piano." type="system" />
				<ChatMessage message="no the journalist" type="user" />
				<ChatMessage message="Johnny Harris is an accomplished journalist, filmmaker, and correspondent known for his compelling storytelling and insightful reporting on global affairs. Born in Richmond, Virginia, Harris began his career as a journalist after studying international relations at Brigham Young University and earning a master's degree in international peace and conflict resolution from American University." type="system" />
				<ChatMessage message="write about the origin of vox" type="user" />
				<ChatMessage message="Vox Media, the multimedia company behind Vox, traces its origins back to 2005 when it was founded by Jerome Armstrong, Tyler Bleszinski, and Markos Moulitsas. Initially, Vox Media operated under the name 'Gawker Media,' focusing on a network of blogs covering a wide range of topics, including politics, technology, and culture." type="system" />
				<ChatMessage message="Thanks" type="user" />
				<ChatMessage message="No problem!" type="system" />
			</div>
			
			<form method="POST" className="flex mt-auto sticky bottom-0 p-6 rounded-xl bg-white/80 backdrop-blur-xl mx-3">
				<input type="text" className="w-full px-6 py-2 border-2 border-gray-500 rounded-lg mr-3" placeholder="Enter message" />
				<button type="submit" className="w-12 h-12 rounded-lg bg-blue-800 text-white flex items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[28px]">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
					</svg>
				</button>
			</form>
		</div>
  )
}

export default ChatView