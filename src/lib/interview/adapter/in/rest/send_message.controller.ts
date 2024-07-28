import { SendMessageUseCase } from "@/lib/interview/application/port/in/send_message.usecase";
import { SendMessageConfig } from "@/config/send_message.config";
import { Message } from "@/lib/interview/domain/message";
export class SendMessageController {
	#messageSender: SendMessageUseCase;

	constructor() {
		this.#messageSender = SendMessageConfig.sendMessageUseCase;
	}

	putMessage(
		interview_id: string,
		message: string,
		role: "user" | "assistant"
	): Promise<Message> {
		return this.#messageSender.sendMessage(interview_id, message, role);
	}

	fetchReplyStream(
		assistant_id: string,
		interview_id: string
	): Promise<ReadableStream> {
		return this.#messageSender.fetchReplyStream(assistant_id, interview_id);
	}
}
