import { LoadAssistantService } from "@/lib/assistant/application/load_assistant.service";
import { OpenAiLoadAssistantAdapter } from "@/lib/assistant/adapter/out/openai.load_assistant.adapter.out";

export const LoadAssistantConfig = {
	loadAssistantQuery: new LoadAssistantService(
		new OpenAiLoadAssistantAdapter()
	),
};
