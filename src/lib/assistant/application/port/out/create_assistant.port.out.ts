import { Assistant } from "@/lib/assistant/domain/assistant";

export interface CreateAssistantPort {
	createAssistant(
		name: string,
		model: string,
		instruction: string,
		description: string,
		tools: string[],
		avatar: string,
		top_p: number,
		temperature: number
	): Promise<Assistant>;
}
