import { Assistant } from "../../domain/assistant";
import OpenAI from "openai";

export function aIAssistantsToAssistants(
	openAiAssistantList: OpenAI.Beta.Assistants.Assistant[]
): Assistant[] {
	let assistants: Assistant[] = openAiAssistantList.map((as) => {
		let assistant: Assistant = {
			id: as.id,
			name: as.name ? as.name : "",
			model: as.model ? as.model : "",
			description: as.description ? as.description : "",
			instruction: as.instructions ? as.instructions : "",
			tools: [],
			top_p: as.top_p ? as.top_p : 0.0,
			temperature: as.temperature ? as.temperature : 0.0,
			avatar: "",
		};
		return assistant;
	});
	return assistants;
}
