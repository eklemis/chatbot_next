import OpenAI from "openai";
import { Interview } from "@/lib/interview/domain/interview";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiCreateThreadAdapter {
	constructor() {}

	async createInterviewSession(): Promise<Interview> {
		console.log("Creating a new thread...");
		const thread = await openai.beta.threads.create();
		console.log(thread);
		let createdInterview: Interview = {
			id: thread.id,
		};
		return Promise.resolve(createdInterview);
	}
}
