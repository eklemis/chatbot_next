import { SendMessageUseCase } from "../application/port/in/send_message.usecase";
import { SendMessagePort } from "../application/port/out/send_message.port.out";
import { Message } from "./message";

export class SendMessageService implements SendMessageUseCase {
	#sendMessagePort: SendMessagePort;

	constructor(send_port: SendMessagePort) {
		this.#sendMessagePort = send_port;
	}

	sendMessage(
		interview_id: string,
		message: string,
		role: "user" | "assistant"
	): Promise<Message> {
		return this.#sendMessagePort.sendMessage(interview_id, message, role);
	}

	fetchReplyStream(
		assistant_id: string,
		interview_id: string
	): Promise<ReadableStream> {
		return this.#sendMessagePort.fetchReplyStream(assistant_id, interview_id);
	}
}
