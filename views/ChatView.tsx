"use client"

import moment from 'moment';
import { useState } from 'react';
import TabBar from '@/components/TabBar';
import ChatMessage, { ChatMessageProps } from '@/components/ChatMessage';

interface ChatViewProps {
  id: string
  messages: ChatMessageProps[],
}

const ChatView: React.FC<ChatViewProps> = ({
  id,
  messages
}) => {
  
  return (
		<div className="flex flex-col max-h-full animate-in flex-grow">
			<div className="flex flex-col flex-grow space-y-4 mb-6 px-3 max-h-full overflow-y-scroll">
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
  )
}

export default ChatView