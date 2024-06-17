"use client"

import moment from 'moment';
import { FormEventHandler, useRef, useState } from 'react';
import TabBar from '@/components/TabBar';
import ChatMessage, { ChatMessageProps } from '@/components/ChatMessage';
import LoadingIcon from '@/components/Icons/LoadingIcon';

interface ChatViewProps {
  messages: ChatMessageProps[],
  transcripts: string[],
}

const ChatView: React.FC<ChatViewProps> = ({ messages, transcripts }) => {
	const inputRef = useRef(null)
  const [chatState, setChatState] = useState<ChatMessageProps[]>(messages)
  const [loading, setLoading] = useState(false)

	// Chat Function
	const chatClient: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault(); 
		setLoading(true)
		const userMessage: ChatMessageProps = {
			type: "user",
			message: inputRef.current.value
		}
		const userMessageState: ChatMessageProps[] = [...chatState, userMessage]

		inputRef.current.value = ""
		setChatState(userMessageState)
		
		const newMessage = await (await fetch("/api/magic-chat", {
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			method: "POST",
			body: JSON.stringify({
				messagesRaw: JSON.stringify(userMessageState),
				transcripts: JSON.stringify(transcripts)
			}),
		})).text()

		setLoading(false)
		setChatState([...chatState, userMessage, {
			type: "system",
			message: newMessage
		}])
	}
  
  return (
		<div className="flex flex-col max-h-full animate-in flex-grow">
			<div className="flex flex-col flex-grow space-y-4 mb-6 px-3 max-h-full overflow-y-scroll">
				{chatState.map(({message, type}, i) => (
					<ChatMessage key={i} message={message} type={type} />
				))}
			</div>
			
			<form onSubmit={chatClient}  className="flex mt-auto sticky bottom-0 rounded-xl bg-white">
				<input disabled={loading} ref={inputRef} name="message" type="text" className={`w-full px-6 py-2 border-2 border-gray-500 rounded-lg mr-3 ${loading && "bg-gray-300"}`} placeholder="Enter message" />
				<button type="submit" className="w-12 h-12 rounded-lg bg-blue-800 text-white flex items-center justify-center">
					{loading ? (
						<LoadingIcon className="size-[28px]" />
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[28px]">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
						</svg>
					)}
				</button>
			</form>
		</div>
  )
}

export default ChatView