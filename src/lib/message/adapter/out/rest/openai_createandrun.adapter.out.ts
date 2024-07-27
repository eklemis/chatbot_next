import OpenAI from "openai";
import { ReadableStream } from "stream/web";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiCreateAndRunAdapter {
	#threadId: string = "";

	constructor() {}

	async initiateConversation(
		assistantId: string,
		initialMessage: string
	): Promise<ReadableStream> {
		console.log("Called with assistant:", assistantId);

		const openaiStream = await openai.beta.threads.createAndRun({
			assistant_id: assistantId,
			thread: {
				messages: [{ role: "user", content: initialMessage }],
			},
			stream: true,
		});

		const setThreadId = (id: string) => {
			this.#threadId = id;
		};

		return new ReadableStream({
			async start(controller) {
				try {
					for await (const event of openaiStream) {
						if (event.event === "thread.created") {
							setThreadId(event.data.id);
						}
						if (event.event === "thread.message.delta") {
							if (event.data?.delta?.content) {
								controller.enqueue(event.data.delta.content);
							}
						}
						if (event.event === "thread.run.completed") {
							//console.log("COMPLETED!");
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

	getConversationId(): string {
		return this.#threadId;
	}
}
