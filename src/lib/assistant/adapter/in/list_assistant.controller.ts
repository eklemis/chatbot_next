import { ListAssistantUseCase } from "../../domain/list_assistant.usecase";
import { ListAssistantConfig } from "@/config/list_assistant.config";
import { Assistant } from "../../domain/assistant";

export class ListAssistantcontroller {
	#listAssistantUseCase: ListAssistantUseCase;

	constructor() {
		this.#listAssistantUseCase = ListAssistantConfig.listAssistantUseCase;
	}

	async fetchAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]> {
		return this.#listAssistantUseCase.listAssistant(limit, before_id, after_id);
	}
}
