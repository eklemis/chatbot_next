import { Message } from "@/lib/interview/domain/message";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiSendMessageAdapter {
	async #createMessage(
		interview_id: string,
		message: string,
		role: "user" | "assistant"
	) {
		console.log("Adding a new message to thread: " + interview_id);
		const response = await openai.beta.threads.messages.create(interview_id, {
			role: role,
			content: message,
		});
		return response;
	}
	async #runAssistant(interview_id: string, assitant_id: string) {
		console.log("Running assistant for thread: " + interview_id);
		const response = await openai.beta.threads.runs.create(interview_id, {
			assistant_id: assitant_id,
			stream: true,
		});

		console.log(response);

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
	async getReplyStreamOf(
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
