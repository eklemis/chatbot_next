import { ChangeAssistantCommand } from "../../../domain/change_assistant.command";
import { Assistant } from "./assistant";

export interface ChangeAssistantUseCase {
	update(change_command: ChangeAssistantCommand): Promise<boolean>;
	loadAssistant(id: string): Promise<Assistant>;
}
