import { Message } from "@/lib/interview/domain/message";
export interface SendMessagePort {
	sendMessage(
		interview_id: string,
		message: string,
		role: "user" | "assistant"
	): Promise<Message>;
	fetchReplyStream(
		assistant_id: string,
		interview_id: string
	): Promise<ReadableStream>;
}
