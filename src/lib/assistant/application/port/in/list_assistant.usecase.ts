import { Assistant } from "./assistant";

export interface ListAssistantUseCase {
	listAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]>;
}
