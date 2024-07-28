"use client";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import setAxios from "@/lib/singletons/axios";
import { ChatList } from "./chat-list";
interface Chat {
	role: "assistant" | "user";
	content: string;
}
interface Params {
	assistantId: string;
	interviewId: string;
}
export function Chatbox({ assistantId, interviewId }: Params) {
	const [userMessage, setUserMessage] = useState<Chat>({
		role: "user",
		content: "",
	});
	const [messages, setMessages] = useState<Chat[]>([]);
	const [reply, setReply] = useState<Chat>({ role: "assistant", content: "" });
	useEffect(() => {
		if (messages.length > 0) {
			let efMessages = [...messages];
			efMessages[messages.length - 1].content = reply.content;
			setMessages(efMessages);
		}
	}, [reply]);

	async function sendMessage(interview_id: string, message: string) {
		try {
			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "user", content: message }, // Add the user's message
			]);
			// First, send the message to the API
			const response = await setAxios.post(
				`/api/message/${assistantId}/${interview_id}`,
				{
					message: message,
				}
			);
			// Reset user message and assistant message
			setUserMessage({
				role: "user",
				content: "",
			});
			// Check if the request was successful
			if (response.status === 200) {
				// If successful, set up the EventSource to receive the streamed response
				const eventSource = new EventSource(
					`/api/message/${assistantId}/${interview_id}`
				);
				setReply({
					role: "assistant",
					content: "",
				});
				setMessages((prevMessages) => [...prevMessages, reply]);

				eventSource.onmessage = (event) => {
					if (event.data === "completed") {
						console.log("EventSource closed");
						eventSource.close();
					} else {
						let chunk = JSON.parse(event.data);
						setReply((prevReply) => {
							return {
								...prevReply,
								content: prevReply.content + chunk[0].text.value,
							};
						});
					}
				};

				eventSource.onerror = (error) => {
					console.error("EventSource failed:", error);
					eventSource.close();
				};
			} else {
				console.error("Failed to send message");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	}
	return (
		<section className="w-screen h-[calc(100svh-46px)] relative flex flex-col justify-center p-0 md:p-8 lg-p8 pt-2 pb-0">
			<div className=" h-full flex justify-center">
				<ChatList chatList={messages} lastReply={reply.content} />
			</div>
			<div className="absolute items-end self-center bottom-0 flex flex-col bg-slate-50 z-50 gap-y-3 p-4 pb-2 w-full max-w-[1000px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
				<TextareaAutosize
					className="border w-full p-2 rounded-md"
					style={{ boxSizing: "border-box" }}
					value={userMessage.content}
					minRows={2}
					maxRows={50}
					onChange={(event) => {
						setUserMessage((chat) => {
							return {
								...chat,
								content: event.target.value,
							};
						});
					}}
				/>
				<Button
					className="w-24"
					onClick={() => {
						sendMessage(interviewId, userMessage.content);
					}}
				>
					<PaperPlaneIcon className="mr-2 h-4 w-4" /> Send
				</Button>
			</div>
		</section>
	);
}
