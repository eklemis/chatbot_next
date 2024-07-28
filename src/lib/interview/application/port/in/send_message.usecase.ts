import { Message } from "../../../domain/message";
export interface SendMessageUseCase {
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
