import { Assistant } from "../in/assistant";
export interface LoadAssistantPort {
	load(id: string): Promise<Assistant>;
}
