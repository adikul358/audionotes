export interface ChatMessageProps {
  message: string
  type: "user" | "system",
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	type
}) => {
	return (
		<div className={`w-max max-w-[60%] rounded-md py-2 px-4 space-y-3 ${type == "user" ? "ml-auto bg-gray-200" : "bg-gray-800 text-white"}`}>
			{message.split("\n").map((v,i) => (
				<p className="leading-lg" key={i}>{v}</p>
			))}
		</div>
	)
}

export default ChatMessage