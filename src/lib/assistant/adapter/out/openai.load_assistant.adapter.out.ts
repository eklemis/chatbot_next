import { Assistant } from "../../application/port/in/assistant";
import { LoadAssistantPort } from "../../application/port/out/load_assistant.port.out";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiLoadAssistantAdapter implements LoadAssistantPort {
	async load(id: string): Promise<Assistant> {
		const loadedAssistant = await openai.beta.assistants.retrieve(id);
		const loadedDomainAssistant: Assistant = {
			id: loadedAssistant.id,
			name: loadedAssistant.name ? loadedAssistant.name : "",
			model: loadedAssistant.model,
			instruction: loadedAssistant.instructions
				? loadedAssistant.instructions
				: "",
			description: loadedAssistant.description
				? loadedAssistant.description
				: "",
			tools: [],
			temperature: loadedAssistant.temperature
				? loadedAssistant.temperature
				: 1,
			top_p: loadedAssistant.top_p ? loadedAssistant.top_p : 1,
		};

		return Promise.resolve(loadedDomainAssistant);
	}
}
