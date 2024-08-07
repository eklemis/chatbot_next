import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SaveIcon, CheckIcon } from "lucide-react";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface Chat {
	role: "assistant" | "user";
	content: string;
}

interface Params {
	chatList: Chat[];
	lastReply: string;
	onSave: (content: string) => void;
}
export function ChatList({ chatList, lastReply, onSave }: Params) {
	const [coppied, setCoppied] = useState(false);
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
		<ul className="flex flex-col p-4 gap-y-4 w-full h-full max-w-[1000px] pb-10 max-h-[calc(100vh-216px)] overflow-y-scroll bg-slate-50 scroll-m-0 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
			{chatList.map((chat, index) => {
				if (chat.role === "assistant") {
					return (
						<li
							key={index + "-assistant-p"}
							className=" bg-white border p-4 gap-y-1 flex flex-col rounded-[28px] max-w-[75%] w-full self-start"
						>
							<HoverCard>
								<HoverCardTrigger>
									<ReactMarkdown>{chat.content}</ReactMarkdown>
								</HoverCardTrigger>
								<HoverCardContent className="p-2 w-fit">
									<div className="flex gap-x-1 text-sm w-fit">
										<Button
											className="p-2"
											variant={"ghost"}
											onClick={() => onSave(chat.content)}
										>
											<SaveIcon
												width={15}
												height={15}
												className="text-gray-600"
											/>
										</Button>

										<Button
											className="p-2"
											variant={"ghost"}
											onClick={() => {
												navigator.clipboard.writeText(chat.content);
												setCoppied(true);
												setTimeout(() => {
													setCoppied(false);
												}, 2000);
											}}
										>
											{!coppied && (
												<CopyIcon
													width={15}
													height={15}
													className="text-gray-600"
												/>
											)}
											{coppied && (
												<CheckIcon
													width={15}
													height={15}
													className="text-green-700"
												/>
											)}
										</Button>
									</div>
								</HoverCardContent>
							</HoverCard>
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
