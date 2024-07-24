import { ListAssistantService } from "@/lib/assistant/domain/list_assistant.service";
import { OpenAIListAssistantAdapter } from "@/lib/assistant/adapter/out/openai.list_assistant.adapter.out";

export const ListAssistantConfig = {
	listAssistantUseCase: new ListAssistantService(
		new OpenAIListAssistantAdapter()
	),
};
