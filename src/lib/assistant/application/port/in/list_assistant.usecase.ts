import { Assistant } from "@/lib/assistant/domain/assistant";

export interface ListAssistantUseCase {
	listAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]>;
}
