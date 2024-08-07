import { ListAssistantPort } from "./port/out/list_assistant.port.out";
import { Assistant } from "../domain/assistant";
import { ListAssistantUseCase } from "./port/in/list_assistant.usecase";

export class ListAssistantService implements ListAssistantUseCase {
	#listAssistantPort: ListAssistantPort;
	constructor(listAssistantPort: ListAssistantPort) {
		this.#listAssistantPort = listAssistantPort;
	}
	async listAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]> {
		return this.#listAssistantPort.listAssistant(limit, before_id, after_id);
	}
}
