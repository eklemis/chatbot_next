import { ChangeAssistantUseCase } from "../../application/port/in/change_assistant.usecase";
import { ChangeAssistantConfig } from "../../../../config/change_assistant.config";
import { ChangeAssistantCommand } from "../../domain/change_assistant.command";
import { Assistant } from "../../application/port/in/assistant";
export class ChangeAssistantController {
	#changeUseCase: ChangeAssistantUseCase;

	constructor() {
		this.#changeUseCase = ChangeAssistantConfig.changeAssistantUseCase;
	}

	loadAssistant(id: string): Promise<Assistant> {
		return this.#changeUseCase.loadAssistant(id);
	}

	async applyChange(
		id: string,
		name: string,
		model: string,
		instruction: string,
		description: string,
		temperature: number,
		top_p: number
	): Promise<boolean> {
		let changeCommad: ChangeAssistantCommand = new ChangeAssistantCommand(
			id,
			name,
			model,
			instruction,
			description,
			[],
			top_p,
			temperature
		);
		return this.#changeUseCase.update(changeCommad);
	}
}
