export interface ChatMessageProps {
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

export default ChatMessage