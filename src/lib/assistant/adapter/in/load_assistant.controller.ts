import { LoadAssistantConfig } from "@/config/load_assistant.config";
import { LoadAssistantQuery } from "../../application/port/in/load_assistant.query";

export class LoadAssistantController {
	#loader: LoadAssistantQuery;

	constructor() {
		this.#loader = LoadAssistantConfig.loadAssistantQuery;
	}

	async loadAssistant(id: string) {
		await this.#loader.loadAssistant(id);
	}
	getAssistantName(): string {
		return this.#loader.getName();
	}
	getAssistantDescription(): string {
		return this.#loader.getDescription();
	}
	getAssistantInstruction(): string {
		return this.#loader.getInstruction();
	}
	getModel(): string {
		return this.#loader.getModel();
	}
}
