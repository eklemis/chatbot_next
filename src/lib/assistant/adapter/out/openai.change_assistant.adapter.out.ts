import { ChangeAssistantPort } from "../../application/port/out/change_assistant.port.out";

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiChangeAssistantAdapter implements ChangeAssistantPort {
	async update(
		id: string,
		name: string,
		model: string,
		instruction: string,
		description: string,
		temperature: number,
		top_p: number,
		tool: string[]
	): Promise<boolean> {
		const updatedAssistant = await openai.beta.assistants.update(id, {
			name: name,
			model: model,
			description: description,
			instructions: instruction,
			temperature: temperature,
			top_p: top_p,
		});
		console.log("Changed Open AI Assistant:", updatedAssistant);
		if (updatedAssistant) {
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}
}
