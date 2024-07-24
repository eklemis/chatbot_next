import { CreateAssistantPort } from "../../application/port/in/create_assistant.port.in";
import { Assistant } from "../../domain/assistant";

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiCreateAssistantAdapter implements CreateAssistantPort {
	async createAssistant(
		name: string,
		model: string,
		instruction: string,
		description: string,
		tools: string[],
		avatar: string,
		top_p: number,
		temperature: number
	): Promise<Assistant> {
		let assistant: Assistant = {
			id: undefined,
			name: name,
			model: model,
			instruction: instruction,
			description: description,
			tools: tools,
			avatar: avatar,
			top_p: top_p,
			temperature: temperature,
		};
		//openai.beta.threads.runs.create("",{}).
		let createdAiAssitant = await openai.beta.assistants.create({
			name: assistant.name,
			model: assistant.model,
			instructions: assistant.instruction,
			description: assistant.description,
			top_p: top_p,
			temperature: temperature,
		});
		assistant.id = createdAiAssitant.id;
		return Promise.resolve(assistant);
	}
}
