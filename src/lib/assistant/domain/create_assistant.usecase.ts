import { Assistant } from "./assistant";
import { CreateAssistantCommand } from "./create_assistant.command";

export interface CreateAssistantUseCase {
	createAssistant(command: CreateAssistantCommand): Promise<Assistant>;
}
