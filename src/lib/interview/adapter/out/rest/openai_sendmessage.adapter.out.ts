import { Message } from "@/lib/interview/domain/message";
import { SendMessagePort } from "@/lib/interview/application/port/out/send_message.port.out";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiSendMessageAdapter implements SendMessagePort {
	async #createMessage(
		thread_id: string,
		message: string,
		role: "user" | "assistant"
	) {
		console.log("Adding a new OpenAI message to thread: " + thread_id);
		const response = await openai.beta.threads.messages.create(thread_id, {
			role: role,
			content: message,
		});
		console.log("Created OpenAI message", response);
		return response;
	}
	async #runAssistant(thread_id: string, assitant_id: string) {
		console.log("Running assistant for thread: " + thread_id);
		const response = await openai.beta.threads.runs.create(thread_id, {
			assistant_id: assitant_id,
			stream: true,
		});

		console.log("Created OpenAI run:", response);

		return response;
	}

	async sendMessage(
		interview_id: string,
		message: string,
		role: "user" | "assistant"
	): Promise<Message> {
		let createdMessage = await this.#createMessage(interview_id, message, role);
		let domainMessage = {
			id: createdMessage.id,
		};
		return Promise.resolve(domainMessage);
	}
	async fetchReplyStream(
		assistant_id: string,
		interview_id: string
	): Promise<ReadableStream> {
		let runStream = await this.#runAssistant(interview_id, assistant_id);

		return new ReadableStream({
			async start(controller) {
				try {
					for await (const event of runStream) {
						if (event.event === "thread.message.delta") {
							if (event.data?.delta?.content) {
								controller.enqueue(event.data.delta.content);
							}
						}
						if (event.event === "thread.run.completed") {
							controller.close();
						}
					}
				} catch (error) {
					console.error("Stream error:", error);
					controller.error(error);
				}
			},
		});
	}
}
