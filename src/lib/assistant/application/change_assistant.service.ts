import { ChangeAssistantPort } from "./port/out/change_assistant.port.out";
import { ChangeAssistantCommand } from "../domain/change_assistant.command";
import { ChangeAssistantUseCase } from "./port/in/change_assistant.usecase";
import { LoadAssistantPort } from "./port/out/load_assistant.port.out";
import { Assistant } from "./port/in/assistant";

export class ChangeAssistantService implements ChangeAssistantUseCase {
	#assistantChanger: ChangeAssistantPort;
	#assistantLoader: LoadAssistantPort;
	#loadedAssistant: Assistant = {
		id: undefined,
		name: "",
		model: "",
		description: "",
		instruction: "",
		tools: [],
		top_p: 1,
		temperature: 1,
	};

	constructor(changePort: ChangeAssistantPort, loadPort: LoadAssistantPort) {
		this.#assistantChanger = changePort;
		this.#assistantLoader = loadPort;
	}

	async update(change_command: ChangeAssistantCommand): Promise<boolean> {
		console.log(
			"Change assitant service is called:",
			JSON.stringify(change_command)
		);
		await this.loadAssistant(change_command.id);
		//make sure assitant is exist
		if (this.#loadedAssistant.id) {
			return this.#assistantChanger.update(
				change_command.id,
				change_command.name,
				change_command.model,
				change_command.instruction,
				change_command.description,
				change_command.temperature,
				change_command.top_p,
				change_command.tools
			);
		}
		return Promise.resolve(false);
	}

	async loadAssistant(id: string): Promise<Assistant> {
		this.#loadedAssistant = await this.#assistantLoader.load(id);
		return Promise.resolve(this.#loadedAssistant);
	}
}
