import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

interface Chat {
	role: "assistant" | "user";
	content: string;
}

interface Params {
	chatList: Chat[];
	lastReply: string;
}
export function ChatList({ chatList, lastReply }: Params) {
	useEffect(() => {
		console.log("chatList:", chatList);
	}, [chatList]);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatList.length || lastReply.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chatList.length, lastReply.length]);
	return (
		<ul className="flex flex-col p-4 gap-y-4 w-full h-full max-w-[1000px] max-h-[calc(100vh-170px)] overflow-y-scroll bg-slate-50 scroll-m-0 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
			{chatList.map((chat, index) => {
				if (chat.role === "assistant") {
					return (
						<li
							key={index + "-assistant-p"}
							className=" bg-white border p-4 gap-y-1 flex flex-col rounded-[28px] max-w-[75%] w-full self-start"
						>
							<ReactMarkdown>{chat.content}</ReactMarkdown>
						</li>
					);
				} else {
					return (
						<li
							key={index + "-user-p"}
							className="bg-slate-200 border p-4 gap-y-1 flex flex-col rounded-[28px] w-fit max-w-[75%] self-end"
						>
							<ReactMarkdown>{chat.content}</ReactMarkdown>
						</li>
					);
				}
			})}
			<div ref={ref} />
		</ul>
	);
}
