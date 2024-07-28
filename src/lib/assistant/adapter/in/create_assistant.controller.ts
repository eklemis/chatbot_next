import { CreateAssistantUseCase } from "../../application/port/in/create_assistant.usecase";
import { CreateAssistantConfig } from "@/config/create_assistant.config";
import { Assistant } from "../../domain/assistant";
import { CreateAssistantCommand } from "../../domain/create_assistant.command";

export class CreateAssistantController {
	createAssistantUseCase: CreateAssistantUseCase;

	constructor() {
		this.createAssistantUseCase = CreateAssistantConfig.createAssistantUseCase;
	}

	postAssistant(
		name: string,
		model: string,
		instruction: string,
		description: string,
		tools: string[],
		avatar: string,
		top_p: number,
		temperature: number
	): Promise<Assistant> {
		return this.createAssistantUseCase.createAssistant(
			new CreateAssistantCommand(
				name,
				model,
				instruction,
				description,
				tools,
				avatar,
				top_p,
				temperature
			)
		);
	}
}
