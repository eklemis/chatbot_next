import OpenAI from "openai";
import { Interview } from "@/lib/interview/domain/interview";
import { CreateInterviewPort } from "@/lib/interview/application/port/out/create_interview.port.out";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiCreateInterviewAdapter implements CreateInterviewPort {
	constructor() {}

	async createInterviewSession(): Promise<Interview> {
		console.log("Creating a new Open AI thread...");
		const thread = await openai.beta.threads.create();
		console.log("New thread created", thread);
		let createdInterview: Interview = {
			id: thread.id,
		};
		return Promise.resolve(createdInterview);
	}
}
