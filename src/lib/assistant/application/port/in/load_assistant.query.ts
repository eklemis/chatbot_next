import { Assistant } from "./assistant";

export interface LoadAssistantQuery {
	loadAssistant(id: string): Promise<Assistant>;
	getId(): string;
	getName(): string;
	getModel(): string;
	getDescription(): string;
	getInstruction(): string;
}
