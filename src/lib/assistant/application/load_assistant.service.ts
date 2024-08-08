import { LoadAssistantQuery } from "./port/in/load_assistant.query";
import { LoadAssistantPort } from "./port/out/load_assistant.port.out";
import { Assistant } from "./port/in/assistant";

export class LoadAssistantService implements LoadAssistantQuery {
	#assistantLoader: LoadAssistantPort;
	#assistant: Assistant = {
		id: "",
		name: "",
		model: "",
		description: "",
		instruction: "",
		tools: [],
		top_p: 1,
		temperature: 1,
	};
	constructor(loader: LoadAssistantPort) {
		this.#assistantLoader = loader;
	}
	async loadAssistant(id: string): Promise<Assistant> {
		this.#assistant = await this.#assistantLoader.load(id);
		return Promise.resolve(this.#assistant);
	}
	getId(): string {
		return this.#assistant.id ? this.#assistant.id : "";
	}
	getName(): string {
		return this.#assistant.name ? this.#assistant.name : "";
	}
	getModel(): string {
		return this.#assistant.model ? this.#assistant.model : "";
	}
	getDescription(): string {
		return this.#assistant.description ? this.#assistant.description : "";
	}
	getInstruction(): string {
		return this.#assistant.instruction ? this.#assistant.instruction : "";
	}
}
