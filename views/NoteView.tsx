"use client"

import moment from 'moment';
import { useRef, useState, FormEventHandler, Dispatch, SetStateAction } from 'react';
import TabBar from '@/components/TabBar';
import ChatMessage, { ChatMessageProps } from '@/components/ChatMessage';
import LoadingIcon from '@/components/Icons/LoadingIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { StarIcon } from '@/components/Icons/StarIcon';
import checkUnlocked from '@/utils/supabase/checkUnlocked';

interface NoteViewProps {
  unlocked: boolean,
  id: string,
  title: string,
  date: Date,
  summary?: string,
  transcript?: string,
  audio_url?: string,
  chat: ChatMessageProps[],
}

const NoteView: React.FC<NoteViewProps> = ({
  id,
	unlocked,
  title,
  date,
  summary,
  transcript,
  audio_url,
	chat
}) => {

	const inputRef = useRef(null)
  const [chatState, setChatState] = useState<ChatMessageProps[]>(chat)
  const [loading, setLoading] = useState(false)
	const selectRef = useRef(null)
  // const [chatState, dispatchChat] = useReducer<(state: ChatMessageProps[], action: ChatMessageProps) => ChatMessageProps[]>(updateChat, chat)
	const [content, setContent] = useState("")
  const [contentloading, setContentLoading] = useState(false)
	const [summaryCopy, setSummaryCopy] = useState("Copy")
	const [transcriptCopy, setTranscriptCopy] = useState("Copy")
	const [contentCopy, setContentCopy] = useState("Copy")

	function formatDate (date: Date) {
    const dateWrapper = moment(date)
    return dateWrapper.format("D MMM YYYY")
  }
	function updateCopy(setCopyState: Dispatch<SetStateAction<string>>) {
		setCopyState("Copied")
		setTimeout(() => {
			setCopyState("Copy")
		}, 1500)
	}

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
		
		const newMessage = await (await fetch("/api/chat", {
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			method: "POST",
			body: JSON.stringify({
				messagesRaw: JSON.stringify(userMessageState),
				transcript
			}),
		})).text()

		setLoading(false)
		setChatState([...chatState, userMessage, {
			type: "system",
			message: newMessage
		}])
	}

	// Content Function
	const contentClient: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault(); 
		setContentLoading(true)
		
		const contentRes = await (await fetch("/api/content", {
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			method: "POST",
			body: JSON.stringify({
				type: selectRef.current.value,
				transcript
			}),
		})).text()

		setContentLoading(false)
		setContent(contentRes)
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
			label: unlocked ? "Content" : <>
				Content
        <StarIcon className="ml-2 size-6 text-yellow-300" />
			</>,
			onClick: (key: string) => {
        if (unlocked) {
          setTab(key)
        } else {
          alert("Generating content from notes is a paid feature. Please pay to unlock all features.")
        }
      },
		},
		{
			key: "chat",
			label: unlocked ? "Chat" : <>
				Chat
        <StarIcon className="ml-2 size-6 text-yellow-300" />
			</>,
			onClick: (key: string) => {
        if (unlocked) {
          setTab(key)
        } else {
          alert("Chatting with notes is a paid feature. Please pay to unlock all features.")
        }
      },
		},
	]

  return (
		<div className="flex flex-col flex-grow animate-in">
			<h1 className="text-3xl font-semibold">{title}</h1>
			<span className="text-gray-500 text-lg font-medium mt-2">{formatDate(date)}</span>
			<TabBar tabs={tabs} activeTab={tab} className="flex flex-row mt-8 text-lg space-x-2 mb-12" tabClassName="px-6 py-3" />

			{/* Summary Section */}
			{tab == "summary" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow flex-shrink max-w-[640px]">
						<p className="w-full">
							{summary}
						</p>
						<CopyToClipboard text={summary} onCopy={() => updateCopy(setSummaryCopy)}>
							<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
								</svg>
								<span>{summaryCopy}</span>
							</button>
						</CopyToClipboard>
					</div>
					<div className="space-y-3 w-64">
						<a href={audio_url} download={`AudioNotes - ${title}.wav`} target="_blank">
							<button className="flex items-center justify-center w-full bg-blue-800 text-white rounded-lg p-3">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
								</svg>
								Download Audio
							</button>
						</a>
						{/* <button className="flex items-center justify-center w-full bg-blue-800 text-white rounded-lg p-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
							</svg>
							Regenerate
						</button> */}
					</div>
				</div>
			)}

			{/* Transcript Section */}
			{tab == "transcript" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow max-w-[640px]">
						{audio_url && 
							<audio src={audio_url} controls className="w-full"></audio>
						}
						<p className="w-full mt-8">
							{transcript}
						</p>
						<CopyToClipboard text={transcript} onCopy={() => updateCopy(setTranscriptCopy)}>
						<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
							</svg>
							<span>{transcriptCopy}</span>
						</button>
						</CopyToClipboard>
					</div>
				</div>
			)}

			{/* Content Section */}
			{tab == "content" && (
				<div className="flex justify-between animate-in">
					<div className="flex-grow max-w-[640px]">
						<form onSubmit={contentClient} className="flex">
							<select ref={selectRef} disabled={loading} name="content-type" id="content-type" className={`w-64 border-2 border-blue-800 p-2 rounded-lg transition ease duration-300 ${loading && "bg-gray-300"}`}>
								<option value="" selected disabled>Select Content Type</option>
								<option value="email">Email</option>
								<option value="linkedin">LinkedIn Post</option>
								<option value="action">Action Items</option>
								<option value="tweet">Tweet</option>
								<option value="tweet-thread">Twitter Thread</option>
								<option value="blog">Blog</option>
							</select>
							<button type="submit" disabled={loading} className="flex items-center justify-center bg-blue-800 text-white rounded-lg px-6 py-2 ml-3">
								{!contentloading ? "Generate" : "Generating..."}
							</button>
						</form>
						<div className="space-y-3">
							{content.split("\n").map(v => (
								<p className="w-full mt-8">
									{v}
								</p>
							))}
						</div>
						{content !== "" && (
							<CopyToClipboard text={content} onCopy={() => updateCopy(setContentCopy)}>
							<button className="flex items-center justify-center ml-auto mt-6 border-2 border-gray-500 rounded-lg px-4 py-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
								</svg>
								<span>{contentCopy}</span>
							</button>
							</CopyToClipboard>
						)}
					</div>
				</div>
			)}

			{/* Chat Section */}
			{tab == "chat" && (
				<div className="flex flex-col animate-in flex-grow">
					<div className="flex flex-col flex-grow space-y-4 mb-6 px-3">
						{chatState.map(({message, type}, i) => (
							<ChatMessage key={i} message={message} type={type} />
						))}
					</div>
					
					<form onSubmit={chatClient} className="flex mt-auto sticky bottom-0 rounded-xl bg-white">
						<input disabled={loading} ref={inputRef} name="message" type="text" className={`w-full px-6 py-2 border-2 border-gray-500 rounded-lg mr-3 transition ease duration-300 ${loading && "bg-gray-300"}`} placeholder="Enter message" />
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
			)}


		</div>
  )
}

export default NoteView