import { Assistant } from "@/lib/assistant/domain/assistant";
import { CreateAssistantCommand } from "@/lib/assistant/domain/create_assistant.command";

export interface CreateAssistantUseCase {
	createAssistant(command: CreateAssistantCommand): Promise<Assistant>;
}
