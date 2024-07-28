import { Assistant } from "@/lib/assistant/domain/assistant";

export interface ListAssistantPort {
	listAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]>;
}
