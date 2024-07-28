import { CreateAssistantPort } from "../application/port/out/create_assistant.port.out";
import { Assistant } from "./assistant";
import { CreateAssistantCommand } from "./create_assistant.command";
import { CreateAssistantUseCase } from "../application/port/in/create_assistant.usecase";

export class CreateAssistantService implements CreateAssistantUseCase {
	createAssistantPort: CreateAssistantPort;
	constructor(createAssistantPort: CreateAssistantPort) {
		this.createAssistantPort = createAssistantPort;
	}
	async createAssistant(command: CreateAssistantCommand): Promise<Assistant> {
		console.log("Use Case: Create Assistant Service => Called!");
		let assistant: Assistant = await this.createAssistantPort.createAssistant(
			command.name,
			command.model,
			command.instruction,
			command.description,
			command.tools,
			command.avatar,
			command.top_p,
			command.temperature
		);

		return Promise.resolve(assistant);
	}
}
